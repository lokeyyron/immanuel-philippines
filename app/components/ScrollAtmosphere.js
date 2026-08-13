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
    let refreshFrame = 0;
    let previousY = window.scrollY || 0;
    const activeSections = new Set();
    const activeLiveTargets = new Set();
    const observedSections = new WeakSet();
    const observedLiveTargets = new WeakSet();
    // Route content and individual replay rows have their own reveal timing.
    // Keeping them out of the global fade prevents a row from appearing late
    // or becoming too dim while the page-level canvas moves behind it.
    const sectionSelector = ".section-reveal:not(.route-content):not(.live-replay-reveal)";
    const liveSelector = ".live-library-heading, .live-feature-card, .live-replay-reveal";

    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

    const update = () => {
      frame = 0;
      const y = window.scrollY || 0;
      const viewportHeight = window.innerHeight || 1;
      const progress = Math.min(1, y / Math.max(1, document.documentElement.scrollHeight - viewportHeight));
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

      // Keep the content in each section slightly behind the scroll plane.
      // As a section leaves through either edge, it is pulled away and fades;
      // when it comes back toward the viewport centre, it naturally returns.
      const centre = viewportHeight * 0.5;
      const travelRange = Math.max(viewportHeight * 0.78, 1);
      activeSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionCentre = rect.top + rect.height * 0.5;
        const distance = clamp((sectionCentre - centre) / travelRange, -1.15, 1.15);
        const distanceFromCentre = Math.abs(distance);
        // Keep the movement subtle at the centre, then let each section peel
        // away as it leaves the viewport. This makes the effect noticeable on
        // both downward and upward scrolls without moving the layout itself.
        const fade = clamp(1 - Math.max(0, distanceFromCentre - 0.12) * 1.2, 0.08, 1);
        const scale = 1 - Math.min(0.09, Math.max(0, distanceFromCentre - 0.08) * 0.095);
        const shift = distance * 88;
        section.style.setProperty("--parallax-shift", `${shift.toFixed(2)}px`);
        section.style.setProperty("--parallax-opacity", fade.toFixed(3));
        section.style.setProperty("--parallax-scale", scale.toFixed(3));
        section.dataset.scrollPhase = distance < -0.2 ? "leaving-up" : distance > 0.2 ? "entering-down" : "center";
      });

      // Live content follows the same plane, but with a softer fade. This
      // lets cards dissolve as they leave the viewport and return naturally
      // when the reader scrolls back to them.
      activeLiveTargets.forEach((target) => {
        const rect = target.getBoundingClientRect();
        const targetCentre = rect.top + rect.height * 0.5;
        const distance = clamp((targetCentre - centre) / Math.max(viewportHeight * 1.15, 1), -1.2, 1.2);
        const distanceFromCentre = Math.abs(distance);
        const fade = clamp(1 - Math.max(0, distanceFromCentre - 0.28) * 1.35, 0.08, 1);
        const shift = distance * 42;
        target.style.setProperty("--parallax-shift", `${shift.toFixed(2)}px`);
        target.style.setProperty("--parallax-opacity", fade.toFixed(3));
      });

      previousY = y;
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) activeSections.add(entry.target);
        else activeSections.delete(entry.target);
      });
      onScroll();
    }, { rootMargin: "70% 0px", threshold: 0 });

    const liveObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) activeLiveTargets.add(entry.target);
        else activeLiveTargets.delete(entry.target);
      });
      onScroll();
    }, { rootMargin: "70% 0px", threshold: 0 });

    const collectTargets = () => {
      document.querySelectorAll(sectionSelector).forEach((section) => {
        if (observedSections.has(section)) return;
        observedSections.add(section);
        sectionObserver.observe(section);
      });
      document.querySelectorAll(liveSelector).forEach((target) => {
        if (observedLiveTargets.has(target)) return;
        observedLiveTargets.add(target);
        liveObserver.observe(target);
      });
    };

    const mutationObserver = new MutationObserver(() => {
      if (refreshFrame) return;
      refreshFrame = window.requestAnimationFrame(() => {
        refreshFrame = 0;
        collectTargets();
      });
    });

    collectTargets();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mutationObserver.disconnect();
      sectionObserver.disconnect();
      liveObserver.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      if (refreshFrame) window.cancelAnimationFrame(refreshFrame);
    };
  }, []);

  return null;
}
