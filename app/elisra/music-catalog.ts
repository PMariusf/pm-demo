/** Elísra recordings available on the site. */
export type MusicTrack = {
  id: string;
  title: string;
  audioSrc: string;
  videoSrc?: string;
  videoType?: string;
  fallbackVideoSrc?: string;
  lyrics?: string;
};

export const publishedTracks: MusicTrack[] = [
  {
    // Stable internal ID and filename retain the Suno draft name.
    id: "no-way-back",
    title: "Under My Skin",
    audioSrc: "/images/Elisra/No%20Way%20Back.mp3",
    videoSrc: "/images/Elisra/Elisra-vid.mp4",
    videoType: "video/mp4",
    fallbackVideoSrc: "/images/Elisra/Elisra-wink.mp4",
  },
];
