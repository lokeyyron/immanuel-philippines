import Link from "next/link";
import EditorialPage from "../components/EditorialPage";
import { events } from "./data";

export const metadata = {
  title: "Events · Immanuel Church PH",
  description: "Gather with the Immanuel Church PH family in Iligan City.",
};

export default function EventsPage() {
  return (
    <EditorialPage
      eyebrow="Immanuel / Gatherings"
      title="Make room"
      accent="for one another."
      description="There is more than one way to gather. Start with a Sunday, then take the next step that feels right for you."
    >
      <div className="route-card-grid events-grid" aria-label="Immanuel events">
        {events.map((event) => (
          <Link className={`route-card event-card event-card-link ${event.tone}`} href={`/events/${event.slug}`} key={event.slug}>
            <span className="route-card-top">
              {event.number ? <span>{event.number}</span> : <span aria-hidden="true" />}
              <span>{event.label}</span>
            </span>
            <h2>{event.title}</h2>
            <p>{event.body}</p>
            <span className="text-link">{event.action} <span aria-hidden="true">↗</span></span>
          </Link>
        ))}
      </div>
    </EditorialPage>
  );
}
