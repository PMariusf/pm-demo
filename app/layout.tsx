import type { Metadata } from "next";
import "./globals.css";
import "./artist-images.css";
import "./ayline-refresh.css";
import ParallaxController from "./ParallaxController";

export const metadata: Metadata = {
  title: "PM’s | Ayline — Live it, Feel it Be It",
  description: "Explore Ayline’s cinematic music, lyrics, stories and conversation in the PM’s artist universe.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<ParallaxController /></body></html>;
}
