import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMS Administració | Swing Forn de Pa",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 font-sans">
      {children}
    </div>
  );
}
