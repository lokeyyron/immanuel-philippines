"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";
import { isSupabaseConfigured } from "../../lib/supabase/config";
import { memberAuthEmail } from "../../lib/supabase/member-identity";

const memberHighlights = [
  { icon: "♧", label: "Groups", body: "Find your people and stay close between Sundays." },
  { icon: "□", label: "Moments", body: "Keep up with gatherings, serving, and church life." },
  { icon: "✦", label: "Journal", body: "Read and eventually share reflections with the family." },
];

export default function MemberLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const authEmail = memberAuthEmail(username);

    if (!authEmail || !password) {
      setError("Enter your username and password to continue.");
      return;
    }

    const supabase = createClient();
    if (!supabase) {
      setError("Secure member sign-in is not configured yet. Please try again after the church connects its member database.");
      return;
    }

    setIsSubmitting(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: authEmail,
      password,
    });

    if (signInError) {
      setError("That sign-in did not work. Check your details or contact your Discipler.");
      setIsSubmitting(false);
      return;
    }

    router.replace("/members/portal");
    router.refresh();
  };

  return (
    <main id="main-content" className="member-login-page">
      <div className="member-login-orbit member-login-orbit-one" aria-hidden="true" />
      <div className="member-login-orbit member-login-orbit-two" aria-hidden="true" />
      <section className="member-login-shell" aria-labelledby="member-login-title">
        <div className="member-login-intro">
          <p className="kicker"><span /> Immanuel / Members</p>
          <h1 id="member-login-title">Your place to <em>belong.</em></h1>
          <p>One calm place for the people, stories, and next steps that make Immanuel feel like home.</p>
          <div className="member-login-highlights" aria-label="Member portal highlights">
            {memberHighlights.map((highlight) => (
              <div className="member-login-highlight" key={highlight.label}>
                <span className="member-login-highlight-icon" aria-hidden="true">{highlight.icon}</span>
                <div><strong>{highlight.label}</strong><p>{highlight.body}</p></div>
              </div>
            ))}
          </div>
          <div className="member-login-note"><span aria-hidden="true">✦</span><p>Built for connection, care, and a faith that keeps moving through the week.</p></div>
        </div>

        <div className="member-login-side">
          <div className="member-login-card">
            <div className="member-login-card-top"><span>Member access</span><span className="member-preview-badge">Preview</span></div>
            <form className="member-login-form" onSubmit={handleSubmit}>
              <label htmlFor="member-username">Username</label>
              <input id="member-username" name="username" type="text" autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="your username" />
              <label htmlFor="member-password">Password</label>
              <input id="member-password" name="password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Your password" />
              {error && <p className="member-login-error" role="alert">{error}</p>}
              <button className="member-login-submit button" type="submit" disabled={isSubmitting}>{isSubmitting ? "Signing in…" : "Enter member space"} <span aria-hidden="true">↗</span></button>
            </form>
            <p className="member-login-help">If you do not have an account, contact your Discipler.</p>
            <p className="member-login-login-note">Use the username your Discipler gave you. Public sign-up is disabled.</p>
            <p className="member-login-disclaimer">{isSupabaseConfigured ? "Secure sign-in is connected. Member tools are still being built." : "This is a front-end preview. Secure sign-in is waiting for the church project settings."}</p>
          </div>
          <div className="member-login-side-note"><span>COMING TOGETHER</span><p>Groups · Gatherings · Journal · Care</p></div>
        </div>
      </section>
    </main>
  );
}
