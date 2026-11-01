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
      aria-label="Accions ràpides d'obrador"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0E1540] border-t border-[#2236C8]/40 px-3 py-2 shadow-2xl"
    >
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {/* Call Button */}
        <a
          href={`tel:${cleanPhone}`}
          className="flex flex-col items-center justify-center min-h-[46px] py-1 px-2 rounded-xl bg-[#2236C8]/40 text-[#FFFBF0] active:scale-95 transition-transform"
        >
          <Phone className="w-4 h-4 text-[#FFD23F] mb-0.5" />
          <span className="text-[11px] font-semibold leading-tight">{dict.call}</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${cleanPhone.replace("+", "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center min-h-[46px] py-1 px-2 rounded-xl bg-emerald-700 text-white active:scale-95 transition-transform shadow-xs"
        >
          <MessageCircle className="w-4 h-4 mb-0.5" />
          <span className="text-[11px] font-semibold leading-tight">{dict.whatsapp}</span>
        </a>

        {/* Directions Button */}
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center min-h-[46px] py-1 px-2 rounded-xl bg-[#F07A1F] text-[#0E1540] active:scale-95 transition-transform shadow-xs"
        >
          <Navigation className="w-4 h-4 mb-0.5" />
          <span className="text-[11px] font-bold leading-tight">{dict.directions}</span>
        </a>
      </div>
    </aside>
  );
}
