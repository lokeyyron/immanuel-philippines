import Link from "next/link";
import { notFound } from "next/navigation";
import EditorialPage from "../../components/EditorialPage";
import { events, getEvent } from "../data";

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

function YouVersionDetailMedia() {
  return (
    <div className="event-detail-youversion-media">
      <video src="/videos/YouVersion.mp4" autoPlay loop muted playsInline preload="metadata" aria-label="YouVersion announcement video" />
      <img src="/assets/YouVersion_QR.jpeg" alt="QR code for the Immanuel YouVersion page" />
    </div>
  );
}

function PlaceholderDetailMedia({ event }) {
  return (
    <div className={`event-detail-art ${event.tone}`} aria-hidden="true">
      <span>{event.kind === "visit" ? "09:30" : "✦"}</span>
    </div>
  );
}

export default async function EventDetailPage({ params }) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();

  return (
    <EditorialPage eyebrow={`Immanuel / ${event.label}`} title={event.title} accent="" description={event.details}>
      <article className={`event-detail-card ${event.tone}`}>
        {event.kind === "youversion" ? <YouVersionDetailMedia /> : <PlaceholderDetailMedia event={event} />}
        <div className="event-detail-copy">
          <p className="route-card-tag">{event.label}</p>
          <h2>{event.title}</h2>
          <p>{event.details}</p>
          {event.kind === "visit" && (
            <a className="button button-light" href="https://www.google.com/maps/search/?api=1&query=66HP%2BXM9%2C+Iligan+City%2C+Lanao+del+Norte" target="_blank" rel="noopener noreferrer">
              Open Google Maps <span aria-hidden="true">↗</span>
            </a>
          )}
          {event.kind === "youversion" && (
            <a className="button button-light" href="https://www.youversion.com/" target="_blank" rel="noopener noreferrer">
              Open YouVersion <span aria-hidden="true">↗</span>
            </a>
          )}
          {event.kind === "placeholder" && <span className="event-detail-coming-soon">More details will be posted here.</span>}
        </div>
      </article>
      <Link className="text-link event-detail-back" href="/events">All events <span aria-hidden="true">↗</span></Link>
    </EditorialPage>
  );
}
