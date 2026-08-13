"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

const announcements = [
  { category: "Gather", date: "Every Sunday · 9:30 AM", title: "Sunday worship celebration.", body: "Join the Immanuel family for worship, a message, and time to be together. Everyone is welcome.", symbol: "01", tone: "gold" },
  { category: "YouVersion", date: "Read anytime", title: "Find Immanuel on YouVersion.", body: "Our church is now on the YouVersion Bible App. Read notes, follow along, and carry the Word into your week.", symbol: "02", tone: "youversion", youversion: true },
  { category: "Worship", date: "Coming soon", title: "Songs for the journey.", body: "Watch this space for the next Immanuel Worship night and rehearsal updates.", symbol: "03", tone: "olive" },
  { category: "Care", date: "Coming soon", title: "Small acts, lasting hope.", body: "We are preparing a practical way for our church family to care for Iligan together.", symbol: "04", tone: "ink" },
  { category: "Church family", date: "Coming soon", title: "Your story belongs here.", body: "Member stories, devotionals, and shared milestones will find a home in our journal.", symbol: "05", tone: "cream" },
];

function YouVersionMedia({ active }) {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    if (!active) {
      video.pause();
      return undefined;
    }
    video.muted = true;
    setMuted(true);
    const play = video.play();
    if (play?.catch) play.catch(() => {});
    return undefined;
  }, [active]);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !muted;
    video.muted = nextMuted;
    setMuted(nextMuted);
    if (!nextMuted) {
      const play = video.play();
      if (play?.catch) play.catch(() => {});
    }
  };

  return (
    <div className="announcement-youversion-media">
      <div className="announcement-video-frame">
        <video
          ref={videoRef}
          src={active ? "/videos/YouVersion.mp4" : undefined}
          autoPlay={active}
          loop
          muted={muted}
          playsInline
          preload={active ? "metadata" : "none"}
          aria-label="YouVersion announcement video"
        />
        <button className="announcement-video-mute" type="button" onClick={toggleMute} aria-label={muted ? "Unmute YouVersion video" : "Mute YouVersion video"}>
          <img src={muted ? "/assets/sound-off.png" : "/assets/sound-on.png"} alt="" />
        </button>
      </div>
      <img className="announcement-youversion-qr" src="/assets/YouVersion_QR.jpeg" alt="QR code to open Immanuel Church PH on YouVersion" loading="lazy" />
    </div>
  );
}

export default function Announcements() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeAnnouncement = announcements[activeIndex];

  const selectAnnouncement = (nextIndex) => {
    setActiveIndex((nextIndex + announcements.length) % announcements.length);
  };

  return (
    <Reveal as="section" className="announcements section section-dark" id="announcements" aria-labelledby="announcements-title">
      <div className="announcements-heading">
        <div className="section-heading">
          <p className="kicker"><span /> Announcements</p>
          <h2 id="announcements-title">What’s <em>happening.</em></h2>
        </div>
      </div>

      <div className="announcement-carousel" role="region" aria-roledescription="carousel" aria-label="Church announcements">
        <div className="announcement-viewport">
          <div className="announcement-track" id="announcement-track" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
            {announcements.map((announcement, index) => (
              <article className={`announcement-card announcement-card-${announcement.tone}`} key={announcement.symbol} aria-hidden={index !== activeIndex}>
                <div className="announcement-card-meta"><span>{announcement.symbol} / 05</span><span>{announcement.category}</span></div>
                <div className={`announcement-card-content${announcement.youversion ? " has-youversion" : ""}`}>
                  <div>
                    <p className="announcement-date">{announcement.date}</p>
                    <h3>{announcement.title}</h3>
                    <p>{announcement.body}</p>
                  </div>
                  {announcement.youversion && (
                    <YouVersionMedia active={index === activeIndex} />
                  )}
                </div>
                <div className="announcement-card-art" aria-hidden="true"><span>{announcement.symbol}</span><i /><i /><i /></div>
              </article>
            ))}
          </div>
        </div>
        <div className="announcement-controls">
          <div className="announcement-dots" role="tablist" aria-label="Choose an announcement">
            {announcements.map((announcement, index) => (
              <button key={announcement.symbol} type="button" role="tab" aria-selected={index === activeIndex} aria-label={`Show announcement ${index + 1}`} className={index === activeIndex ? "is-active" : ""} onClick={() => selectAnnouncement(index)}><span /></button>
            ))}
          </div>
          <div className="announcement-arrows">
            <button type="button" aria-label="Previous announcement" onClick={() => selectAnnouncement(activeIndex - 1)}>←</button>
            <span>{String(activeIndex + 1).padStart(2, "0")} / {String(announcements.length).padStart(2, "0")}</span>
            <button type="button" aria-label="Next announcement" onClick={() => selectAnnouncement(activeIndex + 1)}>→</button>
          </div>
        </div>
      </div>

      <p className="announcements-note">More church updates will be added here as the calendar grows.</p>
      <span className="announcement-active-label" aria-live="polite">Now viewing: {activeAnnouncement.category}</span>
    </Reveal>
  );
}
