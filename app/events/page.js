"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import EditorialPage from "../components/EditorialPage";

const events = [
  {
    label: "Every Sunday · 9:30 AM",
    title: "Sunday Worship Celebration",
    body: "Worship, a message, and a room to meet people from the Immanuel family.",
    details: "Join us every Sunday at 9:30 AM for worship, teaching, and prayer. Come as you are—there is a seat waiting for you.",
    action: "Plan your visit",
    tone: "event-gold",
  },
  {
    label: "Read anytime",
    title: "YouVersion Bible",
    body: "Find Immanuel Church PH in the YouVersion Bible App and read along with our notes and plans.",
    details: "Our church is now on YouVersion. Scan the QR code or open the app to discover reading plans, notes, and resources from the Immanuel family.",
    action: "Learn more",
    tone: "event-rust",
    youversion: true,
  },
  {
    label: "Coming soon",
    title: "Community moments",
    body: "Prayer nights, outreach, and gatherings around Iligan City are taking shape.",
    details: "We are preparing more ways to gather throughout the year. Details will be posted here when registration opens.",
    action: "Stay connected",
    tone: "event-olive",
  },
  {
    label: "Coming soon",
    title: "Care & prayer night",
    body: "A quiet evening to bring what is heavy and pray with the church family.",
    details: "This is a placeholder for a future care gathering. Check back soon for a date and time.",
    action: "Details soon",
    tone: "event-ink",
  },
];

function EventYouVersionMedia() {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    video.muted = true;
    const play = video.play();
    if (play?.catch) play.catch(() => {});
    return () => video.pause();
  }, []);

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
    <div className="event-youversion-media">
      <div className="event-video-frame">
        <video ref={videoRef} src="/videos/YouVersion.mp4" autoPlay loop muted={muted} playsInline preload="auto" aria-label="YouVersion announcement video" />
        <button className="event-video-mute" type="button" onClick={toggleMute} aria-label={muted ? "Unmute YouVersion video" : "Mute YouVersion video"}>
          <img src={muted ? "/assets/sound-off.png" : "/assets/sound-on.png"} alt="" />
        </button>
      </div>
      <img src="/assets/YouVersion_QR.jpeg" alt="QR code for the Immanuel YouVersion page" />
    </div>
  );
}

function EventModal({ event, onClose }) {
  useEffect(() => {
    const handleKeyDown = (keyboardEvent) => {
      if (keyboardEvent.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.classList.add("event-modal-open");
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("event-modal-open");
    };
  }, [onClose]);

  const modal = (
    <div className="event-modal" role="presentation" onMouseDown={(eventTarget) => { if (eventTarget.currentTarget === eventTarget.target) onClose(); }}>
      <div className="event-modal-card" role="dialog" aria-modal="true" aria-labelledby="event-modal-title">
        <button className="event-modal-close" type="button" onClick={onClose} aria-label="Close event details">×</button>
        <div className={`event-modal-visual ${event.tone}`}>
          {event.youversion ? (
            <EventYouVersionMedia />
          ) : (
            <span aria-hidden="true">{event.title === "Sunday Worship Celebration" ? "09:30" : "✦"}</span>
          )}
        </div>
        <div className="event-modal-copy">
          <p className="route-card-tag">{event.label}</p>
          <h2 id="event-modal-title">{event.title}</h2>
          <p>{event.details}</p>
          {event.youversion ? (
            <a className="button button-light" href="https://www.youversion.com/" target="_blank" rel="noopener noreferrer">Open YouVersion <span aria-hidden="true">↗</span></a>
          ) : (
            <a className="button button-light" href="https://www.google.com/maps/search/?api=1&query=66HP%2BXM9%2C+Iligan+City%2C+Lanao+del+Norte" target="_blank" rel="noopener noreferrer">Open Google Maps <span aria-hidden="true">↗</span></a>
          )}
        </div>
      </div>
    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(modal, document.body);
}

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <EditorialPage eyebrow="Immanuel / Gatherings" title="Make room" accent="for one another." description="There is more than one way to gather. Start with a Sunday, then take the next step that feels right for you.">
      <div className="route-card-grid events-grid">
        {events.map((event, index) => (
          <button className={`route-card event-card event-card-button ${event.tone}`} key={event.title} type="button" onClick={() => setSelectedEvent(event)}>
            <span className="route-card-top"><span>{String(index + 1).padStart(2, "0")}</span><span>{event.label}</span></span>
            <h2>{event.title}</h2>
            <p>{event.body}</p>
            <span className="text-link">{event.action} <span aria-hidden="true">↗</span></span>
          </button>
        ))}
        <div className="event-grid-empty" aria-hidden="true" />
      </div>
      {selectedEvent && <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
    </EditorialPage>
  );
}
