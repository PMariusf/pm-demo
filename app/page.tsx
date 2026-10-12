"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AylineLyricsCard from "./AylineLyricsCard";
import AylineMusicPlayer from "./AylineMusicPlayer";
import BehindSound from "./BehindSound";
import CommunityChat from "./CommunityChat";

const songs = [
  { slug: "far-from-me", title: "Far From Me" },
  { slug: "set-the-dark-on-fire", title: "Set the Dark on Fire" },
  { slug: "one-more-time", title: "One More Time" },
] as const;

const logoCropStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover" as const,
  objectPosition: "center",
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      document.documentElement.style.setProperty("--ayline-scroll", `${Math.min(window.scrollY, 650)}px`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("is-visible"); }), { threshold: 0.12 });
    rootRef.current?.querySelectorAll(".reveal").forEach(element => observer.observe(element));
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return <div className="ayline-home ayline-redesign" ref={rootRef}>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className={`header ${scrolled ? "header-scrolled" : ""}`}>
      <div className="shell header-inner">
        <a
          className="brand"
          href="#top"
          aria-label="PM’s home"
          style={{ width: 138, height: 54, overflow: "hidden", display: "block", flex: "0 0 auto" }}
        >
          <Image
            src="/images/pm-logo.png"
            alt="PM’s"
            width={300}
            height={300}
            priority
            style={logoCropStyle}
          />
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <button onClick={() => scrollTo("music")}>Music</button>
          <button onClick={() => scrollTo("lyrics")}>Lyrics</button>
          <button onClick={() => scrollTo("community")}>Feel</button>
          <button onClick={() => scrollTo("lyrics")}>Read</button>
          <button onClick={() => scrollTo("community")}>Chat</button>
          <button onClick={() => scrollTo("community")}>Discuss</button>
          <Link className="elisra-link" href="/elisra">Elísa ↗</Link>
        </nav>
      </div>
    </header>

    <main id="main">
      <section className="hero ayline-new-hero" id="top"><div className="hero-glow" aria-hidden="true"/><div className="dust" aria-hidden="true"/>
        <div className="hero-art" aria-hidden="true" />
        <video className="ayline-hero-video" autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
          <source src="/images/Ayline/Ayline-video.mp4" type="video/mp4" />
        </video>
        <div className="shell hero-content">
          <p className="hero-kicker">MUSIC · PEOPLE · WORDS · A BRIGHTER YOU</p>
          <h1 className="sr-only">Ayline</h1>
          <div style={{ width: "min(560px, 78vw)", margin: "-20px 0 -28px -34px" }}>
            <Image
              src="/images/ayline-logo.png"
              alt="Ayline"
              width={1536}
              height={1024}
              priority
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
            />
          </div>
          <p className="tagline">Live it, Feel it Be It</p>
          <p className="hero-description">Music for the quiet moments, the loud feelings<br />and everything in between.</p>
          <div className="hero-actions">
            <button className="button gold-button" onClick={() => scrollTo("music")}>▷ <strong>Music</strong></button>
            <button className="button outline-button" onClick={() => scrollTo("community")}>◯ <strong>Chat</strong></button>
          </div>
        </div>
        <div className="hero-side-note" aria-hidden="true"><em>More<br/>than<br/>Music</em><span>SAME<br/>FEELINGS<br/>DIFFERENT<br/>PEOPLE</span></div>
      </section>

      <section className="shell ayline-dashboard reveal" aria-label="Ayline music, lyrics and community">
        <article className="dashboard-card music-panel reveal" id="music">
          <div className="panel-heading"><div><h2>Music</h2><p>Discover the sound of Ayline</p></div><button onClick={() => scrollTo("lyrics")}>See All ›</button></div>
          <div className="music-panel-body">
            <div className="music-feature"><video autoPlay muted loop playsInline preload="metadata" poster="/images/Ayline/Aylina.png"><source src="/videos/Ayline/rock-singer.mp4" type="video/mp4"/></video><span className="big-play">▶</span><strong>Ayline</strong><small>PM’s artist universe</small></div>
            <div className="song-list">{songs.map(song => <div className="song-row living-track" key={song.slug}><span className="song-thumb"/><span><strong>{song.title}</strong><small>Ayline</small></span><audio controls preload="none" src={`/audio/ayline/${song.slug}.mp3`} aria-label={`Play ${song.title}`}/></div>)}</div>
          </div>
        </article>

        <article className="dashboard-card lyrics-panel reveal" id="lyrics">
          <div className="panel-heading"><div><h2>Lyrics <i>/</i> Read</h2><p>Dive deeper into the words</p></div></div>
          <AylineLyricsCard />
        </article>

        <article className="dashboard-card chat-panel reveal" id="chat">
          <div className="panel-heading"><div><h2>Chat <i>/</i> Discuss</h2><p>Real conversations. Deeper connections.</p></div></div>
          <div className="conversation-list">
            <button onClick={() => scrollTo("community")}><span className="person-avatar"/><span><strong>What does this song mean to you?</strong><small>Share your thoughts</small></span><b>›</b></button>
            <button onClick={() => scrollTo("community")}><span className="person-avatar second"/><span><strong>Favorite Ayline lyric right now?</strong><small>Talk about the words</small></span><b>›</b></button>
            <button onClick={() => scrollTo("community")}><span className="person-avatar third"/><span><strong>Songs that stay with you</strong><small>Music and memories</small></span><b>›</b></button>
          </div>
        </article>
      </section>

      <BehindSound
        artist="Ayline"
        eyebrow="Behind the Sound · 01"
        title="Born from the words."
        intro="The feeling comes first. The arrangement follows it."
        body={`Ayline started with a simple idea. I wanted to take thoughts and feelings that are hard to explain and try to turn them into words. From there, those words slowly became lyrics, and the lyrics became songs.\n\nA lot of it has been trial and error — trying different directions, changing lines, changing melodies and figuring out what actually feels right. The songs often come from things like longing, grief, love, regret and missing someone. Feelings that can be difficult to say directly, but somehow make more sense when they become part of a song.\n\nThen came the search for the right sound and the right voice. Piano, cinematic rock, slower builds and enough space for the words to breathe. I also wanted a female vocal that felt warm, emotional and slightly raspy — a voice that could carry both the softness and the heavier parts of the music.\n\nAyline grew from that process. An idea became words, the words became songs, and over time the voice, the lyrics and the music started to feel like they belonged together.`}
        details={[
          { label: "First idea", value: "Lyrics and emotion" },
          { label: "Sound", value: "Cinematic rock · piano · atmospheric" },
          { label: "Voice", value: "Warm · intimate · slightly raspy" },
          { label: "Feeling", value: "Honest · reflective · powerful" },
        ]}
      />

      <section className="community-section reveal" id="community">
        <div className="community-slideshow" aria-hidden="true">
          <div className="community-slide slide-dusk" />
          <div className="community-slide slide-dusk-sits" />
          <div className="community-slide slide-stars" />
          <div className="community-slide slide-side" />
          <div className="community-slide slide-singing" />
        </div>
        <div className="community-shade" aria-hidden="true" />
        <div className="shell community-content">
          <p className="hero-kicker">A COMMUNITY THAT FEELS</p>
          <h2>More Than Music</h2>
          <p>Share your thoughts. Find your people.<br/>Feel a little less alone.</p>
          <CommunityChat />
          <span className="community-note" aria-hidden="true">Same<br/>Songs<br/>Brighter<br/>People</span>
        </div>
      </section>
    </main>
    <footer className="footer">
      <div className="shell footer-inner">
        <Link href="/" aria-label="Ayline home" style={{ width: 154, display: "block", flex: "0 0 auto" }}>
          <Image src="/images/ayline-logo.png" alt="Ayline" width={1536} height={1024} style={{ width: "100%", height: "auto" }} />
        </Link>
        <span>Live it, Feel it Be It</span>
        <Link className="footer-artist-link" href="/elisra">Explore Elísa ↗</Link>
      </div>
    </footer>
  </div>;
}
