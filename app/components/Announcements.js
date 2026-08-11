"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const announcements = [
  { category: "Gather", date: "Sunday · 10:00 AM", title: "A seat is waiting for you.", body: "Join the Immanuel family for worship, a message, and time to be together.", symbol: "01", tone: "gold" },
  { category: "Community", date: "Coming soon", title: "Make room for one another.", body: "A new community gathering is taking shape. Details will be shared here soon.", symbol: "02", tone: "rust" },
  { category: "Worship", date: "Coming soon", title: "Songs for the journey.", body: "Watch this space for the next Immanuel Worship night and rehearsal updates.", symbol: "03", tone: "olive" },
  { category: "Care", date: "Coming soon", title: "Small acts, lasting hope.", body: "We are preparing a practical way for our church family to care for Iligan together.", symbol: "04", tone: "ink" },
  { category: "Church family", date: "Coming soon", title: "Your story belongs here.", body: "Member stories, devotionals, and shared milestones will find a home in our journal.", symbol: "05", tone: "cream" },
];

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
                <div className="announcement-card-content">
                  <p className="announcement-date">{announcement.date}</p>
                  <h3>{announcement.title}</h3>
                  <p>{announcement.body}</p>
                  <span className="announcement-placeholder">Details will be posted here <span aria-hidden="true">↗</span></span>
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

      <p className="announcements-note">Placeholder bulletin · We’ll replace these cards with real church updates.</p>
      <span className="announcement-active-label" aria-live="polite">Now viewing: {activeAnnouncement.category}</span>
    </Reveal>
  );
}
