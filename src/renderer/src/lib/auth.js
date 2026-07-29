import { supabase } from "../supabaseClient";

export async function bootstrapSession() {
  const email = import.meta.env.VITE_OPERATOR_EMAIL;
  const password = import.meta.env.VITE_OPERATOR_PASSWORD;

  const { data: signInData, error: signInError } =
    await supabase.auth.signInWithPassword({ email, password });
  if (signInError) throw signInError;

  const userId = signInData.session.user.id;
  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();
  if (profileError) throw profileError;

  return { id: userId, email: signInData.session.user.email, rola: profile.rola };
}
