export const runtime = "nodejs";

export async function GET() {
  return Response.json({
    ok: true,
    service: "naughtybotty-v2",
    ts: new Date().toISOString(),
  });
}
