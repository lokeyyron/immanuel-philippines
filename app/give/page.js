import EditorialPage from "../components/EditorialPage";

export const metadata = { title: "Give · Immanuel Church PH" };

export default function GivePage() {
  return <EditorialPage eyebrow="Immanuel / Generosity" title="Give with" accent="a willing heart." description="Giving is one way we participate in God’s work. We are preparing a simple, secure giving experience for the Immanuel family.">
    <div className="give-layout">
      <article className="give-feature"><span className="give-symbol" aria-hidden="true">+</span><p className="route-card-tag">Online giving</p><h2>A generous life makes room for hope.</h2><p>Our online giving page is coming soon. Until then, connect with the church team through Facebook if you have a question about giving or an offering.</p><a className="button button-dark" href="https://www.facebook.com/immanuelchurchiligan" target="_blank" rel="noopener noreferrer">Message the church <span aria-hidden="true">↗</span></a></article>
      <aside className="give-aside"><p className="route-card-tag">A note for now</p><p>We will never ask you to share passwords, one-time codes, or private banking details through a public message.</p><span>Immanuel Church PH · Iligan City</span></aside>
    </div>
  </EditorialPage>;
}
