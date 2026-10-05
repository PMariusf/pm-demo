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

const newVisual = "/images/Elisra/generated-video-cover-art-1791220543938.mp4";

export const publishedTracks: MusicTrack[] = [
  {
    id: "under-my-skin",
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
  {
    id: "digital-heart",
    title: "Digital Heart",
    audioSrc: "/audio/ayline/Elisra/Digital%20Heart.mp3",
    videoSrc: newVisual,
    videoType: "video/mp4",
  },
  {
    id: "out-of-the-blue",
    title: "Out of the Blue",
    audioSrc: "/audio/ayline/Elisra/Out%20of%20the%20Blue.mp3",
    videoSrc: newVisual,
    videoType: "video/mp4",
  },
  {
    id: "stay-with-me-tonight",
    title: "Stay With Me Tonight",
    audioSrc: "/audio/ayline/Elisra/Stay%20With%20Me%20Tonight.mp3",
    videoSrc: newVisual,
    videoType: "video/mp4",
  },
  {
    id: "you-and-i",
    title: "You and I",
    audioSrc: "/audio/ayline/Elisra/You%20and%20I.mp3",
    videoSrc: newVisual,
    videoType: "video/mp4",
  },
];
