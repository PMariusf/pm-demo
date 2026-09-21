/**
 * Add only actual Elísra recordings here after placing audio in public/music/Elisra/.
 * Example shape (replace ALL values with real song details):
 * { id: "unique-id", title: "Actual song title", audioSrc: "/music/Elisra/actual-file.mp3", lyrics: "Actual lyrics" }
 * Do not list unreleased or nonexistent tracks as if they were available.
 */
export type MusicTrack = {
  id: string;
  title: string;
  audioSrc: string;
  lyrics?: string;
};

export const publishedTracks: MusicTrack[] = [];
