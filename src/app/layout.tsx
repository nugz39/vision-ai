import "./globals.css";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BrandWatermark } from "@/components/branding/BrandWatermark";

export const metadata: Metadata = {
  title: "NaughtyBotty",
  description: "Synthetic Studio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: "linear-gradient(180deg,#0A0013 0%, #120021 100%)",
          color: "#F6F6F6",
          fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial",
        }}
      >
        {/* Fixed global watermark behind EVERYTHING */}
        <BrandWatermark />

        <div className="relative z-10 min-h-screen">
          <Navbar />
          <div className="min-h-[calc(100vh-64px)]">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
