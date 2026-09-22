"use client";

import { useState } from "react";

type Song = { slug: string; title: string; lyrics: string };

export default function SongSelector({ songs }: { songs: Song[] }) {
  const [selected, setSelected] = useState(songs[0]?.slug ?? "");
  const song = songs.find(item => item.slug === selected);

  return <section style={{ maxWidth: 760, margin: "0 auto", border: "1px solid #514637", borderRadius: 20, background: "#14131b", padding: "clamp(20px, 4vw, 40px)" }}>
    <label htmlFor="song-select" style={{ display: "block", color: "#d7b985", marginBottom: 12, letterSpacing: ".08em" }}>CHOOSE A SONG</label>
    <select id="song-select" value={selected} onChange={event => setSelected(event.target.value)} style={{ width: "100%", padding: "14px 16px", borderRadius: 10, background: "#24212b", color: "#f3ede5", border: "1px solid #75654e", fontSize: 17, marginBottom: 28 }}>
      {songs.map(item => <option key={item.slug} value={item.slug}>{item.title}</option>)}
    </select>
    {song && <div key={song.slug}>
      <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", marginBottom: 20 }}>{song.title}</h2>
      <audio controls preload="metadata" src={`/audio/ayline/${song.slug}.mp3`} aria-label={`Play ${song.title}`} style={{ width: "100%", marginBottom: 24 }}>Your browser does not support audio playback.</audio>
      <div role="region" aria-label={`${song.title} lyrics`} tabIndex={0} style={{ maxHeight: "min(55vh, 520px)", overflowY: "auto", overscrollBehavior: "contain", padding: "8px 18px 8px 0", borderTop: "1px solid #514637", whiteSpace: "pre-line", lineHeight: 1.9, color: "#ded7cf", fontSize: "clamp(16px, 1.7vw, 19px)" }}>{song.lyrics}</div>
      <p style={{ color: "#a79b8c", fontSize: 13, marginTop: 12 }}>Scroll inside the lyrics box to read more.</p>
    </div>}
  </section>;
}
