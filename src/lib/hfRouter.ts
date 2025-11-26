import { InferenceClient } from "@huggingface/inference";

type DiffusionParameters = {
  width?: number;
  height?: number;
  num_inference_steps?: number;
  guidance_scale?: number;
  seed?: number;
  negative_prompt?: string;
};

type GeneratePayload = {
  inputs: string;
  parameters?: DiffusionParameters;
};

function requiredEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is not set in .env.local`);
  return v;
}

function isBlobLike(x: any): x is Blob {
  return (
    typeof x === "object" &&
    x !== null &&
    typeof (x as any).arrayBuffer === "function" &&
    typeof (x as any).type === "string"
  );
}

function dataUrlToBytes(dataUrl: string) {
  // accepts: data:image/png;base64,....
  const m = dataUrl.match(/^data:(.+?);base64,(.+)$/);
  if (!m) throw new Error("HF returned an unexpected string (not a data URL).");
  const contentType = m[1];
  const b64 = m[2];
  const buf = Buffer.from(b64, "base64");
  return { bytes: new Uint8Array(buf), contentType };
}

async function runTextToImage(model: string, payload: GeneratePayload) {
  const token = requiredEnv("HF_TOKEN");
  const client = new InferenceClient(token);

  const out: any = await client.textToImage({
    model,
    inputs: payload.inputs,
    parameters: payload.parameters ?? {},
  } as any);

  // Some versions return Blob, some return a data URL string.
  if (isBlobLike(out)) {
    const bytes = new Uint8Array(await out.arrayBuffer());
    const contentType = out.type || "image/png";
    return { bytes, contentType };
  }

  if (typeof out === "string") {
    // Usually "data:image/png;base64,..."
    return dataUrlToBytes(out);
  }

  throw new Error(`HF returned unsupported output type: ${typeof out}`);
}

export async function hfGenerateImage(payload: GeneratePayload) {
  const primary = requiredEnv("HF_MODEL_IMAGE");
  const fallback = process.env.HF_MODEL_IMAGE_ALT;

  try {
    return await runTextToImage(primary, payload);
  } catch (err1: any) {
    if (!fallback) throw err1;

    try {
      return await runTextToImage(fallback, payload);
    } catch (err2: any) {
      const m1 = err1?.message ?? String(err1);
      const m2 = err2?.message ?? String(err2);
      throw new Error(
        `HF image generation failed.\nPrimary (${primary}): ${m1}\nFallback (${fallback}): ${m2}`
      );
    }
  }
}
