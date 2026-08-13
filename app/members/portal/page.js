"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "../../../lib/supabase/client";

const portalCards = [
  { label: "My groups", title: "Find your people", body: "Cell groups, care updates, and conversations between Sundays.", icon: "♧", status: "Coming soon", href: "/members/portal/groups" },
  { label: "Events", title: "Make room to gather", body: "See upcoming church moments and save your place when sign-ups are connected.", icon: "□", status: "Coming soon", href: "/events" },
  { label: "Journal", title: "Share a reflection", body: "Write a devotional or story for the Immanuel family to read and carry.", icon: "✦", status: "Coming soon", href: "/journal" },
  { label: "Giving", title: "See your giving history", body: "A private record of gifts and receipts once online giving is connected.", icon: "♡", status: "Planned", href: "/give" },
  { label: "Profile", title: "Keep your details close", body: "Update your display name, username, and password in one place.", icon: "◎", status: "Available", href: "/members/portal/profile" },
  { label: "Care", title: "Ask for prayer", body: "Share a care request with the right church leader, privately and thoughtfully.", icon: "✧", status: "Planned", href: "/prayer-request" },
];

export default function MemberPortalPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    let active = true;
    const supabase = createClient();

    if (!supabase) {
      router.replace("/members?setup=1");
      return () => { active = false; };
    }

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!active) return;
      if (!user) {
        router.replace("/members?redirected=1");
        return;
      }
      setUser(user);
      setReady(true);
    });

    return () => { active = false; };
  }, [router]);

  if (!ready) return <main className="member-portal-page member-portal-loading" aria-live="polite">Opening your member space…</main>;

  const logOut = async () => {
    const supabase = createClient();
    if (!supabase) {
      router.replace("/members");
      return;
    }
    setIsLoggingOut(true);
    await supabase.auth.signOut();
    router.replace("/members");
    router.refresh();
  };

  return (
    <main id="main-content" className="member-portal-page">
      <section className="member-portal-hero" id="member-portal-overview">
        <div><p className="kicker"><span /> Immanuel / Member portal</p><h1>Good to see you, <em>{user?.user_metadata?.display_name || "family"}.</em></h1></div>
        <div className="member-portal-hero-actions"><span className="member-preview-badge">Preview space</span><p>A gentle home base for groups, gatherings, stories, and care.</p><div className="member-portal-hero-buttons"><Link className="member-profile-link button" href="/members/portal/profile">Profile <span aria-hidden="true">◎</span></Link><button className="member-logout button" type="button" onClick={logOut} disabled={isLoggingOut}>{isLoggingOut ? "Signing out…" : "Log out"} <span aria-hidden="true">↗</span></button></div></div>
      </section>

      <section className="member-portal-quick-actions" aria-label="Member quick actions">
        <div className="member-portal-quick-intro"><span className="member-portal-card-label">Made for the in-between</span><p>Small ways to stay connected between Sundays.</p></div>
        <Link href="/members/portal/groups"><span aria-hidden="true">♧</span><strong>Find my people</strong><b aria-hidden="true">↗</b></Link>
        <Link href="/events"><span aria-hidden="true">□</span><strong>See what’s next</strong><b aria-hidden="true">↗</b></Link>
        <Link href="/journal"><span aria-hidden="true">✦</span><strong>Read a reflection</strong><b aria-hidden="true">↗</b></Link>
        <Link href="/prayer-request"><span aria-hidden="true">♡</span><strong>Ask for prayer</strong><b aria-hidden="true">↗</b></Link>
        <Link href="/give"><span aria-hidden="true">＋</span><strong>Give securely</strong><b aria-hidden="true">↗</b></Link>
      </section>

      <section className="member-portal-week" aria-labelledby="member-portal-week-title">
        <div className="member-portal-section-head"><div><p className="kicker"><span /> This week</p><h2 id="member-portal-week-title">Stay close to <em>home.</em></h2></div><span className="member-portal-section-note">A quick glance</span></div>
        <div className="member-portal-week-grid">
          <article><span className="member-portal-card-label">Next gathering</span><h3>Sunday worship</h3><p>Come as you are. There’s a seat waiting for you.</p><strong>Sunday · 9:30 AM</strong></article>
          <article><span className="member-portal-card-label">Journal prompt</span><h3>What is God teaching you?</h3><p>Read a reflection or make room for your own story.</p><strong>Read &amp; reflect ↗</strong></article>
          <article id="member-portal-care"><span className="member-portal-card-label">Care corner</span><h3>Need prayer?</h3><p>A future private path to ask for support from the church family.</p><strong>Coming soon</strong></article>
        </div>
      </section>

      <section className="member-portal-grid" id="member-portal-space" aria-labelledby="member-portal-space-title">
        <div className="member-portal-grid-heading"><p className="kicker"><span /> Your space</p><h2 id="member-portal-space-title">Everything that helps you <em>belong.</em></h2></div>
        <div className="member-portal-card-grid">
          {portalCards.map((card) => {
            const content = <><div className="member-portal-card-top"><span className="member-portal-icon" aria-hidden="true">{card.icon}</span><span className="member-portal-card-status">{card.status}</span></div><p>{card.label}</p><h3>{card.title}</h3><span>{card.body}</span><b aria-hidden="true">↗</b></>;
            return <Link className="member-portal-card" href={card.href} key={card.label}>{content}</Link>;
          })}
        </div>
      </section>
      <section className="member-portal-activity" aria-labelledby="member-portal-activity-title">
        <div>
          <p className="kicker"><span /> A quiet pulse</p>
          <h2 id="member-portal-activity-title">Keep a little room<br /><em>for one another.</em></h2>
        </div>
        <div className="member-portal-activity-list">
          <div><span>01</span><p><strong>Sunday gathering</strong><small>New replay and notes will appear here.</small></p><b aria-hidden="true">↗</b></div>
          <div><span>02</span><p><strong>Journal prompt</strong><small>What is God teaching you this week?</small></p><b aria-hidden="true">↗</b></div>
          <div><span>03</span><p><strong>Care circle</strong><small>Private prayer requests are coming soon.</small></p><b aria-hidden="true">↗</b></div>
        </div>
      </section>
      <p className="member-portal-footer-note">This preview is intentionally private-by-design. Real accounts, records, and publishing permissions will be connected before launch.</p>
    </main>
  );
}
