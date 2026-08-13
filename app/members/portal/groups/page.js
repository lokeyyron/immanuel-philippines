"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "../../../../lib/supabase/client";

export default function MemberGroupsPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

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
      setReady(true);
    });
    return () => { active = false; };
  }, [router]);

  if (!ready) return <main className="member-portal-page member-portal-loading">Opening your groups…</main>;

  return (
    <main id="main-content" className="member-portal-page member-portal-placeholder-page">
      <section className="member-portal-placeholder-hero">
        <p className="kicker"><span /> Member space / Groups</p>
        <h1>Find your <em>people.</em></h1>
        <p>Groups, care circles, and shared rhythms will live here. We’re shaping a simple way to find a place to belong beyond Sunday.</p>
      </section>
      <section className="member-portal-placeholder-grid" aria-label="Groups preview">
        <article><span>01 / CELL GROUPS</span><h2>Walk together.</h2><p>Small groups will be listed here with meeting rhythm, focus, and a way to request an introduction.</p></article>
        <article><span>02 / CARE</span><h2>Be held.</h2><p>Private care pathways will help members ask for prayer or practical support from the right leader.</p></article>
        <article><span>03 / COMING SOON</span><h2>Make room.</h2><p>More community spaces are being prepared for the Immanuel family.</p></article>
      </section>
      <Link className="arrow-link" href="/members/portal">← Back to dashboard <span aria-hidden="true">↗</span></Link>
    </main>
  );
}
