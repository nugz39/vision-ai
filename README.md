# Vision AI — Full Stack (Next.js + FastAPI)

- **client/**: Next.js 14 App Router UI (Create Studio)
- **server/**: FastAPI backend for text→image (SDXL-Turbo). Ready for Hugging Face Spaces (Docker).

## Deploy flow (high level)

1) Push this repo to GitHub (your `main` branch).
2) **Frontend** (Vercel):
   - Create a Vercel project and set **Project Root** = `client`.
   - Add env:
     - `NEXT_PUBLIC_SITE_URL` = `https://vision-ai.com.au` (or your domain)
     - `VISION_AI_HF_BASE` = your HF Space base URL (e.g. `https://<space-id>.hf.space`)
   - Deploy → add domain(s) in Vercel.

3) **Backend** (Hugging Face):
   - Create a new Space (Docker).
   - Upload `server/` files.
   - Set Space secrets (optional): `HF_TOKEN` if needed, `SDXL_MODEL_ID` if using a different model.
   - Run; confirm `/health` works.

The Next.js API routes call `VISION_AI_HF_BASE/generate` and return images as data URLs.
