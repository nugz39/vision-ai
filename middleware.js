import { NextResponse } from "next/server";

const PASS = process.env.SITE_PASS || "";

// Run on all routes; skip in code for assets/api
export const config = {
  matcher: ["/:path*"],
};

export function middleware(req) {
  if (!PASS) return NextResponse.next(); // gate disabled when not set

  const { pathname } = req.nextUrl;

  // Skip Next internals, API routes, and static assets
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

  // Allow the unlock endpoint POST
  if (req.method === "POST" && pathname === "/unlock") {
    return NextResponse.next();
  }

  // Already authenticated?
  const cookie = req.cookies.get("va_auth")?.value;
  if (cookie === PASS) return NextResponse.next();

  // Minimal inline password form (no external assets)
  return new NextResponse(
    `<!doctype html><html><head>
      <meta name="viewport" content="width=device-width,initial-scale=1"/>
      <meta http-equiv="Cache-Control" content="no-store, no-cache, must-revalidate, max-age=0"/>
      <meta http-equiv="Pragma" content="no-cache"/>
      <title>Protected — Vision AI</title>
      <style>
        body{font-family:Arial,sans-serif;padding:40px;max-width:520px;margin:auto}
        input,button{font-size:16px}
        input{flex:1;padding:12px;border:1px solid #ccc;border-radius:10px;outline:none}
        button{padding:12px 16px;border-radius:10px;background:#9FFF00;border:1px solid #dcdcdc;cursor:pointer}
        form{display:flex;gap:10px;align-items:center}
        small{opacity:.6;margin-top:12px;display:block}
      </style>
    </head>
    <body>
      <form method="POST" action="/unlock" autocomplete="off">
        <input type="password" name="p" placeholder="Enter password" autocomplete="new-password"/>
        <button>Enter</button>
      </form>
      <small>Protected preview — Vision AI</small>
    </body></html>`,
    { status: 401, headers: { "content-type": "text/html" } }
  );
}
