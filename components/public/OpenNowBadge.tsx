import React from "react";
import { getBakeryOpenStatus } from "@/lib/hours";
import { Locale } from "@/lib/i18n";
import { Clock } from "lucide-react";

interface OpenNowBadgeProps {
  locale: Locale;
  className?: string;
}

export function OpenNowBadge({ locale, className = "" }: OpenNowBadgeProps) {
  const status = getBakeryOpenStatus(undefined, undefined, locale);

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${
        status.isOpen
          ? "bg-[#2236C8]/10 text-[#2236C8] border-[#2236C8]/30 font-semibold"
          : "bg-stone-100 text-stone-700 border-stone-200"
      } ${className}`}
      title="Horari d'obertura a Badalona (Europe/Madrid)"
    >
      <Clock className="w-3.5 h-3.5 shrink-0" />
      <span>{status.statusText}</span>
    </div>
  );
}
