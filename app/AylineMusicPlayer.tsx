"use client";

import { useEffect, useRef, useState } from "react";

const songs = [
  { slug: "far-from-me", title: "Far From Me" },
  { slug: "set-the-dark-on-fire", title: "Set the Dark on Fire" },
  { slug: "one-more-time", title: "One More Time" },
] as const;

function time(value: number) {
  if (!Number.isFinite(value)) return "0:00";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default function AylineMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const song = songs[index];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.load();
    setCurrent(0);
    setDuration(0);
    if (playing) audio.play().catch(() => setPlaying(false));
  }, [index]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    else { audio.pause(); setPlaying(false); }
  };

  const choose = (next: number) => {
    if (next === index) return toggle();
    setIndex(next);
    setPlaying(true);
  };

  const next = () => { setIndex(value => (value + 1) % songs.length); setPlaying(true); };
  const previous = () => { setIndex(value => (value - 1 + songs.length) % songs.length); setPlaying(true); };

  return <div className="custom-player">
    <audio ref={audioRef} preload="metadata" src={`/audio/ayline/${song.slug}.mp3`}
      onTimeUpdate={e => setCurrent(e.currentTarget.currentTime)}
      onLoadedMetadata={e => setDuration(e.currentTarget.duration)}
      onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={next} />
    <div className="now-playing">
      <span className="now-label">{playing ? "NOW PLAYING" : "AYLINE PLAYER"}</span>
      <strong>{song.title}</strong><small>Ayline</small>
      <div className={`equalizer ${playing ? "active" : ""}`} aria-hidden="true">{Array.from({length:18},(_,i)=><i key={i}/>)}</div>
      <div className="player-controls">
        <button onClick={previous} aria-label="Previous song">‹</button>
        <button className="player-main" onClick={toggle} aria-label={playing ? "Pause" : "Play"}>{playing ? "Ⅱ" : "▶"}</button>
        <button onClick={next} aria-label="Next song">›</button>
      </div>
      <div className="progress-wrap">
        <span>{time(current)}</span>
        <input aria-label="Song progress" type="range" min="0" max={duration || 0} step=".1" value={Math.min(current,duration || 0)}
          onChange={e => { const audio=audioRef.current; if(audio){ audio.currentTime=Number(e.target.value); setCurrent(audio.currentTime); }}}/>
        <span>{time(duration)}</span>
      </div>
    </div>
    <div className="player-tracks">{songs.map((item,i)=><button key={item.slug} className={i===index ? "active" : ""} onClick={()=>choose(i)}>
      <span className="mini-play">{i===index && playing ? "Ⅱ" : "▶"}</span><span><strong>{item.title}</strong><small>Ayline</small></span>
    </button>)}</div>
  </div>;
}
