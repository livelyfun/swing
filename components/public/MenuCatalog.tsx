"use client";

import React, { useState } from "react";
import { Locale } from "@/lib/i18n";
import { ProductItem, CategoryItem } from "@/lib/content-store";
import { ShieldCheck, Search, Filter, Wheat, MessageCircle } from "lucide-react";

interface MenuCatalogProps {
  locale: Locale;
  products: ProductItem[];
  categories: CategoryItem[];
  phone: string;
  showPrices: boolean;
}

export function MenuCatalog({
  locale,
  products,
  categories,
  phone,
  showPrices,
}: MenuCatalogProps) {
  const [selectedCat, setSelectedCat] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAllergenFilter, setSelectedAllergenFilter] = useState<string>("ALL");

  const cleanPhone = phone.replace(/[^0-9+]/g, "");

  const filteredProducts = products.filter((p) => {
    const name = (p.name[locale] || p.name.es).toLowerCase();
    const desc = (p.description[locale] || p.description.es).toLowerCase();
    const matchesQuery = name.includes(searchQuery.toLowerCase()) || desc.includes(searchQuery.toLowerCase());
    const matchesCat = selectedCat === "ALL" || p.categoryId === selectedCat;
    const matchesAllergen =
      selectedAllergenFilter === "ALL" ||
      (selectedAllergenFilter === "gluten-free"
        ? !p.allergens.includes("gluten")
        : p.allergens.includes(selectedAllergenFilter));

    return matchesQuery && matchesCat && matchesAllergen;
  });

  return (
    <div className="space-y-8">
      {/* Search and Category Filter Chips */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between pb-6 border-b border-[#D9C4A8]/40">
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder={
              locale === "ca"
                ? "Cercar pa, croissants, panellets..."
                : "Buscar pan, croissants, tartas..."
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#A8531C] bg-white shadow-2xs"
          />
        </div>

        {/* Category Chips */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <button
            type="button"
            onClick={() => setSelectedCat("ALL")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              selectedCat === "ALL"
                ? "bg-[#A8531C] text-white shadow-2xs"
                : "bg-white border border-[#D9C4A8] text-[#3B2A20] hover:bg-stone-50"
            }`}
          >
            {locale === "ca" ? "Tots els productes" : "Todos los productos"}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCat(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                selectedCat === cat.id
                  ? "bg-[#A8531C] text-white shadow-2xs"
                  : "bg-white border border-[#D9C4A8] text-[#3B2A20] hover:bg-stone-50"
              }`}
            >
              {cat.name[locale] || cat.name.es}
            </button>
          ))}
        </div>
      </div>

      {/* Product Cards Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl p-6 bg-white border border-[#D9C4A8] shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow group"
            >
              <div className="space-y-2.5">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-serif text-lg font-bold text-[#3B2A20] group-hover:text-[#A8531C] transition-colors">
                    {item.name[locale] || item.name.es}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#F1E4D3] text-[#A8531C] shrink-0">
                    {item.badge || (item.isSeasonal ? "Temporada" : "Artesà")}
                  </span>
                </div>

                <p className="text-sm text-[#5C4638] leading-relaxed line-clamp-3">
                  {item.description[locale] || item.description.es}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                {/* 14 EU Allergens indicator */}
                <div className="flex items-center gap-1.5 text-[#A8531C] font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span className="truncate max-w-[170px]" title={item.allergens.join(", ")}>
                    {item.allergens.length > 0
                      ? item.allergens.join(", ")
                      : locale === "ca"
                      ? "Sense al·lèrgens"
                      : "Sin alérgenos"}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {showPrices && item.priceCents && (
                    <span className="font-mono font-bold text-stone-900 text-sm">
                      {(item.priceCents / 100).toFixed(2)} €
                    </span>
                  )}
                  <a
                    href={`https://wa.me/${cleanPhone.replace("+", "")}?text=${encodeURIComponent(
                      `Hola! M'agradaria consultar sobre: ${item.name[locale] || item.name.es}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-emerald-800 hover:text-emerald-900 text-decoration-none"
                  >
                    <span>Consultar</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-2xl border border-stone-200 space-y-3">
          <Wheat className="w-10 h-10 text-stone-400 mx-auto" />
          <h4 className="font-serif font-bold text-base text-stone-800">
            {locale === "ca"
              ? "No s'han trobat productes en aquesta categoria"
              : "No se encontraron productos en esta categoría"}
          </h4>
          <p className="text-xs text-stone-500">
            {locale === "ca"
              ? "Pots restablir els filtres per veure tota la selecció de l'obrador."
              : "Puedes restablecer los filtros para ver toda la selección."}
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCat("ALL");
              setSearchQuery("");
            }}
            className="px-4 py-2 rounded-xl bg-[#A8531C] text-white font-semibold text-xs"
          >
            {locale === "ca" ? "Veure tots els productes" : "Ver todos los productos"}
          </button>
        </div>
      )}
    </div>
  );
}
