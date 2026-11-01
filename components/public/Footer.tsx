import React from "react";
import Link from "next/link";
import { Locale, getDictionary } from "@/lib/i18n";
import { Wheat, MapPin, Phone, Clock, ShieldCheck, Lock } from "lucide-react";

import { PublicSiteSettings } from "@/lib/settings";

interface FooterProps {
  locale: Locale;
  settings?: PublicSiteSettings;
}

export function Footer({ locale, settings }: FooterProps) {
  const dict = getDictionary(locale);
  const currentYear = new Date().getFullYear();
  const phone = settings?.phone || "+34 934 60 66 70";
  const address = settings ? `${settings.street}, ${settings.postcode} ${settings.city}` : dict.address;
  const mapsUrl = settings?.googleMapsUrl || "https://maps.app.goo.gl/Vr26Zu4LZqhYDtpR8";
  const businessName = settings?.businessName || "Swing Forn de Pa";

  return (
    <footer className="w-full bg-[#3B2A20] text-[#FFF8EF] border-t border-[#D9C4A8]/30 pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#A8531C] flex items-center justify-center text-white">
                <Wheat className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                {businessName}
              </span>
            </div>
            <p className="text-sm text-[#F1E4D3]/90 leading-relaxed">
              {dict.footerTagline}
            </p>
            <div className="flex items-center gap-2 text-xs text-[#E9B44C]">
              <ShieldCheck className="w-4 h-4" />
              <span>Reglament (UE) 1169/2011 · 14 Al·lèrgens</span>
            </div>
          </div>

          {/* Col 2: Location & Contact */}
          <div className="space-y-3">
            <h3 className="font-serif text-lg font-semibold text-white">
              {dict.contact}
            </h3>
            <div className="space-y-2.5 text-sm text-[#F1E4D3]/85">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E9B44C] shrink-0 mt-0.5" />
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors text-decoration-none"
                >
                  {address}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E9B44C] shrink-0" />
                <a
                  href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                  className="hover:text-white transition-colors text-decoration-none"
                >
                  {phone}
                </a>
              </div>
            </div>

          </div>

          {/* Col 3: Hours Summary */}
          <div className="space-y-3">
            <h3 className="font-serif text-lg font-semibold text-white">
              {dict.hours}
            </h3>
            <div className="space-y-2 text-sm text-[#F1E4D3]/85">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#E9B44C] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Dilluns – Divendres</p>
                  <p className="text-xs text-[#F1E4D3]/70">06:00 – 21:00</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#E9B44C] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Dissabte i Diumenge</p>
                  <p className="text-xs text-[#F1E4D3]/70">06:00 – 15:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Quick Links & Legal */}
          <div className="space-y-3">
            <h3 className="font-serif text-lg font-semibold text-white">
              Informació
            </h3>
            <ul className="space-y-2 text-sm list-none p-0">
              <li>
                <Link
                  href={`/${locale}/informacio-alergenos`}
                  className="text-[#F1E4D3]/85 hover:text-white transition-colors text-decoration-none"
                >
                  {dict.allergens}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/avis-legal`}
                  className="text-[#F1E4D3]/85 hover:text-white transition-colors text-decoration-none"
                >
                  {dict.legalNotice}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/politica-de-privacitat`}
                  className="text-[#F1E4D3]/85 hover:text-white transition-colors text-decoration-none"
                >
                  {dict.privacy}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/cookies`}
                  className="text-[#F1E4D3]/85 hover:text-white transition-colors text-decoration-none"
                >
                  {dict.cookies}
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 text-xs text-[#E9B44C]/80 hover:text-[#E9B44C] transition-colors text-decoration-none"
                >
                  <Lock className="w-3 h-3" />
                  <span>Gestió interna (CMS)</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[#D9C4A8]/20 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F1E4D3]/60 gap-4">
          <p>© {currentYear} Swing Forn de Pa · Badalona (Barcelona). Tots els drets reservats.</p>
          <p>Fet amb estima per al barri.</p>
        </div>
      </div>
    </footer>
  );
}
