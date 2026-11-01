"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Locale, getDictionary } from "@/lib/i18n";
import { OpenNowBadge } from "./OpenNowBadge";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Phone, MessageCircle, Menu, X, Wheat } from "lucide-react";

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
    <header className="sticky top-0 z-40 w-full bg-[#FFF8EF]/95 backdrop-blur-md border-b border-[#D9C4A8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand Name */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2.5 text-decoration-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#A8531C] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
              <Wheat className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-[#3B2A20] leading-none">
                Swing
              </span>
              <span className="text-[11px] font-sans uppercase tracking-widest text-[#A8531C] font-semibold">
                Forn de Pa · Badalona
              </span>
            </div>
          </Link>

          {/* Center Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#3B2A20] hover:text-[#A8531C] transition-colors text-decoration-none"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            <OpenNowBadge locale={locale} />
            <LanguageSwitcher currentLocale={locale} />

            <a
              href={`tel:${cleanPhone}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#A8531C] bg-[#F1E4D3] hover:bg-[#e6d3bd] transition-colors text-decoration-none"
              title="Llamar a Swing Forn de Pa"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{phone}</span>
            </a>

            <a
              href={`https://wa.me/${cleanPhone.replace("+", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors shadow-xs text-decoration-none"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher currentLocale={locale} />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#3B2A20] hover:bg-[#F1E4D3] transition-colors"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#D9C4A8] bg-[#FFF8EF] px-4 pt-3 pb-6 space-y-3">
          <div className="pb-3 border-b border-[#D9C4A8]/60 flex justify-between items-center">
            <OpenNowBadge locale={locale} />
          </div>
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-base font-medium text-[#3B2A20] hover:bg-[#F1E4D3] transition-colors text-decoration-none"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-3 grid grid-cols-2 gap-2">
            <a
              href={`tel:${cleanPhone}`}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#F1E4D3] text-[#3B2A20] font-semibold text-sm text-decoration-none"
            >
              <Phone className="w-4 h-4 text-[#A8531C]" />
              <span>{dict.call}</span>
            </a>
            <a
              href={`https://wa.me/${cleanPhone.replace("+", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-700 text-white font-semibold text-sm text-decoration-none"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{dict.whatsapp}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
