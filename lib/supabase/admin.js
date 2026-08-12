import { createClient } from "@supabase/supabase-js";

// This module must only be imported by server-side code. The secret key bypasses
// Row Level Security and must never be sent to the browser.
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !secretKey) return null;

  return createClient(url, secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });
}
