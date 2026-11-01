"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Locale, getDictionary } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Menu, X, Phone } from "lucide-react";
import { PublicSiteSettings } from "@/lib/settings";

interface HeaderProps {
  locale: Locale;
  settings?: PublicSiteSettings;
}

export function Header({ locale, settings }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dict = getDictionary(locale);
  const phone = settings?.phone || "+34 934 60 66 70";
  const cleanPhone = phone.replace(/[^0-9+]/g, "");

  const navLinks = [
    { href: `/${locale}/productos`, label: dict.menu },
    { href: `/${locale}/especialidades`, label: dict.seasonal },
    { href: `/${locale}/tartas-personalizadas`, label: dict.customCakes },
    { href: `/${locale}/sobre-nosotros`, label: dict.about },
    { href: `/${locale}/contacto`, label: dict.contact },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0E1540] text-[#FFFBF0] border-b border-[#2236C8]/40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Single text element wordmark in display face */}
          <Link
            href={`/${locale}`}
            className="text-xl sm:text-2xl font-bold tracking-tight text-[#FFFBF0] whitespace-nowrap shrink-0 hover:text-[#FFD23F] transition-colors"
          >
            Swing Forn de Pa
          </Link>

          {/* Zone 2: 4-5 concise single-line nav links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#FFFBF0]/85">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="whitespace-nowrap shrink-0 hover:text-[#FFD23F] hover:underline underline-offset-8 decoration-2 decoration-[#2236C8] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Zone 3: 1 primary action + Language Switcher */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <LanguageSwitcher currentLocale={locale} />

            <a
              href={`tel:${cleanPhone}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#F07A1F] text-[#0E1540] hover:bg-[#ff8e38] transition-colors shadow-xs whitespace-nowrap shrink-0 swing-hover"
              title="Trucar a Swing Forn de Pa"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{phone}</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher currentLocale={locale} />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#FFFBF0] hover:bg-[#2236C8]/40 transition-colors"
              aria-label={mobileMenuOpen ? "Tancar menú" : "Obrir menú"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#2236C8]/40 bg-[#0E1540] px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-base font-medium text-[#FFFBF0] hover:bg-[#2236C8]/30 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-3">
            <a
              href={`tel:${cleanPhone}`}
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#F07A1F] text-[#0E1540] font-bold text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>{dict.call} ({phone})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
