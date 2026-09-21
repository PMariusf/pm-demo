"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { publishedTracks, type MusicTrack } from "./music-catalog";
import styles from "./music-deck.module.css";
import videoStyles from "./music-video.module.css";

const supportedAudio = /\.(mp3|wav|m4a|aac|ogg|opus|flac|webm)$/i;

export default function MusicDeck() {
  const [previews, setPreviews] = useState<MusicTrack[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(publishedTracks[0]?.id ?? null);
  const [draftLyrics, setDraftLyrics] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState("");
  const [videoUnavailable, setVideoUnavailable] = useState(false);
  const objectUrls = useRef<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Local previews stay in the browser; release their object URLs on exit.
  useEffect(() => () => {
    objectUrls.current.forEach((url) => URL.revokeObjectURL(url));
  }, []);

  const tracks = [...publishedTracks, ...previews];
  const selected = tracks.find((track) => track.id === selectedId) ?? tracks[0] ?? null;
  const isPreview = selected ? previews.some((track) => track.id === selected.id) : false;
  const lyrics = selected ? (draftLyrics[selected.id] ?? selected.lyrics ?? "") : "";
  const showVideo = Boolean(selected?.videoSrc && !videoUnavailable && !isPreview);

  function pauseVideo(reset = false) {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    if (reset) video.currentTime = 0;
  }

  function playVideo() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const video = videoRef.current;
    if (video) void video.play().catch(() => {
      // The poster remains in place if browser autoplay policy or codec prevents video.
    });
  }

  function selectTrack(id: string) {
    pauseVideo(true);
    setVideoUnavailable(false);
    setSelectedId(id);
  }

  function loadLocalFiles(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.currentTarget.files ?? []).filter(
      (file) => file.type.startsWith("audio/") || supportedAudio.test(file.name),
    );
    event.currentTarget.value = "";
    if (files.length === 0) {
      setNotice("Choose an audio file such as MP3, WAV or M4A.");
      return;
    }

    pauseVideo(true);
    objectUrls.current.forEach((url) => URL.revokeObjectURL(url));
    const next = files.map((file, index) => {
      const audioSrc = URL.createObjectURL(file);
      return {
        id: `preview-${index}-${file.name}`,
        title: file.name.replace(/\.[^.]+$/, "").replace(/[_]+/g, " ").trim(),
        audioSrc,
      };
    });
    objectUrls.current = next.map((track) => track.audioSrc);
    setPreviews(next);
    setSelectedId(next[0].id);
    setVideoUnavailable(false);
    setDraftLyrics({});
    setNotice(`${next.length} local ${next.length === 1 ? "track" : "tracks"} ready. Nothing was uploaded to the website.`);
  }

  return (
    <div className={styles.deck} aria-label="Elísra music and lyrics">
      <div className={styles.deckTop}>
        <span>ELÍSRA / LISTENING ROOM</span>
        <span className={styles.signal}><span aria-hidden="true" /> {publishedTracks.length ? "AUDIO LIBRARY" : "PREVIEW STUDIO"}</span>
      </div>
      <div className={styles.columns}>
        <div className={styles.playerSide}>
          <div
            className={`${styles.artwork} ${selected?.id === "no-way-back" ? videoStyles.artistArtwork : ""}`}
            role="img"
            aria-label={selected ? `Elísra artwork for ${selected.title}, with optional silent video` : "Elísra artwork"}
          >
            {showVideo && selected?.videoSrc && (
              <video
                key={selected.id}
                ref={videoRef}
                className={videoStyles.video}
                muted
                loop
                playsInline
                preload="none"
                poster="/images/Elisra/Elísra.png"
                onError={() => setVideoUnavailable(true)}
                aria-hidden="true"
              >
                <source src={selected.videoSrc} type={selected.videoType ?? "video/mp4"} />
                {selected.fallbackVideoSrc && <source src={selected.fallbackVideoSrc} type="video/mp4" />}
              </video>
            )}
            {showVideo && <span className={videoStyles.videoCaption}>SILENT VIDEO LOOP · MP3 AUDIO</span>}
            <span className={styles.artLabel}>ELÍSRA / {selected?.title.toUpperCase() ?? "UNDER MY SKIN"}</span>
          </div>
          <div className={styles.playerInfo}>
            <p className={styles.miniLabel}>{selected ? "NOW SELECTED" : "FEATURED TRACK"}</p>
            <h3>{selected?.title ?? "Under My Skin"}</h3>
            <p className={styles.source}>{selected ? (isPreview ? "Local preview · Only on your device" : "Elísra · Site audio") : "Elísra · Recording not connected yet"}</p>
            {selected ? (
              <audio
                key={selected.id}
                className={styles.audio}
                controls
                preload="metadata"
                src={selected.audioSrc}
                aria-label={`Play ${selected.title}`}
                onPlay={playVideo}
                onPause={() => pauseVideo()}
                onEnded={() => pauseVideo(true)}
              >
                Your browser does not support audio playback.
              </audio>
            ) : (
              <div className={styles.playerPlaceholder}>The player is ready. Choose a recording on the right to try it locally.</div>
            )}
          </div>
        </div>

        <div className={styles.librarySide}>
          <div className={styles.libraryHead}>
            <div>
              <p className={styles.miniLabel}>01 / THE MUSIC</p>
              <h3>Track library<span>.</span></h3>
            </div>
            <span className={styles.count}>{String(tracks.length).padStart(2, "0")} TRACKS</span>
          </div>
          <p className={styles.help}>Play a track from the library, or choose your own audio files to test the player locally. Local previews disappear when you reload and are not published.</p>
          <label className={styles.fileLabel} htmlFor="elisra-audio-files">Choose audio for local preview</label>
          <input
            id="elisra-audio-files"
            className={styles.fileInput}
            aria-label="Choose audio files to preview locally"
            type="file"
            accept="audio/*,.mp3,.wav,.m4a,.aac,.ogg,.opus,.flac,.webm"
            multiple
            onChange={loadLocalFiles}
          />
          <p className={styles.notice} role="status">{notice || "MP3, WAV, M4A and other browser-supported audio formats."}</p>
          {tracks.length ? (
            <ol className={styles.trackList} aria-label="Available tracks">
              {tracks.map((track, index) => (
                <li key={track.id}>
                  <button
                    type="button"
                    className={`${styles.trackButton} ${selected?.id === track.id ? styles.selected : ""}`}
                    aria-pressed={selected?.id === track.id}
                    onClick={() => selectTrack(track.id)}
                  >
                    <span className={styles.trackNumber}>{String(index + 1).padStart(2, "0")}</span>
                    <span className={styles.trackText}><strong>{track.title}</strong><small>{previews.some((item) => item.id === track.id) ? "LOCAL PREVIEW" : "SITE AUDIO"}</small></span>
                    <span className={styles.trackArrow} aria-hidden="true">{selected?.id === track.id ? "◉" : "▷"}</span>
                  </button>
                </li>
              ))}
            </ol>
          ) : (
            <div className={styles.emptyLibrary}><span aria-hidden="true">♫</span><strong>No recordings added yet</strong><p>Choose a file above to test with your own music.</p></div>
          )}
          <div className={styles.lyricsBox}>
            <div className={styles.lyricsHead}><h4>Lyrics</h4><span>02 / WORDS</span></div>
            {selected ? (
              <>
                {lyrics.trim() ? <p className={styles.lyricsText}>{lyrics}</p> : <p className={styles.lyricsEmpty}>No lyrics connected to this track yet.</p>}
                {isPreview && (
                  <div className={styles.lyricsEditor}>
                    <label htmlFor="elisra-lyrics">Paste lyrics to preview the layout</label>
                    <textarea
                      id="elisra-lyrics"
                      rows={5}
                      value={draftLyrics[selected.id] ?? ""}
                      onChange={(event) => setDraftLyrics((previous) => ({ ...previous, [selected.id]: event.target.value }))}
                      placeholder="Paste your actual song lyrics here…"
                    />
                    <p>This draft is only visible to you in this tab and is not saved.</p>
                  </div>
                )}
              </>
            ) : <p className={styles.lyricsEmpty}>Choose a recording to view or preview its lyrics.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
