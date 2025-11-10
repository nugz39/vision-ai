import Link from "next/link";

export default function Home(){
  return (
    <main>
      <section className="hero">
        <h1 style={{fontSize:36, marginBottom:8}}>VISION <span style={{color:'var(--lime)'}}>AI</span></h1>
        <p style={{marginTop:0, opacity:.8}}>Where Imagination Meets Intelligence — From Text to Vision.</p>
        <div style={{display:'flex', gap:12, marginTop:16}}>
          <Link className="btn" href="/studio">Generate Now</Link>
          <Link className="btn secondary" href="/gallery">Explore Gallery</Link>
        </div>
      </section>
    </main>
  );
}
