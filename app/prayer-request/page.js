"use client";

import { useState } from "react";
import Reveal from "../components/Reveal";

const requestTypes = [
  { icon: "♧", title: "I have a prayer request", value: "prayer" },
  { icon: "?", title: "I have a question", value: "question" },
  { icon: "♙", title: "I’d like to share my story", value: "story" },
];

export default function PrayerRequestPage() {
  const [selectedType, setSelectedType] = useState("prayer");
  const [submitted, setSubmitted] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main id="main-content" className="prayer-request-page route-main">
      <Reveal as="section" className="prayer-request-hero route-hero">
        <div className="route-hero-orbit" aria-hidden="true" />
        <p className="kicker"><span /> Immanuel / Care</p>
        <h1>We’re here for <em>you.</em></h1>
        <p className="route-hero-description">Have a question, need support, or just want to connect? Let us know how we can help.</p>
      </Reveal>
      <Reveal as="section" className="prayer-request-content route-content">
        <div className="prayer-request-type-block"><h2>How can we help?</h2><div className="prayer-request-types">{requestTypes.map((type) => <button className={selectedType === type.value ? "is-selected" : ""} type="button" onClick={() => { setSelectedType(type.value); setSubmitted(false); }} key={type.value}><span aria-hidden="true">{type.icon}</span><strong>{type.title}</strong></button>)}</div></div>
        <form className="prayer-request-form" onSubmit={submit}>
          <div className="prayer-request-form-heading"><p className="kicker"><span /> {selectedType === "prayer" ? "Private care" : "We’d love to hear from you"}</p><h2>{selectedType === "prayer" ? "Prayer request" : selectedType === "question" ? "Your question" : "Your story"}</h2></div>
          <label htmlFor="prayer-message">How can we help you today? <span>*</span></label>
          <textarea id="prayer-message" name="message" placeholder={selectedType === "prayer" ? "Share as much as you feel comfortable sharing." : "Write a few words and we’ll get back to you."} required />
          <div className="prayer-contact-grid"><label htmlFor="prayer-name">First name <span>*</span><input id="prayer-name" name="firstName" placeholder="First name" required /></label><label htmlFor="prayer-last-name">Last name <span>*</span><input id="prayer-last-name" name="lastName" placeholder="Last name" required /></label></div>
          <label htmlFor="prayer-email">Email address <span>*</span><input id="prayer-email" name="email" type="email" placeholder="you@example.com" required /></label>
          <label htmlFor="prayer-phone">Phone number <small>optional</small><input id="prayer-phone" name="phone" type="tel" placeholder="09XX XXX XXXX" /></label>
          {submitted && <p className="prayer-request-success" role="status">Thank you for trusting us with this. A member of the church team will follow up soon.</p>}
          <button className="button button-light prayer-request-submit" type="submit">Send securely <span aria-hidden="true">↗</span></button>
          <p className="prayer-request-privacy">Your message is a placeholder for now. When connected, it will be shared only with the appropriate church care team.</p>
        </form>
      </Reveal>
    </main>
  );
}
