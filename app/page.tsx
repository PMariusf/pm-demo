"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

type Section = "Music" | "Lyrics" | "Feel" | "Read" | "Chat" | "Discuss";
const sections: Section[] = ["Music", "Lyrics", "Feel", "Read", "Chat", "Discuss"];
const details: Record<Section, string> = {
  Music: "A space for the songs. The player will be connected when audio files are ready.",
  Lyrics: "The words behind the music. Song lyrics will be added here.",
  Feel: "The emotion, the images, and the atmosphere behind every track.",
  Read: "Stories, notes and the moments that inspired the music.",
  Chat: "Try the chat layout below. This demo does not send or save messages online.",
  Discuss: "Try the discussion layout below. Posts exist only until you reload this page.",
};

// Fixed integer heights ensure identical server and client markup during hydration.
const waveHeights = [8, 21, 15, 30, 11, 25, 18, 29, 9, 26, 12, 23, 16, 29, 11, 24, 18, 31, 12, 25, 9, 22, 17, 28, 10, 25, 16, 30, 13, 26, 8, 23, 15, 20];

function Lines({ count = 4 }: { count?: number }) {
  return <div className="lines" aria-hidden="true">{Array.from({ length: count }, (_, i) => <span key={i} style={{ width: `${88 - (i % 3) * 16}%` }} />)}</div>;
}

function Preview({ section }: { section: Section }) {
  if (section === "Music") return <div className="preview music-preview"><div className="preview-image singer-image"><span className="round-play">▶</span></div><div className="wave" aria-hidden="true">{waveHeights.map((height, i) => <i key={i} style={{ height: `${height}px` }} />)}</div>{[0, 1, 2].map(i => <div className="track" key={i}><span className="track-avatar"/><span className="track-line"/><span>▷</span></div>)}</div>;
  if (section === "Lyrics") return <div className="preview"><div className="preview-image notebook-image"/><Lines count={5}/></div>;
  if (section === "Feel") return <div className="preview portrait-preview" role="img" aria-label="Atmospheric illustrated singer portrait"/>;
  if (section === "Read") return <div className="preview"><div className="preview-image notebook-image read-image"/><Lines count={4}/></div>;
  if (section === "Chat") return <div className="preview chat-preview" aria-hidden="true"><div className="chat-bubble"><span className="avatar"/><Lines count={2}/></div><div className="chat-bubble reply"><Lines count={2}/></div><div className="chat-bubble"><span className="avatar"/><Lines count={2}/></div><span className="fake-input">➤</span></div>;
  return <div className="preview discussion-preview" aria-hidden="true">{[0, 1, 2, 3].map(i => <div className="discussion-row" key={i}><span className="discussion-avatar"/><Lines count={2}/></div>)}</div>;
}

