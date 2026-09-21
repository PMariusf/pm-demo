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
    lyrics: `[Verse 1]
Hear it
I feel it
Getting closer
Hear it

[Verse 2]
Cold hands, heavy air
Something moving everywhere, no sleep, no control
Feel the pressure, I try to run, I try to hide
But every signal pulls me inside

[Chorus]
Closer, closer, I can feel it coming on
Faster, faster, now my heart is running out
No way back
Let it begin
Let it in

[Bridge]
Backlash, still scars, I don't even know where we are
One touch, one state, push the system 'til it breaks
Every second pulls me down, but I don't want to turn around

[Chorus]
Faster, faster, pull me even closer
I feel it
I need it

[Outro]
Let it begin
3, 2, 1, run under my skin
Feel it move

No way back
Now everything goes quiet
And I'm alone again
To feel your heartbeat like it never really ended
Maybe I was running from everything I knew
Sooner in the silence I still come back to you`,
  },
];
