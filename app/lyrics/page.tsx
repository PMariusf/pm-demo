import Link from "next/link";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import SongSelector from "./SongSelector";

const catalog = [
  { slug: "far-from-me", title: "Far From Me" },
  { slug: "set-the-dark-on-fire", title: "Set the Dark on Fire" },
  { slug: "one-more-time", title: "One More Time" },
];

export default function LyricsPage() {
  const songs = catalog.map(song => {
    const raw = readFileSync(join(process.cwd(), "content", "lyrics", `${song.slug}.md`), "utf8");
    return { ...song, lyrics: raw.replace(/^# .+\r?\n/, "").trim() };
  });

  return <main style={{ minHeight: "100vh", background: "#0b0b11", color: "#f3ede5", padding: "clamp(24px, 6vw, 88px)" }}>
    <div style={{ maxWidth: 980, margin: "0 auto" }}>
      <Link href="/" style={{ color: "#d7b985", textDecoration: "none" }}>← PM’s / Ayline</Link>
      <p style={{ marginTop: 60, color: "#d7b985", letterSpacing: ".2em", textTransform: "uppercase", fontSize: 12 }}>Ayline / Music & Lyrics</p>
      <h1 style={{ fontSize: "clamp(44px, 7vw, 84px)", margin: "12px 0 24px" }}>Listen. Feel. Read.</h1>
      <p style={{ color: "#bcb5b0", marginBottom: 40 }}>Select a song to listen and read its lyrics in one place.</p>
      <SongSelector songs={songs} />
    </div>
  </main>;
}
