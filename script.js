(() => {
  const carousel = document.querySelector("[data-live-carousel]");
  if (!carousel) return;

  const track = carousel.querySelector(".live-track");
  const slides = [...carousel.querySelectorAll("[data-slide]")];
  const slideButtons = [...carousel.querySelectorAll("[data-slide-button]")];
  const previousButton = carousel.querySelector("[data-carousel-prev]");
  const nextButton = carousel.querySelector("[data-carousel-next]");
  const pauseButton = carousel.querySelector("[data-carousel-pause]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const autoplayDelay = 6500;
  let activeIndex = 0;
  let timer;
  let paused = reducedMotion;
  let pointerStart;
  const isVideoSlide = (index) => Boolean(slides[index]?.querySelector("iframe"));

  const stopAutoplay = () => {
    window.clearTimeout(timer);
    timer = undefined;
  };

  const updatePauseButton = () => {
    if (!pauseButton) return;
    const videoActive = isVideoSlide(activeIndex);
    pauseButton.disabled = false;
    pauseButton.setAttribute("aria-label", videoActive ? "Resume carousel" : paused ? "Play carousel" : "Pause carousel");
    const icon = pauseButton.querySelector("span");
    if (icon) icon.textContent = videoActive ? "▶" : paused ? "▶" : "Ⅱ";
  };

  const startAutoplay = () => {
    stopAutoplay();
    if (paused || reducedMotion || isVideoSlide(activeIndex)) return;
    timer = window.setTimeout(() => {
      showSlide(activeIndex + 1);
      startAutoplay();
    }, autoplayDelay);
  };

  const showSlide = (requestedIndex) => {
    activeIndex = (requestedIndex + slides.length) % slides.length;
    track.style.transform = `translateX(-${activeIndex * 100}%)`;

    slides.forEach((slide, index) => {
      const isActive = index === activeIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
      slide.inert = !isActive;
    });

    slideButtons.forEach((button, index) => {
      const isActive = index === activeIndex;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    });

    updatePauseButton();
    if (isVideoSlide(activeIndex)) stopAutoplay();
  };

  const restartAutoplay = () => {
    stopAutoplay();
    startAutoplay();
  };

  previousButton?.addEventListener("click", () => {
    showSlide(activeIndex - 1);
    restartAutoplay();
  });

  nextButton?.addEventListener("click", () => {
    showSlide(activeIndex + 1);
    restartAutoplay();
  });

  slideButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      showSlide(index);
      restartAutoplay();
    });
  });

  pauseButton?.addEventListener("click", () => {
    if (isVideoSlide(activeIndex)) {
      paused = false;
      showSlide(activeIndex + 1);
      startAutoplay();
      return;
    }
    paused = !paused;
    updatePauseButton();
    if (paused) stopAutoplay();
    else startAutoplay();
  });

  carousel.addEventListener("mouseenter", stopAutoplay);
  carousel.addEventListener("mouseleave", startAutoplay);
  carousel.addEventListener("focusin", stopAutoplay);
  carousel.addEventListener("focusout", (event) => {
    if (!carousel.contains(event.relatedTarget)) startAutoplay();
  });

  carousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showSlide(activeIndex - 1);
      restartAutoplay();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      showSlide(activeIndex + 1);
      restartAutoplay();
    }
  });

  track.addEventListener("pointerdown", (event) => {
    pointerStart = event.clientX;
  });

  track.addEventListener("pointerup", (event) => {
    if (pointerStart === undefined) return;
    const distance = event.clientX - pointerStart;
    pointerStart = undefined;
    if (Math.abs(distance) < 45) return;
    showSlide(activeIndex + (distance < 0 ? 1 : -1));
    restartAutoplay();
  });

  track.addEventListener("pointercancel", () => {
    pointerStart = undefined;
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopAutoplay();
    else startAutoplay();
  });

  const root = document.documentElement;
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  const readTheme = () => {
    try {
      return window.localStorage.getItem("immanuel-theme");
    } catch {
      return null;
    }
  };

  const setTheme = (theme) => {
    const isLight = theme === "light";
    root.dataset.theme = isLight ? "light" : "dark";
    if (themeMeta) themeMeta.setAttribute("content", isLight ? "#f3eee3" : "#0b0d0b");
    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(isLight));
      themeToggle.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
      const label = themeToggle.querySelector(".theme-toggle-label");
      const glyph = themeToggle.querySelector(".theme-glyph");
      if (label) label.textContent = isLight ? "Dark" : "Light";
      if (glyph) glyph.textContent = isLight ? "☾" : "☼";
    }
    try {
      window.localStorage.setItem("immanuel-theme", isLight ? "light" : "dark");
    } catch {
      // The theme still works when storage is unavailable.
    }
  };

  const savedTheme = readTheme();
  setTheme(savedTheme === "light" ? "light" : "dark");
  themeToggle?.addEventListener("click", () => {
    setTheme(root.dataset.theme === "light" ? "dark" : "light");
  });

  const revealSections = document.querySelectorAll("main > section:not(.hero), .site-footer");
  revealSections.forEach((section) => section.classList.add("section-reveal"));
  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealSections.forEach((section) => section.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealSections.forEach((section) => revealObserver.observe(section));
  }

  document.querySelectorAll(".path-grid").forEach((grid) => {
    const cards = [...grid.querySelectorAll(".path-card")];
    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => grid.classList.add("is-interacting"));
      card.addEventListener("mouseleave", () => {
        if (!grid.matches(":focus-within")) grid.classList.remove("is-interacting");
      });
      card.addEventListener("focusin", () => grid.classList.add("is-interacting"));
      card.addEventListener("focusout", (event) => {
        if (!grid.contains(event.relatedTarget)) grid.classList.remove("is-interacting");
      });
    });
  });

  showSlide(0);
  updatePauseButton();
  startAutoplay();
})();
