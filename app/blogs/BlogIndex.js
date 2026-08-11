"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";

function BlogCard({ post, index, duplicate = false }) {
  return (
    <Link
      className={`blog-stream-card blog-stream-card-tone-${index % 4}`}
      href={`/journal/${post.slug}`}
      tabIndex={duplicate ? -1 : 0}
      aria-hidden={duplicate}
    >
      <span className="blog-stream-card-mark" aria-hidden="true" />
      <span className="blog-stream-card-sheen" aria-hidden="true" />
      <div className="blog-stream-card-copy">
        <h2>{post.title}</h2>
        <p>{post.excerpt}</p>
      </div>
      <footer className="blog-stream-card-footer">
        <span>By {post.author}</span>
        <span className="blog-stream-card-arrow" aria-hidden="true">↗</span>
      </footer>
    </Link>
  );
}

function BlogMarqueeRow({ row, rowIndex }) {
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const pointerRef = useRef({ id: null, startX: 0, moved: false });

  const handlePointerDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    pointerRef.current = { id: event.pointerId, startX: event.clientX, moved: false };
    event.currentTarget.setPointerCapture?.(event.pointerId);
    setIsDragging(true);
  };

  const handlePointerMove = (event) => {
    if (!isDragging || pointerRef.current.id !== event.pointerId) return;
    const delta = pointerRef.current.startX - event.clientX;
    if (Math.abs(delta) > 6) pointerRef.current.moved = true;
    setDragX(delta);
  };

  const endDrag = (event) => {
    if (pointerRef.current.id !== event.pointerId) return;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    pointerRef.current.id = null;
    setIsDragging(false);
    setDragX(0);
  };

  const handleClickCapture = (event) => {
    if (!pointerRef.current.moved) return;
    event.preventDefault();
    event.stopPropagation();
    pointerRef.current.moved = false;
  };

  return (
    <div
      className={`blog-marquee-row blog-marquee-row-${rowIndex} ${isDragging ? "is-dragging" : ""}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClickCapture={handleClickCapture}
      style={{ "--drag-x": `${dragX}px` }}
      role="group"
      aria-label={`Drag journal row ${rowIndex + 1}`}
    >
      <div className="blog-marquee-track">
        {row.map((post, index) => <BlogCard key={`${post.slug}-primary`} post={post} index={index + rowIndex} />)}
        {row.map((post, index) => <BlogCard key={`${post.slug}-duplicate`} post={post} index={index + rowIndex} duplicate />)}
      </div>
    </div>
  );
}

export default function BlogIndex({ posts }) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const filteredPosts = useMemo(() => {
    if (!normalizedQuery) return posts;
    return posts.filter((post) => [post.title, post.excerpt, post.author, post.category].join(" ").toLowerCase().includes(normalizedQuery));
  }, [normalizedQuery, posts]);

  const rows = [
    filteredPosts.filter((_, index) => index % 2 === 0),
    filteredPosts.filter((_, index) => index % 2 === 1),
  ].filter((row) => row.length > 0);

  return (
    <main id="main-content" className="blog-index-page">
      <section className="blog-index-hero">
        <div className="blog-index-hero-grid" aria-hidden="true" />
        <div className="blog-index-hero-orbit blog-index-hero-orbit-one" aria-hidden="true" />
        <div className="blog-index-hero-orbit blog-index-hero-orbit-two" aria-hidden="true" />
        <div className="blog-index-hero-inner">
          <div className="blog-index-heading">
            <div>
              <p className="blog-index-kicker"><span /> Immanuel / Journal</p>
              <h1>Words for the <em>week.</em></h1>
            </div>
            <p className="blog-index-intro">Devotionals, stories, and honest reflections from the Immanuel family — written by members, for members.</p>
          </div>

          <form className="blog-search" role="search" onSubmit={(event) => event.preventDefault()}>
            <span className="blog-search-icon" aria-hidden="true">⌕</span>
            <label className="sr-only" htmlFor="blog-search-input">Search journal</label>
            <input
              id="blog-search-input"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search a word, story, or author"
              autoComplete="off"
            />
            {query && <button className="blog-search-clear" type="button" onClick={() => setQuery("")} aria-label="Clear journal search">×</button>}
            <span className="blog-search-count">{filteredPosts.length} {filteredPosts.length === 1 ? "story" : "stories"}</span>
          </form>
        </div>
      </section>

      <section className="blog-stream" aria-label="Immanuel journal stories">
        <div className="blog-stream-heading">
          <div>
            <p className="blog-index-kicker"><span /> From the community</p>
            <h2>Keep <em>moving.</em></h2>
          </div>
          <p>Drag a row to explore. Select a card to read the full reflection.</p>
        </div>

        {rows.length > 0 ? (
          <div className="blog-marquee-stack">
            {rows.map((row, rowIndex) => (
              <BlogMarqueeRow row={row} rowIndex={rowIndex} key={`row-${rowIndex}`} />
            ))}
          </div>
        ) : (
          <div className="blog-no-results">
            <p className="blog-index-kicker"><span /> Nothing found yet</p>
            <h2>Try a different <em>word.</em></h2>
            <button className="blog-clear-filter" type="button" onClick={() => setQuery("")}>Show every story <span aria-hidden="true">↗</span></button>
          </div>
        )}

        <div className="blog-stream-footnote">
          <span>Stories are placeholders for now</span>
          <span>Member publishing arrives with the portal</span>
        </div>
      </section>
    </main>
  );
}
