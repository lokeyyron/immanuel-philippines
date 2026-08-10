import EditorialPage from "../components/EditorialPage";

export const metadata = { title: "Members · Immanuel Church PH" };

export default function MembersPage() {
  return <EditorialPage eyebrow="Immanuel / Members" title="A place to" accent="belong together." description="The Immanuel member space is taking shape. We will share a simple, secure way to connect with your church family here soon.">
    <div className="route-card-grid members-grid">
      <article className="route-card">
        <div className="route-card-top"><span>01</span><span>Coming soon</span></div>
        <p className="route-card-tag">Member space</p>
        <h2>Stay close to the family.</h2>
        <p>Devotionals, group updates, and church news will have a home here as the site grows.</p>
        <span className="route-card-arrow" aria-hidden="true">↗</span>
      </article>
      <article className="route-card">
        <div className="route-card-top"><span>02</span><span>For our people</span></div>
        <p className="route-card-tag">A thoughtful beginning</p>
        <h2>Built with care.</h2>
        <p>We are designing this space around privacy, clarity, and meaningful connection.</p>
        <span className="route-card-arrow" aria-hidden="true">↗</span>
      </article>
    </div>
  </EditorialPage>;
}
