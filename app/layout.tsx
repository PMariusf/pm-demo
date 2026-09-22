import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import "./artist-images.css";
import "./ayline-refresh.css";
import ParallaxController from "./ParallaxController";

export const metadata: Metadata = {
  title: "PM’s | Ayline — Live it, Feel it Be It",
  description: "Explore Ayline’s cinematic music, lyrics, stories and conversation in the PM’s artist universe.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<div style={{ background: "#0b0b11", textAlign: "center", padding: "22px" }}><Link href="/lyrics" style={{ color: "#d7b985", textDecoration: "underline", textUnderlineOffset: 5 }}>Read Ayline’s song lyrics →</Link></div><ParallaxController /></body></html>;
}
