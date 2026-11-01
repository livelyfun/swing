import React from "react";
import { getBakeryOpenStatus } from "@/lib/hours";
import { Locale } from "@/lib/i18n";
import { Clock } from "lucide-react";

interface OpenNowBadgeProps {
  locale: Locale;
}

export function OpenNowBadge({ locale }: OpenNowBadgeProps) {
  const status = getBakeryOpenStatus(undefined, undefined, locale);

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
        status.isOpen
          ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
          : "bg-amber-100 text-amber-900 border border-amber-300"
      }`}
      title="Horario en Badalona (Europe/Madrid)"
    >
      <span
        className={`w-2 h-2 rounded-full ${
          status.isOpen ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
        }`}
      />
      <Clock className="w-3.5 h-3.5" />
      <span>{status.statusText}</span>
    </div>
  );
}
