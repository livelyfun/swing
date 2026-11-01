"use client";

import React from "react";
import Link from "next/link";
import { Locale, Dictionary } from "@/lib/i18n";
import { PublicSiteSettings } from "@/lib/settings";
import { OpenStatusResult, OpeningHoursRange } from "@/lib/hours";
import { ProductItem, SeasonalCampaign, TestimonialItem } from "@/lib/content-store";
import { ShopSun } from "@/components/motion/ShopSun";
import { Marquee } from "@/components/motion/Marquee";
import { HangingTag } from "@/components/motion/HangingTag";
import { Pressable } from "@/components/motion/Pressable";
import { Reveal } from "@/components/motion/Reveal";
import { ConsentGatedMap } from "./ConsentGatedMap";
import {
  Wheat,
  MapPin,
  Phone,
  MessageCircle,
  Navigation,
  Clock,
  ShieldCheck,
  Cake,
  Quote,
} from "lucide-react";

interface HomeViewProps {
  locale: Locale;
  dict: Dictionary;
  settings: PublicSiteSettings;
  weeklyHours: OpeningHoursRange[];
  status: OpenStatusResult;
  allProducts: ProductItem[];
  activeCampaign?: SeasonalCampaign;
  allTestimonials: TestimonialItem[];
  addressText: string;
  cleanPhone: string;
}

