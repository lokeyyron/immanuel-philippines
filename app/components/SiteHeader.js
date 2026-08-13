"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/journal", label: "Journal" },
  { href: "/events", label: "Events" },
  { href: "/give", label: "Give" },
  { href: "/live", label: "Live" },
  { href: "/about", label: "About" },
  { href: "/prayer-request", label: "Prayer request" },
];

const involvedItems = [
  { href: "/", label: "Home", description: "A place to worship, connect, and grow.", icon: "⌂" },
  { href: "/journal", label: "Journal", description: "Devotionals and stories from our family.", icon: "✦" },
  { href: "/events", label: "Events", description: "Meaningful experiences throughout the year.", icon: "□" },
  { href: "/give", label: "Give", description: "A simple way to practice generosity.", icon: "♡" },
  { href: "/live", label: "Live", description: "Join us from wherever you are.", icon: "▷" },
  { href: "/prayer-request", label: "Prayer request", description: "A quiet place to ask for care.", icon: "♧" },
];

const aboutItems = [
  { href: "/about", label: "Immanuel Church", description: "Our story, people, and place in Iligan.", icon: "⌂" },
  { href: "/about/beliefs-values", label: "Beliefs & values", description: "The convictions that shape our life together.", icon: "✧" },
];

const ministryItems = [
  { href: "/about#ministries", label: "Placeholder 01", description: "Ministry details will be added soon.", icon: "◎" },
  { href: "/about#ministries", label: "Placeholder 02", description: "Ministry details will be added soon.", icon: "✧" },
  { href: "/about#ministries", label: "Placeholder 03", description: "Ministry details will be added soon.", icon: "◈" },
];

function MenuSection({ title, items, pathname }) {
  return (
    <section className="site-menu-section">
      <h3>{title}</h3>
      <div className="site-menu-items">
        {items.map((item) => (
          <Link key={`${title}-${item.label}`} className={pathname === item.href ? "is-current" : ""} href={item.href}>
            <span className="site-menu-item-icon" aria-hidden="true">{item.icon}</span>
            <span className="site-menu-item-copy"><strong>{item.label}</strong><small>{item.description}</small></span>
            <span className="site-menu-item-arrow" aria-hidden="true">↗</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.classList.add("menu-open");
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("menu-open");
    };
  }, [menuOpen]);

  return (
    <>
      <header className={`site-header ${menuOpen ? "menu-is-open" : ""}`}>
      <div className="site-brand-cluster">
        <button
          className="menu-trigger"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="menu-icon" aria-hidden="true"><i /><i /><i /></span>
        </button>
        <Link className="brand" href="/" aria-label="Immanuel Church PH home">
          <img src="/assets/immanuel-logo.png" alt="" />
          <span>Immanuel Church PH</span>
        </Link>
      </div>

      <nav className="desktop-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <Link key={item.href} className={pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href)) ? "is-current" : ""} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="header-tools">
        <Link className="header-cta header-member-cta" href="/members/portal" aria-label="Members">
          <img src="/assets/account.png" alt="" />
          <span>Members</span>
          <span aria-hidden="true">↗</span>
        </Link>
      </div>

      </header>
      {menuOpen && (
        <>
          <button className="site-menu-scrim" type="button" aria-label="Close navigation" onClick={() => setMenuOpen(false)} />
          <aside className="site-menu-panel" aria-label="Church menu">
            <div className="site-menu-panel-head">
              <div><p className="site-menu-kicker">Immanuel Church PH</p><h2>Get involved</h2></div>
              <button className="site-menu-close" type="button" aria-label="Close navigation" onClick={() => setMenuOpen(false)}>×</button>
            </div>
            <MenuSection title="Explore" items={involvedItems} pathname={pathname} />
            <MenuSection title="About" items={aboutItems} pathname={pathname} />
            <MenuSection title="Ministries" items={ministryItems} pathname={pathname} />
            <div className="site-menu-issue">
              <span className="site-menu-item-icon" aria-hidden="true">!</span>
              <span><strong>Notice an issue?</strong><small>Tell us so we can fix it.</small></span>
              <a href="mailto:hello@immanuelphilippines.church?subject=Website%20issue" aria-label="Report a website issue">↗</a>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
