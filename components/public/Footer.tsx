import React from "react";
import Link from "next/link";
import { Locale, getDictionary } from "@/lib/i18n";
import { MapPin, Phone, Clock, ShieldCheck, Lock } from "lucide-react";
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
    <footer className="w-full bg-[#0E1540] text-[#FFFBF0] border-t border-[#2236C8]/40 pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1: Brand Wordmark & Philosophy */}
          <div className="space-y-4">
            <span className="text-2xl font-bold tracking-tight text-[#FFFBF0] block">
              {businessName}
            </span>
            <p className="text-sm text-[#FFFBF0]/75 leading-relaxed">
              {dict.footerTagline}
            </p>
            <div className="flex items-center gap-2 text-xs text-[#FFD23F]">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Reglament (UE) 1169/2011 · 14 Al·lèrgens</span>
            </div>
          </div>

          {/* Col 2: Location & Contact */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#FFD23F]">
              {dict.contact}
            </h3>
            <div className="space-y-2.5 text-sm text-[#FFFBF0]/85">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F07A1F] shrink-0 mt-0.5" />
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FFD23F] transition-colors"
                >
                  {address}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F07A1F] shrink-0" />
                <a
                  href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                  className="hover:text-[#FFD23F] transition-colors"
                >
                  {phone}
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Hours Summary */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#FFD23F]">
              {dict.hours}
            </h3>
            <div className="space-y-2 text-sm text-[#FFFBF0]/85">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#F07A1F] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#FFFBF0]">Dilluns – Divendres</p>
                  <p className="text-xs font-mono text-[#FFFBF0]/70">06:00 – 21:00</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#F07A1F] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#FFFBF0]">Dissabte i Diumenge</p>
                  <p className="text-xs font-mono text-[#FFFBF0]/70">06:00 – 15:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Quick Links & Legal */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#FFD23F]">
              Informació
            </h3>
            <ul className="space-y-2 text-sm list-none p-0">
              <li>
                <Link
                  href={`/${locale}/informacio-alergenos`}
                  className="text-[#FFFBF0]/80 hover:text-[#FFD23F] transition-colors"
                >
                  {dict.allergens}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/avis-legal`}
                  className="text-[#FFFBF0]/80 hover:text-[#FFD23F] transition-colors"
                >
                  {dict.legalNotice}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/politica-de-privacitat`}
                  className="text-[#FFFBF0]/80 hover:text-[#FFD23F] transition-colors"
                >
                  {dict.privacy}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/cookies`}
                  className="text-[#FFFBF0]/80 hover:text-[#FFD23F] transition-colors"
                >
                  {dict.cookies}
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 text-xs text-[#FFD23F]/80 hover:text-[#FFD23F] transition-colors"
                >
                  <Lock className="w-3 h-3" />
                  <span>Gestió interna (CMS)</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[#2236C8]/40 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FFFBF0]/60 gap-4">
          <p>© {currentYear} {businessName} · Badalona (Barcelona). Tots els drets reservats.</p>
          <p>Fet amb estima per al barri de Badalona.</p>
        </div>
      </div>
    </footer>
  );
}
