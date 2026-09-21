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
    // The source MOV must be exported as H.264 MP4 for reliable browser playback.
    // Until Elisra-vid.mp4 is uploaded, the existing wink clip is the fallback.
    videoSrc: "/images/Elisra/Elisra-vid.mp4",
    videoType: "video/mp4",
    fallbackVideoSrc: "/images/Elisra/Elisra-wink.mp4",
  },
];
