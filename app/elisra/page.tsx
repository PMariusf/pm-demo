import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BehindSound from "../BehindSound";
import styles from "./page.module.css";
import heroStyles from "./hero.module.css";
import ElisraParallax from "./ElisraParallax";
import ElisraMotion from "./ElisraMotion";
import MusicDeck from "./MusicDeck";

export const metadata: Metadata = {
  title: "Elísa | PM’s",
  description: "Listen to Elísa and explore her cinematic electronic artist world inside PM’s.",
};

const sounds = [
  { number: "01", name: "Techno", detail: "Rhythm / pressure / motion" },
  { number: "02", name: "Acid", detail: "Texture / tension / electricity" },
  { number: "03", name: "Trance", detail: "Melody / space / release" },
] as const;

export default function ElisraPage() {
  return (
    <div className={styles.page} id="top">
      <a className={styles.skip} href="#content">Skip to content</a>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.pmBrand} aria-label="PM’s home">PM’s <span>/ ARTISTS</span></Link>
          <nav className={styles.nav} aria-label="Elísa page navigation">
            <a href="#music">Music</a>
            <a href="#story">Story</a>
            <a href="#world">World</a>
            <a href="#sound">Sound</a>
            <a href="#visuals">Visuals</a>
            <Link className={styles.backLink} href="/">Back to PM’s <span aria-hidden="true">↗</span></Link>
          </nav>
        </div>
      </header>

      <main id="content">
        <section className={`${styles.hero} ${heroStyles.hero}`} aria-labelledby="elisa-title">
          <ElisraParallax />
          <div className={heroStyles.tint} aria-hidden="true" />
          <div className={`${styles.heroInner} ${heroStyles.content}`}>
            <p className={styles.kicker}><span className={styles.statusDot} /> PM’s / ARTIST UNIVERSE</p>
            <h1 id="elisa-title" className="sr-only">Elísa</h1>
            <div style={{ width: "min(660px, 82vw)", margin: "-34px 0 -44px -42px" }}>
              <Image
                src="/images/elisa-logo.png"
                alt="Elísa"
                width={1536}
                height={1024}
                priority
                style={{ width: "100%", height: "auto", objectFit: "contain" }}
              />
            </div>
            <p className={styles.tagline}>Ancient soul. <em>Future sound.</em></p>
            <p className={styles.intro}>A concept world of driving rhythms, luminous textures and cinematic atmosphere.</p>
            <div className={styles.actions}>
              <a className={styles.primary} href="#music">Listen to the music <span aria-hidden="true">↗</span></a>
              <a className={styles.secondary} href="#visuals">The visual world <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <div className={`${styles.heroBottom} ${heroStyles.bottom}`} aria-hidden="true"><span>ELÍSA / VISUAL CONCEPT</span><span>SCROLL TO EXPLORE ↓</span></div>
        </section>

        <section id="music" className={styles.section} aria-labelledby="music-title">
          <div className={styles.sectionHead}>
            <p className={styles.sectionIndex}>01 / MUSIC</p>
            <h2 id="music-title">Enter the <em>sound.</em></h2>
            <p>Explore Elísa’s growing music library with atmospheric video artwork, custom playback and lyrics where available.</p>
          </div>
          <MusicDeck />
        </section>

        <div id="story">
          <BehindSound
            artist="Elísa"
            eyebrow="Behind the Sound · 02"
            title="Born from the beat."
            intro="The pulse comes first. The emotion stays underneath it."
            body="Elísa grew from a different kind of energy. The music often begins with rhythm — a bassline, a pulse, a hook or the feeling of being out at night while the world moves around you. Early-2000s trance, techno, happy hardcore and darker electronic textures shape the sound. Heavy drops, deep bass and clear beats bring the momentum, while the vocal keeps an emotional core running through it all."
            details={[
              { label: "First idea", value: "Beat and momentum" },
              { label: "Sound", value: "Trance · techno · happy hardcore" },
              { label: "Voice", value: "Clear · energetic · emotional" },
              { label: "Feeling", value: "Free · nocturnal · electric" },
            ]}
            variant="electric"
          />
        </div>

        <section id="world" className={styles.world} aria-labelledby="world-title">
          <ElisraMotion />
          <div className={styles.worldContent}>
            <p className={styles.sectionIndex}>03 / THE WORLD</p>
            <h2 id="world-title">Between the ancient<br />and the <em>electric.</em></h2>
            <p>Elísa’s visual direction explores a contrast of timeless symbols and futuristic light. A separate space within PM’s, with its own atmosphere.</p>
            <a href="#visuals" className={styles.textLink}>Explore the visual world <span aria-hidden="true">↗</span></a>
          </div>
        </section>

        <section id="sound" className={styles.section} aria-labelledby="sound-title">
          <div className={styles.sectionHead}>
            <p className={styles.sectionIndex}>02 / SOUND</p>
            <h2 id="sound-title">Feel the <em>frequency.</em></h2>
            <p>Three directions for the design concept: rhythm, texture and melody.</p>
          </div>
          <div className={styles.soundGrid}>
            {sounds.map((sound) => (
              <article className={styles.soundCard} key={sound.name}>
                <div className={styles.soundTop}><span>{sound.number} / SIGNAL</span><span aria-hidden="true">↗</span></div>
                <div className={styles.barField} aria-hidden="true">{Array.from({ length: 24 }, (_, i) => <span key={i} style={{ height: `${12 + ((i * 17 + Number(sound.number) * 13) % 56)}%`, animationDelay: `${-(i * 0.075 + Number(sound.number) * 0.11)}s, ${-(i * 0.13)}s`, animationDuration: `${0.72 + (i % 5) * 0.09}s, ${4.2 + (i % 4) * 0.35}s` }} />)}</div>
                <h3>{sound.name}</h3>
                <p>{sound.detail}</p>
              </article>
            ))}
          </div>
          <p className={styles.disclaimer}>Sound directions are a visual concept, not additional playable tracks.</p>
        </section>

        <section
          id="visuals"
          aria-labelledby="visuals-title"
          style={{
            padding: "clamp(72px, 9vw, 130px) 24px",
            borderTop: "1px solid rgba(255,255,255,.08)",
            background: "radial-gradient(circle at 50% 0%, rgba(105,92,255,.12), transparent 38%), #070914",
          }}
        >
          <div style={{ width: "min(100%, 920px)", margin: "0 auto", textAlign: "center" }}>
            <p className={styles.sectionIndex}>THE VISUAL WORLD</p>
            <h2 id="visuals-title" style={{ marginTop: 14, marginBottom: 18 }}>
              A world in <em>motion.</em>
            </h2>
            <p style={{ margin: "0 auto", maxWidth: 620, color: "rgba(255,255,255,.58)", lineHeight: 1.8 }}>
              Elísa’s portraits, presented as a first look at the visual world.
            </p>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <Link href="/elisra" aria-label="Elísa home" style={{ width: 164, display: "block", flex: "0 0 auto" }}>
          <Image src="/images/elisa-logo.png" alt="Elísa" width={1536} height={1024} style={{ width: "100%", height: "auto" }} />
        </Link>
        <span>ELÍSA / CONCEPT DEMO</span>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </div>
  );
}
