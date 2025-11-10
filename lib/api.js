export const HF_BASE = (process.env.NEXT_PUBLIC_VISION_AI_HF_BASE || "").replace(/\/$/, "");

export async function generateImage({ prompt, width=768, height=768, steps, guidance, seed, negative_prompt }){
  if(!HF_BASE) throw new Error("NEXT_PUBLIC_VISION_AI_HF_BASE not set");
  const res = await fetch(`${HF_BASE}/generate`, {
    method:'POST',
    headers:{ 'Content-Type':'application/json' },
    body: JSON.stringify({ prompt, width, height, num_inference_steps:steps, guidance_scale:guidance, seed, negative_prompt })
  });
  if(!res.ok){
    const text = await res.text().catch(()=>res.statusText);
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  const blob = await res.blob();
  return URL.createObjectURL(blob);
}

export async function generateVideo({ prompt, num_frames=24, width=512, height=512, fps=8 }){
  if(!HF_BASE) throw new Error("NEXT_PUBLIC_VISION_AI_HF_BASE not set");
  const res = await fetch(`${HF_BASE}/generate_video`, {
    method:'POST',
    headers:{ 'Content-Type':'application/json' },
    body: JSON.stringify({ prompt, num_frames, width, height, fps })
  });
  if(!res.ok){
    const text = await res.text().catch(()=>res.statusText);
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  const blob = await res.blob();
  return URL.createObjectURL(blob);
}
