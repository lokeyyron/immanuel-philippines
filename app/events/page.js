import EditorialPage from "../components/EditorialPage";

export const metadata = { title: "Events · Immanuel Church PH" };

const events = [
  { label: "Every Sunday", title: "Sunday gathering", body: "Worship, a message, and space to meet people from the Immanuel family.", action: "Plan your visit" },
  { label: "Throughout the week", title: "Life together", body: "Find a small way to connect, pray, serve, and grow beyond a Sunday gathering.", action: "Ask about groups" },
  { label: "Coming soon", title: "Community moments", body: "Watch this space for prayer nights, outreach, and gatherings around Iligan City.", action: "Stay connected" },
];

export default function EventsPage() {
  return <EditorialPage eyebrow="Immanuel / Gatherings" title="Make room" accent="for one another." description="There is more than one way to gather. Start with a Sunday, then take the next step that feels right for you.">
    <div className="route-card-grid events-grid">
      {events.map((event, index) => <article className="route-card event-card" key={event.title}><div className="route-card-top"><span>{String(index + 1).padStart(2, "0")}</span><span>{event.label}</span></div><h2>{event.title}</h2><p>{event.body}</p><a className="text-link" href="https://www.facebook.com/immanuelchurchiligan" target="_blank" rel="noopener noreferrer">{event.action} <span aria-hidden="true">↗</span></a></article>)}
    </div>
    <div className="visit-route-card" id="visit"><div><p className="route-card-tag">Visit us in person</p><h2>66HP+XM9, Iligan City</h2><p>2nd Floor, Rosbel Building · Benito Labao, corner Zamora Street · Iligan City</p></div><a className="button button-light" href="https://www.google.com/maps/search/?api=1&query=66HP%2BXM9%2C+Iligan+City%2C+Lanao+del+Norte" target="_blank" rel="noopener noreferrer">Open Google Maps <span aria-hidden="true">↗</span></a></div>
  </EditorialPage>;
}
