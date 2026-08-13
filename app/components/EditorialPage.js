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
      </Reveal>
    </main>
  );
}
