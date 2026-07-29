import { useEffect, useState } from "react";
import { fetchKupciBezNajave } from "./kupciRepository";

export function useKupciBezNajave(enabled) {
  const [kupci, setKupci] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    fetchKupciBezNajave().then((data) => {
      if (!cancelled) {
        setKupci(data);
        setLoaded(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [enabled]);

  return { kupci, loaded };
}
