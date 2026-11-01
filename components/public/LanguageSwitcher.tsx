"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Locale, SUPPORTED_LOCALES, LOCALE_LABELS } from "@/lib/i18n";

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname();

  // Replace current locale segment in URL path
  const getLocalizedPath = (targetLocale: Locale) => {
    if (!pathname) return `/${targetLocale}`;
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) return `/${targetLocale}`;
    segments[0] = targetLocale;
    return `/${segments.join("/")}`;
  };

  return (
    <div className="flex items-center gap-1 text-xs font-semibold bg-stone-100/80 p-0.5 rounded-lg border border-stone-200">
      {SUPPORTED_LOCALES.map((locale) => {
        const isActive = locale === currentLocale;
        return (
          <Link
            key={locale}
            href={getLocalizedPath(locale)}
            className={`px-2 py-1 rounded transition-colors ${
              isActive
                ? "bg-[#A8531C] text-white shadow-xs font-bold"
                : "text-stone-700 hover:text-[#A8531C] hover:bg-stone-200/60"
            }`}
          >
            {locale.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
