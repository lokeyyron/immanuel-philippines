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

  const stopAutoplay = () => {
    window.clearTimeout(timer);
    timer = undefined;
  };

  const updatePauseButton = () => {
    if (!pauseButton) return;
    pauseButton.setAttribute("aria-label", paused ? "Play carousel" : "Pause carousel");
    const icon = pauseButton.querySelector("span");
    if (icon) icon.textContent = paused ? "▶" : "Ⅱ";
  };

  const startAutoplay = () => {
    stopAutoplay();
    if (paused || reducedMotion) return;
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

  showSlide(0);
  updatePauseButton();
  startAutoplay();
})();
