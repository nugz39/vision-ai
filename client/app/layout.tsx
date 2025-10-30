import "../styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Vision AI Studio",
    template: "%s · Vision AI",
  },
  description: "Text-to-Image/Video generator",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-gray-100 min-h-screen">{children}</body>
    </html>
  );
}
