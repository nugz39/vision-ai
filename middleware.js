import { NextResponse } from "next/server";

const PASS = process.env.SITE_PASS || "";

// Match everything; we’ll skip assets/api manually
export const config = {
  matcher: ["/:path*"],
};

export function middleware(req) {
  // If no password set, do nothing
  if (!PASS) return NextResponse.next();

  const { pathname } = req.nextUrl;

  // Skip Next internals, API, and common static assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".jpeg") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".gif") ||
    pathname.endsWith(".mp4") ||
    pathname.endsWith(".webm") ||
    pathname.endsWith(".ico") ||
    pathname.endsWith(".txt")
  ) {
    return NextResponse.next();
  }

  // Allow the unlock endpoint POST to go through
  if (req.method === "POST" && pathname === "/unlock") {
    return NextResponse.next();
  }

  // Already authenticated?
  const cookie = req.cookies.get("va_auth")?.value;
  if (cookie === PASS) return NextResponse.next();

  // Minimal inline password form (no external assets)
  return new NextResponse(
    `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
    <body style="font-family:Arial;padding:40px;max-width:520px;margin:auto">
      <form method="POST" action="/unlock" style="display:flex;gap:10px;align-items:center">
        <input type="password" name="p" placeholder="Enter password"
               style="flex:1;padding:12px;border:1px solid #ccc;border-radius:10px;outline:none"/>
        <button style="padding:12px 16px;border-radius:10px;background:#9FFF00;border:1px solid #dcdcdc;cursor:pointer">
          Enter
        </button>
      </form>
      <p style="opacity:.6;margin-top:12px;font-size:12px">Protected preview — Vision AI</p>
    </body></html>`,
    { status: 401, headers: { "content-type": "text/html" } }
  );
}
