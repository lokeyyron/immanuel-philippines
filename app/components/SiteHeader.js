"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/blogs", label: "Blogs" },
  { href: "/events", label: "Events" },
  { href: "/give", label: "Give" },
  { href: "/live", label: "Live" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("immanuel-theme");
    const next = saved === "light" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    setTheme(next);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("immanuel-theme", next);
    setTheme(next);
  };

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Immanuel Church PH home">
        <img src="/assets/immanuel-logo.png" alt="" />
        <span>Immanuel Church PH</span>
      </Link>

      <nav className="desktop-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <Link key={item.href} className={pathname === item.href ? "is-current" : ""} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="header-tools">
        <Link className="header-cta" href="/events#visit">
          Plan your visit <span aria-hidden="true">↗</span>
        </Link>
        <button
          className="theme-toggle"
          type="button"
          onClick={toggleTheme}
          aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          aria-pressed={theme === "light"}
        >
          <span className="theme-glyph" aria-hidden="true">{theme === "light" ? "☾" : "☼"}</span>
          <span className="theme-toggle-label">{theme === "light" ? "Dark" : "Light"}</span>
        </button>
        <button
          className="mobile-menu-button"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="menu-icon" aria-hidden="true"><i /><i /><i /></span>
        </button>
      </div>

      {menuOpen && (
        <nav className="mobile-nav-panel" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <Link key={item.href} className={pathname === item.href ? "is-current" : ""} href={item.href}>
              {item.label}<span aria-hidden="true">↗</span>
            </Link>
          ))}
          <Link href="/events#visit">Plan your visit <span aria-hidden="true">↗</span></Link>
        </nav>
      )}
    </header>
  );
}
