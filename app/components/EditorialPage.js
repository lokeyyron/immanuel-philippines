import Link from "next/link";

export default function EditorialPage({ eyebrow, title, accent, description, children }) {
  return (
    <main id="main-content" className="route-main">
      <section className="route-hero">
        <div className="route-hero-orbit" aria-hidden="true" />
        <p className="kicker"><span /> {eyebrow}</p>
        <h1>{title} <em>{accent}</em></h1>
        <p className="route-hero-description">{description}</p>
      </section>
      <section className="route-content">
        {children}
        <div className="route-back"><Link className="arrow-link" href="/">Back home <span aria-hidden="true">↗</span></Link></div>
      </section>
    </main>
  );
}
