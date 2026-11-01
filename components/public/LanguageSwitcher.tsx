"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Locale, SUPPORTED_LOCALES } from "@/lib/i18n";

interface LanguageSwitcherProps {
  currentLocale: Locale;
  className?: string;
}

export function LanguageSwitcher({ currentLocale, className = "" }: LanguageSwitcherProps) {
  const pathname = usePathname();

  const getLocalizedPath = (targetLocale: Locale) => {
    if (!pathname) return `/${targetLocale}`;
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) return `/${targetLocale}`;
    segments[0] = targetLocale;
    return `/${segments.join("/")}`;
  };

  return (
    <nav
      aria-label="Selecció d'idioma"
      className={`inline-flex items-center gap-0.5 p-0.5 rounded-lg border border-[#0E1540]/15 bg-[#FFFBF0] ${className}`}
    >
      {SUPPORTED_LOCALES.map((locale) => {
        const isActive = locale === currentLocale;
        return (
          <Link
            key={locale}
            href={getLocalizedPath(locale)}
            aria-current={isActive ? "page" : undefined}
            className={`px-2 py-1 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors ${
              isActive
                ? "bg-[#0E1540] text-[#FFFBF0] shadow-xs"
                : "text-[#0E1540]/70 hover:text-[#0E1540] hover:bg-[#0E1540]/5"
            }`}
          >
            {locale}
          </Link>
        );
      })}
    </nav>
  );
}
