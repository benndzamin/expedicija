import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { fetchPendingNajave } from "./najaveRepository";

export function usePendingNajave(enabled) {
  const [najave, setNajave] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    fetchPendingNajave().then((data) => {
      if (!cancelled) {
        setNajave(data);
        setLoaded(true);
      }
    });

    const channel = supabase
      .channel("announcements-pending")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "announcements" },
        (payload) => {
          setNajave((prev) => {
            if (payload.eventType === "DELETE") {
              return prev.filter((n) => n.id !== payload.old.id);
            }
            const row = payload.new;
            if (row.status !== "pending") {
              return prev.filter((n) => n.id !== row.id);
            }
            const exists = prev.some((n) => n.id === row.id);
            if (exists) {
              return prev.map((n) => (n.id === row.id ? row : n));
            }
            return [row, ...prev];
          });
        },
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, [enabled]);

  return { najave, loaded };
}
