import Link from "next/link";
import { Wheat, ArrowLeft } from "lucide-react";
import { DEFAULT_LOCALE } from "@/lib/i18n";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FFF8EF] text-[#3B2A20] flex flex-col items-center justify-center p-6 text-center space-y-6">
      <div className="w-14 h-14 rounded-2xl bg-[#F1E4D3] text-[#A8531C] flex items-center justify-center mx-auto shadow-sm">
        <Wheat className="w-8 h-8" />
      </div>

      <div className="space-y-2 max-w-md">
        <span className="text-xs font-bold uppercase tracking-widest text-[#A8531C]">
          Error 404 · Pàgina no trobada
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#3B2A20]">
          Aquesta pàgina s'ha acabat com el pa calent.
        </h1>
        <p className="text-sm text-[#5C4638] leading-relaxed">
          L'adreça que cerques no existeix o ha canviat de lloc. Pots tornar a la portada del forn per veure els nostres productes i horaris.
        </p>
      </div>

      <Link
        href={`/${DEFAULT_LOCALE}`}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#A8531C] text-white font-semibold text-sm hover:bg-[#8f4314] transition-colors shadow-xs text-decoration-none"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Tornar a l'inici</span>
      </Link>
    </div>
  );
}
