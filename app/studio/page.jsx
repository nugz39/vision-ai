"use client";
import { useState } from "react";
import { HF_BASE, generateImage, generateVideo } from "../../lib/api";

export default function Studio(){
  const [tab, setTab] = useState("image");
  const [prompt, setPrompt] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function onGenerate(e){
    e.preventDefault();
    setErr(""); setMediaUrl(""); setBusy(true);
    try{
      const url = tab === "image"
        ? await generateImage({ prompt, width:768, height:768 })
        : await generateVideo({ prompt, width:512, height:512, num_frames:24, fps:8 });
      setMediaUrl(url);
    }catch(ex){ setErr(String(ex.message||ex)); }
    finally{ setBusy(false); }
  }

  return (
    <main>
      <h2 style={{margin:"8px 0 16px"}}>Studio</h2>
      <div className="tabs" role="tablist" aria-label="Generation mode">
        <button className={`tab ${tab==="image"?"active":""}`} onClick={()=>setTab("image")} role="tab" aria-selected={tab==="image"}>Image</button>
        <button className={`tab ${tab==="video"?"active":""}`} onClick={()=>setTab("video")} role="tab" aria-selected={tab==="video"}>Video</button>
      </div>
      <form onSubmit={onGenerate} className="card" style={{marginBottom:16}}>
        <label className="small">Prompt</label>
        <textarea
          rows={4}
          placeholder="Describe what to generate (SFW only)"
          value={prompt}
          onChange={e=>setPrompt(e.target.value)}
          required
          className="input"
          style={{marginTop:6}}
        />
        <div style={{display:"flex", gap:12, marginTop:12}}>
          <button type="submit" className="btn" disabled={busy || !prompt.trim()}>
            {busy ? "Generating…" : tab==="image" ? "Generate Image" : "Generate Video"}
          </button>
          <button type="button" className="btn secondary" onClick={()=>setMediaUrl("")} disabled={busy}>Clear</button>
        </div>
      </form>
      <div className="preview">
        {mediaUrl
          ? (tab==="image" ? <img src={mediaUrl} alt="Result"/> : <video src={mediaUrl} controls autoPlay loop/>)
          : <div style={{opacity:.7}}>Your {tab} will appear here.</div>}
      </div>
      {err && <p style={{color:"#c00", whiteSpace:"pre-wrap"}}>{err}</p>}
      <p className="small" style={{marginTop:8}}>Backend: {HF_BASE || "(not set)"} · Mode: {tab}</p>
    </main>
  );
}
