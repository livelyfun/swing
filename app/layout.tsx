import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFF8EF",
};

export const metadata: Metadata = {
  title: {
    template: "%s | Swing Forn de Pa",
    default: "Swing Forn de Pa — Forn de pa a Badalona",
  },
  description: "Forn de pa i pastisseria a Badalona. Pan, pastissos i tartes personalitzades.",
  openGraph: {
    siteName: "Swing Forn de Pa",
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
