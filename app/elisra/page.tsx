import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Elísra | PM’s",
  description: "A visual concept for Elísra inside the PM’s artist universe.",
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
          <nav className={styles.nav} aria-label="Elísra page navigation">
            <a href="#sound">Sound</a>
            <a href="#world">World</a>
            <a href="#visuals">Visuals</a>
            <Link className={styles.backLink} href="/">Back to PM’s <span aria-hidden="true">↗</span></Link>
          </nav>
        </div>
      </header>

      <main id="content">
        <section className={styles.hero} aria-labelledby="elisra-title">
          <div className={styles.grain} aria-hidden="true" />
          <div className={styles.heroArt} aria-hidden="true">
            <div className={styles.outerRing} />
            <div className={styles.innerRing} />
            <div className={styles.core} />
            <span className={styles.orbitOne} />
            <span className={styles.orbitTwo} />
          </div>
          <div className={styles.heroInner}>
            <p className={styles.kicker}><span className={styles.statusDot} /> PM’s / ARTIST UNIVERSE</p>
            <h1 id="elisra-title" className={styles.heroTitle}>Elísra<span aria-hidden="true">.</span></h1>
            <p className={styles.tagline}>Ancient soul. <em>Future sound.</em></p>
            <p className={styles.intro}>A concept world of driving rhythms, luminous textures and cinematic atmosphere.</p>
            <div className={styles.actions}>
              <a className={styles.primary} href="#sound">Explore the sound <span aria-hidden="true">↗</span></a>
              <a className={styles.secondary} href="#visuals">The visual world <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <div className={styles.heroBottom} aria-hidden="true"><span>ELÍSRA / VISUAL CONCEPT</span><span>SCROLL TO EXPLORE ↓</span></div>
        </section>

        <section id="sound" className={styles.section} aria-labelledby="sound-title">
          <div className={styles.sectionHead}>
            <p className={styles.sectionIndex}>01 / SOUND</p>
            <h2 id="sound-title">Feel the <em>frequency.</em></h2>
            <p>Three directions for the design concept. Music and playable tracks can be connected here later.</p>
          </div>
          <div className={styles.soundGrid}>
            {sounds.map((sound) => (
              <article className={styles.soundCard} key={sound.name}>
                <div className={styles.soundTop}><span>{sound.number} / SIGNAL</span><span aria-hidden="true">↗</span></div>
                <div className={styles.barField} aria-hidden="true">{Array.from({ length: 24 }, (_, i) => <span key={i} style={{ height: `${12 + ((i * 17 + Number(sound.number) * 13) % 56)}%` }} />)}</div>
                <h3>{sound.name}</h3>
                <p>{sound.detail}</p>
              </article>
            ))}
          </div>
          <p className={styles.disclaimer}>Concept preview — no audio or release details are connected yet.</p>
        </section>

        <section id="world" className={styles.world} aria-labelledby="world-title">
          <div className={styles.worldMark} aria-hidden="true">E</div>
          <div className={styles.worldContent}>
            <p className={styles.sectionIndex}>02 / THE WORLD</p>
            <h2 id="world-title">Between the ancient<br />and the <em>electric.</em></h2>
            <p>Elísra’s visual direction explores a contrast of timeless symbols and futuristic light. A separate space within PM’s, with its own atmosphere.</p>
            <a href="#visuals" className={styles.textLink}>Explore the visuals <span aria-hidden="true">↗</span></a>
          </div>
        </section>

        <section id="visuals" className={styles.visuals} aria-labelledby="visuals-title">
          <div className={styles.sectionHead}>
            <p className={styles.sectionIndex}>03 / VISUALS</p>
            <h2 id="visuals-title">A world in <em>motion.</em></h2>
            <p>Temporary abstract artwork. Elísra’s own portraits and covers can replace these panels when uploaded.</p>
          </div>
          <div className={styles.visualGrid}>
            <div className={`${styles.visualPanel} ${styles.visualOne}`}><span>01 — ORIGIN</span></div>
            <div className={`${styles.visualPanel} ${styles.visualTwo}`}><span>02 — FREQUENCY</span></div>
            <div className={`${styles.visualPanel} ${styles.visualThree}`}><span>03 — AFTERLIGHT</span></div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <Link href="/" className={styles.pmBrand}>PM’s</Link>
        <span>ELÍSRA / CONCEPT DEMO</span>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </div>
  );
}
