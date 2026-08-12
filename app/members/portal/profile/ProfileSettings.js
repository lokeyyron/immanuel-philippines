"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../../lib/supabase/client";
import { isValidMemberUsername, normalizeMemberUsername } from "../../../../lib/supabase/member-identity";

function usernameFromUser(user) {
  const email = user?.email || "";
  const aliasSuffix = "@members.immanuelphilippines.church";
  return email.endsWith(aliasSuffix) ? email.slice(0, -aliasSuffix.length) : email.split("@")[0] || "";
}

export default function ProfileSettings() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const supabase = createClient();

    if (!supabase) {
      router.replace("/members?setup=1");
      return () => { active = false; };
    }

    supabase.auth.getUser().then(({ data: { user: currentUser } }) => {
      if (!active) return;
      if (!currentUser) {
        router.replace("/members?redirected=1");
        return;
      }
      setUser(currentUser);
      setDisplayName(currentUser.user_metadata?.display_name || currentUser.user_metadata?.full_name || "");
      setUsername(usernameFromUser(currentUser));
      setIsLoading(false);
    });

    return () => { active = false; };
  }, [router]);

  const originalUsername = useMemo(() => usernameFromUser(user), [user]);

  async function handleSubmit(event) {
    event.preventDefault();
    setNotice("");
    setError("");

    const supabase = createClient();
    if (!supabase || !user) return;

    const normalizedUsername = normalizeMemberUsername(username);
    if (!isValidMemberUsername(normalizedUsername) || normalizedUsername.includes("@")) {
      setError("Use 3–32 lowercase letters, numbers, dots, underscores, or hyphens for your username.");
      return;
    }

    if (newPassword && newPassword.length < 8) {
      setError("Your new password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("The two new passwords do not match.");
      return;
    }

    setIsSaving(true);

    try {
      if (normalizedUsername !== normalizeMemberUsername(originalUsername)) {
        const response = await fetch("/api/member/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: normalizedUsername }),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "We could not update your username.");
      }

      const nextMetadata = {
        ...(user.user_metadata || {}),
        username: normalizedUsername,
        display_name: displayName.trim(),
      };
      const update = { data: nextMetadata };
      if (newPassword) update.password = newPassword;

      const { data: updatedData, error: updateError } = await supabase.auth.updateUser(update);
      if (updateError) throw updateError;

      setUser(updatedData.user || user);
      setUsername(normalizedUsername);
      setNewPassword("");
      setConfirmPassword("");
      setNotice("Your profile has been updated.");
    } catch (saveError) {
      setError(saveError.message || "We could not save your changes.");
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return <main className="member-portal-page member-portal-loading" aria-live="polite">Opening your profile…</main>;
  }

  return (
    <main id="main-content" className="member-portal-page member-profile-page">
      <section className="member-profile-shell" aria-labelledby="member-profile-title">
        <div className="member-profile-intro">
          <Link className="member-profile-back" href="/members/portal">← Back to your portal</Link>
          <p className="kicker"><span /> Member settings</p>
          <h1 id="member-profile-title">Make it <em>yours.</em></h1>
          <p>Keep your name and sign-in details up to date. These settings are private to your member account.</p>
          <div className="member-profile-account-note"><span>Signed in as</span><strong>{user?.email}</strong></div>
        </div>

        <form className="member-profile-card" onSubmit={handleSubmit}>
          <div className="member-profile-card-head"><div><span className="member-preview-badge">Your profile</span><h2>Personal details</h2></div><span className="member-profile-mark" aria-hidden="true">◎</span></div>

          <label htmlFor="profile-display-name">Display name</label>
          <input id="profile-display-name" type="text" autoComplete="name" value={displayName} onChange={(event) => setDisplayName(event.target.value)} placeholder="How should we call you?" />

          <label htmlFor="profile-username">Username</label>
          <input id="profile-username" type="text" autoComplete="username" value={username} onChange={(event) => setUsername(normalizeMemberUsername(event.target.value))} placeholder="your username" />
          <p className="member-profile-field-note">This is the username you use to sign in. Changing it also changes your private account alias.</p>

          <div className="member-profile-divider"><span>Change password</span></div>
          <label htmlFor="profile-password">New password</label>
          <input id="profile-password" type="password" autoComplete="new-password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} placeholder="Leave blank to keep your current password" />
          <label htmlFor="profile-password-confirm">Confirm new password</label>
          <input id="profile-password-confirm" type="password" autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Type it again" />

          {error && <p className="member-profile-error" role="alert">{error}</p>}
          {notice && <p className="member-profile-notice" role="status">{notice}</p>}
          <button className="member-profile-save button" type="submit" disabled={isSaving}>{isSaving ? "Saving…" : "Save changes"}<span aria-hidden="true">↗</span></button>
          <p className="member-profile-security-note">Never share your password. If you lose access, contact your Discipler.</p>
        </form>
      </section>
    </main>
  );
}
