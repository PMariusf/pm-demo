"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AylineLyricsCard from "./AylineLyricsCard";
import BehindSound from "./BehindSound";
import CommunityChat from "./CommunityChat";
import FooterContact from "./FooterContact";
import { LanguageToggle, T } from "./LanguageContext";

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
    <a className="skip-link" href="#main"><T en="Skip to content" no="Hopp til innhold" /></a>
    <header className={`header ${scrolled ? "header-scrolled" : ""}`}>
      <div className="shell header-inner">
        <a
          className="brand"
          href="#top"
          aria-label="PM’s home"
          style={{ width: 138, height: 54, overflow: "hidden", display: "block", flex: "0 0 auto" }}
        >
          <Image src="/images/pm-logo.png" alt="PM’s" width={300} height={300} priority style={logoCropStyle} />
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <button onClick={() => scrollTo("music")}><T en="Music" no="Musikk" /></button>
          <button onClick={() => scrollTo("lyrics")}><T en="Lyrics" no="Tekster" /></button>
          <button onClick={() => scrollTo("community")}><T en="Feel" no="Følelser" /></button>
          <button onClick={() => scrollTo("community")}><T en="Chat" no="Chat" /></button>
          <Link className="elisra-link" href="/elisra">Elísa ↗</Link>
        </nav>
        <LanguageToggle className="language-toggle" />
      </div>
    </header>

    <main id="main">
      <section className="hero ayline-new-hero" id="top"><div className="hero-glow" aria-hidden="true"/><div className="dust" aria-hidden="true"/>
        <div className="hero-art" aria-hidden="true" />
        <video className="ayline-hero-video" autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
          <source src="/images/Ayline/Ayline-video.mp4" type="video/mp4" />
        </video>
        <div className="shell hero-content">
          <h1 className="sr-only">Ayline</h1>
          <div className="ayline-hero-logo">
            <Image src="/images/ayline-logo.png" alt="Ayline" width={1536} height={1024} priority style={{ width: "100%", height: "auto", objectFit: "contain" }} />
          </div>
          <p className="tagline">Live it, Feel it Be It</p>
          <p className="hero-description">
            <T
              en={<>Music for the quiet moments, the loud feelings<br />and everything in between.</>}
              no={<>Musikk for de stille øyeblikkene, de sterke følelsene<br />og alt imellom.</>}
            />
          </p>
          <div className="hero-actions">
            <button className="button gold-button" onClick={() => scrollTo("music")}>▷ <strong><T en="Music" no="Musikk" /></strong></button>
            <button className="button outline-button" onClick={() => scrollTo("community")}>◯ <strong>Chat</strong></button>
          </div>
        </div>
        <div className="hero-side-note" aria-hidden="true"><em>More<br/>than<br/>Music</em><span>SAME<br/>FEELINGS<br/>DIFFERENT<br/>PEOPLE</span></div>
      </section>

      <section className="shell ayline-dashboard reveal" aria-label="Ayline music, lyrics and community">
        <article className="dashboard-card music-panel reveal" id="music">
          <div className="panel-heading"><div><h2><T en="Music" no="Musikk" /></h2><p><T en="Discover the sound of Ayline" no="Oppdag lyden av Ayline" /></p></div><button onClick={() => scrollTo("lyrics")}><T en="See All ›" no="Se alle ›" /></button></div>
          <div className="music-panel-body">
            <div className="music-feature"><video autoPlay muted loop playsInline preload="metadata" poster="/images/Ayline/Aylina.png"><source src="/videos/Ayline/rock-singer.mp4" type="video/mp4"/></video><span className="big-play">▶</span><strong>Ayline</strong><small>PM’s artist universe</small></div>
            <div className="song-list">{songs.map(song => <div className="song-row living-track" key={song.slug}><span className="song-thumb"/><span><strong>{song.title}</strong><small>Ayline</small></span><audio controls preload="none" src={`/audio/ayline/${song.slug}.mp3`} aria-label={`Play ${song.title}`}/></div>)}</div>
          </div>
        </article>

        <article className="dashboard-card lyrics-panel reveal" id="lyrics">
          <div className="panel-heading"><div><h2><T en="Lyrics / Read" no="Tekster / Les" /></h2><p><T en="Dive deeper into the words" no="Gå dypere inn i ordene" /></p></div></div>
          <AylineLyricsCard />
        </article>

        <article className="dashboard-card chat-panel reveal" id="chat">
          <div className="panel-heading"><div><h2><T en="Chat / Discuss" no="Chat / Diskuter" /></h2><p><T en="Real conversations. Deeper connections." no="Ekte samtaler. Dypere forbindelser." /></p></div></div>
          <div className="conversation-list">
            <button onClick={() => scrollTo("community")}><span className="person-avatar"/><span><strong><T en="What does this song mean to you?" no="Hva betyr denne sangen for deg?" /></strong><small><T en="Share your thoughts" no="Del tankene dine" /></small></span><b>›</b></button>
            <button onClick={() => scrollTo("community")}><span className="person-avatar second"/><span><strong><T en="Favorite Ayline lyric right now?" no="Favorittlinje fra Ayline akkurat nå?" /></strong><small><T en="Talk about the words" no="Snakk om ordene" /></small></span><b>›</b></button>
            <button onClick={() => scrollTo("community")}><span className="person-avatar third"/><span><strong><T en="Songs that stay with you" no="Sanger som blir værende" /></strong><small><T en="Music and memories" no="Musikk og minner" /></small></span><b>›</b></button>
          </div>
        </article>
      </section>

      <BehindSound
        artist="Ayline"
        eyebrow={<T en="Behind the Sound · 01" no="Bak lyden · 01" />}
        title={<T en="Born from the words." no="Født fra ordene." />}
        intro={<T en="The feeling comes first. The arrangement follows it." no="Følelsen kommer først. Arrangementet følger etter." />}
        body={<T
          en={<>Ayline started with a simple idea. I wanted to take thoughts and feelings that are hard to explain and try to turn them into words. From there, those words slowly became lyrics, and the lyrics became songs.\n\nA lot of it has been trial and error — trying different directions, changing lines, changing melodies and figuring out what actually feels right. The songs often come from things like longing, grief, love, regret and missing someone. Feelings that can be difficult to say directly, but somehow make more sense when they become part of a song.\n\nThen came the search for the right sound and the right voice. Piano, cinematic rock, slower builds and enough space for the words to breathe. I also wanted a female vocal that felt warm, emotional and slightly raspy — a voice that could carry both the softness and the heavier parts of the music.\n\nAyline grew from that process. An idea became words, the words became songs, and over time the voice, the lyrics and the music started to feel like they belonged together.</>}
          no={<>Ayline startet med en enkel idé. Jeg ønsket å ta tanker og følelser som kan være vanskelige å forklare, og prøve å gjøre dem om til ord. Derfra ble ordene gradvis til sangtekster, og tekstene ble til sanger.\n\nMye av prosessen har vært prøving og feiling — ulike retninger, endring av linjer, melodier og jakten på det som faktisk føles riktig. Sangene kommer ofte fra savn, sorg, kjærlighet, anger og det å mangle noen. Følelser som kan være vanskelige å si rett ut, men som på en eller annen måte gir mer mening når de blir en del av en sang.\n\nSå kom jakten på riktig uttrykk og riktig stemme. Piano, cinematisk rock, langsomme oppbygginger og nok rom til at ordene kan puste. Jeg ønsket også en kvinnelig vokal som føltes varm, emosjonell og litt raspete — en stemme som kunne bære både det myke og det tyngre i musikken.\n\nAyline vokste ut av denne prosessen. En idé ble til ord, ordene ble til sanger, og etter hvert begynte stemmen, tekstene og musikken å føles som om de hørte sammen.</>}
        />}
        details={[
          { key: "idea", label: <T en="First idea" no="Første idé" />, value: <T en="Lyrics and emotion" no="Tekst og følelser" /> },
          { key: "sound", label: <T en="Sound" no="Lyd" />, value: <T en="Cinematic rock · piano · atmospheric" no="Cinematisk rock · piano · atmosfærisk" /> },
          { key: "voice", label: <T en="Voice" no="Stemme" />, value: <T en="Warm · intimate · slightly raspy" no="Varm · nær · litt raspete" /> },
          { key: "feeling", label: <T en="Feeling" no="Følelse" />, value: <T en="Honest · reflective · powerful" no="Ærlig · reflektert · kraftfull" /> },
        ]}
      />

      <section className="community-section reveal" id="community">
        <div className="community-slideshow" aria-hidden="true"><div className="community-slide slide-dusk" /><div className="community-slide slide-dusk-sits" /><div className="community-slide slide-stars" /><div className="community-slide slide-side" /><div className="community-slide slide-singing" /></div>
        <div className="community-shade" aria-hidden="true" />
        <div className="shell community-content">
          <p className="hero-kicker"><T en="A COMMUNITY THAT FEELS" no="ET FELLESSKAP SOM FØLER" /></p>
          <h2><T en="More Than Music" no="Mer enn musikk" /></h2>
          <p><T en={<>Share your thoughts. Find your people.<br/>Feel a little less alone.</>} no={<>Del tankene dine. Finn menneskene dine.<br/>Føl deg litt mindre alene.</>} /></p>
          <CommunityChat />
          <span className="community-note" aria-hidden="true">Same<br/>Songs<br/>Brighter<br/>People</span>
        </div>
      </section>
    </main>
    <footer className="footer">
      <div className="shell footer-inner">
        <Link href="/" aria-label="Ayline home" style={{ width: 154, display: "block", flex: "0 0 auto" }}><Image src="/images/ayline-logo.png" alt="Ayline" width={1536} height={1024} style={{ width: "100%", height: "auto" }} /></Link>
        <span>Live it, Feel it Be It</span>
        <Link className="footer-artist-link" href="/elisra"><T en="Explore Elísa ↗" no="Utforsk Elísa ↗" /></Link>
      </div>
      <div className="shell" style={{ paddingTop: 16, paddingBottom: 18 }}><FooterContact /></div>
    </footer>
  </div>;
}
