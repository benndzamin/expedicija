import { supabase } from "../supabaseClient";

// NAPOMENA: odbrambeni filter -- nije potvrđeno da je svaki users red sa
// announcement_required=false zaista kupac (a ne staff/operater nalog); rola
// vrednosti nisu poznate. Proveriti na stvarnim podacima. Ako rola dobije
// poznatu vrednost za kupca, dodati .eq("rola", "...").
export async function fetchKupciBezNajave() {
  const { data, error } = await supabase
    .from("users")
    .select("id, naziv_firme, adresa, dozvoljeni_artikli")
    .eq("announcement_required", false)
    .not("naziv_firme", "is", null)
    .order("naziv_firme", { ascending: true });
  if (error) throw error;
  return data;
}

export function mapKupacToNalog(nalog, kupac) {
  const artikli = kupac.dozvoljeni_artikli || [];
  const stavke = nalog.stavke.map((stavka, i) =>
    i === 0 ? { ...stavka, roba: artikli[0] || "" } : stavka,
  );

  return {
    ...nalog,
    firma_kupac: kupac.naziv_firme || "",
    naziv_firme: kupac.naziv_firme || "",
    adresa_i_mjesto: kupac.adresa || "",
    // kupac bez najave nema podatke o vozaču/registraciji -- ne preuzimati
    // ih iz prethodno izabrane najave.
    vozac: "",
    registarski_broj: "",
    stavke,
  };
}
