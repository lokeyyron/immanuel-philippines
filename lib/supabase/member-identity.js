// Supabase Auth uses an email identity for password sign-in. Members never
// need to see that identity: we derive a private, deterministic alias from
// the username they were given by a Discipler.
const MEMBER_ALIAS_DOMAIN = "members.immanuelphilippines.church";
const USERNAME_PATTERN = /^[a-z0-9][a-z0-9._-]{2,31}$/;

export function normalizeMemberUsername(value) {
  return value.trim().toLowerCase();
}

export function memberAuthEmail(value) {
  const username = normalizeMemberUsername(value);

  // Keep older accounts usable while the church moves from email login to
  // usernames. New accounts should always use the generated alias.
  if (username.includes("@")) return username;
  if (!USERNAME_PATTERN.test(username)) return null;

  return `${username}@${MEMBER_ALIAS_DOMAIN}`;
}

export function isValidMemberUsername(value) {
  const username = normalizeMemberUsername(value);
  return USERNAME_PATTERN.test(username) || username.includes("@");
}

export { MEMBER_ALIAS_DOMAIN };
