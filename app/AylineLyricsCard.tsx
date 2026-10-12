"use client";

import { useEffect, useState } from "react";

const songs = [
  { slug: "far-from-me", title: "Far From Me", audio: "/audio/ayline/far-from-me.mp3" },
  { slug: "set-the-dark-on-fire", title: "Set the Dark on Fire", audio: "/audio/ayline/set-the-dark-on-fire.mp3" },
  { slug: "one-more-time", title: "One More Time", audio: "/audio/ayline/one-more-time.mp3" },
  { slug: "every-day-i-do", title: "Every Day, I Do", audio: "/audio/ayline/Every%20Day,%20I%20Do.mp3" },
  { slug: "its-christmas-when-youre", title: "It's Christmas When You're", audio: "/audio/ayline/It%27s%20Christmas%20When%20You%27re.mp3" },
  { slug: "thunder-in-my-heart", title: "Thunder in My Heart", audio: "/audio/ayline/Thunder%20in%20My%20Heart.mp3" },
  { slug: "from-afar", title: "From Afar", audio: "/audio/ayline/From%20Afar.mp3" },
] as const;

export default function AylineLyricsCard() {
  const [slug, setSlug] = useState<string>(songs[0].slug);
  const [lyrics, setLyrics] = useState("Loading lyrics…");
  const currentSong = songs.find(song => song.slug === slug) ?? songs[0];

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
      <audio key={slug} controls preload="none" src={currentSong.audio} aria-label={`Play ${currentSong.title}`} style={{ display: "block", width: "100%", height: 36, marginBottom: 8 }} />
      <div tabIndex={0} role="region" aria-label="Scrollable song lyrics" style={{ height: 115, overflowY: "auto", overscrollBehavior: "contain", border: "1px solid #41372e", borderRadius: 5, padding: "8px 10px", color: "#e8dfd5", background: "#100f0e", whiteSpace: "pre-line", fontSize: 12, lineHeight: 1.65 }}>{lyrics}</div>
    </div>
  );
}
