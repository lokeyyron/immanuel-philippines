"use client";

import { useEffect, useState } from "react";
import EditorialPage from "../components/EditorialPage";


const liveVideos = [
  {
    id: "6oNlRTmU66M",
    title: "Sunday Gathering — Live replay 01",
    date: "Latest live stream",
    description: "Join the Immanuel Church PH family for worship, teaching, and prayer from Iligan City.",
  },
  {
    id: "s_6YF4DI0tU",
    title: "Sunday Gathering — Live replay 02",
    date: "Previous live stream · 02",
    description: "A full Immanuel gathering to watch again, share with a friend, and carry into the week.",
  },
  {
    id: "87GR9xFP06g",
    title: "Sunday Gathering — Live replay 03",
    date: "Previous live stream · 03",
    description: "Worship, a message, and a place to slow down with the Immanuel community.",
  },
  {
    id: "U4VqD0aCtGI",
    title: "Sunday Gathering — Live replay 04",
    date: "Previous live stream · 04",
    description: "Press play for a Sunday service from Immanuel Church PH.",
  },
  {
    id: "NgUBF0z6B9Q",
    title: "Sunday Gathering — Live replay 05",
    date: "Previous live stream · 05",
    description: "Make room for worship and a timely word from the Immanuel family.",
  },
  {
    id: "GQC7AoKEugw",
    title: "Sunday Gathering — Live replay 06",
    date: "Previous live stream · 06",
    description: "A replay of our Sunday gathering, available whenever you need a moment with God.",
  },
  {
    id: "eNVMv4UEwn0",
    title: "Sunday Gathering — Live replay 07",
    date: "Previous live stream · 07",
    description: "Watch the service again and stay connected to Immanuel beyond the room.",
  },
  {
    id: "1aSxh_JJrCg",
    title: "Sunday Gathering — Live replay 08",
    date: "Previous live stream · 08",
    description: "An encouraging service from the Immanuel Church PH YouTube channel.",
  },
  {
    id: "zlswqSI0o5Q",
    title: "Sunday Gathering — Live replay 09",
    date: "Previous live stream · 09",
    description: "Worship and teaching for your everyday life, wherever you are watching from.",
  },
  {
    id: "5zBP_tOX5fU",
    title: "Sunday Gathering — Live replay 10",
    date: "Previous live stream · 10",
    description: "A previous Immanuel service, ready to revisit at your own pace.",
  },
  {
    id: "gSHd1MukCt8",
    start: 12,
    title: "Sunday Gathering — Live replay 11",
    date: "Previous live stream · 11",
    description: "The earlier replay in this collection, starting at the requested moment.",
  },
];

const youtubeChannel = "https://www.youtube.com/@ImmanuelChurchIligan";

function thumbnailFor(video) {
  return \`https://i.ytimg.com/vi/\${video.id}/hqdefault.jpg\`;
}

function watchUrlFor(video) {
  return \`https://www.youtube.com/watch?v=\${video.id}\${video.start ? \`&t=\${video.start}s\` : ""}\`;
}

function embedUrlFor(video) {
  const start = video.start ? \`&start=\${video.start}\` : "";
  return \`https://www.youtube-nocookie.com/embed/\${video.id}?rel=0&modestbranding=1&playsinline=1\${start}\`;
}

function ReplayCard({ video, index, onOpen }) {
  return (
    <button className="live-replay-card" type="button" onClick={() => onOpen(video)}>
      <span className="live-replay-image">
        <img src={thumbnailFor(video)} alt="" loading="lazy" />
        <span className="live-replay-play" aria-hidden="true">▶</span>
        <span className="live-replay-index">{String(index + 2).padStart(2, "0")}</span>
      </span>
      <span className="live-replay-body">
        <span className="live-replay-date">{video.date}</span>
        <strong>{video.title}</strong>
        <span className="live-replay-action">Watch replay <span aria-hidden="true">↗</span></span>
      </span>
    </button>
  );
}

function ReplayModal({ video, onClose }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div className="live-modal" role="presentation" onMouseDown={onClose}>
      <div className="live-modal-card" role="dialog" aria-modal="true" aria-labelledby="live-modal-title" onMouseDown={(event) => event.stopPropagation()}>
        <button className="live-modal-close" type="button" onClick={onClose} aria-label="Close replay">×</button>
        <div className="live-modal-frame">
          <iframe
            title={video.title}
            src={embedUrlFor(video)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <div className="live-modal-details">
          <p className="live-replay-date">{video.date}</p>
          <h2 id="live-modal-title">{video.title}</h2>
          <p>{video.description}</p>
          <a className="button button-light" href={watchUrlFor(video)} target="_blank" rel="noopener noreferrer">
            Open on YouTube <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function LivePage() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const latest = liveVideos[0];

  return (
    <EditorialPage
      eyebrow="Immanuel / Live"
      title="Gather"
      accent="with us."
      description="A replay library for Sunday gatherings from Immanuel Church PH — worship, listen, and pray with the church family from wherever you are."
    >
      <section className="live-library" aria-labelledby="live-library-title">
        <div className="live-library-heading">
          <div>
            <p className="route-card-tag">Latest first · {liveVideos.length} replays</p>
            <h2 id="live-library-title">Make room for <em>the replay.</em></h2>
          </div>
          <p>Choose a gathering below to watch it in a focused player. The newest stream is featured first, followed by the earlier replays in the order supplied by Immanuel.</p>
        </div>

        <article className="live-feature-card">
          <button className="live-feature-media" type="button" onClick={() => setSelectedVideo(latest)} aria-label={\`Watch \${latest.title}\`}>
            <img src={thumbnailFor(latest)} alt="Latest Immanuel Church PH live replay" />
            <span className="live-feature-wash" aria-hidden="true" />
            <span className="live-feature-play" aria-hidden="true">▶</span>
            <span className="live-feature-label">Featured replay · 01</span>
          </button>
          <div className="live-feature-copy">
            <p className="live-replay-date">{latest.date}</p>
            <h3>{latest.title}</h3>
            <p>{latest.description}</p>
            <button className="button button-light" type="button" onClick={() => setSelectedVideo(latest)}>
              Watch this replay <span aria-hidden="true">↗</span>
            </button>
          </div>
        </article>

        <div className="live-replay-list" aria-label="Earlier live replays">
          {liveVideos.slice(1).map((video, index) => <ReplayCard key={video.id} video={video} index={index} onOpen={setSelectedVideo} />)}
        </div>
      </section>

      <div className="channel-strip">
        <div>
          <p className="route-card-tag">Keep watching</p>
          <h2>Immanuel Church PH on YouTube</h2>
        </div>
        <a className="arrow-link" href={youtubeChannel} target="_blank" rel="noopener noreferrer">Visit the channel <span aria-hidden="true">↗</span></a>
      </div>

      {selectedVideo ? <ReplayModal video={selectedVideo} onClose={() => setSelectedVideo(null)} /> : null}
    </EditorialPage>
  );
}
