"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const slides = [
  {
    id: "welcome",
    eyebrow: "A church community in Iligan City",
    title: <><span>You are</span><em>welcome here.</em></>,
    description: "Come as you are and discover a community following Jesus, growing in faith, and living with purpose together.",
    cta: "Join us in person",
    href: "/events#visit",
    kind: "local",
    src: "/videos/intro.mp4",
    poster: "/assets/church-building.jpeg",
  },
  {
    id: "sermon",
    eyebrow: "Pastor Khan Santos",
    title: <><span>Watch the</span><em>latest sermon.</em></>,
    description: "A message for the ordinary week — biblical teaching, honest questions, and hope to carry with you.",
    cta: "Watch latest sermon",
    href: "https://www.youtube.com/watch?v=oZOAVExNEdY&t=8s",
    kind: "youtube",
    videoId: "oZOAVExNEdY",
    start: 8,
    poster: "/assets/ptrkhan.jpg",
  },
  {
    id: "worship",
    eyebrow: "Immanuel Worship",
    title: <><span>Make room</span><em>for worship.</em></>,
    description: "Sing along with the Immanuel Worship family and let a little more room open up for God in your day.",
    cta: "Watch Immanuel Worship",
    href: "https://www.youtube.com/@ImmanuelWorshipPhilippines",
    kind: "youtube",
    videoId: "MZQZTn8hsf8",
    poster: null,
  },
];

function youtubeUrl(videoId, start = 0) {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    enablejsapi: "1",
  });
  if (start) params.set("start", String(start));
  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}

