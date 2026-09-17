import type { Metadata } from "next";
import "./globals.css";
import "./artist-images.css";

export const metadata: Metadata = {
  title: "PM’s | Alyine — Live it, Feel it Be It",
  description: "Cinematic concept demo for music, lyrics, stories and conversation.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
