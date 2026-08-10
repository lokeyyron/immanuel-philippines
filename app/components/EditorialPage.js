import Link from "next/link";
import Reveal from "./Reveal";

export default function EditorialPage({ eyebrow, title, accent, description, children }) {
  return (
    <main id="main-content" className="route-main">
      <Reveal as="section" className="route-hero">
        <div className="route-hero-orbit" aria-hidden="true" />
        <p className="kicker"><span /> {eyebrow}</p>
        <h1>{title} <em>{accent}</em></h1>
        <p className="route-hero-description">{description}</p>
      </Reveal>
      <Reveal as="section" className="route-content">
        {children}
        <div className="route-back"><Link className="arrow-link" href="/">Back home <span aria-hidden="true">↗</span></Link></div>
      </Reveal>
    </main>
  );
}
