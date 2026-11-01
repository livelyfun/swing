"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Locale } from "@/lib/i18n";
import { FaqItem } from "@/lib/content-store";
import { ChevronDown, Search, HelpCircle, MessageCircle } from "lucide-react";

interface FaqAccordionProps {
  locale: Locale;
  faqs: FaqItem[];
}

export function FaqAccordion({ locale, faqs }: FaqAccordionProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [openIds, setOpenIds] = useState<string[]>(["faq-1"]);

  const categories = ["ALL", ...Array.from(new Set(faqs.map((f) => f.category)))];

  const filteredFaqs = faqs.filter((faq) => {
    const q = (faq.question[locale] || faq.question.es).toLowerCase();
    const a = (faq.answer[locale] || faq.answer.es).toLowerCase();
    const matchesSearch = q.includes(search.toLowerCase()) || a.includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "ALL" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFaq = (id: string) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter((item) => item !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Category Filter */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder={
              locale === "ca"
                ? "Cercar preguntes sobre horaris, pastissos..."
                : "Buscar preguntas sobre horarios, tartas..."
            }
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#A8531C] bg-white shadow-2xs"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedCategory === cat
                  ? "bg-[#A8531C] text-white shadow-2xs"
                  : "bg-white border border-[#D9C4A8] text-[#3B2A20] hover:bg-stone-50"
              }`}
            >
              {cat === "ALL" ? (locale === "ca" ? "Totes" : "Todas") : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-[#D9C4A8] bg-white overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left font-serif font-bold text-base text-[#3B2A20] hover:text-[#A8531C] transition-colors"
                >
                  <span className="pr-4">{faq.question[locale] || faq.question.es}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#A8531C] shrink-0 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-[#5C4638] leading-relaxed border-t border-stone-100 bg-[#FFF8EF]/30">
                    <p>{faq.answer[locale] || faq.answer.es}</p>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center bg-white rounded-2xl border border-stone-200 space-y-2">
            <HelpCircle className="w-8 h-8 text-stone-400 mx-auto" />
            <p className="text-sm text-stone-600">
              {locale === "ca"
                ? "No s'han trobat preguntes que coincideixin amb la cerca."
                : "No se encontraron preguntas que coincidan con la búsqueda."}
            </p>
          </div>
        )}
      </div>

      {/* Still have questions CTA */}
      <div className="p-6 rounded-2xl bg-[#F1E4D3]/50 border border-[#D9C4A8] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-serif font-bold text-base text-[#3B2A20]">
            {locale === "ca" ? "Encara tens algun dubte?" : "¿Aún tienes dudas?"}
          </h4>
          <p className="text-xs text-[#5C4638]">
            {locale === "ca"
              ? "Truca'ns o escriu-nos directament a l'obrador de Badalona."
              : "Llámanos o escríbenos directamente a nuestro obrador en Badalona."}
          </p>
        </div>
        <Link
          href={`/${locale}/contacto`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#A8531C] text-white font-semibold text-xs hover:bg-[#8f4314] transition-colors shadow-xs text-decoration-none shrink-0"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{locale === "ca" ? "Contactar amb el forn" : "Contactar con el obrador"}</span>
        </Link>
      </div>
    </div>
  );
}
