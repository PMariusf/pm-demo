"use client";

import { useEffect, useState } from "react";

const songs = [
  { slug: "far-from-me", title: "Far From Me" },
  { slug: "set-the-dark-on-fire", title: "Set the Dark on Fire" },
  { slug: "one-more-time", title: "One More Time" },
] as const;

export default function AylineLyricsCard() {
  const [slug, setSlug] = useState<string>(songs[0].slug);
  const [lyrics, setLyrics] = useState("Loading lyrics…");

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/ayline-lyrics?song=${encodeURIComponent(slug)}`, { signal: controller.signal })
      .then(response => { if (!response.ok) throw new Error("Could not load lyrics"); return response.json(); })
      .then(data => setLyrics(data.lyrics))
      .catch(error => { if (error.name !== "AbortError") setLyrics("Lyrics could not be loaded."); });
    return () => controller.abort();
  }, [slug]);

  return (
    <div className="ayline-lyrics-card" onClick={event => event.stopPropagation()}>
      <label htmlFor="ayline-song-select" style={{ display: "block", fontSize: 12, color: "#d7b985", marginBottom: 5 }}>SELECT A SONG</label>
      <select id="ayline-song-select" value={slug} onChange={event => { setLyrics("Loading lyrics…"); setSlug(event.target.value); }} style={{ width: "100%", background: "#191716", color: "#f3ede5", border: "1px solid #806c4e", borderRadius: 6, padding: "7px", marginBottom: 8 }}>
        {songs.map(song => <option key={song.slug} value={song.slug}>{song.title}</option>)}
      </select>
      <audio key={slug} controls preload="none" src={`/audio/ayline/${slug}.mp3`} aria-label={`Play ${songs.find(song => song.slug === slug)?.title}`} style={{ display: "block", width: "100%", height: 36, marginBottom: 8 }} />
      <div tabIndex={0} role="region" aria-label="Scrollable song lyrics" style={{ height: 115, overflowY: "auto", overscrollBehavior: "contain", border: "1px solid #41372e", borderRadius: 5, padding: "8px 10px", color: "#e8dfd5", background: "#100f0e", whiteSpace: "pre-line", fontSize: 12, lineHeight: 1.65 }}>{lyrics}</div>
    </div>
  );
}
