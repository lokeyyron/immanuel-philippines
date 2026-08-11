import Link from "next/link";
import Reveal from "./Reveal";
import Announcements from "./Announcements";

export default function HomeSections() {
  return (
    <>
      <Reveal as="section" className="welcome section" id="welcome" aria-labelledby="welcome-title">
        <div className="section-label"><span>01</span><p>Welcome home</p></div>
        <div className="welcome-copy">
          <h2 id="welcome-title">Faith becomes real when we live it <em>together.</em></h2>
          <div className="welcome-support">
            <p>Immanuel Church PH is a place to worship, ask honest questions, build meaningful relationships, and become who God is calling you to be.</p>
            <Link className="arrow-link" href="/events">Find your next step <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </Reveal>

      <Announcements />

      <Reveal as="section" className="blog-spotlight section section-dark" id="journal" aria-labelledby="journal-title">
        <div className="blog-intro">
          <div className="section-heading">
            <p className="kicker"><span className="live-pulse" /> From the community</p>
            <h2 id="journal-title">Words for the <em>week.</em></h2>
          </div>
        </div>
        <div className="blog-card-grid">
          <Link className="blog-card blog-card-featured" href="/journal">
            <span className="blog-card-index">01 / DEVOTIONAL</span>
            <div>
              <p className="blog-card-kicker">A quiet place to begin</p>
              <h3>Carry grace into Monday.</h3>
              <p>Short reflections from our church family to help you listen, learn, and live the Word.</p>
            </div>
            <span className="blog-card-arrow" aria-hidden="true">↗</span>
          </Link>
          <Link className="blog-card" href="/journal">
            <span className="blog-card-index">02 / STORY</span>
            <div>
              <h3>What God is teaching us.</h3>
              <p>Read a testimony, a question, or a small faithful step from someone in the community.</p>
            </div>
            <span className="blog-card-arrow" aria-hidden="true">↗</span>
          </Link>
          <Link className="blog-card" href="/journal">
            <span className="blog-card-index">03 / NOTES</span>
            <div>
              <h3>Save this for later.</h3>
              <p>Explore messages and notes you can return to throughout the week.</p>
            </div>
            <span className="blog-card-arrow" aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="blog-footnote"><span>Written by Immanuel people</span><Link href="/journal">Explore the journal <span aria-hidden="true">↗</span></Link></div>
      </Reveal>

      <Reveal as="section" className="community" id="community" aria-labelledby="community-title">
        <div className="community-copy"><p className="kicker"><span /> More than a gathering</p><h2 id="community-title">A community shaped by <em>grace.</em></h2></div>
        <div className="community-statements">
          <Link className="community-item" href="/events"><span>Belong</span><p>Find people who will walk with you.</p><b aria-hidden="true">↗</b></Link>
          <Link className="community-item" href="/journal"><span>Become</span><p>Grow deeper in faith and character.</p><b aria-hidden="true">↗</b></Link>
          <Link className="community-item" href="/give"><span>Build</span><p>Bring hope to families and our city.</p><b aria-hidden="true">↗</b></Link>
        </div>
      </Reveal>

      <Reveal as="section" className="location section" id="location" aria-labelledby="location-title">
        <div className="section-heading location-heading"><p className="kicker dark"><span /> Visit Immanuel</p><h2 id="location-title">There’s a seat for you.</h2></div>
        <div className="location-layout">
          <figure className="building-card"><img src="/assets/church-building.jpeg" alt="Immanuel Church PH building in Iligan City" /><figcaption>Our home in Iligan City</figcaption></figure>
          <div className="visit-card"><p className="visit-label">Find us here</p><address>2nd Floor, Rosbel Building<br />Benito Labao, corner Zamora Street<br />Iligan City</address><p className="plus-code">Plus Code: 66HP+XM9</p><a className="button button-light" href="https://www.google.com/maps/search/?api=1&query=66HP%2BXM9%2C+Iligan+City%2C+Lanao+del+Norte" target="_blank" rel="noopener noreferrer">Open Google Maps <span aria-hidden="true">↗</span></a></div>
          <div className="map-card"><iframe title="Map showing Immanuel Church PH in Iligan City" src="https://www.google.com/maps?q=66HP%2BXM9%2C%20Iligan%20City%2C%20Lanao%20del%20Norte&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
        </div>
      </Reveal>
    </>
  );
}
