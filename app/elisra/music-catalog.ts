/** Only recordings actually present in the repository are listed here. */
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
    id: "no-way-back",
    title: "No Way Back",
    audioSrc: "/images/Elisra/No%20Way%20Back.mp3",
    videoSrc: "/images/Elisra/Elisra-vid.mov",
    videoType: "video/quicktime",
    fallbackVideoSrc: "/images/Elisra/Elisra-wink.mp4",
  },
];
