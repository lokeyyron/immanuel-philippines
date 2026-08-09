import EditorialPage from "../components/EditorialPage";

export const metadata = { title: "Live · Immanuel Church PH" };

export default function LivePage() {
  return <EditorialPage eyebrow="Immanuel / Live" title="Gather" accent="with us." description="A live window into our Sunday gathering — worship, listen, and pray with the Immanuel family from wherever you are.">
    <div className="live-route-player"><div className="live-route-frame"><iframe title="Latest Immanuel Church PH live service" src="https://www.youtube-nocookie.com/embed/QOHjb-_9Gbc?rel=0&modestbranding=1&playsinline=1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div><div className="live-route-copy"><p className="route-card-tag">Latest gathering</p><h2>Church doesn’t stop at <em>the room.</em></h2><p>Press play for worship, a message, and a moment to breathe with the Immanuel family.</p><a className="button button-light" href="https://www.youtube.com/@ImmanuelChurchIligan" target="_blank" rel="noopener noreferrer">Open the YouTube channel <span aria-hidden="true">↗</span></a></div></div>
    <div className="channel-strip"><div><p className="route-card-tag">Keep watching</p><h2>Immanuel Church PH on YouTube</h2></div><a className="arrow-link" href="https://www.youtube.com/@ImmanuelChurchIligan" target="_blank" rel="noopener noreferrer">Visit the channel <span aria-hidden="true">↗</span></a></div>
  </EditorialPage>;
}
