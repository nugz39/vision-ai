import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.formData();
  const input = (data.get("p") || "").toString();
  const PASS = process.env.SITE_PASS || "";

  if (PASS && input === PASS) {
    const res = NextResponse.redirect(new URL("/", req.url));
    res.cookies.set("va_auth", PASS, { httpOnly: true, path: "/" });
    return res;
  }
  return NextResponse.redirect(new URL("/", req.url));
}
