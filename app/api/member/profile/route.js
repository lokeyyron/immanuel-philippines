import { NextResponse } from "next/server";
import { createClient as createServerClient } from "../../../../lib/supabase/server";
import { createAdminClient } from "../../../../lib/supabase/admin";
import {
  isValidMemberUsername,
  memberAuthEmail,
  normalizeMemberUsername,
} from "../../../../lib/supabase/member-identity";

export async function POST(request) {
  const supabase = await createServerClient();

  if (!supabase) {
    return NextResponse.json({ error: "Member authentication is not configured." }, { status: 503 });
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "You must be signed in to update your profile." }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "The profile request was not valid." }, { status: 400 });
  }

  const username = normalizeMemberUsername(body?.username);
  if (!isValidMemberUsername(username) || username.includes("@")) {
    return NextResponse.json({
      error: "Use 3–32 lowercase letters, numbers, dots, underscores, or hyphens for your username.",
    }, { status: 400 });
  }

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json({
      error: "Username changes are not enabled yet. The church administrator needs to add the server-only Supabase secret in Vercel.",
      code: "ADMIN_KEY_NOT_CONFIGURED",
    }, { status: 503 });
  }

  const nextEmail = memberAuthEmail(username);
  const existingEmail = (user.email || "").toLowerCase();
  if (nextEmail === existingEmail) {
    return NextResponse.json({ username });
  }

  const { error } = await admin.auth.admin.updateUserById(user.id, {
    email: nextEmail,
    email_confirm: true,
    user_metadata: {
      ...(user.user_metadata || {}),
      username,
    },
  });

  if (error) {
    const message = /already|registered|exists|duplicate/i.test(error.message || "")
      ? "That username is already in use. Choose another one."
      : "We could not update your username yet. Please try again.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  return NextResponse.json({ username });
}
