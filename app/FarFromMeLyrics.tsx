export default function FarFromMeLyrics() {
  const verses = [
    `It can't be true
The best was still to come our way
We had so much more left to say
I wasn't ready for that day`,
    `... And now you're far from me
Life itself can hit so hard, so fast
But today I’ll speak from my heart
You’ll be with me forever`,
    `... I miss you now and what we’ll never do
But the memories you gave me
I’ll hold on tight to those with you`,
    `I’ll hold on to all the good times that we had
Back when we thought we could take on the world
I’ll hold on to all the good times that we had
Now I see you in everything and all`,
    `We had a time so sweet
I'd go back through it all again
Grateful I could call you mine
We lived like we were forever`,
  ];
  const sequence = [0, 1, 2, 3, 4, 2, 3, 2, 3];
  return <article aria-labelledby="far-from-me-title" style={{maxWidth: "720px", margin: "32px auto", padding: "32px 24px", border: "1px solid rgba(255,255,255,.16)", borderRadius: "18px", background: "rgba(8,10,15,.65)"}}>
    <p style={{letterSpacing: ".15em", textTransform: "uppercase", opacity: .7, fontSize: "12px"}}>Ayline · Lyrics</p>
    <h3 id="far-from-me-title" style={{fontSize: "clamp(1.8rem,4vw,2.6rem)", margin: "12px 0 32px"}}>Far From Me</h3>
    {sequence.map((index, position) => <p key={position} style={{whiteSpace: "pre-line", lineHeight: 1.9, marginBottom: "28px"}}>{verses[index]}</p>)}
  </article>;
}
