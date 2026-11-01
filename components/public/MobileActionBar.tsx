import React from "react";
import { Locale, getDictionary } from "@/lib/i18n";
import { Phone, MessageCircle, Navigation } from "lucide-react";

import { PublicSiteSettings } from "@/lib/settings";

interface MobileActionBarProps {
  locale: Locale;
  settings?: PublicSiteSettings;
}

export function MobileActionBar({ locale, settings }: MobileActionBarProps) {
  const dict = getDictionary(locale);
  const phone = settings?.phone || "+34 934 60 66 70";
  const cleanPhone = phone.replace(/[^0-9+]/g, "");
  const mapsUrl = settings?.googleMapsUrl || "https://maps.app.goo.gl/Vr26Zu4LZqhYDtpR8";

  return (
    <aside
      aria-label="Acciones rápidas"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#FFF8EF]/95 backdrop-blur-md border-t border-[#D9C4A8] px-3 py-2 shadow-lg"
    >
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {/* Call Button */}
        <a
          href={`tel:${cleanPhone}`}
          className="flex flex-col items-center justify-center min-h-[48px] py-1.5 px-2 rounded-xl bg-[#F1E4D3] text-[#3B2A20] active:scale-98 transition-transform text-decoration-none"
        >
          <Phone className="w-5 h-5 text-[#A8531C] mb-0.5" />
          <span className="text-[11px] font-bold leading-none">{dict.call}</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${cleanPhone.replace("+", "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center min-h-[48px] py-1.5 px-2 rounded-xl bg-emerald-700 text-white active:scale-98 transition-transform shadow-xs text-decoration-none"
        >
          <MessageCircle className="w-5 h-5 mb-0.5" />
          <span className="text-[11px] font-bold leading-none">{dict.whatsapp}</span>
        </a>

        {/* Directions Button */}
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center min-h-[48px] py-1.5 px-2 rounded-xl bg-[#3B2A20] text-white active:scale-98 transition-transform shadow-xs text-decoration-none"
        >
          <Navigation className="w-5 h-5 text-[#E9B44C] mb-0.5" />
          <span className="text-[11px] font-bold leading-none">{dict.directions}</span>
        </a>
      </div>
    </aside>
  );
}
