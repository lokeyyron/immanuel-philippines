"use client";

import { useEffect } from "react";

/**
 * Gives the shared dark canvas a gentle, scroll-linked parallax drift.
 * The work is throttled to animation frames so it stays lightweight on phones.
 */
export default function ScrollAtmosphere() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return undefined;

    let frame = 0;
    let previousY = window.scrollY || 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY || 0;
      const progress = Math.min(1, y / Math.max(1, document.documentElement.scrollHeight - window.innerHeight));
      const direction = y < previousY ? "up" : y > previousY ? "down" : "idle";
      const wave = Math.sin(y / 680);
      const ambientX = wave * 34 + progress * 18;
      const ambientY = Math.min(125, y * 0.045);
      const gridY = y * -0.028;

      document.documentElement.style.setProperty("--scroll-progress", progress.toFixed(4));
      document.documentElement.style.setProperty("--ambient-x", `${ambientX.toFixed(2)}px`);
      document.documentElement.style.setProperty("--ambient-y", `${ambientY.toFixed(2)}px`);
      document.documentElement.style.setProperty("--grid-y", `${gridY.toFixed(2)}px`);
      document.documentElement.dataset.scrollDirection = direction;
      previousY = y;
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
