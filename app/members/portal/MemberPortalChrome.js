"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "../../../lib/supabase/client";

const primaryLinks = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/members/portal" },
  { label: "Journal", href: "/journal" },
  { label: "Events", href: "/events" },
  { label: "Give", href: "/give" },
  { label: "Live", href: "/live" },
  { label: "About", href: "/about" },
  { label: "Prayer request", href: "/prayer-request" },
];

const menuLinks = [
  { label: "Home", detail: "Visit the public church site", href: "/", icon: "⌂" },
  { label: "Dashboard", detail: "Your week at a glance", href: "/members/portal", icon: "▦" },
  { label: "My profile", detail: "Name, username, password", href: "/members/portal/profile", icon: "◎" },
  { label: "My groups", detail: "Find people who walk with you", href: "/members/portal/groups", icon: "♧" },
  { label: "Church events", detail: "Gather beyond Sunday", href: "/events", icon: "□" },
  { label: "Give", detail: "Generosity in action", href: "/give", icon: "♡" },
  { label: "Journal", detail: "Read and share reflections", href: "/journal", icon: "✦" },
  { label: "Live gatherings", detail: "Watch from wherever you are", href: "/live", icon: "▶" },
  { label: "Prayer request", detail: "Ask for care and support", href: "/prayer-request", icon: "♢" },
  { label: "About Immanuel", detail: "Our church and values", href: "/about", icon: "◈" },
];

export default function MemberPortalChrome() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("member-portal-menu-open", menuOpen);
    return () => document.body.classList.remove("member-portal-menu-open");
  }, [menuOpen]);

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
    <>
      <header className="member-portal-header">
        <div className="member-portal-brand-wrap">
          <button
            className={`member-portal-menu-toggle${menuOpen ? " is-open" : ""}`}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="member-portal-drawer"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span aria-hidden="true"><i /><i /><i /></span>
            <b>{menuOpen ? "Close" : "Menu"}</b>
          </button>
          <Link className="member-portal-brand" href="/members/portal" aria-label="Immanuel member dashboard">
            <span className="member-portal-brand-mark"><Image src="/assets/immanuel-logo.png" alt="" width={36} height={36} priority /></span>
            <span className="member-portal-brand-copy"><strong>Immanuel</strong><small>Member space</small></span>
          </Link>
        </div>

        <nav className="member-portal-nav" aria-label="Member space navigation">
          {primaryLinks.map((link) => (
            <Link className={pathname === link.href ? "is-active" : ""} href={link.href} key={link.label}>{link.label}</Link>
          ))}
        </nav>

        <div className="member-portal-header-actions">
          <span className="member-portal-private-chip"><span aria-hidden="true" />Private space</span>
          <Link className="member-portal-profile-pill" href="/members/portal/profile">
            <Image src="/assets/account.png" alt="" width={20} height={20} />
            <span>Profile</span>
            <b aria-hidden="true">↗</b>
          </Link>
        </div>
      </header>

      {menuOpen && (
        <>
          <button className="member-portal-drawer-backdrop" type="button" aria-label="Close member menu" onClick={() => setMenuOpen(false)} />
          <aside className="member-portal-drawer" id="member-portal-drawer" aria-label="Member space menu">
            <div className="member-portal-drawer-head">
              <div><span className="member-portal-drawer-kicker">Your space</span><h2>Stay close to <em>home.</em></h2></div>
              <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu">×</button>
            </div>
            <nav className="member-portal-drawer-links">
              {menuLinks.map((link) => (
                <Link href={link.href} key={link.label}>
                  <span className="member-portal-drawer-icon" aria-hidden="true">{link.icon}</span>
                  <span><strong>{link.label}</strong><small>{link.detail}</small></span>
                  <b aria-hidden="true">↗</b>
                </Link>
              ))}
            </nav>
            <div className="member-portal-drawer-foot">
              <Link href="/">Visit homepage <span aria-hidden="true">↗</span></Link>
              <button type="button" onClick={logOut} disabled={isLoggingOut}>{isLoggingOut ? "Signing out…" : "Sign out"}</button>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
