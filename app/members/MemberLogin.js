"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MemberLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!username.trim() || !password) {
      setError("Enter your username and password to continue.");
      return;
    }
    // Temporary front-end gate until the church chooses an auth provider.
    window.sessionStorage.setItem("immanuel-member-preview", "1");
    router.push("/members/portal");
  };

  return (
    <main id="main-content" className="member-login-page">
      <div className="member-login-orbit member-login-orbit-one" aria-hidden="true" />
      <div className="member-login-orbit member-login-orbit-two" aria-hidden="true" />
      <section className="member-login-shell" aria-labelledby="member-login-title">
        <div className="member-login-intro">
          <p className="kicker"><span /> Immanuel / Members</p>
          <h1 id="member-login-title">Welcome back, <em>family.</em></h1>
          <p>Sign in to find your church updates, shared reflections, and the people walking with you.</p>
          <div className="member-login-note"><span aria-hidden="true">✦</span><p>Your member space is built with care for the Immanuel family.</p></div>
        </div>

        <div className="member-login-card">
          <div className="member-login-card-top"><span>Member access</span></div>
          <form className="member-login-form" onSubmit={handleSubmit}>
            <label htmlFor="member-username">Username</label>
            <input id="member-username" name="username" type="text" autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Your username" />
            <label htmlFor="member-password">Password</label>
            <input id="member-password" name="password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Your password" />
            {error && <p className="member-login-error" role="alert">{error}</p>}
            <button className="member-login-submit button" type="submit">Log in <span aria-hidden="true">↗</span></button>
          </form>
          <p className="member-login-help">If you do not have an account, contact your Discipler.</p>
          <p className="member-login-disclaimer">Member sign-in is being connected to the church portal. This preview accepts any non-empty credentials.</p>
        </div>
      </section>
    </main>
  );
}
