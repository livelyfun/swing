import React from "react";
import { notFound } from "next/navigation";
import { isValidLocale, Locale } from "@/lib/i18n";
import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";
import { MobileActionBar } from "@/components/public/MobileActionBar";

import { getSiteSettings } from "@/lib/settings";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const validLocale = locale as Locale;
  const settings = await getSiteSettings(validLocale);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header locale={validLocale} settings={settings} />
      <main className="flex-1">{children}</main>
      <Footer locale={validLocale} settings={settings} />
      <MobileActionBar locale={validLocale} settings={settings} />
    </div>
  );
}

