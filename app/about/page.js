import Link from "next/link";
import Reveal from "../components/Reveal";

export const metadata = {
  title: "About Immanuel Church PH",
  description: "Learn about Immanuel Church PH, our story, and how we live as a church family in Iligan City.",
};

export default function AboutPage() {
  return (
    <main id="main-content" className="about-page route-main">
      <Reveal as="section" className="about-hero route-hero">
        <div className="route-hero-orbit" aria-hidden="true" />
        <p className="kicker"><span /> Immanuel Church PH / About</p>
        <h1>There is room for <em>you.</em></h1>
        <p className="route-hero-description">We are a church community in Iligan City learning to follow Jesus with open hands, honest questions, and room for one another.</p>
      </Reveal>

      <Reveal as="section" className="about-content route-content">
        <div className="about-story-grid">
          <div>
            <p className="kicker"><span /> Immanuel Church</p>
            <h2>A church for the <em>whole week.</em></h2>
          </div>
          <div className="about-story-copy">
            <p>Immanuel means “God with us.” We gather in Iligan City to worship, listen, grow, and practice the good news together. Our Sunday gathering is a starting point—not the finish line.</p>
            <p>Whether you are finding a church for the first time or looking for a place to serve, you are welcome to take a next step at your own pace.</p>
            <div className="about-story-links"><Link className="button button-light" href="/events">Plan a visit <span aria-hidden="true">↗</span></Link><Link className="text-link" href="/about/beliefs-values">Beliefs &amp; values <span aria-hidden="true">↗</span></Link></div>
          </div>
        </div>

        <div className="about-pillars" id="ministries">
          <article><span>01</span><h3>Be present</h3><p>We make room for worship, questions, and the ordinary moments where faith takes root.</p></article>
          <article><span>02</span><h3>Belong together</h3><p>We believe people grow through honest relationships, shared tables, and care that continues between Sundays.</p></article>
          <article><span>03</span><h3>Bring hope</h3><p>We serve our city with the gifts, time, and kindness God has already placed in our hands.</p></article>
        </div>

        <div className="about-visit-strip"><div><p className="route-card-tag">Find us in Iligan City</p><h2>66HP+XM9</h2><p>2nd Floor, Rosbel Building · Benito Labao, corner Zamora Street</p></div><a className="button button-light" href="https://www.google.com/maps/search/?api=1&query=66HP%2BXM9%2C+Iligan+City%2C+Lanao+del+Norte" target="_blank" rel="noopener noreferrer">Open Google Maps <span aria-hidden="true">↗</span></a></div>
      </Reveal>
    </main>
  );
}
