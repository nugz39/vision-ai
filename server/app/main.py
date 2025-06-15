import io, base64
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import httpx
from PIL import Image
import torch
from diffusers import StableDiffusionImg2ImgPipeline

# ——— init SD pipeline once (CPU) ———
pipe = StableDiffusionImg2ImgPipeline.from_pretrained(
    "runwayml/stable-diffusion-v1-5",
    torch_dtype=torch.float32,
    safety_checker=None,
).to("cpu")

app = FastAPI()
app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"]
)

# internal call (same container) so no auth needed
@app.post("/generate")
async def generate(prompt: str = Form(""),
                   strength: float = Form(0.75),
                   img: UploadFile = File(...),
                   steps: int = Form(25)):
    pil = Image.open(io.BytesIO(await img.read())).convert("RGB")
    out = pipe(prompt=prompt,
               image=pil,
               strength=float(strength),
               num_inference_steps=int(steps),
               guidance_scale=7).images[0]
    buf = io.BytesIO(); out.save(buf, format="PNG")
    return {"png_base64": base64.b64encode(buf.getvalue()).decode()}

# external endpoint
@app.post("/upload")
async def upload(file: UploadFile = File(...), prompt: str = Form("")):
    data = {"prompt": prompt, "strength": "0.75"}
    files = {"img": (file.filename, await file.read(), file.content_type)}
    async with httpx.AsyncClient(timeout=600) as c:
        r = await c.post("http://localhost:8000/generate", data=data, files=files)
    if r.status_code != 200:
        raise HTTPException(status_code=502, detail=r.text)
    return r.json()
