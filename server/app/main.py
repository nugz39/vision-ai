from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import base64

app = FastAPI()

# Allow all CORS (so your frontend can talk to it)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload")
async def upload(file: UploadFile, prompt: str = Form(...)):
    # Fake generation logic for now (replace with your model later)
    contents = await file.read()
    encoded = base64.b64encode(contents).decode("utf-8")

    return JSONResponse(content={"png_base64": encoded})
