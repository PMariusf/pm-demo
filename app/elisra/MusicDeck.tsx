"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { publishedTracks, type MusicTrack } from "./music-catalog";
import styles from "./music-deck.module.css";

const supportedAudio = /\.(mp3|wav|m4a|aac|ogg|opus|flac|webm)$/i;

export default function MusicDeck() {
  const [previews, setPreviews] = useState<MusicTrack[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(publishedTracks[0]?.id ?? null);
  const [draftLyrics, setDraftLyrics] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState("");
  const objectUrls = useRef<string[]>([]);

  // Local files never leave the visitor's browser. Revoke their blob URLs on exit.
  useEffect(() => () => {
    objectUrls.current.forEach((url) => URL.revokeObjectURL(url));
  }, []);

  const tracks = [...publishedTracks, ...previews];
  const selected = tracks.find((track) => track.id === selectedId) ?? tracks[0] ?? null;
  const isPreview = selected ? previews.some((track) => track.id === selected.id) : false;
  const lyrics = selected ? (draftLyrics[selected.id] ?? selected.lyrics ?? "") : "";

  function loadLocalFiles(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.currentTarget.files ?? []).filter(
      (file) => file.type.startsWith("audio/") || supportedAudio.test(file.name),
    );
    event.currentTarget.value = "";
    if (files.length === 0) {
      setNotice("Choose an audio file such as MP3, WAV or M4A.");
      return;
    }

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
          <div className={styles.artwork} role="img" aria-label="Elísra artist portrait, used as player artwork">
            <span className={styles.artLabel}>ARTIST VISUAL / ELÍSRA</span>
          </div>
          <div className={styles.playerInfo}>
            <p className={styles.miniLabel}>NOW SELECTED</p>
            <h3>{selected?.title ?? "Your first track"}</h3>
            <p className={styles.source}>{selected ? (isPreview ? "Local preview · Only on your device" : "Elísra · Site audio") : "Add a real recording to hear it here."}</p>
            {selected ? (
              <audio key={selected.id} className={styles.audio} controls preload="metadata" src={selected.audioSrc} aria-label={`Play ${selected.title}`}>
                Your browser does not support audio playback.
              </audio>
            ) : (
              <div className={styles.playerPlaceholder}>The player is ready. Choose a recording on the right to test it.</div>
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
          <p className={styles.help}>Select audio files to try the player. The files stay in your browser and disappear when you reload; they are not published to the site.</p>
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
                    onClick={() => setSelectedId(track.id)}
                  >
                    <span className={styles.trackNumber}>{String(index + 1).padStart(2, "0")}</span>
                    <span className={styles.trackText}><strong>{track.title}</strong><small>{previews.some((item) => item.id === track.id) ? "LOCAL PREVIEW" : "SITE AUDIO"}</small></span>
                    <span className={styles.trackArrow} aria-hidden="true">{selected?.id === track.id ? "◉" : "▷"}</span>
                  </button>
                </li>
              ))}
            </ol>
          ) : (
            <div className={styles.emptyLibrary}><span aria-hidden="true">♫</span><strong>No recordings added yet</strong><p>Choose a file above to test with your own music. Actual releases will appear here when connected.</p></div>
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
