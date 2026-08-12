import { NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase/server";

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const supabase = await createClient();

  if (code && supabase) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(new URL("/members/portal", requestUrl.origin));
}
