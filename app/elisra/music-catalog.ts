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
    lyrics: "I found you\n\nOne look\nOne night\n\nAnd everything changed\n\nCity lights\nAcross your face\n\nMoving closer\nFeel the bass\n\nNo words\nNothing to prove\n\nI lose myself\nWhen I move with you\n\nHeartbeat\nFaster\n\nPull me\nCloser\n\nDon't let\nThis moment go\n\nOut of the blue\nI found you\n\nUnder the lights\nJust me and you\n\nWe keep moving\nAll night through\n\nOut of the blue\nI fell into you\n\nInto you\n\nIn-in-into you\n\nOut of the—\n\nOut of the—\n\nBLUE\n\nOut of the blue\n\nI found you\n\nYou-you-you—\n\nCold air\nElectric sky\n\nFeel the rhythm\nYou and I\n\nOne touch\nAnd suddenly\n\nThere's nowhere else\nI'd rather be\n\nOut of the blue\nI found you\n\nUnder the lights\nJust me and you\n\nWe keep moving\nAll night through\n\nOut of the blue\nI fell into you\n\nMove with me\n\nMove with me\n\nDon't stop—",
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
    lyrics: "Don't wait for tomorrow\n\nCome with me\n\nFeel the rush\nLet it begin\nTake my hand\n\nWe got one chance\n\nMy heart is beating\n\nI feel it now\nHold on\n\nThree, two, on\n\nYou and I\n\nAcross the sky\n\nDon't say goodbye\nTurn up the music\n\nTonight\nTo-to-tonight\n\nWE FLY!\n\nYou and I!\n\nShake the ground\nLose yourself\nInside the sound\n\nNo looking back\nNo slowing down\n\nWe own this moment\nHere and now\n\nYou and I\n\nAcross the sky\n\nDon't say goodbye\nTurn up the music\n\nWhen morning comes\nAnd lights turn bright\n\nI'll still remember\n\nSo hold me close\n\nBefore we disappear\nInto the light\n\nTonight...\n\nTonight...\n\nTo-to-to-tonight—\n\nYou and I\n\nFLY!",
    videoType: "video/mp4",
  },
];
