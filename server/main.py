import io, base64, os
from typing import Optional
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from PIL import Image
import torch
from diffusers import StableDiffusionXLPipeline

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
DTYPE = torch.float16 if DEVICE == "cuda" else torch.float32
MODEL_ID = os.environ.get("SDXL_MODEL_ID", "stabilityai/sdxl-turbo")
HF_TOKEN = os.environ.get("HF_TOKEN", None)

pipe = None
app = FastAPI(title="Vision AI Backend", version="1.0.0")

class GenReq(BaseModel):
  prompt: str
  negativePrompt: Optional[str] = None
  steps: Optional[int] = 6
  guidance: Optional[float] = 0.0
  seed: Optional[int] = None
  width: Optional[int] = 1024
  height: Optional[int] = 1024
  initImageDataUrl: Optional[str] = None
  strength: Optional[float] = None
  mode: Optional[str] = "preview"

def _load():
  global pipe
  if pipe is not None: return
  pipe = StableDiffusionXLPipeline.from_pretrained(
    MODEL_ID, torch_dtype=DTYPE, use_safetensors=True, token=HF_TOKEN
  )
  if DEVICE == "cuda": pipe = pipe.to("cuda")

@app.get("/health")
def health(): return {"ok": True, "device": DEVICE, "model": MODEL_ID}

@app.post("/generate")
def generate(req: GenReq):
  _load()
  if not req.prompt and not req.initImageDataUrl:
    raise HTTPException(400, "Missing prompt or init image")
  if req.seed is not None: torch.manual_seed(req.seed)
  with torch.inference_mode():
    image = pipe(
      prompt=req.prompt,
      negative_prompt=req.negativePrompt,
      num_inference_steps=req.steps or 6,
      guidance_scale=req.guidance or 0.0,
      width=req.width or 1024,
      height=req.height or 1024
    ).images[0]
  buf = io.BytesIO(); image.save(buf, format="PNG")
  b64 = base64.b64encode(buf.getvalue()).decode()
  return {"ok": True, "type": "image", "data_url": f"data:image/png;base64,{b64}"}
