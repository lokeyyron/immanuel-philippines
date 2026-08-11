"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const portalCards = [
  { label: "Journal", title: "Share a reflection", body: "Write a devotional or story for the Immanuel family.", icon: "✦" },
  { label: "Community", title: "Find your people", body: "Cell groups, care updates, and the next step together.", icon: "♧" },
  { label: "Giving", title: "Your giving history", body: "A private view of your future giving records.", icon: "♡" },
];

export default function MemberPortalPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.sessionStorage.getItem("immanuel-member-preview") !== "1") {
      router.replace("/members");
      return;
    }
    setReady(true);
  }, [router]);

  if (!ready) return <main className="member-portal-page member-portal-loading" aria-live="polite">Opening your member space…</main>;

  const logOut = () => {
    window.sessionStorage.removeItem("immanuel-member-preview");
    router.push("/members");
  };

  return (
    <main id="main-content" className="member-portal-page">
      <section className="member-portal-hero">
        <div><p className="kicker"><span /> Immanuel / Member portal</p><h1>A place to <em>belong.</em></h1></div>
        <div><p>Welcome to the first glimpse of the member space. We’ll keep adding thoughtful tools for connection and care.</p><button className="member-logout button" type="button" onClick={logOut}>Log out <span aria-hidden="true">↗</span></button></div>
      </section>
      <section className="member-portal-grid" aria-label="Member portal features">
        {portalCards.map((card) => <article className="member-portal-card" key={card.label}><span className="member-portal-icon" aria-hidden="true">{card.icon}</span><p>{card.label}</p><h2>{card.title}</h2><span>{card.body}</span><b aria-hidden="true">↗</b></article>)}
      </section>
    </main>
  );
}
