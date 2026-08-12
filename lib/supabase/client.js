import { createBrowserClient } from "@supabase/ssr";
import { isSupabaseConfigured, supabaseConfig } from "./config";

let browserClient;

export function createClient() {
  if (!isSupabaseConfigured) return null;

  if (!browserClient) {
    browserClient = createBrowserClient(
      supabaseConfig.url,
      supabaseConfig.publishableKey,
    );
  }

  return browserClient;
}
