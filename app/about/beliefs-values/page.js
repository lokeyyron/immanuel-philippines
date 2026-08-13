import Link from "next/link";
import Reveal from "../../components/Reveal";

export const metadata = {
  title: "Beliefs & values · Immanuel Church PH",
  description: "The beliefs and values that guide life together at Immanuel Church PH.",
};

const values = [
  ["Jesus at the center", "We look to Jesus as our hope, our example, and the one who brings us together."],
  ["Grace for the journey", "We make room for questions, growth, and the patient work of becoming more like Christ."],
  ["People over performance", "We choose presence, honesty, and care over appearances or striving."],
  ["Hope for Iligan", "We want the good news to become tangible through how we serve our city and neighbors."],
];

export default function BeliefsValuesPage() {
  return (
    <main id="main-content" className="about-page route-main">
      <Reveal as="section" className="about-hero route-hero beliefs-hero">
        <div className="route-hero-orbit" aria-hidden="true" />
        <p className="kicker"><span /> Immanuel / Beliefs &amp; values</p>
        <h1>What holds us <em>together.</em></h1>
        <p className="route-hero-description">A few convictions that shape the way we worship, care for people, and live as a church family.</p>
      </Reveal>
      <Reveal as="section" className="about-content route-content beliefs-content">
        <div className="beliefs-intro"><p className="kicker"><span /> A shared way</p><h2>Faith becomes real when we <em>live it.</em></h2><p>These are not a test to pass. They are invitations—simple practices that help us keep Jesus at the center and keep making room for people.</p></div>
        <div className="beliefs-list">
          {values.map(([title, body], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{body}</p></div><b aria-hidden="true">↗</b></article>)}
        </div>
        <div className="route-back"><Link className="arrow-link" href="/about">Back to Immanuel Church <span aria-hidden="true">↗</span></Link></div>
      </Reveal>
    </main>
  );
}
