import Link from "next/link";
import Reveal from "./Reveal";

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

      <Reveal as="section" className="live-service section section-dark" id="live-service" aria-labelledby="live-title">
        <div className="live-intro">
          <div className="section-heading">
            <p className="kicker"><span className="live-pulse" /> Live from Immanuel</p>
            <h2 id="live-title">Church doesn’t stop at <em>the room.</em></h2>
          </div>
          <p className="live-description">A live window into our Sunday gathering — worship, listen, and pray with our church family from wherever you are.</p>
        </div>
        <div className="live-player-panel">
          <div className="live-player-copy">
            <p className="slide-eyebrow"><span className="live-pulse" /> Latest gathering</p>
            <h3>Gather<br /><em>with us.</em></h3>
            <p>Press play on our latest service for worship, a message, and a moment to breathe with the Immanuel family.</p>
            <a className="button button-light" href="https://www.youtube.com/watch?v=QOHjb-_9Gbc" target="_blank" rel="noopener noreferrer">Open on YouTube <span aria-hidden="true">↗</span></a>
          </div>
          <div className="live-player-frame">
            <iframe title="Latest Immanuel Church PH live service" src="https://www.youtube-nocookie.com/embed/QOHjb-_9Gbc?rel=0&modestbranding=1&playsinline=1" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
            <p className="live-player-fallback">If the player is unavailable, <a href="https://www.youtube.com/@ImmanuelChurchIligan" target="_blank" rel="noopener noreferrer">watch the Immanuel channel</a>.</p>
          </div>
        </div>
        <div className="live-footnote"><span>Watch from anywhere</span><Link href="/live">Explore the live page <span aria-hidden="true">↗</span></Link></div>
      </Reveal>

      <Reveal as="section" className="connect section-dark section" id="connect" aria-labelledby="connect-title">
        <div className="section-heading">
          <p className="kicker"><span /> There is a place for you</p>
          <h2 id="connect-title">Take your next step.</h2>
        </div>
        <div className="path-grid">
          <article className="path-card path-featured"><p className="card-number">01</p><div><p className="card-eyebrow">Your first Sunday</p><h3>Plan a visit</h3><p>Know where to go, what to expect, and how to find us in the heart of Iligan City.</p></div><Link href="/events#visit" aria-label="Plan a visit">↗</Link></article>
          <article className="path-card"><p className="card-number">02</p><div><p className="card-eyebrow">Life together</p><h3>Find community</h3><p>Build friendships, grow in faith, and experience church beyond a Sunday gathering.</p></div><Link href="/events" aria-label="Find community">↗</Link></article>
          <article className="path-card"><p className="card-number">03</p><div><p className="card-eyebrow">Make a difference</p><h3>Serve with us</h3><p>Use your gifts to welcome people, strengthen the church, and bless our city.</p></div><Link href="/blogs" aria-label="Find ways to serve">↗</Link></article>
        </div>
      </Reveal>

      <Reveal as="section" className="messages section" id="messages" aria-labelledby="messages-title">
        <div className="message-visual" aria-hidden="true">
          <div className="message-visual-top"><span>Immanuel / Messages</span><span>01</span></div>
          <div className="message-poster"><span className="message-poster-ring" /><div className="message-poster-copy"><span>Truth for</span><em>everyday life.</em></div><span className="message-poster-mark"><img className="message-logo" src="/assets/immanuel-logo.png" alt="" /></span></div>
          <div className="message-visual-bottom"><span>Listen</span><span>Learn</span><span>Live</span></div>
        </div>
        <div className="message-copy"><p className="kicker dark"><span /> Listen and grow</p><h2 id="messages-title">A word for where you are.</h2><p>Explore biblical teaching from Immanuel designed to help you know Jesus, navigate life with wisdom, and carry hope into your week.</p><a className="button button-dark" href="https://www.youtube.com/@ImmanuelChurchIligan" target="_blank" rel="noopener noreferrer">Watch on YouTube <span aria-hidden="true">↗</span></a></div>
      </Reveal>

      <Reveal as="section" className="community" id="community" aria-labelledby="community-title">
        <div className="community-copy"><p className="kicker"><span /> More than a gathering</p><h2 id="community-title">A community shaped by <em>grace.</em></h2></div>
        <div className="community-statements">
          <Link className="community-item" href="/events"><span>Belong</span><p>Find people who will walk with you.</p><b aria-hidden="true">↗</b></Link>
          <Link className="community-item" href="/blogs"><span>Become</span><p>Grow deeper in faith and character.</p><b aria-hidden="true">↗</b></Link>
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
