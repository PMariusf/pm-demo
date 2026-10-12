import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BehindSound from "../BehindSound";
import FooterContact from "../FooterContact";
import { LanguageToggle, T } from "../LanguageContext";
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
  { number: "01", name: "Techno", detailEn: "Rhythm / pressure / motion", detailNo: "Rytme / trykk / bevegelse" },
  { number: "02", name: "Acid", detailEn: "Texture / tension / electricity", detailNo: "Tekstur / spenning / elektrisitet" },
  { number: "03", name: "Trance", detailEn: "Melody / space / release", detailNo: "Melodi / rom / forløsning" },
] as const;

export default function ElisraPage() {
  return (
    <div className={`${styles.page} elisa-page`} id="top">
      <a className={styles.skip} href="#content"><T en="Skip to content" no="Hopp til innhold" /></a>
      <header className={`${styles.header} elisa-header`}>
        <div className={`${styles.headerInner} elisa-header-inner`}>
          <Link href="/" className={styles.pmBrand} aria-label="PM’s home">PM’s <span>/ ARTISTS</span></Link>
          <nav className={`${styles.nav} elisa-nav`} aria-label="Elísa page navigation">
            <a href="#music"><T en="Music" no="Musikk" /></a>
            <a href="#story"><T en="Story" no="Historie" /></a>
            <a href="#world"><T en="World" no="Verden" /></a>
            <a href="#sound"><T en="Sound" no="Lyd" /></a>
            <a href="#visuals"><T en="Visuals" no="Visuelt" /></a>
            <Link className={styles.backLink} href="/"><T en="Back to PM’s" no="Tilbake til PM’s" /> <span aria-hidden="true">↗</span></Link>
          </nav>
          <LanguageToggle className="language-toggle language-toggle-electric" />
        </div>
      </header>

      <main id="content">
        <section className={`${styles.hero} ${heroStyles.hero}`} aria-labelledby="elisa-title">
          <ElisraParallax />
          <div className={heroStyles.tint} aria-hidden="true" />
          <div className={`${styles.heroInner} ${heroStyles.content}`}>
            <p className={styles.kicker}><span className={styles.statusDot} /> PM’s / ARTIST UNIVERSE</p>
            <h1 id="elisa-title" className="sr-only">Elísa</h1>
            <div className="elisa-hero-logo">
              <Image src="/images/elisa-logo.png" alt="Elísa" width={1536} height={1024} priority style={{ width: "100%", height: "auto", objectFit: "contain" }} />
            </div>
            <p className={styles.tagline}><T en={<>Ancient soul. <em>Future sound.</em></>} no={<>Gammel sjel. <em>Fremtidens lyd.</em></>} /></p>
            <p className={styles.intro}><T en="A concept world of driving rhythms, luminous textures and cinematic atmosphere." no="En konseptverden av drivende rytmer, lysende teksturer og cinematisk atmosfære." /></p>
            <div className={styles.actions}>
              <a className={styles.primary} href="#music"><T en="Listen to the music" no="Lytt til musikken" /> <span aria-hidden="true">↗</span></a>
              <a className={styles.secondary} href="#visuals"><T en="The visual world" no="Den visuelle verden" /> <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <div className={`${styles.heroBottom} ${heroStyles.bottom}`} aria-hidden="true"><span>ELÍSA / VISUAL CONCEPT</span><span>SCROLL TO EXPLORE ↓</span></div>
        </section>

        <section id="music" className={styles.section} aria-labelledby="music-title">
          <div className={styles.sectionHead}>
            <p className={styles.sectionIndex}>01 / MUSIC</p>
            <h2 id="music-title"><T en={<>Enter the <em>sound.</em></>} no={<>Gå inn i <em>lyden.</em></>} /></h2>
            <p><T en="Explore Elísa’s growing music library with atmospheric video artwork, custom playback and lyrics where available." no="Utforsk Elísas voksende musikkbibliotek med atmosfæriske videoer, egen avspilling og sangtekster der de er tilgjengelige." /></p>
          </div>
          <MusicDeck />
        </section>

        <div id="story">
          <BehindSound
            artist="Elísa"
            eyebrow={<T en="Behind the Sound · 02" no="Bak lyden · 02" />}
            title={<T en="Born from the beat." no="Født fra rytmen." />}
            intro={<T en="The pulse comes first. The emotion stays underneath it." no="Pulsen kommer først. Følelsen ligger under hele veien." />}
            body={<T en="Elísa grew from a different kind of energy. The music often begins with rhythm — a bassline, a pulse, a hook or the feeling of being out at night while the world moves around you. Early-2000s trance, techno, happy hardcore and darker electronic textures shape the sound. Heavy drops, deep bass and clear beats bring the momentum, while the vocal keeps an emotional core running through it all." no="Elísa vokste frem fra en annen type energi. Musikken begynner ofte med rytmen — en basslinje, en puls, en hook eller følelsen av å være ute om natten mens verden beveger seg rundt deg. Trance fra tidlig 2000-tall, techno, happy hardcore og mørkere elektroniske teksturer former lydbildet. Tunge drops, dyp bass og tydelige beats skaper fremdriften, mens vokalen beholder en emosjonell kjerne gjennom det hele." />}
            details={[
              { key: "idea", label: <T en="First idea" no="Første idé" />, value: <T en="Beat and momentum" no="Beat og fremdrift" /> },
              { key: "sound", label: <T en="Sound" no="Lyd" />, value: <T en="Trance · techno · happy hardcore" no="Trance · techno · happy hardcore" /> },
              { key: "voice", label: <T en="Voice" no="Stemme" />, value: <T en="Clear · energetic · emotional" no="Klar · energisk · emosjonell" /> },
              { key: "feeling", label: <T en="Feeling" no="Følelse" />, value: <T en="Free · nocturnal · electric" no="Fri · nattlig · elektrisk" /> },
            ]}
            variant="electric"
          />
        </div>

        <section id="world" className={styles.world} aria-labelledby="world-title">
          <ElisraMotion />
          <div className={styles.worldContent}>
            <p className={styles.sectionIndex}>03 / THE WORLD</p>
            <h2 id="world-title"><T en={<>Between the ancient<br />and the <em>electric.</em></>} no={<>Mellom det tidløse<br />og det <em>elektriske.</em></>} /></h2>
            <p><T en="Elísa’s visual direction explores a contrast of timeless symbols and futuristic light. A separate space within PM’s, with its own atmosphere." no="Elísas visuelle retning utforsker kontrasten mellom tidløse symboler og futuristisk lys. Et eget rom i PM’s-universet, med sin helt egen atmosfære." /></p>
            <a href="#visuals" className={styles.textLink}><T en="Explore the visual world" no="Utforsk den visuelle verden" /> <span aria-hidden="true">↗</span></a>
          </div>
        </section>

        <section id="sound" className={styles.section} aria-labelledby="sound-title">
          <div className={styles.sectionHead}>
            <p className={styles.sectionIndex}>02 / SOUND</p>
            <h2 id="sound-title"><T en={<>Feel the <em>frequency.</em></>} no={<>Kjenn <em>frekvensen.</em></>} /></h2>
            <p><T en="Three directions for the design concept: rhythm, texture and melody." no="Tre retninger i uttrykket: rytme, tekstur og melodi." /></p>
          </div>
          <div className={styles.soundGrid}>
            {sounds.map((sound) => (
              <article className={styles.soundCard} key={sound.name}>
                <div className={styles.soundTop}><span>{sound.number} / SIGNAL</span><span aria-hidden="true">↗</span></div>
                <div className={styles.barField} aria-hidden="true">{Array.from({ length: 24 }, (_, i) => <span key={i} style={{ height: `${12 + ((i * 17 + Number(sound.number) * 13) % 56)}%`, animationDelay: `${-(i * 0.075 + Number(sound.number) * 0.11)}s, ${-(i * 0.13)}s`, animationDuration: `${0.72 + (i % 5) * 0.09}s, ${4.2 + (i % 4) * 0.35}s` }} />)}</div>
                <h3>{sound.name}</h3>
                <p><T en={sound.detailEn} no={sound.detailNo} /></p>
              </article>
            ))}
          </div>
          <p className={styles.disclaimer}><T en="Sound directions are a visual concept, not additional playable tracks." no="Lydretningene er en visuell del av konseptet, ikke flere avspillbare spor." /></p>
        </section>

        <section id="visuals" aria-labelledby="visuals-title" className="elisa-visual-outro">
          <div className="elisa-visual-outro-inner">
            <p className={styles.sectionIndex}>THE VISUAL WORLD</p>
            <h2 id="visuals-title"><T en={<>A world in <em>motion.</em></>} no={<>En verden i <em>bevegelse.</em></>} /></h2>
            <p><T en="Elísa’s portraits, presented as a first look at the visual world." no="Elísas portretter, presentert som et første innblikk i den visuelle verdenen." /></p>
          </div>
        </section>
      </main>

      <footer className={styles.footer} style={{ flexWrap: "wrap", rowGap: 16 }}>
        <Link href="/elisra" aria-label="Elísa home" style={{ width: 164, display: "block", flex: "0 0 auto" }}><Image src="/images/elisa-logo.png" alt="Elísa" width={1536} height={1024} style={{ width: "100%", height: "auto" }} /></Link>
        <span>ELÍSA / CONCEPT DEMO</span>
        <a href="#top"><T en="BACK TO TOP ↑" no="TIL TOPPEN ↑" /></a>
        <div style={{ flexBasis: "100%", display: "flex", justifyContent: "center", paddingTop: 8 }}><FooterContact /></div>
      </footer>
    </div>
  );
}
