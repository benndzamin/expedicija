import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { fetchKupciBezNajave } from "./kupciRepository";

export function useKupciBezNajave(enabled) {
  const [kupci, setKupci] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    // Svaka promjena na users (announcement_required, dozvoljeni_artikli...)
    // pokreće ponovno učitavanje -- filter ostaje na jednom mjestu
    // (fetchKupciBezNajave) umjesto da se duplira ovdje.
    const reload = () =>
      fetchKupciBezNajave()
        .then((data) => {
          if (!cancelled) {
            setKupci(data);
            setLoaded(true);
          }
        })
        .catch((err) => console.error("Učitavanje kupaca nije uspjelo:", err));

    reload();

    const channel = supabase
      .channel("users-kupci")
      .on("postgres_changes", { event: "*", schema: "public", table: "users" }, reload)
      .subscribe();

    // Rezerva ako realtime event ne stigne (npr. prekid veze).
    window.addEventListener("focus", reload);

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
      window.removeEventListener("focus", reload);
    };
  }, [enabled]);

  return { kupci, loaded };
}
