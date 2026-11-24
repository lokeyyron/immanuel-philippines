"use client";
import Link from "next/link";
import Image from "next/image";
import churchPhoto from "../../public/assets/church-building.jpeg";
import pastorPhoto from "../../public/assets/ptrkhan.jpg";
import { useState } from "react";

const features = [
  { label: "Welcome home", eyebrow: "IMMANUEL CHURCH PH · ILIGAN CITY", title: <>Life is better<br />together.</>, text: "A church family in Iligan City. Following Jesus, sharing life, and making room for you.", image: "/assets/church-building.jpeg", alt: "The Immanuel church building in Iligan City", link: "/#location", action: "Join us this Sunday" },
  { label: "The message", eyebrow: "TEACHING · PASTOR KHAN SANTOS", title: <>Faith for the<br />everyday.</>, text: "Watch a message from Immanuel, or catch up on our Sunday worship celebrations.", image: "/assets/ptrkhan.jpg", alt: "Pastor Khan Santos", link: "/live", action: "Watch the messages", video: "oZOAVExNEdY" },
  { label: "Immanuel Worship", eyebrow: "MUSIC · IMMANUEL WORSHIP", title: <>A song.<br />A prayer.</>, text: "Make space for worship. Join the songs and moments from Immanuel Worship.", image: "/assets/church-building.jpeg", alt: "Immanuel Church PH", link: "https://www.youtube.com/@ImmanuelWorshipPhilippines", action: "Explore our worship", video: "MZQZTn8hsf8" },
];
export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const item = features[active];
  function select(index) { setActive(index); setPlaying(false); }
  return <section className="home-feature" aria-label="Welcome to Immanuel" id="top">
    <div className="feature-copy" key={item.label}>
      <p className="editorial-label">{item.eyebrow}</p>
      <h1>{item.title}</h1>
      <div className="feature-bottom"><p>{item.text}</p><Link className="solid-link" href={item.link}>{item.action}</Link></div>
    </div>
    <div className="feature-image">
      <Image key={item.image} src={active === 1 ? pastorPhoto : churchPhoto} alt={item.alt} fill priority placeholder="blur" sizes="(max-width: 1800px) 92vw, 1656px" />
      {playing && <iframe title={`${item.label} video`} src={`https://www.youtube-nocookie.com/embed/${item.video}?autoplay=1&mute=1&rel=0`} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />}
      {item.video ? <button type="button" className="feature-play" onClick={() => setPlaying(!playing)}>{playing ? "Close video" : "Play video"}</button> : <div className="image-caption"><span>There’s a place for you here.</span><span>Iligan City, Philippines</span></div>}
    </div>
    <div className="feature-tabs" aria-label="Featured stories">{features.map((feature, index) => <button type="button" key={feature.label} aria-pressed={active === index} onClick={() => select(index)} className={active === index ? "is-selected" : ""}>{feature.label}</button>)}</div>
    <div className="sunday-strip"><span>See you on Sunday</span><strong>9:30 AM</strong><span>2nd Floor, Rosbel Building · Iligan City</span><a href="#location">Plan your visit</a></div>
  </section>;
}
