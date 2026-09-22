import Link from "next/link";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const songs = [
  { slug: "far-from-me", title: "Far From Me" },
  { slug: "set-the-dark-on-fire", title: "Set the Dark on Fire" },
  { slug: "one-more-time", title: "One More Time" },
] as const;

export default function LyricsPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#0b0b11", color: "#f3ede5", padding: "clamp(24px, 6vw, 88px)" }}>
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <Link href="/" style={{ color: "#d7b985", textDecoration: "none" }}>← PM’s / Ayline</Link>
        <p style={{ marginTop: 60, color: "#d7b985", letterSpacing: ".2em", textTransform: "uppercase", fontSize: 12 }}>Ayline / Lyrics</p>
        <h1 style={{ fontSize: "clamp(44px, 7vw, 84px)", margin: "12px 0 24px" }}>The words behind the music.</h1>
        <p style={{ color: "#bcb5b0", marginBottom: 40 }}>Choose a song to read its lyrics. Audio will be added when the files are ready.</p>
        <nav aria-label="Choose song" style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 60 }}>
          {songs.map(song => <a key={song.slug} href={`#${song.slug}`} style={{ border: "1px solid #75654e", borderRadius: 999, padding: "12px 18px", color: "#f3ede5", textDecoration: "none" }}>{song.title}</a>)}
        </nav>
        {songs.map(song => {
          const raw = readFileSync(join(process.cwd(), "content", "lyrics", `${song.slug}.md`), "utf8");
          const body = raw.replace(/^# .+\r?\n/, "").trim();
          return <article id={song.slug} key={song.slug} style={{ scrollMarginTop: 30, borderTop: "1px solid #514637", padding: "44px 0 64px" }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", marginBottom: 30 }}>{song.title}</h2>
            <div style={{ whiteSpace: "pre-line", lineHeight: 1.9, color: "#ded7cf", fontSize: "clamp(16px, 1.7vw, 19px)" }}>{body}</div>
          </article>;
        })}
      </div>
    </main>
  );
}
