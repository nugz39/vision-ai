import "./globals.css";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BrandWatermark } from "@/components/branding/BrandWatermark";

export const metadata: Metadata = {
  title: "Vision AI Studio",
  description: "Premium multi-modal AI studio for images, video keyframes, and remixes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-nb-bg text-nb-text antialiased">
        <div className="min-h-screen">
          <Navbar />
          <div className="relative">
            <div className="relative min-h-[calc(100vh-64px)]">
              <BrandWatermark />
              <div className="relative z-10">{children}</div>
            </div>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
