import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans-body",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0E1540",
};

export const metadata: Metadata = {
  title: {
    template: "%s | Swing Forn de Pa",
    default: "Swing Forn de Pa — Obrador Artesà a Badalona",
  },
  description: "Forn de pa i brioixeria artesana a Badalona (Avda. Catalunya 39). Pa de massa mare, brioixeria del dia i especialitats de temporada.",
  openGraph: {
    siteName: "Swing Forn de Pa",
    locale: "ca_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${bricolage.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#FFFBF0] text-[#0E1540]">
        {children}
      </body>
    </html>
  );
}
