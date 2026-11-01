"use client";

import React, { useState } from "react";
import { MapPin, Navigation, ShieldCheck } from "lucide-react";
import { Locale, getDictionary } from "@/lib/i18n";

interface ConsentGatedMapProps {
  locale: Locale;
  address: string;
  googleMapsUrl: string;
}

export function ConsentGatedMap({
  locale,
  address,
  googleMapsUrl,
}: ConsentGatedMapProps) {
  const [mapLoaded, setMapLoaded] = useState(false);
  const dict = getDictionary(locale);

  if (mapLoaded) {
    return (
      <div className="w-full h-80 rounded-2xl overflow-hidden border border-[#D9C4A8] shadow-inner relative">
        <iframe
          title="Ubicació Swing Forn de Pa"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2990.2307185375713!2d2.2274596!3d41.4502221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4bb4cf73bc4f7%3A0x7d6a5c18dc905d!2sAv.+Catalunya%2C+39%2C+08917+Badalona%2C+Barcelona!5e0!3m2!1ses!2ses!4v1700000000000"
        />
      </div>
    );
  }

  return (
    <div className="w-full h-80 rounded-2xl bg-stone-100 border border-[#D9C4A8] flex flex-col items-center justify-center p-6 text-center space-y-4 shadow-xs">
      <div className="w-12 h-12 rounded-2xl bg-[#F1E4D3] text-[#A8531C] flex items-center justify-center">
        <MapPin className="w-6 h-6" />
      </div>

      <div className="space-y-1 max-w-md">
        <h3 className="font-serif font-bold text-base text-[#3B2A20]">
          {locale === "ca"
            ? "Mapa interactiu protegit per privadesa"
            : locale === "en"
            ? "Privacy-protected interactive map"
            : "Mapa interactivo protegido por privacidad"}
        </h3>
        <p className="text-xs text-[#5C4638] leading-relaxed">
          {locale === "ca"
            ? "Per protegir la teva privadesa segons el RGPD, cal la teva autorització abans de carregar contingut extern de Google Maps."
            : locale === "en"
            ? "To protect your privacy under GDPR, Google Maps external resources are only loaded upon your request."
            : "Para proteger tu privacidad conforme al RGPD, se requiere tu autorización antes de cargar recursos externos de Google Maps."}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
        <button
          type="button"
          onClick={() => setMapLoaded(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#A8531C] text-white font-semibold text-xs hover:bg-[#8f4314] transition-colors shadow-xs"
        >
          <ShieldCheck className="w-4 h-4 text-[#E9B44C]" />
          <span>
            {locale === "ca"
              ? "Carregar mapa interactiu"
              : locale === "en"
              ? "Load interactive map"
              : "Cargar mapa interactivo"}
          </span>
        </button>

        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-[#D9C4A8] text-[#3B2A20] font-semibold text-xs hover:bg-stone-50 transition-colors text-decoration-none shadow-2xs"
        >
          <Navigation className="w-3.5 h-3.5 text-[#A8531C]" />
          <span>{dict.directions} (Google Maps)</span>
        </a>
      </div>
    </div>
  );
}
