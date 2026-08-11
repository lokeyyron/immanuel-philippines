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
      if (!entry.isIntersecting) return;
      // Prime the section once. Its foreground motion after that is driven
      // continuously by ScrollAtmosphere instead of replaying a keyframe.
      element.classList.add("is-visible");
      observer.disconnect();
    // Start just before a section enters the viewport so the motion feels
    // attached to the scroll instead of arriving after the content is visible.
    }, { threshold: 0.03, rootMargin: "0px 0px 20% 0px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <Tag ref={ref} className={`section-reveal ${className}`.trim()} {...props}>{children}</Tag>;
}