export function HomeView({
  locale,
  dict,
  settings,
  weeklyHours,
  status,
  allProducts,
  activeCampaign,
  allTestimonials,
  addressText,
  cleanPhone,
}: HomeViewProps) {
  const featuredProducts = allProducts.slice(0, 4);

  const marqueeItems = [
    activeCampaign
      ? (activeCampaign.name[locale] || activeCampaign.name.es).toUpperCase()
      : "OBRADOR ARTESÀ A BADALONA",
    "PA DE PAGÈS AMB MASSA MARE I FERMENTACIÓ DE 24 HORES",
    "BRIOIXERIA DEL DIA ENFORNADA A LES 06:00",
    "PASTISSOS PERSONALITZATS PER A CELEBRACIONS",
    `${settings.street.toUpperCase()} · ${settings.city.toUpperCase()}`,
  ];

  return (
    <div className="flex flex-col bg-[#FFFBF0] text-[#0E1540]">
      {/* =========================================================================
          HERO SECTION: "Blue Hour" (Deep Night #0E1540 -> Cobalt #2236C8)
          Features the celestial ShopSun signature moment and left-aligned editorial typography
          ========================================================================= */}
      <section className="relative overflow-hidden bg-[#0E1540] text-[#FFFBF0] pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-[#2236C8]/40">
        {/* Subtle background dawn ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 75% 20%, rgba(34, 54, 200, 0.45) 0%, rgba(14, 21, 64, 0) 70%)",
          }}
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Authentic Obrador Editorial */}
            <div className="lg:col-span-7 space-y-6">
              {/* Quiet unboxed location & craft marker (Zero-Pill discipline) */}
              <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-[#FFD23F] font-semibold">
                <Wheat className="w-4 h-4 text-[#FFD23F] shrink-0" />
                <span>FORN DE PA ARTESÀ I PASTISSERIA A BADALONA</span>
              </div>

              {/* Display Headline in Bricolage Grotesque */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#FFFBF0] leading-[1.12]">
                {locale === "ca"
                  ? "El pa cruixent i la dolçor autèntica de cada matí."
                  : locale === "en"
                  ? "Fresh artisan sourdough and traditional bakery every morning."
                  : "El pan crujiente y la auténtica repostería de cada mañana."}
              </h1>

              {/* Subheading prose */}
              <p className="text-base sm:text-lg text-[#FFFBF0]/85 leading-relaxed max-w-2xl font-normal">
                {locale === "ca"
                  ? "Pa de massa mare amb fermentació lenta, brioixeria fornejada a l'alba i pastissos artesans elaborats cada dia a l'Avinguda Catalunya."
                  : locale === "en"
                  ? "Slow-fermented artisan sourdough, dawn-baked pastries, and handcrafted celebration cakes in Badalona."
                  : "Pan de masa madre con fermentación lenta, bollería horneada al alba y tartas artesanas elaboradas cada día en la Avda. Catalunya."}
              </p>

              {/* Primary Actions (Zero shopping cart / no ordering; visit & WhatsApp only) */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Pressable>
                  <Link
                    href={`/${locale}/productos`}
                    className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-[#F07A1F] text-[#0E1540] font-bold text-sm tracking-wide hover:bg-[#ff8e38] transition-colors shadow-sm text-decoration-none"
                  >
                    <span>{dict.menu}</span>
                  </Link>
                </Pressable>

                <Pressable>
                  <Link
                    href={`/${locale}/tartas-personalizadas`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#2236C8]/40 border border-[#2236C8] text-[#FFFBF0] font-semibold text-sm hover:bg-[#2236C8]/60 transition-colors text-decoration-none"
                  >
                    <Cake className="w-4 h-4 text-[#FFD23F]" />
                    <span>{dict.customCakes}</span>
                  </Link>
                </Pressable>

                <Pressable>
                  <a
                    href={`https://wa.me/${cleanPhone.replace("+", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-700 text-white font-semibold text-sm hover:bg-emerald-800 transition-colors shadow-xs text-decoration-none"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                </Pressable>
              </div>

              {/* Unboxed Metadata (Zero pill boxes) */}
              <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-[#FFFBF0]/75">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#FFD23F]" />
                  <span>{addressText}</span>
                </div>
                <span className="text-[#FFFBF0]/30 hidden sm:inline" aria-hidden="true">
                  /
                </span>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#FFD23F]" />
                  <span>Al·lèrgens regulats (UE 1169/2011)</span>
                </div>
              </div>
            </div>

            {/* Right Column: Signature ShopSun Component */}
            <div className="lg:col-span-5">
              <Reveal direction="down">
                <ShopSun
                  isOpen={status.isOpen}
                  statusLabel={status.isOpen ? "Obert ara mateix" : "Tancat fins demà a les 06:00"}
                  scheduleDetail="Dilluns a Divendres 06:00 – 21:00 · Caps de setmana 06:00 – 15:00"
                  closingOrOpeningText={status.statusText}
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          AMBIENT LOOP: Seasonal Campaign Marquee (Crust Fill with Night Text)
          Pauses on hover/focus for WCAG 2.2 accessibility
          ========================================================================= */}
      <Marquee items={marqueeItems} variant="crust" speedSec={30} />

      {/* =========================================================================
          FEATURED SELECTIONS: Flour Canvas #FFFBF0 with Architectural Arch Windows
          Zero-pill allergen metadata, hanging swing tags, and genuine product descriptions
          ========================================================================= */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#0E1540]/10 pb-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#2236C8] font-bold">
              {locale === "ca" ? "Obrador de Badalona" : "Obrador de Badalona"}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0E1540] mt-1.5">
              {locale === "ca" ? "Especialitats de la nostra taula" : "Especialidades de nuestra mesa"}
            </h2>
          </div>

          <Link
            href={`/${locale}/productos`}
            className="text-sm font-bold text-[#2236C8] hover:underline underline-offset-4 decoration-2 transition-colors self-start sm:self-end"
          >
            <span>{dict.menu}</span>
          </Link>
        </div>

        {/* Product Cards with Arch Geometries */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((item, idx) => (
            <Reveal key={item.id} delay={idx * 0.08}>
              <article className="group flex flex-col justify-between h-full bg-white rounded-2xl border border-[#0E1540]/12 p-5 shadow-xs hover:border-[#2236C8]/40 hover:shadow-md transition-all">
                {/* Arch Top Visual Frame */}
                <div className="space-y-4">
                  <div className="relative w-full h-44 rounded-t-[120px] rounded-b-xl bg-[#0E1540] overflow-hidden flex flex-col items-center justify-center p-4 text-center">
                    {/* Visual pattern representing flour dust and bakery warmth */}
                    <div
                      className="absolute inset-0 opacity-20 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(circle at 50% 30%, #FFD23F 0%, #2236C8 60%, transparent 100%)",
                      }}
                    />

                    {/* Wheat icon inside arch */}
                    <div className="w-12 h-12 rounded-full bg-[#2236C8]/40 border border-[#FFD23F]/30 flex items-center justify-center text-[#FFD23F] mb-2 shadow-inner">
                      <Wheat className="w-6 h-6" />
                    </div>

                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#FFFBF0]/70">
                      Swing Forn de Pa
                    </span>

                    {/* Hanging tag on featured/seasonal items */}
                    {item.badge && (
                      <div className="absolute top-2 right-4 z-20">
                        <HangingTag
                          label={item.badge}
                          variant={idx % 2 === 0 ? "crust" : "sun"}
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold tracking-tight text-[#0E1540] group-hover:text-[#2236C8] transition-colors">
                      <Link href={`/${locale}/productos/${item.slug[locale] || item.slug.es}`}>
                        {item.name[locale] || item.name.es}
                      </Link>
                    </h3>

                    <p className="text-xs text-[#0E1540]/75 leading-relaxed line-clamp-3">
                      {item.description[locale] || item.description.es}
                    </p>
                  </div>
                </div>

                {/* Footer Metadata & Action */}
                <div className="pt-4 mt-4 border-t border-[#0E1540]/10 flex flex-col gap-2.5">
                  {/* Unboxed Allergens List */}
                  <div className="text-[11px] text-[#0E1540]/60 font-mono">
                    <span className="font-semibold text-[#0E1540]/80">Al·lèrgens: </span>
                    {item.allergens.length > 0 ? (
                      item.allergens.map((alg, aIdx) => (
                        <span key={alg}>
                          {alg}
                          {aIdx < item.allergens.length - 1 ? " / " : ""}
                        </span>
                      ))
                    ) : (
                      <span>Sense al·lèrgens declarats</span>
                    )}
                  </div>

                  {/* Direct Contact Action (NO ordering / cart) */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-mono font-bold text-[#0E1540]">
                      {item.priceCents
                        ? `${(item.priceCents / 100).toFixed(2)} €`
                        : "A consultar"}
                    </span>

                    <a
                      href={`https://wa.me/${cleanPhone.replace("+", "")}?text=${encodeURIComponent(
                        `Hola! M'agradaria consultar sobre: ${item.name[locale] || item.name.es}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-[#2236C8] hover:underline"
                    >
                      Consultar per WhatsApp
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* =========================================================================
          OBRADOR PHILOSOPHY: Cobalt #2236C8 Panel
          ========================================================================= */}
      <section className="bg-[#2236C8] text-[#FFFBF0] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-[#FFD23F] font-semibold">
              El secret de l&apos;obrador
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#FFFBF0]">
              Massa mare viva, repòs pacient i farines seleccionades a Badalona.
            </h2>
            <p className="text-base text-[#FFFBF0]/85 leading-relaxed">
              No fem servir additius innecessaris ni accelerem els processos. Cada barra de pa de pagès i cada
              peça de brioixeria passa pel seu temps just de fermentació lenta per assolir una crosta daurada, una
              miga alveolada i la màxima digestibilitat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            <div className="p-6 rounded-2xl bg-[#0E1540]/60 border border-[#FFFBF0]/15 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFD23F] text-[#0E1540] flex items-center justify-center font-bold">
                <Wheat className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#FFFBF0]">Fornada de Matinada</h3>
              <p className="text-xs text-[#FFFBF0]/80 leading-relaxed">
                El forn comença a funcionar a les 04:00 hores perquè quan obrim les portes a les 06:00
                puguis gaudir del pa acabat de sortir de la sola.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0E1540]/60 border border-[#FFFBF0]/15 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F07A1F] text-[#0E1540] flex items-center justify-center font-bold">
                <Cake className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#FFFBF0]">Tartes per Encarrec</h3>
              <p className="text-xs text-[#FFFBF0]/80 leading-relaxed">
                Pastissos d&apos;aniversari i celebracions familiars personalitzats. Pots escollir sabors,
                mides i dedigatòries contactant directament amb el nostre equip.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0E1540]/60 border border-[#FFFBF0]/15 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFFBF0] text-[#0E1540] flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#FFFBF0]">Al·lèrgens Transparent</h3>
              <p className="text-xs text-[#FFFBF0]/80 leading-relaxed">
                Complem rigorosament el Reglament Europeu (UE) 1169/2011 sobre informació alimentària.
                Disposem de fitxes clares per a cadascun dels 14 al·lèrgens d&apos;obligada declaració.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BARRIO TESTIMONIALS: Editorial presentation with authentic attribution
          ========================================================================= */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-[#2236C8] font-bold">
            Opinions del Veïnat
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#0E1540]">
            La confiança de Badalona cada dia
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {allTestimonials.map((t) => (
            <div
              key={t.id}
              className="p-8 rounded-2xl bg-white border border-[#0E1540]/12 shadow-xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <Quote className="w-7 h-7 text-[#F07A1F]" />
                <p className="text-base text-[#0E1540] font-medium italic leading-relaxed">
                  &ldquo;{t.quote[locale] || t.quote.es}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[#0E1540]/8 flex items-center justify-between text-xs font-mono text-[#0E1540]/70">
                <span className="font-bold text-[#0E1540]">{t.authorName}</span>
                <span>{t.sourceLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          LOCATION, HOURS & MAP SECTION: Night Blue Foundation
          ========================================================================= */}
      <section className="bg-[#0E1540] text-[#FFFBF0] py-20 px-4 sm:px-6 lg:px-8 border-t border-[#2236C8]/40">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#2236C8]/40 pb-6">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#FFD23F] font-bold">
                Com trobar-nos
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#FFFBF0] mt-1.5">
                {addressText}
              </h2>
            </div>

            <div className="text-xs font-mono text-[#FFFBF0]/70">
              Badalona · Barcelona · CP 08917
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Map Column with Privacy Consent Gate */}
            <div className="lg:col-span-7">
              <ConsentGatedMap
                locale={locale}
                address={addressText}
                googleMapsUrl={settings.googleMapsUrl}
              />
            </div>

            {/* Structured Weekly Schedule Column */}
            <div className="lg:col-span-5 rounded-2xl p-6 sm:p-8 bg-[#0E1540] border border-[#2236C8]/60 space-y-6 shadow-xl">
              <div className="flex items-center gap-2 pb-3 border-b border-[#2236C8]/40">
                <Clock className="w-5 h-5 text-[#FFD23F]" />
                <h3 className="text-lg font-bold text-[#FFFBF0]">
                  Horari d&apos;obertura complet
                </h3>
              </div>

              <div className="space-y-3 text-sm font-mono">
                <div className="flex justify-between border-b border-[#2236C8]/20 pb-2">
                  <span className="text-[#FFFBF0]/80">Dilluns a Divendres</span>
                  <span className="font-bold text-[#FFD23F] tabular-nums">06:00 – 21:00</span>
                </div>
                <div className="flex justify-between border-b border-[#2236C8]/20 pb-2">
                  <span className="text-[#FFFBF0]/80">Dissabte</span>
                  <span className="font-bold text-[#FFD23F] tabular-nums">06:00 – 15:00</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-[#FFFBF0]/80">Diumenge</span>
                  <span className="font-bold text-[#FFD23F] tabular-nums">06:00 – 15:00</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={settings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#F07A1F] text-[#0E1540] font-bold text-xs hover:bg-[#ff8e38] transition-colors shadow-xs"
                >
                  <Navigation className="w-4 h-4" />
                  <span>{dict.directions}</span>
                </a>

                <a
                  href={`tel:${cleanPhone}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#2236C8]/40 border border-[#2236C8] text-[#FFFBF0] font-semibold text-xs hover:bg-[#2236C8]/60 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#FFD23F]" />
                  <span>{dict.call}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
