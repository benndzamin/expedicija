import { supabase } from "../supabaseClient";

export async function fetchPendingNajave() {
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function izdajNalogZaNajavu(najava, currentUserId) {
  const now = new Date().toISOString();

  const { error: updateError } = await supabase
    .from("announcements")
    .update({
      status: "in_progress",
      last_status_changed_by: currentUserId,
      last_status_changed_at: now,
    })
    .eq("id", najava.id);
  if (updateError) throw updateError;

  const { error: historyError } = await supabase
    .from("announcement_status_history")
    .insert({
      announcement_id: najava.id,
      changed_by: currentUserId,
      old_status: "pending",
      new_status: "in_progress",
    });
  if (historyError) throw historyError;
}

export function mapNajavaToNalog(nalog, najava) {
  const vozac = `${najava.ime_vozaca || ""} ${najava.prezime_vozaca || ""}`.trim();
  const stavke = nalog.stavke.map((stavka, i) =>
    i === 0 ? { ...stavka, roba: najava.vrsta_cementa || "" } : stavka,
  );

  return {
    ...nalog,
    firma_kupac: najava.firma || "",
    naziv_firme: najava.firma || "",
    vozac,
    registarski_broj: najava.registarske_oznake || "",
    stavke,
  };
}
