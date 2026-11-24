import Link from "next/link";
import Announcements from "./Announcements";

export default function HomeSections() {
  return <>
    <section className="home-intro editorial-section" aria-labelledby="welcome-title">
      <p className="editorial-label">GOD WITH US.</p>
      <div><h2 id="welcome-title">A place to know Jesus.<br /><span>And people who know your name.</span></h2><div className="intro-detail"><p>We gather on Sundays, but church is more than a day of the week. It’s learning to follow Jesus and walking through life together, right here in Iligan.</p><Link className="text-link" href="/about">Get to know Immanuel</Link></div></div>
    </section>
    <Announcements />
    <section className="home-journal editorial-section" aria-labelledby="journal-title">
      <div className="journal-cover"><span className="editorial-label">THE IMMANUEL</span><span className="journal-word">Journal<span>.</span></span><div className="journal-cover-bottom"><span>Faith. Life. In our own words.</span><span>Iligan City, PH</span></div></div>
      <div className="journal-copy"><p className="editorial-label">FROM OUR CHURCH FAMILY</p><h2 id="journal-title">Room for<br />reflection.</h2><p>Devotionals, stories, and notes for the week. A place to pause and think about what God is teaching us.</p><Link className="solid-link" href="/journal">Read the journal</Link><div className="journal-note">Have something to share?<br /><Link href="/members/portal">Visit the member portal</Link></div></div>
    </section>
    <section className="home-care editorial-section"><p className="editorial-label">WE’RE HERE FOR YOU</p><h2>You don’t have to<br />carry it alone.</h2><div><p>Whatever this week looks like, we would love to pray with you.</p><Link className="text-link" href="/prayer-request">Share a prayer request</Link></div></section>
    <section className="home-visit editorial-section" id="location" aria-labelledby="visit-title">
      <div className="visit-heading"><p className="editorial-label">COME AS YOU ARE</p><h2 id="visit-title">See you<br />this Sunday.</h2><p className="visit-time">Sunday worship celebration <strong>9:30 AM</strong></p><address>2nd Floor, Rosbel Building<br />Benito Labao, corner Zamora Street<br />Iligan City</address><a className="solid-link" href="https://www.google.com/maps/search/?api=1&query=66HP%2BXM9%2C+Iligan+City%2C+Lanao+del+Norte" target="_blank" rel="noopener noreferrer">Get directions</a></div>
      <div className="visit-map"><iframe title="Immanuel Church PH location in Iligan City" src="https://www.google.com/maps?q=66HP%2BXM9%2C%20Iligan%20City%2C%20Lanao%20del%20Norte&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><span>Our home in Iligan City</span></div>
    </section>
  </>;
}
