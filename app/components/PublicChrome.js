"use client";

import { usePathname } from "next/navigation";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

/**
 * The public site and the member space intentionally use different chrome.
 * Keeping this switch in one client component lets the nested portal layout
 * own its header/footer without duplicating the whole Next.js root layout.
 */
export default function PublicChrome({ children }) {
  const pathname = usePathname();

  // Render the page while the pathname is resolving, but keep the public
  // chrome out of the private portal route entirely.
  if (!pathname || pathname.startsWith("/members/portal")) return children;

  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