export default function Home() {
  const [active, setActive] = useState<Section>("Music");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [post, setPost] = useState("");
  const [posts, setPosts] = useState<string[]>([]);
  const searchInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (searchOpen) searchInput.current?.focus();
  }, [searchOpen]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") { setSearchOpen(false); setMenuOpen(false); } };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  function navigate(section: Section) {
    setActive(section);
    setMenuOpen(false);
    setSearchOpen(false);
    document.getElementById("explore")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }
  function send(event: FormEvent<HTMLFormElement>) { event.preventDefault(); if (!draft.trim()) return; setMessages(previous => [...previous, draft.trim()]); setDraft(""); }
  function publish(event: FormEvent<HTMLFormElement>) { event.preventDefault(); if (!post.trim()) return; setPosts(previous => [post.trim(), ...previous]); setPost(""); }
  const found = sections.filter(section => `${section} ${details[section]}`.toLowerCase().includes(query.toLowerCase().trim()));
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="header"><div className="shell header-inner"><a className="brand" href="#top" aria-label="PM’s home">PM`s</a><nav className="desktop-nav" aria-label="Main navigation">{sections.map(section => <button key={section} onClick={() => navigate(section)}>{section}</button>)}</nav><div className="header-tools"><button aria-label="Search" onClick={() => setSearchOpen(true)} className="icon-button">⌕</button><button aria-label="Open chat" className="icon-button profile" onClick={() => navigate("Chat")}>♙</button><button className="icon-button menu-button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(current => !current)}>{menuOpen ? "✕" : "☰"}</button></div></div>{menuOpen && <nav id="mobile-menu" className="mobile-nav" aria-label="Mobile navigation">{sections.map(section => <button key={section} onClick={() => navigate(section)}>{section} <span>→</span></button>)}</nav>}</header>
    <main id="main"><section className="hero" id="top" aria-labelledby="artist-title"><div className="hero-art" role="img" aria-label="Cinematic illustrated singer on a dark stage"/><div className="shell hero-content"><h1 id="artist-title">Alyine</h1><p className="tagline">Live it, Feel it Be It</p><div className="hero-actions"><button className="button gold-button" onClick={() => navigate("Music")}><span aria-hidden="true">▷</span>Music</button><button className="button outline-button" onClick={() => navigate("Chat")}><span aria-hidden="true">♧</span>Chat</button></div></div></section>
    <section className="shell cards" aria-label="Explore PM’s"><div className="card-grid">{sections.map(section => <article className="feature-card" key={section}><button className="card-title" onClick={() => navigate(section)}><span>{section}</span><span aria-hidden="true">→</span></button><button className="card-preview-button" onClick={() => navigate(section)} aria-label={`Open ${section}`}><Preview section={section}/></button></article>)}</div></section>
    <div className="crowd-art" role="img" aria-label="Illustrated audience at a concert"/>
    <section className="detail" id="explore" aria-labelledby="explore-title"><div className="shell detail-inner"><p className="eyebrow">Explore / {active}</p><h2 id="explore-title">{active}</h2><p className="detail-copy">{details[active]}</p>{active === "Chat" && <div className="demo-panel"><p className="demo-label">LOCAL CHAT PREVIEW · No backend connected</p><div aria-live="polite" className="message-list">{messages.length === 0 && <p>Write a message to test the layout.</p>}{messages.map((message, index) => <p className="message" key={index}>{message}</p>)}</div><form onSubmit={send} className="demo-form"><label className="sr-only" htmlFor="message-input">Message</label><input id="message-input" placeholder="Write a message…" maxLength={500} value={draft} onChange={event => setDraft(event.target.value)}/><button type="submit">Send</button></form></div>}{active === "Discuss" && <div className="demo-panel"><p className="demo-label">LOCAL DISCUSSION PREVIEW · Posts are not saved</p><form onSubmit={publish} className="demo-form"><label className="sr-only" htmlFor="post-input">Post</label><input id="post-input" placeholder="Share your thoughts…" maxLength={500} value={post} onChange={event => setPost(event.target.value)}/><button type="submit">Post</button></form><div className="message-list" aria-live="polite">{posts.map((item, index) => <p className="message post" key={index}>{item}</p>)}</div></div>}{active !== "Chat" && active !== "Discuss" && <p className="coming-soon">Concept preview · Real {active.toLowerCase()} content comes next</p>}</div></section></main>
    <footer className="footer"><div className="shell footer-inner"><span>PM`s · Alyine</span><span>Live it, Feel it Be It</span><span>Standalone concept demo</span></div></footer>
    {searchOpen && <div className="search-overlay" onMouseDown={event => { if (event.target === event.currentTarget) setSearchOpen(false); }}><div className="search-panel" role="dialog" aria-modal="true" aria-labelledby="search-title"><div className="search-heading"><h2 id="search-title">Explore</h2><button className="icon-button" aria-label="Close search" onClick={() => setSearchOpen(false)}>✕</button></div><label className="sr-only" htmlFor="search-input">Search sections</label><input id="search-input" ref={searchInput} value={query} onChange={event => setQuery(event.target.value)} placeholder="Search music, lyrics, chat…"/>{found.length ? found.map(section => <button className="search-result" key={section} onClick={() => { setQuery(""); navigate(section); }}>{section}<span>→</span></button>) : <p className="no-results">No matching sections.</p>}<p className="escape-hint">Press Esc to close</p></div></div>}
  </>;
}