function ActionLink({ href, children }) {
  const isInternal = href.startsWith("/");
  if (isInternal) return <Link className="button button-light" href={href}>{children} <span aria-hidden="true">↗</span></Link>;
  return <a className="button button-light" href={href} target="_blank" rel="noopener noreferrer">{children} <span aria-hidden="true">↗</span></a>;
}

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [introFailed, setIntroFailed] = useState(false);
  const videoRef = useRef(null);
  const iframeRefs = useRef({});
  const activeSlide = slides[activeIndex];

  useEffect(() => {
    setRevealed(false);
    setIsPlaying(false);
    setMuted(true);
    setIntroFailed(false);
    const timer = window.setTimeout(() => setRevealed(true), 3000);
    return () => window.clearTimeout(timer);
  }, [activeIndex]);

  useEffect(() => {
    if (!revealed || activeSlide.kind !== "local" || introFailed) return;
    const playPromise = videoRef.current?.play();
    if (!playPromise) return;
    playPromise.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  }, [activeSlide.kind, activeIndex, revealed, introFailed]);

  useEffect(() => {
    if (revealed && activeSlide.kind === "youtube") setIsPlaying(true);
  }, [activeSlide.kind, activeIndex, revealed]);

  useEffect(() => {
    if (hovered) return;
    const timer = window.setTimeout(() => setActiveIndex((index) => (index + 1) % slides.length), 10500);
    return () => window.clearTimeout(timer);
  }, [activeIndex, hovered]);

  const selectSlide = useCallback((nextIndex) => {
    setActiveIndex((nextIndex + slides.length) % slides.length);
  }, []);

  const toggleMute = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    if (activeSlide.kind === "local" && videoRef.current) {
      videoRef.current.muted = nextMuted;
      return;
    }
    const iframe = iframeRefs.current[activeSlide.id];
    iframe?.contentWindow?.postMessage(JSON.stringify({ event: "command", func: nextMuted ? "mute" : "unMute", args: [] }), "*");
  };

  const togglePlayback = () => {
    if (activeSlide.kind === "local" && introFailed) return;
    const nextPlaying = !isPlaying;
    setRevealed(true);
    setIsPlaying(nextPlaying);

    if (activeSlide.kind === "local") {
      const video = videoRef.current;
      if (nextPlaying) video?.play().catch(() => setIsPlaying(false));
      else video?.pause();
      return;
    }

    const iframe = iframeRefs.current[activeSlide.id];
    iframe?.contentWindow?.postMessage(JSON.stringify({ event: "command", func: nextPlaying ? "playVideo" : "pauseVideo", args: [] }), "*");
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectSlide(activeIndex - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectSlide(activeIndex + 1);
    }
  };

  return (
    <section className="hero hero-carousel" id="top" aria-labelledby="hero-title">
      <div
        className="hero-stage"
        tabIndex={0}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onKeyDown={handleKeyDown}
      >
        <div className="hero-carousel-viewport" aria-live="polite">
          <div className="hero-carousel-track" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
            {slides.map((slide, index) => {
              const isActive = index === activeIndex;
              const showPlayback = isActive && revealed && !introFailed;
              const showPoster = isActive && (!revealed || (slide.kind === "local" && introFailed));
              return (
                <article className={`hero-slide ${isActive ? "is-active" : ""} ${isActive && isPlaying ? "is-playing" : ""}`} key={slide.id} aria-hidden={!isActive}>
                  <div className="hero-slide-media">
                    <div className={`hero-media-layer ${slide.poster ? "has-poster" : "is-abstract"}`}>
                      {slide.kind === "local" ? (
                        <video
                          ref={isActive ? videoRef : undefined}
                          className="hero-media-video"
                          src={slide.src}
                          poster={slide.poster}
                          muted={muted}
                          loop
                          playsInline
                          preload={isActive ? "metadata" : "none"}
                          autoPlay={showPlayback}
                          onError={() => { setIntroFailed(true); setIsPlaying(false); }}
                          aria-label="Immanuel Church PH intro video"
                        />
                      ) : (
                        <iframe
                          ref={(node) => { iframeRefs.current[slide.id] = node; }}
                          className="hero-media-video"
                          title={`${slide.eyebrow} video`}
                          src={showPlayback ? youtubeUrl(slide.videoId, slide.start) : undefined}
                          loading={isActive ? "eager" : "lazy"}
                          allow="autoplay; encrypted-media; picture-in-picture"
                          allowFullScreen
                        />
                      )}

                      {showPoster && (
                        <button className={`hero-media-poster ${introFailed ? "is-static" : ""}`} type="button" disabled={introFailed} onClick={() => setRevealed(true)} aria-label={`Play ${slide.eyebrow} video`}>
                          {slide.poster ? <img src={slide.poster} alt="" /> : <span className="hero-abstract-poster" aria-hidden="true"><i /><i /><i /></span>}
                          <span className="hero-poster-shade" aria-hidden="true" />
                        </button>
                      )}

                      {isActive && (slide.kind === "youtube" || !introFailed) && (
                        <div className="hero-media-controls">
                          <button className="hero-playback-control" type="button" onClick={togglePlayback} aria-label={isPlaying ? "Pause video" : "Play video"} aria-pressed={isPlaying}>
                            <img className="hero-playback-icon" src={isPlaying ? "/assets/pause.png" : "/assets/play.png"} alt="" draggable="false" />
                          </button>
                          <button className="hero-sound-control" type="button" onClick={toggleMute} aria-label={muted ? "Unmute video" : "Mute video"} aria-pressed={!muted}>
                            <span className={`volume-mark ${muted ? "is-muted" : ""}`} aria-hidden="true">◖</span>
                            <span>{muted ? "Sound off" : "Sound on"}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="hero-slide-overlay" aria-hidden="true" />
                  <div className="hero-slide-topline"><span>{String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span><span>{slide.kind === "local" ? "Immanuel original" : "YouTube video"}</span></div>
                  <div className="hero-slide-content">
                    <div className="hero-slide-heading">
                      <p className="kicker"><span /> {slide.eyebrow}</p>
                      <h1 id={isActive ? "hero-title" : undefined}>{slide.title}</h1>
                    </div>
                    <div className="hero-slide-footer">
                      <p>{slide.description}</p>
                      <ActionLink href={slide.href}>{slide.cta}</ActionLink>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="hero-carousel-controls">
          <div className="hero-carousel-dots" role="tablist" aria-label="Choose a homepage video">
            {slides.map((slide, index) => (
              <button key={slide.id} className={index === activeIndex ? "is-active" : ""} type="button" role="tab" aria-selected={index === activeIndex} aria-label={`Show ${slide.eyebrow}`} onClick={() => selectSlide(index)}><span /></button>
            ))}
          </div>
          <div className="hero-carousel-arrows">
            <button type="button" aria-label="Previous homepage video" onClick={() => selectSlide(activeIndex - 1)}>←</button>
            <button type="button" aria-label="Next homepage video" onClick={() => selectSlide(activeIndex + 1)}>→</button>
          </div>
        </div>
      </div>
    </section>
  );
}
