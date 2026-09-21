"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { publishedTracks } from "./music-catalog";
import styles from "./music-deck.module.css";
import videoStyles from "./music-video.module.css";
import controls from "./music-controls.module.css";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const whole = Math.floor(seconds);
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, "0")}`;
}

export default function MusicDeck() {
  const [selectedId, setSelectedId] = useState<string | null>(publishedTracks[0]?.id ?? null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [videoSourceIndex, setVideoSourceIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReducedMotion(preference.matches);
    syncPreference();
    preference.addEventListener("change", syncPreference);
    return () => preference.removeEventListener("change", syncPreference);
  }, []);

  const selected = publishedTracks.find((track) => track.id === selectedId) ?? publishedTracks[0] ?? null;
  const videoSrc = videoSourceIndex === 0
    ? selected?.videoSrc
    : videoSourceIndex === 1 ? selected?.fallbackVideoSrc : undefined;
  const progress = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  function selectTrack(id: string) {
    if (id === selected?.id) return;
    audioRef.current?.pause();
    videoRef.current?.pause();
    setSelectedId(id);
    setPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setAudioError(false);
    setVideoSourceIndex(0);
  }

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio || audioError) return;
    if (!audio.paused) {
      audio.pause();
      return;
    }
    try {
      await audio.play();
    } catch {
      setPlaying(false);
      setAudioError(true);
    }
  }

  function seek(event: ChangeEvent<HTMLInputElement>) {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.duration) || audio.duration <= 0) return;
    const nextTime = Math.max(0, Math.min(audio.duration, Number(event.currentTarget.value)));
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  }

  function changeVolume(event: ChangeEvent<HTMLInputElement>) {
    const nextVolume = Math.max(0, Math.min(1, Number(event.currentTarget.value)));
    const audio = audioRef.current;
    if (audio) {
      audio.volume = nextVolume;
      audio.muted = false;
    }
    setVolume(nextVolume);
    setMuted(false);
  }

  function toggleMute() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.muted || audio.volume === 0) {
      if (audio.volume === 0) audio.volume = 0.8;
      audio.muted = false;
    } else {
      audio.muted = true;
    }
    setVolume(audio.volume);
    setMuted(audio.muted);
  }

  function tryFallbackVideo() {
    setVideoSourceIndex((index) => index === 0 && selected?.fallbackVideoSrc ? 1 : 2);
  }

  return (
    <div className={styles.deck} aria-label="Elísra music and lyrics">
      <div className={styles.deckTop}>
        <span>ELÍSRA / LISTENING ROOM</span>
        <span className={styles.signal}><span aria-hidden="true" /> MUSIC LIBRARY</span>
      </div>
      <div className={styles.columns}>
        <div className={styles.playerSide}>
          <div
            className={`${styles.artwork} ${selected?.videoSrc ? videoStyles.artistArtwork : ""}`}
            role="img"
            aria-label={selected ? `Elísra moving artwork for ${selected.title}` : "Elísra artwork"}
          >
            {selected && videoSrc && !reducedMotion && (
              <video
                key={`${selected.id}-${videoSourceIndex}`}
                ref={videoRef}
                className={videoStyles.video}
                src={videoSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/images/Elisra/Elísra.png"
                onError={tryFallbackVideo}
                aria-hidden="true"
              />
            )}
            {selected?.videoSrc && !reducedMotion && <span className={videoStyles.videoCaption}>SILENT VIDEO LOOP · MP3 AUDIO</span>}
            <span className={styles.artLabel}>ELÍSRA / {selected?.title.toUpperCase() ?? "MUSIC"}</span>
          </div>

          <div className={styles.playerInfo}>
            <p className={styles.miniLabel}>NOW PLAYING / ELÍSRA</p>
            <h3>{selected?.title ?? "Music coming soon"}</h3>
            <p className={styles.source}>Original recording · PM’s artist universe</p>

            {selected ? (
              <div className={controls.player}>
                <audio
                  key={selected.id}
                  ref={audioRef}
                  className={controls.audioElement}
                  src={selected.audioSrc}
                  preload="metadata"
                  onLoadedMetadata={(event) => {
                    const audio = event.currentTarget;
                    audio.volume = volume;
                    audio.muted = muted;
                    setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
                  }}
                  onDurationChange={(event) => setDuration(Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0)}
                  onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                  onEnded={() => { setPlaying(false); setCurrentTime(0); }}
                  onError={() => { setAudioError(true); setPlaying(false); }}
                  aria-label={`${selected.title} audio`}
                />
                <div className={controls.transport}>
                  <button
                    type="button"
                    className={controls.playButton}
                    onClick={togglePlayback}
                    disabled={audioError}
                    aria-label={playing ? `Pause ${selected.title}` : `Play ${selected.title}`}
                    aria-pressed={playing}
                  >
                    <span aria-hidden="true">{playing ? "Ⅱ" : "▶"}</span>
                  </button>
                  <div className={controls.trackName}>
                    <strong>{selected.title}</strong>
                    <span>{playing ? "PLAYING NOW" : "READY TO LISTEN"}</span>
                  </div>
                  <span className={controls.format}>MP3 / STEREO</span>
                </div>
                <div className={controls.progress}>
                  <span className={controls.time}>{formatTime(currentTime)}</span>
                  <div className={controls.seekWrap}>
                    <div className={controls.seekBackground} aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>
                    <input
                      type="range"
                      className={controls.seek}
                      min={0}
                      max={duration > 0 ? duration : 1}
                      step={0.1}
                      value={Math.min(currentTime, duration > 0 ? duration : 1)}
                      onChange={seek}
                      disabled={!duration || audioError}
                      aria-label={`Seek within ${selected.title}`}
                      aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
                    />
                  </div>
                  <span className={controls.time}>{formatTime(duration)}</span>
                </div>
                <div className={controls.bottomControls}>
                  <span className={controls.status}><span aria-hidden="true" /> ELÍSRA / AUDIO</span>
                  <div className={controls.volumeGroup}>
                    <button
                      type="button"
                      className={controls.muteButton}
                      onClick={toggleMute}
                      aria-label={muted || volume === 0 ? "Unmute" : "Mute"}
                      aria-pressed={muted || volume === 0}
                    >{muted || volume === 0 ? "◌" : "◖"}<span className={controls.srOnly}> Volume</span></button>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={volume}
                      onChange={changeVolume}
                      className={controls.volume}
                      aria-label="Volume"
                      aria-valuetext={`${Math.round((muted ? 0 : volume) * 100)} percent`}
                    />
                  </div>
                </div>
                {audioError && <p className={controls.error} role="alert">The recording could not be loaded. Try refreshing the page.</p>}
              </div>
            ) : <p className={styles.playerPlaceholder}>A recording will appear here when it is added.</p>}
          </div>
        </div>

        <div className={styles.librarySide}>
          <div className={styles.libraryHead}>
            <div>
              <p className={styles.miniLabel}>01 / THE MUSIC</p>
              <h3>Track library<span>.</span></h3>
            </div>
            <span className={styles.count}>{String(publishedTracks.length).padStart(2, "0")} TRACKS</span>
          </div>
          <p className={styles.help}>Explore Elísra’s music. Select a track to listen, and discover the visual world behind the sound.</p>
          {publishedTracks.length > 0 ? (
            <ol className={styles.trackList} aria-label="Available Elísra tracks">
              {publishedTracks.map((track, index) => (
                <li key={track.id}>
                  <button
                    type="button"
                    className={`${styles.trackButton} ${selected?.id === track.id ? styles.selected : ""}`}
                    onClick={() => selectTrack(track.id)}
                    aria-pressed={selected?.id === track.id}
                  >
                    <span className={styles.trackNumber}>{String(index + 1).padStart(2, "0")}</span>
                    <span className={styles.trackText}><strong>{track.title}</strong><small>ELÍSRA · AUDIO + VISUAL</small></span>
                    <span className={styles.trackArrow} aria-hidden="true">{selected?.id === track.id ? "◉" : "▷"}</span>
                  </button>
                </li>
              ))}
            </ol>
          ) : <div className={styles.emptyLibrary}><strong>No recordings added yet</strong><p>Music will appear here when available.</p></div>}
          <div className={styles.lyricsBox}>
            <div className={styles.lyricsHead}><h4>Lyrics</h4><span>02 / WORDS</span></div>
            {selected?.lyrics?.trim()
              ? <p className={styles.lyricsText}>{selected.lyrics}</p>
              : <p className={styles.lyricsEmpty}>Lyrics for {selected?.title ?? "Elísra’s music"} will be added here when available.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
