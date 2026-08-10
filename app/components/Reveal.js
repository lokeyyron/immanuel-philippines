"use client";

import { useEffect, useRef } from "react";

export default function Reveal({ as: Tag = "section", className = "", children, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      element.classList.add("is-visible");
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      // Remove the state as the section leaves the viewport so the entrance
      // animation can replay when the visitor scrolls back to it.
      element.classList.toggle("is-visible", entry.isIntersecting);
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <Tag ref={ref} className={`section-reveal ${className}`.trim()} {...props}>{children}</Tag>;
}
