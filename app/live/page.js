"use client";

import { useEffect, useState } from "react";
import EditorialPage from "../components/EditorialPage";
import Reveal from "../components/Reveal";


const liveVideos = [
  {
    id: "gSHd1MukCt8",
    start: 12,
    title: "GALATIANS Part 2 | Ptr. Khan Santos",
    date: "August 9, 2026",
    description: "A Sunday gathering from Immanuel Church PH with worship, teaching, and prayer from Iligan City.",
  },
  {
    id: "5zBP_tOX5fU",
    title: "Stepping out of the Comfort Zone | Ptr. Gemma Santos",
    date: "July 26, 2026",
    description: "A full Immanuel gathering to watch again, share with a friend, and carry into the week.",
  },
  {
    id: "zlswqSI0o5Q",
    title: "Stepping out of the Comfort Zone | Ptr. Gemma Santos",
    date: "July 26, 2026",
    description: "Worship, a message, and a place to slow down with the Immanuel community.",
  },
  {
    id: "1aSxh_JJrCg",
    title: "After Obedience | Ptr. Khan Santos",
    date: "July 19, 2026",
    description: "A Sunday service from the Immanuel family, available to revisit whenever you need a moment with God.",
  },
  {
    id: "eNVMv4UEwn0",
    title: "After Obedience | Ptr. Khan Santos",
    date: "July 19, 2026",
    description: "Make room for worship and a timely word from the Immanuel family.",
  },
  {
    id: "GQC7AoKEugw",
    title: "James The Just | Ptr. Khan Santos",
    date: "July 12, 2026",
    description: "A replay of our Sunday gathering, available whenever you need a moment with God.",
  },
  {
    id: "NgUBF0z6B9Q",
    title: "Church Part 4 | Ptr. Khan Santos",
    date: "July 5, 2026",
    description: "Watch the service again and stay connected to Immanuel beyond the room.",
  },
  {
    id: "U4VqD0aCtGI",
    title: "The Gospel",
    date: "June 28, 2026",
    description: "An encouraging service from the Immanuel Church PH YouTube channel.",
  },
  {
    id: "87GR9xFP06g",
    title: "The Gospel | Ptr. Nellie Bunao",
    date: "June 28, 2026",
    description: "Worship and teaching for your everyday life, wherever you are watching from.",
  },
  {
    id: "s_6YF4DI0tU",
    title: "Father's Sunday Celebration",
    date: "June 21, 2026",
    description: "A previous Immanuel service, ready to revisit at your own pace.",
  },
  {
    id: "6oNlRTmU66M",
    title: "Church Part 3 | Ptr. Khan Santos",
    date: "June 14, 2026",
    description: "The earliest replay in this collection, starting with a message from Ptr. Khan Santos.",
  },
];

const youtubeChannel = "https://www.youtube.com/@ImmanuelChurchIligan";

function thumbnailFor(video) {
  return `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
}

function watchUrlFor(video) {
  return `https://www.youtube.com/watch?v=${video.id}${video.start ? `&t=${video.start}s` : ""}`;
}

function embedUrlFor(video) {
  const start = video.start ? `&start=${video.start}` : "";
  return `https://www.youtube-nocookie.com/embed/${video.id}?rel=0&modestbranding=1&playsinline=1${start}`;
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
        <time className="live-replay-date" dateTime={video.date}>{video.date}</time>
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
          <time className="live-replay-date" dateTime={video.date}>{video.date}</time>
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
          <p>Choose a gathering below to watch it in a focused player. The newest stream is featured first, followed by earlier replays from newest to oldest.</p>
        </div>

        <article className="live-feature-card">
          <button className="live-feature-media" type="button" onClick={() => setSelectedVideo(latest)} aria-label={`Watch ${latest.title}`}>
            <img src={thumbnailFor(latest)} alt="Latest Immanuel Church PH live replay" />
            <span className="live-feature-wash" aria-hidden="true" />
            <span className="live-feature-play" aria-hidden="true">▶</span>
          </button>
          <div className="live-feature-copy">
            <time className="live-replay-date" dateTime={latest.date}>{latest.date}</time>
            <h3>{latest.title}</h3>
            <p>{latest.description}</p>
            <button className="button button-light" type="button" onClick={() => setSelectedVideo(latest)}>
              Watch this replay <span aria-hidden="true">↗</span>
            </button>
          </div>
        </article>

        <div className="live-replay-list" aria-label="Earlier live replays">
          {liveVideos.slice(1).map((video, index) => (
            <Reveal as="div" className="live-replay-reveal" key={video.id}>
              <ReplayCard video={video} index={index} onOpen={setSelectedVideo} />
            </Reveal>
          ))}
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
