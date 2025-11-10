const BASE =
  process.env.NEXT_PUBLIC_VISION_AI_HF_BASE || "http://localhost:7860";

async function okOrThrow(res) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  return res;
}

export async function generateImage(body) {
  const res = await okOrThrow(
    fetch(`${BASE}/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
  );
  return await res.blob();
}

export async function generateVideo(body) {
  const res = await okOrThrow(
    fetch(`${BASE}/generate_video`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
  );
  return await res.blob();
}

export async function generateImg2Img({
  file,
  prompt,
  strength = 0.8,
  guidance_scale = 7.5,
  num_inference_steps = 30,
}) {
  const fd = new FormData();
  fd.append("image", file);
  fd.append("prompt", prompt);
  fd.append("strength", String(strength));
  fd.append("guidance_scale", String(guidance_scale));
  fd.append("num_inference_steps", String(num_inference_steps));

  const res = await okOrThrow(
    fetch(`${BASE}/img2img`, { method: "POST", body: fd })
  );
  return await res.blob();
}
