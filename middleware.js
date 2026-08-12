import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { isSupabaseConfigured, supabaseConfig } from "./lib/supabase/config";

export async function middleware(request) {
  if (!isSupabaseConfigured) return NextResponse.next();

  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    supabaseConfig.url,
    supabaseConfig.publishableKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const { data: { user } } = await supabase.auth.getUser();
  const isMemberPortal = request.nextUrl.pathname.startsWith("/members/portal");

  if (isMemberPortal && !user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/members";
    redirectUrl.searchParams.set("redirected", "1");
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: ["/members/portal/:path*"],
};
