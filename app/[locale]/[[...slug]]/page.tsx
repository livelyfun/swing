import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale, Locale, getDictionary } from "@/lib/i18n";
import { resolvePath } from "@/lib/resolve-path";
import { getBakeryOpenStatus } from "@/lib/hours";
import { getSiteSettings, getWeeklyHours } from "@/lib/settings";
import { contentStore } from "@/lib/content-store";
import { ConsentGatedMap } from "@/components/public/ConsentGatedMap";
import { ContactInquiryForm } from "@/components/public/ContactInquiryForm";
import { FaqAccordion } from "@/components/public/FaqAccordion";
import { MenuCatalog } from "@/components/public/MenuCatalog";
import {
  Wheat,
  Clock,
  MapPin,
  Phone,
  MessageCircle,
  Navigation,
  Sparkles,
  Cake,
  ShieldCheck,
  ChevronRight,
  Info,
  Calendar,
  Quote,
  BookOpen,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";

interface PageProps {
  params: Promise<{
    locale: string;
    slug?: string[];
  }>;
}

export default async function PublicPage({ params }: PageProps) {
  const { locale, slug = [] } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const validLocale = locale as Locale;
  const resolved = await resolvePath(validLocale, slug);

  if (resolved.type === "NOT_FOUND") {
    notFound();
  }

  const dict = getDictionary(validLocale);
  const [settings, weeklyHours] = await Promise.all([
    getSiteSettings(validLocale),
    getWeeklyHours(),
  ]);
  const status = getBakeryOpenStatus(weeklyHours, undefined, validLocale);
  const cleanPhone = settings.phone.replace(/[^0-9+]/g, "");
  const addressText = `${settings.street}, ${settings.city}`;
  const allProducts = contentStore.getProducts();
  const allCampaigns = contentStore.getCampaigns();
  const activeCampaign = allCampaigns.find((c) => c.active);
  const allPosts = contentStore.getPosts();
  const allFaqs = contentStore.getFaqs();
  const allTestimonials = contentStore.getTestimonials();

  // 1. HOME PAGE
  if (resolved.type === "HOME") {
    return (
      <div className="flex flex-col">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF8EF] via-[#FFF8EF] to-[#F1E4D3]/40 pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-[#D9C4A8]/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Text Left */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1E4D3] text-[#A8531C] text-xs font-semibold">
                  <Wheat className="w-4 h-4" />
                  <span>Forn de pa artesà i pastisseria a Badalona</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#3B2A20] tracking-tight leading-[1.15]">
                  {validLocale === "ca"
                    ? "El pa cruixent i la dolçor autèntica de cada matí."
                    : validLocale === "en"
                    ? "Freshly baked artisan bread and handcrafted pastries every morning."
                    : "El pan crujiente y la auténtica repostería de cada mañana."}
                </h1>

                <p className="text-lg sm:text-xl text-[#5C4638] leading-relaxed max-w-2xl">
                  {validLocale === "ca"
                    ? "Pa d'obrador, brioixeria tradicional, panellets de temporada i pastissos personalitzats fets amb ingredients de proximitat a l'Avinguda Catalunya."
                    : validLocale === "en"
                    ? "Artisanal breads, traditional pastries, seasonal Catalan specialties, and custom celebration cakes in Badalona."
                    : "Pan de obrador, bollería tradicional, dulces de temporada y tartas personalizadas elaboradas con ingredientes de calidad en la Avda. Catalunya."}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href={`/${validLocale}/productos`}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#A8531C] text-white font-semibold text-sm hover:bg-[#8f4314] transition-colors shadow-sm text-decoration-none"
                  >
                    <span>{dict.menu}</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href={`/${validLocale}/tartas-personalizadas`}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-[#D9C4A8] text-[#3B2A20] font-semibold text-sm hover:bg-[#F1E4D3]/50 transition-colors shadow-xs text-decoration-none"
                  >
                    <Cake className="w-4 h-4 text-[#A8531C]" />
                    <span>{dict.customCakes}</span>
                  </Link>

                  <a
                    href={`https://wa.me/${cleanPhone.replace("+", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-700 text-white font-semibold text-sm hover:bg-emerald-800 transition-colors shadow-xs text-decoration-none"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                {/* Quick Info Chips */}
                <div className="pt-4 flex flex-wrap items-center gap-4 text-xs text-[#5C4638]">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#A8531C]" />
                    <span>{status.statusText}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#A8531C]" />
                    <span>{addressText}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#A8531C]" />
                    <span>Al·lèrgens regulats (UE 1169/2011)</span>
                  </div>
                </div>
              </div>

              {/* Visual Card Right */}
              <div className="lg:col-span-5">
                <div className="relative rounded-3xl p-6 sm:p-8 bg-white border border-[#D9C4A8] shadow-md space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-[#D9C4A8]/40">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#A8531C]">
                        Horari a Badalona
                      </p>
                      <h2 className="text-xl font-serif font-bold text-[#3B2A20]">
                        {status.isOpen ? "Obert ara mateix" : "Obrim aviat"}
                      </h2>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        status.isOpen
                          ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                          : "bg-amber-100 text-amber-900 border border-amber-300"
                      }`}
                    >
                      {status.isOpen ? "OPEN" : "CLOSED"}
                    </span>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-1.5 border-b border-stone-100">
                      <span className="font-medium text-[#5C4638]">Dilluns – Divendres</span>
                      <span className="font-bold text-[#3B2A20]">06:00 – 21:00</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-stone-100">
                      <span className="font-medium text-[#5C4638]">Dissabte</span>
                      <span className="font-bold text-[#3B2A20]">06:00 – 15:00</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="font-medium text-[#5C4638]">Diumenge</span>
                      <span className="font-bold text-[#3B2A20]">06:00 – 15:00</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <a
                      href={settings.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#3B2A20] hover:bg-[#2b1f17] text-white font-semibold text-sm transition-colors text-decoration-none shadow-xs"
                    >
                      <Navigation className="w-4 h-4 text-[#E9B44C]" />
                      <span>{dict.directions} (Google Maps)</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ACTIVE SEASONAL CAMPAIGN BANNER */}
        {activeCampaign && (
          <section className="bg-[#A8531C] text-white py-6 px-4 sm:px-6 lg:px-8 shadow-inner">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 text-center md:text-left">
                <Sparkles className="w-6 h-6 text-[#E9B44C] shrink-0" />
                <div>
                  <h3 className="font-serif text-lg font-bold">
                    {activeCampaign.name[validLocale] || activeCampaign.name.es}
                  </h3>
                  <p className="text-xs text-[#FFF8EF]/85">
                    {activeCampaign.story[validLocale] || activeCampaign.story.es}
                  </p>
                </div>
              </div>
              <Link
                href={`/${validLocale}/especialidades`}
                className="px-4 py-2 rounded-xl bg-[#E9B44C] text-[#3B2A20] font-bold text-xs hover:bg-amber-400 transition-colors shrink-0 text-decoration-none shadow-xs"
              >
                {validLocale === "ca" ? "Veure especialitats" : "Ver especialidades"}
              </Link>
            </div>
          </section>
        )}

        {/* FEATURED PRODUCTS SHOWCASE */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#A8531C]">
                {validLocale === "ca" ? "El nostre obrador" : "Nuestro obrador"}
              </span>
              <h2 className="text-3xl font-serif font-bold text-[#3B2A20] mt-1">
                {validLocale === "ca" ? "Especialitats destacades" : "Especialidades destacadas"}
              </h2>
            </div>
            <Link
              href={`/${validLocale}/productos`}
              className="text-xs font-bold text-[#A8531C] hover:text-[#8f4314] flex items-center gap-1 text-decoration-none"
            >
              <span>{dict.menu}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allProducts.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="rounded-2xl p-5 bg-white border border-[#D9C4A8] shadow-xs flex flex-col justify-between space-y-3 hover:shadow-md transition-shadow"
              >
                <div className="space-y-1.5">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F1E4D3] text-[#A8531C]">
                    {item.badge || "Artesà"}
                  </span>
                  <h3 className="font-serif text-base font-bold text-[#3B2A20]">
                    {item.name[validLocale] || item.name.es}
                  </h3>
                  <p className="text-xs text-[#5C4638] line-clamp-2">
                    {item.description[validLocale] || item.description.es}
                  </p>
                </div>
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-500 text-[11px]">
                    {item.allergens.length > 0 ? item.allergens.join(", ") : "Sense al·lèrgens"}
                  </span>
                  <a
                    href={`https://wa.me/${cleanPhone.replace("+", "")}?text=${encodeURIComponent(
                      `Hola! Vull demanar informació sobre ${item.name[validLocale] || item.name.es}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 font-bold hover:underline"
                  >
                    Demana →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* THREE VALUE PROPS */}
        <section className="py-12 bg-white border-y border-[#D9C4A8]/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-[#FFF8EF] border border-[#D9C4A8] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#F1E4D3] text-[#A8531C] flex items-center justify-center">
                  <Wheat className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#3B2A20]">
                  {validLocale === "ca" ? "Fornada Diària" : "Horneado Diario"}
                </h3>
                <p className="text-sm text-[#5C4638] leading-relaxed">
                  {validLocale === "ca"
                    ? "Pa de massa mare i barres cruixents enfornades cada dia a primera hora del matí a Badalona."
                    : "Panes de masa madre, barras crujientes y bollería horneada cada madrugada con esmero."}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#FFF8EF] border border-[#D9C4A8] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#F1E4D3] text-[#A8531C] flex items-center justify-center">
                  <Cake className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#3B2A20]">
                  {validLocale === "ca" ? "Pastissos Personalitzats" : "Tartas Personalizadas"}
                </h3>
                <p className="text-sm text-[#5C4638] leading-relaxed">
                  {validLocale === "ca"
                    ? "Celebra aniversaris i dates especials amb pastissos a mida. Consulta sabors i mides per WhatsApp."
                    : "Celebraciones y cumpleaños con tartas por encargo a tu medida. Consulta sabores y raciones por WhatsApp."}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#FFF8EF] border border-[#D9C4A8] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#F1E4D3] text-[#A8531C] flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#3B2A20]">
                  {validLocale === "ca" ? "Al·lèrgens Clars" : "Alérgenos Transparentes"}
                </h3>
                <p className="text-sm text-[#5C4638] leading-relaxed">
                  {validLocale === "ca"
                    ? "Informació rigorosa segons la normativa europea dels 14 al·lèrgens per a la teva tranquil·litat."
                    : "Información clara y verificada según la normativa europea de los 14 alérgenos de obligada declaración."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CURATED TESTIMONIALS */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#A8531C]">
              {validLocale === "ca" ? "Opinions del barri" : "Opiniones del barrio"}
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#3B2A20]">
              {validLocale === "ca" ? "La confiança dels nostres clients" : "La confianza de nuestros clientes"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allTestimonials.map((t) => (
              <div
                key={t.id}
                className="p-6 rounded-2xl bg-white border border-[#D9C4A8] shadow-xs space-y-4"
              >
                <Quote className="w-8 h-8 text-[#E9B44C]" />
                <p className="text-base text-[#3B2A20] font-serif italic leading-relaxed">
                  "{t.quote[validLocale] || t.quote.es}"
                </p>
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-[#5C4638]">
                  <span className="font-bold text-[#3B2A20]">{t.authorName}</span>
                  <span>{t.sourceLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* VISIT & LOCATION SECTION WITH CONSENT-GATED MAP */}
        <section className="bg-[#F1E4D3]/40 border-t border-[#D9C4A8] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-3xl font-serif font-bold text-[#3B2A20]">
                {validLocale === "ca" ? "Visita'ns a Badalona" : "Ven a visitarnos en Badalona"}
              </h2>
              <p className="text-sm text-[#5C4638]">
                {addressText} · Tel. {settings.phone}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Map embed column */}
              <div className="lg:col-span-7">
                <ConsentGatedMap
                  locale={validLocale}
                  address={addressText}
                  googleMapsUrl={settings.googleMapsUrl}
                />
              </div>

              {/* Hours details column */}
              <div className="lg:col-span-5 rounded-2xl p-6 sm:p-8 bg-[#3B2A20] text-white space-y-5 shadow-md">
                <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#E9B44C]" />
                  <span>Horari complet de l'obrador</span>
                </h3>

                <div className="space-y-3 text-sm text-[#F1E4D3]/90">
                  <div className="flex justify-between border-b border-[#D9C4A8]/20 pb-2">
                    <span className="font-medium">Dilluns a Divendres</span>
                    <span className="font-bold text-white">06:00 – 21:00</span>
                  </div>
                  <div className="flex justify-between border-b border-[#D9C4A8]/20 pb-2">
                    <span className="font-medium">Dissabte</span>
                    <span className="font-bold text-white">06:00 – 15:00</span>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span className="font-medium">Diumenge</span>
                    <span className="font-bold text-white">06:00 – 15:00</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <a
                    href={settings.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#A8531C] text-white font-semibold text-xs hover:bg-[#8f4314] transition-colors text-decoration-none shadow-xs"
                  >
                    <Navigation className="w-4 h-4 text-[#E9B44C]" />
                    <span>{dict.directions}</span>
                  </a>
                  <a
                    href={`tel:${cleanPhone}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#F1E4D3] text-[#3B2A20] font-semibold text-xs hover:bg-[#e6d3bd] transition-colors text-decoration-none"
                  >
                    <Phone className="w-4 h-4 text-[#A8531C]" />
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

  // 2. MENU / PRODUCTS
  if (resolved.type === "MENU_INDEX" || resolved.type === "PRODUCT") {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1E4D3] text-[#A8531C] text-xs font-semibold">
            <Wheat className="w-3.5 h-3.5" />
            <span>{dict.menu}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#3B2A20]">
            {validLocale === "ca"
              ? "Els nostres pans i elaborats artesans"
              : "Nuestros panes y elaboraciones artesanales"}
          </h1>
          <p className="text-sm sm:text-base text-[#5C4638] max-w-2xl leading-relaxed">
            {validLocale === "ca"
              ? "Rebosteria, pans d'obrador, brioixeria, pastissos per a celebracions i entrepans fets cada dia."
              : "Repostería, panadería tradicional, bollería, tartas para celebraciones y bocadillos preparados a diario."}
          </p>
        </div>

        <MenuCatalog
          locale={validLocale}
          products={allProducts}
          categories={contentStore.getCategories()}
          phone={settings.phone}
          showPrices={settings.showPrices}
        />
      </div>
    );
  }

  // 3. SEASONAL CAMPAIGNS
  if (resolved.type === "SEASONAL_INDEX" || resolved.type === "CAMPAIGN") {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1E4D3] text-[#A8531C] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{dict.seasonal}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#3B2A20]">
            {validLocale === "ca"
              ? "Tradicions i dolços de temporada a Badalona"
              : "Tradiciones y dulces de temporada en Badalona"}
          </h1>
          <p className="text-sm sm:text-base text-[#5C4638] leading-relaxed">
            {validLocale === "ca"
              ? "A Catalunya cada festa té el seu dolç artesanal. Descobreix el nostre calendari d'obrador al llarg de l'any."
              : "En Cataluña cada fiesta tiene su dulce tradicional. Descubre nuestro calendario de celebraciones."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allCampaigns.map((camp) => (
            <div
              key={camp.id}
              className="p-6 rounded-2xl bg-white border border-[#D9C4A8] shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-serif text-xl font-bold text-[#3B2A20]">
                    {camp.name[validLocale] || camp.name.es}
                  </h3>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      camp.active
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-stone-100 text-stone-600"
                    }`}
                  >
                    {camp.active
                      ? validLocale === "ca"
                        ? "Activa ara"
                        : "Activa ahora"
                      : validLocale === "ca"
                      ? "Properament"
                      : "Próximamente"}
                  </span>
                </div>

                <p className="text-sm text-[#5C4638] leading-relaxed">
                  {camp.story[validLocale] || camp.story.es}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-[#5C4638]">
                <div className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-[#A8531C]" />
                  <span>
                    {camp.startsOn} – {camp.endsOn}
                  </span>
                </div>
                <a
                  href={`https://wa.me/${cleanPhone.replace("+", "")}?text=${encodeURIComponent(
                    `Hola! Vull encarregar especialitats de ${camp.name[validLocale] || camp.name.es}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-emerald-800 hover:text-emerald-900"
                >
                  Consultar per WhatsApp →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 4. CUSTOM CAKES
  if (resolved.type === "CUSTOM_CAKES") {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1E4D3] text-[#A8531C] text-xs font-semibold">
            <Cake className="w-4 h-4" />
            <span>{dict.customCakes}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#3B2A20]">
            {validLocale === "ca"
              ? "Pastissos a mida per a les teves celebracions"
              : "Tartas artesanales a medida para tus celebraciones"}
          </h1>
          <p className="text-base text-[#5C4638] leading-relaxed">
            {validLocale === "ca"
              ? "Aniversaris, trobades familiars o dates assenyalades. A Swing Forn de Pa elaborem pastissos personalitzats amb els millors ingredients i acabats artesans."
              : "Cumpleaños, aniversarios o fechas señaladas. En Swing Forn de Pa elaboramos tartas personalizadas con ingredientes de máxima calidad."}
          </p>
        </div>

        {/* Portion Guide & Flavors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#D9C4A8] space-y-3">
            <h3 className="font-serif text-lg font-bold text-[#3B2A20]">
              Guia de racions
            </h3>
            <p className="text-xs text-[#5C4638] leading-relaxed">
              Mides disponibles des de 6-8 racions per a festes íntimes fins a 25-30 racions per a grans trobades.
            </p>
            <ul className="text-xs space-y-1.5 text-stone-700 pt-1">
              <li>• Petita: 6 a 8 persones</li>
              <li>• Mitjana: 10 a 14 persones</li>
              <li>• Gran: 16 a 24 persones</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#D9C4A8] space-y-3">
            <h3 className="font-serif text-lg font-bold text-[#3B2A20]">
              Sabors i farcits
            </h3>
            <p className="text-xs text-[#5C4638] leading-relaxed">
              Combinacions clàssiques i tradicionals preparades amb matèries primeres naturals.
            </p>
            <ul className="text-xs space-y-1.5 text-stone-700 pt-1">
              <li>• Nata fresca i trufa de xocolata</li>
              <li>• Crema cremada tradicional</li>
              <li>• Massapà, fruita fresca o mousse</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#D9C4A8] space-y-3">
            <h3 className="font-serif text-lg font-bold text-[#3B2A20]">
              Antelació necessària
            </h3>
            <p className="text-xs text-[#5C4638] leading-relaxed">
              Per garantir la màxima frescor i atenció artesana a l'obrador:
            </p>
            <p className="text-xs font-bold text-[#A8531C] pt-2">
              Recomanem encarregar amb 24h a 48h d'antelació per telèfon o WhatsApp.
            </p>
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="max-w-2xl mx-auto">
          <ContactInquiryForm locale={validLocale} prefilledTopic="CAKE_QUESTION" />
        </div>
      </div>
    );
  }

  // 5. ABOUT US
  if (resolved.type === "ABOUT") {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1E4D3] text-[#A8531C] text-xs font-semibold">
            <Wheat className="w-3.5 h-3.5" />
            <span>{dict.about}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#3B2A20]">
            {validLocale === "ca"
              ? "El nostre forn a l'Avinguda Catalunya, Badalona"
              : "Nuestra panadería en la Avda. Catalunya, Badalona"}
          </h1>
        </div>

        <div className="prose prose-stone max-w-none space-y-4 text-base text-[#5C4638] leading-relaxed">
          <p>
            A <strong>Swing Forn de Pa</strong> creiem que el pa de veritat requereix temps, paciència i respecte per la fermentació natural. Des del nostre establiment situat a l'Avinguda Catalunya 39, treballem cada dia des de primera hora de la matinada perquè el veïnat de Badalona gaudeixi d'un pa de crosta cruixent i aroma inconfusible.
          </p>
          <p>
            A més del pa d'obrador de massa mare, elaborem brioixeria clàssica mantegada, coques de temporada, panellets per la Castanyada i pastissos per a celebracions familiars. Sempre amb transparència alimentària i cuidant cada detall per oferir la millor atenció de barri.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#D9C4A8] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-serif font-bold text-lg text-[#3B2A20]">
              {validLocale === "ca" ? "Vine a tastar el nostre pa" : "Ven a probar nuestro pan"}
            </h3>
            <p className="text-xs text-[#5C4638]">
              {addressText} · Horari de dilluns a diumenge
            </p>
          </div>
          <Link
            href={`/${validLocale}/contacto`}
            className="px-5 py-2.5 rounded-xl bg-[#A8531C] text-white font-semibold text-xs text-decoration-none shadow-xs shrink-0"
          >
            {dict.contact}
          </Link>
        </div>
      </div>
    );
  }

  // 6. BLOG
  if (resolved.type === "BLOG_INDEX" || resolved.type === "POST") {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1E4D3] text-[#A8531C] text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{dict.blog}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#3B2A20]">
            {validLocale === "ca" ? "Novetats i secrets de l'obrador" : "Novedades y secretos del obrador"}
          </h1>
          <p className="text-sm text-[#5C4638]">
            Històries artesanes, tradicions catalanes i consells sobre conservació del pa.
          </p>
        </div>

        <div className="space-y-6">
          {allPosts.map((post) => (
            <article
              key={post.id}
              className="p-6 rounded-2xl bg-white border border-[#D9C4A8] shadow-xs space-y-3"
            >
              <div className="flex justify-between items-center text-xs text-[#A8531C] font-semibold">
                <span>{post.category}</span>
                <span>{new Date(post.publishedAt).toLocaleDateString("ca-ES")} · {post.readingMinutes} min lectura</span>
              </div>
              <h2 className="font-serif text-xl font-bold text-[#3B2A20]">
                {post.title[validLocale] || post.title.es}
              </h2>
              <p className="text-sm text-[#5C4638] leading-relaxed">
                {post.excerpt[validLocale] || post.excerpt.es}
              </p>
              <div
                className="pt-3 border-t border-stone-100 text-sm text-stone-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </article>
          ))}
        </div>
      </div>
    );
  }

  // 7. FAQ
  if (resolved.type === "FAQ") {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1E4D3] text-[#A8531C] text-xs font-semibold">
            <Info className="w-3.5 h-3.5" />
            <span>{dict.faq}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#3B2A20]">
            {validLocale === "ca"
              ? "Preguntes freqüents sobre el nostre forn"
              : "Preguntas frecuentes sobre nuestra panadería"}
          </h1>
          <p className="text-sm text-[#5C4638]">
            Respostes a dubtes sobre horaris, encàrrecs de pastissos i gestió d'al·lèrgens.
          </p>
        </div>

        <FaqAccordion locale={validLocale} faqs={allFaqs} />
      </div>
    );
  }

  // 8. CONTACT & VISIT
  if (resolved.type === "CONTACT") {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1E4D3] text-[#A8531C] text-xs font-semibold">
            <MapPin className="w-3.5 h-3.5" />
            <span>{dict.contact}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#3B2A20]">
            {validLocale === "ca"
              ? "Contacta amb Swing Forn de Pa a Badalona"
              : "Contacta con Swing Forn de Pa en Badalona"}
          </h1>
          <p className="text-sm sm:text-base text-[#5C4638]">
            {addressText} · Tel. {settings.phone}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form */}
          <div className="lg:col-span-7">
            <ContactInquiryForm locale={validLocale} />
          </div>

          {/* Right Hours & Quick Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-[#D9C4A8] shadow-xs space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#3B2A20] flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#A8531C]" />
                <span>Horaris d'obertura</span>
              </h3>
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1.5 border-b border-stone-100">
                  <span className="font-semibold text-stone-800">Dilluns a Divendres</span>
                  <span className="font-bold text-[#A8531C]">06:00 – 21:00</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-100">
                  <span className="font-semibold text-stone-800">Dissabte</span>
                  <span className="font-bold text-[#A8531C]">06:00 – 15:00</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="font-semibold text-stone-800">Diumenge</span>
                  <span className="font-bold text-[#A8531C]">06:00 – 15:00</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#D9C4A8] shadow-xs space-y-3">
              <h3 className="font-serif text-lg font-bold text-[#3B2A20]">
                Contacte directe
              </h3>
              <div className="space-y-2 text-xs">
                <p>
                  <strong>Telèfon:</strong>{" "}
                  <a href={`tel:${cleanPhone}`} className="text-[#A8531C] underline">
                    {settings.phone}
                  </a>
                </p>
                <p>
                  <strong>WhatsApp:</strong>{" "}
                  <a
                    href={`https://wa.me/${cleanPhone.replace("+", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 underline"
                  >
                    Obrir xat directe
                  </a>
                </p>
                <p>
                  <strong>Adreça:</strong> {addressText}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width Map Section */}
        <div className="pt-4 space-y-4">
          <h3 className="font-serif font-bold text-xl text-[#3B2A20]">
            {validLocale === "ca" ? "On som exactament" : "Dónde estamos"}
          </h3>
          <ConsentGatedMap
            locale={validLocale}
            address={addressText}
            googleMapsUrl={settings.googleMapsUrl}
          />
        </div>
      </div>
    );
  }

  // 9. LEGAL PAGES & ALLERGEN INFORMATION
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-serif font-bold text-[#3B2A20]">
          {resolved.slug === "informacio-allergens" || resolved.slug === "informacion-alergenos" || resolved.slug === "allergen-information"
            ? dict.allergens
            : resolved.slug === "cookies" || resolved.slug === "politica-de-cookies" || resolved.slug === "cookie-policy"
            ? dict.cookies
            : resolved.slug === "politica-de-privacitat" || resolved.slug === "politica-de-privacidad" || resolved.slug === "privacy-policy"
            ? dict.privacy
            : dict.legalNotice}
        </h1>
        <p className="text-xs text-stone-500">
          Swing Forn de Pa · {addressText}
        </p>
      </div>

      <div className="prose prose-stone max-w-none text-sm text-[#5C4638] leading-relaxed space-y-4 bg-white p-8 rounded-2xl border border-[#D9C4A8]">
        {resolved.slug?.includes("allergen") || resolved.slug?.includes("alergenos") || resolved.slug?.includes("allergens") ? (
          <>
            <h2 className="text-xl font-serif font-bold text-[#3B2A20]">
              Declaració de compliment del Reglament (UE) 1169/2011
            </h2>
            <p>
              A Swing Forn de Pa ens prenem molt seriosament la seguretat de les persones amb al·lèrgies i intoleràncies alimentàries. Per aquest motiu, tots els nostres productes disposen de la informació corresponent als 14 al·lèrgens de declaració obligatòria a la Unió Europea:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Cereals que contenen gluten (blat, sègol, ordi, civada, espelta)</li>
              <li>Crustacis i productes a base de crustacis</li>
              <li>Ous i productes a base d'ou</li>
              <li>Peix i productes a base de peix</li>
              <li>Cacauets i productes a base de cacauets</li>
              <li>Soia i productes a base de soia</li>
              <li>Llet i els seus derivats (inclosa la lactosa)</li>
              <li>Fruits de closca (ametlles, avellanes, nous, anacards, pacanes, festucs)</li>
              <li>Api i productes derivats</li>
              <li>Mostassa i productes derivats</li>
              <li>Grans de sèsam i productes a base de sèsam</li>
              <li>Dióxid de sofre i sulfits</li>
              <li>Altramussos i productes a base d'altramussos</li>
              <li>Mol·luscs i productes a base de mol·luscs</li>
            </ul>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 mt-4">
              <strong>Nota sobre contacte creuat:</strong> Tot i aplicar protocols estrictes de neteja i bones pràctiques de manipulació en el nostre obrador de Badalona, no podem garantir l'absència total de traces per contacte creuat en productes no envasats. En cas de dubte greu, consulteu sempre el nostre personal.
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-serif font-bold text-[#3B2A20]">
              Informació General i Condicions Legals
            </h2>
            <p>
              En compliment de l'article 10 de la Llei 34/2002, d'11 de juliol, de serveis de la societat de la informació i de comerç electrònic (LSSI-CE), s'informa que el lloc web és titularitat de <strong>{settings.businessName}</strong>, amb domicili a {addressText}, telèfon de contacte {settings.phone}.
            </p>
            <p>
              Totes les consultes rebudes mitjançant els formularis de contacte són tractades de conformitat amb el Reglament General de Protecció de Dades (RGPD) i la Llei Orgànica 3/2018 (LOPDGDD). Les dades només s'utilitzen per donar resposta a la consulta formulada i no se cedeixen a tercers.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
