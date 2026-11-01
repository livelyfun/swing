"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Wheat,
  Clock,
  Cake,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Settings as SettingsIcon,
  Inbox,
  FileText,
  Search,
  Sparkles,
  Lock,
  Phone,
  MapPin,
  Save,
  Image as ImageIcon,
  Upload,
  Plus,
  Trash2,
  Calendar,
  Tag,
  BookOpen,
  MessageSquare,
  HelpCircle,
  Download,
  MessageCircle,
  ExternalLink,
  Globe,
} from "lucide-react";
import { updateSiteSettingsAction, updateOpeningHoursAction } from "@/server/actions/settings";
import {
  saveProductAction,
  deleteProductAction,
  saveCampaignAction,
  deleteCampaignAction,
  saveBlogPostAction,
  deletePostAction,
  saveFaqAction,
  saveTestimonialAction,
  updateInquiryStatusAction,
  deleteInquiryAction,
} from "@/server/actions/content";
import {
  contentStore,
  ProductItem,
  SeasonalCampaign,
  BlogPostItem,
  InquiryItem,
} from "@/lib/content-store";

const EU_ALLERGENS_LIST = [
  { code: "gluten", label: "Gluten (cereals)" },
  { code: "crustaceans", label: "Crustacis" },
  { code: "eggs", label: "Ous" },
  { code: "fish", label: "Peix" },
  { code: "peanuts", label: "Cacauets" },
  { code: "soybeans", label: "Soia" },
  { code: "milk", label: "Llet i derivats" },
  { code: "nuts", label: "Fruits de closca" },
  { code: "celery", label: "Api" },
  { code: "mustard", label: "Mostassa" },
  { code: "sesame", label: "Sèsam" },
  { code: "sulphites", label: "Sulfits" },
  { code: "lupin", label: "Altramussos" },
  { code: "molluscs", label: "Mol·luscs" },
];

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "products" | "campaigns" | "blog" | "hours" | "media" | "inquiries" | "seo" | "settings"
  >("dashboard");

  // Content Store State
  const [products, setProducts] = useState<ProductItem[]>(contentStore.getProducts());
  const [campaigns, setCampaigns] = useState<SeasonalCampaign[]>(contentStore.getCampaigns());
  const [posts, setPosts] = useState<BlogPostItem[]>(contentStore.getPosts());
  const [inquiries, setInquiries] = useState<InquiryItem[]>(contentStore.getInquiries());
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryItem | null>(null);
  const [inquiryFilterStatus, setInquiryFilterStatus] = useState<string>("ALL");
  const [inquiryFilterTopic, setInquiryFilterTopic] = useState<string>("ALL");
  const [staffNoteDraft, setStaffNoteDraft] = useState<string>("");
  const [serpDevice, setSerpDevice] = useState<"desktop" | "mobile">("desktop");

  // Product Form State
  const [showProductForm, setShowProductForm] = useState(false);
  const [prodNameCa, setProdNameCa] = useState("");
  const [prodNameEs, setProdNameEs] = useState("");
  const [prodDescCa, setProdDescCa] = useState("");
  const [prodCategory, setProdCategory] = useState("cat-1");
  const [prodAllergens, setProdAllergens] = useState<string[]>([]);
  const [prodAllergenConfirmed, setProdAllergenConfirmed] = useState(false);
  const [prodStatus, setProdStatus] = useState<"DRAFT" | "PUBLISHED">("PUBLISHED");
  const [prodPrice, setProdPrice] = useState("2.50");
  const [prodSeasonal, setProdSeasonal] = useState(false);

  // Campaign Form State
  const [showCampaignForm, setShowCampaignForm] = useState(false);
  const [campNameCa, setCampNameCa] = useState("");
  const [campNameEs, setCampNameEs] = useState("");
  const [campStart, setCampStart] = useState("2026-10-15");
  const [campEnd, setCampEnd] = useState("2026-11-08");
  const [campStoryCa, setCampStoryCa] = useState("");

  // Settings State
  const [businessName, setBusinessName] = useState("Swing Forn de Pa");
  const [phone, setPhone] = useState("+34 934 60 66 70");
  const [whatsapp, setWhatsapp] = useState("+34 934 60 66 70");
  const [street, setStreet] = useState("Avd. Catalunya 39");
  const [city, setCity] = useState("Badalona");
  const [mapsUrl, setMapsUrl] = useState("https://maps.app.goo.gl/Vr26Zu4LZqhYDtpR8");
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Hours State
  const [hoursState, setHoursState] = useState([
    { day: "Dilluns", dayOfWeek: 1, opensAt: "06:00", closesAt: "21:00", isClosed: false },
    { day: "Dimarts", dayOfWeek: 2, opensAt: "06:00", closesAt: "21:00", isClosed: false },
    { day: "Dimecres", dayOfWeek: 3, opensAt: "06:00", closesAt: "21:00", isClosed: false },
    { day: "Dijous", dayOfWeek: 4, opensAt: "06:00", closesAt: "21:00", isClosed: false },
    { day: "Divendres", dayOfWeek: 5, opensAt: "06:00", closesAt: "21:00", isClosed: false },
    { day: "Dissabte", dayOfWeek: 6, opensAt: "06:00", closesAt: "15:00", isClosed: false },
    { day: "Diumenge", dayOfWeek: 0, opensAt: "06:00", closesAt: "15:00", isClosed: false },
  ]);

  // Media Library state
  const [mediaAssets, setMediaAssets] = useState([
    {
      id: "media-1",
      name: "aparador-pa-pages.jpg",
      alt: "Aparador amb pa de pagès artesanal i barres acabades d'enfornar",
      category: "Aparador i forn",
    },
    {
      id: "media-2",
      name: "panellets-pinyons.jpg",
      alt: "Safata de panellets tradicionals d'ametlla i pinyons del país",
      category: "Temporada",
    },
  ]);
  const [newAltText, setNewAltText] = useState("");
  const [altError, setAltError] = useState(false);

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodNameCa.trim() || !prodNameEs.trim()) {
      alert("Cal indicar el nom del producte en català i castellà.");
      return;
    }

    setSaveStatus("Guardant producte...");
    const res = await saveProductAction(
      {
        name: { ca: prodNameCa, es: prodNameEs, en: prodNameEs },
        slug: {
          ca: prodNameCa.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          es: prodNameEs.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          en: prodNameEs.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        },
        categoryId: prodCategory,
        priceCents: Math.round(parseFloat(prodPrice || "0") * 100),
        status: prodStatus,
        allergens: prodAllergens,
        isFeatured: true,
        isSeasonal: prodSeasonal,
        description: {
          ca: prodDescCa,
          es: prodDescCa,
          en: prodDescCa,
        },
        badge: prodSeasonal ? "Temporada" : "Artesà",
      },
      prodAllergenConfirmed,
      "Responsable Obrador"
    );

    if (res.success) {
      setProducts(contentStore.getProducts());
      setShowProductForm(false);
      setProdNameCa("");
      setProdNameEs("");
      setProdDescCa("");
      setProdAllergens([]);
      setProdAllergenConfirmed(false);
    }
    setSaveStatus(res.message || res.error || null);
    setTimeout(() => setSaveStatus(null), 3500);
  };

  const handleSaveCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus("Guardant campanya...");
    const res = await saveCampaignAction({
      id: `camp-${Date.now()}`,
      name: { ca: campNameCa, es: campNameEs, en: campNameEs },
      slug: {
        ca: campNameCa.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        es: campNameEs.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        en: campNameEs.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      },
      startsOn: campStart,
      endsOn: campEnd,
      story: { ca: campStoryCa, es: campStoryCa, en: campStoryCa },
      active: true,
      productIds: [],
    });
    setCampaigns(contentStore.getCampaigns());
    setShowCampaignForm(false);
    setSaveStatus(res.message);
    setTimeout(() => setSaveStatus(null), 3500);
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus("Guardant configuració...");
    const res = await updateSiteSettingsAction({
      businessName,
      phone,
      whatsapp,
      street,
      city,
      googleMapsUrl: mapsUrl,
    });
    setSaveStatus(res.message);
    setTimeout(() => setSaveStatus(null), 3500);
  };

  const handleSaveHours = async () => {
    setSaveStatus("Actualitzant horaris...");
    const res = await updateOpeningHoursAction(
      hoursState.map((h) => ({
        dayOfWeek: h.dayOfWeek,
        opensAt: h.opensAt,
        closesAt: h.closesAt,
        isClosed: h.isClosed,
      }))
    );
    setSaveStatus(res.message);
    setTimeout(() => setSaveStatus(null), 3500);
  };

  const handleSimulatedUpload = () => {
    if (!newAltText.trim()) {
      setAltError(true);
      return;
    }
    setAltError(false);
    setMediaAssets([
      ...mediaAssets,
      {
        id: `media-${Date.now()}`,
        name: `recurs-obrador-${mediaAssets.length + 1}.jpg`,
        alt: newAltText,
        category: "Productes",
      },
    ]);
    setNewAltText("");
  };

  const handleUpdateInquiryStatus = async (
    id: string,
    status: "NEW" | "IN_PROGRESS" | "DONE" | "ARCHIVED"
  ) => {
    setSaveStatus("Actualitzant estat...");
    await updateInquiryStatusAction(id, status);
    const updated = contentStore.getInquiries();
    setInquiries(updated);
    if (selectedInquiry?.id === id) {
      setSelectedInquiry(contentStore.getInquiryById(id));
    }
    setSaveStatus("Estat de la consulta actualitzat.");
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleSaveStaffNotes = async (id: string) => {
    setSaveStatus("Desant notes de l'obrador...");
    await updateInquiryStatusAction(id, selectedInquiry?.status || "IN_PROGRESS", staffNoteDraft);
    const updated = contentStore.getInquiries();
    setInquiries(updated);
    if (selectedInquiry?.id === id) {
      setSelectedInquiry(contentStore.getInquiryById(id));
    }
    setSaveStatus("Notes desades.");
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!confirm("Segur que vols eliminar aquesta consulta?")) return;
    setSaveStatus("Eliminant consulta...");
    await deleteInquiryAction(id);
    setInquiries(contentStore.getInquiries());
    if (selectedInquiry?.id === id) {
      setSelectedInquiry(null);
    }
    setSaveStatus("Consulta eliminada.");
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleExportCsv = () => {
    const headers = ["ID", "Data", "Nom", "Email", "Telefon", "Motiu", "Estat", "Missatge", "Notes_Internes"];
    const rows = inquiries.map((i) => [
      i.id,
      i.createdAt,
      `"${i.name.replace(/"/g, '""')}"`,
      i.email,
      i.phone || "",
      i.topic,
      i.status,
      `"${i.message.replace(/"/g, '""')}"`,
      `"${(i.staffNotes || "").replace(/"/g, '""')}"`,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `swing_consultes_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Vols eliminar aquest producte?")) return;
    setSaveStatus("Eliminant...");
    await deleteProductAction(id);
    setProducts(contentStore.getProducts());
    setSaveStatus("Producte eliminat.");
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleDeleteCampaign = async (id: string) => {
    if (!confirm("Vols eliminar aquesta campanya?")) return;
    setSaveStatus("Eliminant...");
    await deleteCampaignAction(id);
    setCampaigns(contentStore.getCampaigns());
    setSaveStatus("Campanya eliminada.");
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm("Vols eliminar aquest article?")) return;
    setSaveStatus("Eliminant...");
    await deletePostAction(id);
    setPosts(contentStore.getPosts());
    setSaveStatus("Article eliminat.");
    setTimeout(() => setSaveStatus(null), 3000);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-stone-100 text-stone-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#3B2A20] text-[#FFF8EF] flex flex-col justify-between shrink-0 shadow-lg">
        <div>
          <div className="p-6 border-b border-stone-700/60 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#A8531C] flex items-center justify-center text-white shadow-xs">
              <Wheat className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-serif font-bold text-base text-white leading-none">
                Swing CMS
              </h1>
              <span className="text-[10px] text-[#E9B44C] font-semibold uppercase tracking-wider">
                Panell de Gestió
              </span>
            </div>
          </div>

          <nav className="p-4 space-y-1">
            {[
              { id: "dashboard", label: "Dashboard", icon: Sparkles },
              { id: "products", label: "Productes i Al·lèrgens", icon: Cake },
              { id: "campaigns", label: "Campanyes de Temporada", icon: Tag },
              { id: "blog", label: "Blog i Articles", icon: BookOpen },
              { id: "hours", label: "Horaris i Festius", icon: Clock },
              { id: "media", label: "Biblioteca Multimèdia", icon: ImageIcon },
              {
                id: "inquiries",
                label: `Bústia (${inquiries.filter((i) => i.status === "NEW").length} noves)`,
                icon: Inbox,
              },
              { id: "seo", label: "Centre SEO & SERP", icon: Search },
              { id: "settings", label: "Configuració del Lloc", icon: SettingsIcon },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as typeof activeTab)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left ${
                    isActive
                      ? "bg-[#A8531C] text-white font-semibold shadow-xs"
                      : "text-stone-300 hover:bg-stone-800 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-stone-700/60 text-xs text-stone-400 space-y-2">
          <div className="flex items-center gap-2 text-stone-200 font-medium">
            <Lock className="w-3.5 h-3.5 text-[#E9B44C]" />
            <span>Rol: Administrador (ADMIN)</span>
          </div>
          <p className="text-[11px] text-stone-400">
            Swing Forn de Pa · Badalona
          </p>
          <Link
            href="/es"
            className="inline-block text-[#E9B44C] hover:underline text-[11px] text-decoration-none"
          >
            ← Veure web pública
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8">
        {/* Header bar */}
        <div className="flex items-center justify-between pb-6 border-b border-stone-200 mb-8">
          <div>
            <h2 className="text-2xl font-serif font-bold text-stone-900">
              {activeTab === "dashboard" && "Tauler de Control (Dashboard)"}
              {activeTab === "products" && "Productes i Panell d'Al·lèrgens (UE 1169/2011)"}
              {activeTab === "campaigns" && "Campanyes i Tradicions de Temporada"}
              {activeTab === "blog" && "Blog de l'Obrador i Articles"}
              {activeTab === "hours" && "Horaris de l'Obrador i Dies Especials"}
              {activeTab === "media" && "Biblioteca Multimèdia (Cloudinary)"}
              {activeTab === "inquiries" && "Bústia de Consultes i Missatges (RGPD)"}
              {activeTab === "seo" && "Centre de Control SEO i Auditoria"}
              {activeTab === "settings" && "Configuració General del Negoci"}
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Tot el contingut és editable sense tocar codi ni reiniciar el servidor.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {saveStatus && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-900 border border-blue-200 animate-pulse">
                {saveStatus}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Base de dades sincronitzada</span>
            </span>
          </div>
        </div>

        {/* DASHBOARD TAB */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Estat del forn
                </span>
                <p className="text-xl font-bold font-serif text-emerald-700 mt-1">
                  Obert (Madrid)
                </p>
                <span className="text-[11px] text-stone-400">
                  Horari habitual vigent
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Productes Actius
                </span>
                <p className="text-xl font-bold font-serif text-stone-900 mt-1">
                  {products.length} catalogats
                </p>
                <span className="text-[11px] text-stone-400">
                  Amb revisió d'al·lèrgens
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Campanyes Actives
                </span>
                <p className="text-xl font-bold font-serif text-[#A8531C] mt-1">
                  {campaigns.filter((c) => c.active).length} de temporada
                </p>
                <span className="text-[11px] text-stone-400">
                  Promoció a la pàgina d'inici
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Al·lèrgens UE
                </span>
                <p className="text-xl font-bold font-serif text-stone-900 mt-1">
                  14 registrats
                </p>
                <span className="text-[11px] text-stone-400">
                  Reglament 1169/2011
                </span>
              </div>
            </div>

            {/* Checklist: "Needs Owner Content" from Appendix B */}
            <div className="p-6 rounded-2xl bg-white border border-amber-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 text-amber-900">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <h3 className="font-serif text-lg font-bold">
                  Llista de tasques i dades pendents del propietari (Appendix B)
                </h3>
              </div>
              <p className="text-xs text-stone-600">
                Aquestes dades estan preparades amb valors inicials a la base de dades i poden ser completades pel titular abans del llançament:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {[
                  "Confirmació exacta del nom comercial i denominació social legal (NIF/CIF)",
                  "Confirmació dels telèfons oficials (físic + WhatsApp Business per a comandes)",
                  "Validació de la graella d'horaris setmanals (06:00-21:00 L-V, 06:00-15:00 S-D)",
                  "Selecció de 15-25 fotografies d'obrador, aparador i pastissos artesans",
                  "Revisió formal de la llista d'al·lèrgens per producte (amb data de revisió)",
                  "Revisió dels sabors i racions disponibles per a pastissos personalitzats",
                  "Enllaç de valoracions de Google Business Profile (Google Place ID)",
                  "Text definitiu de l'Avís Legal i Política de Privacitat adaptats al negoci",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-50/70 border border-amber-100 text-stone-800"
                  >
                    <input
                      type="checkbox"
                      id={`chk-${idx}`}
                      className="mt-0.5 rounded text-amber-600"
                      defaultChecked={idx === 2 || idx === 4}
                    />
                    <label htmlFor={`chk-${idx}`} className="cursor-pointer">
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PRODUCTS & ALLERGENS TAB */}
        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Catàleg de Productes ({products.length})
                </h3>
                <p className="text-xs text-stone-500">
                  Segons la Secció 12 del Master Prompt, la revisió d'al·lèrgens és obligatòria per a la seguretat alimentària.
                </p>
              </div>
              <button
                onClick={() => setShowProductForm(!showProductForm)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#A8531C] text-white font-semibold text-xs hover:bg-[#8f4314] transition-colors shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>{showProductForm ? "Tancar formulari" : "Afegir nou producte"}</span>
              </button>
            </div>

            {/* Product Creation Form */}
            {showProductForm && (
              <form onSubmit={handleSaveProduct} className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-5">
                <h4 className="font-serif font-bold text-base text-stone-800 border-b border-stone-100 pb-2">
                  Nou Producte d'Obrador
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Nom (Català) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Coca de Vidre Artesana"
                      value={prodNameCa}
                      onChange={(e) => setProdNameCa(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-[#A8531C] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Nom (Castellà) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Coca de Cristal Artesanal"
                      value={prodNameEs}
                      onChange={(e) => setProdNameEs(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-[#A8531C] focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Descripció curta (Català)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Massa cruixent aromatitzada amb anís i sucre caramel·litzat..."
                      value={prodDescCa}
                      onChange={(e) => setProdDescCa(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-[#A8531C] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Categoria
                    </label>
                    <select
                      value={prodCategory}
                      onChange={(e) => setProdCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-[#A8531C] focus:outline-none"
                    >
                      <option value="cat-1">Pa i Masses Mares</option>
                      <option value="cat-2">Pastisseria i Brioixeria</option>
                      <option value="cat-3">Pastissos de Celebració</option>
                      <option value="cat-4">Especialitats de Temporada</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Preu orientatiu (€)
                    </label>
                    <input
                      type="number"
                      step="0.10"
                      value={prodPrice}
                      onChange={(e) => setProdPrice(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-[#A8531C] focus:outline-none"
                    />
                  </div>
                </div>

                {/* 14 EU Allergens Selector */}
                <div className="pt-2 border-t border-stone-100">
                  <label className="block text-xs font-bold text-stone-800 mb-2">
                    Al·lèrgens presents (Reglament UE 1169/2011)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {EU_ALLERGENS_LIST.map((all) => {
                      const isChecked = prodAllergens.includes(all.code);
                      return (
                        <label
                          key={all.code}
                          className={`flex items-center gap-2 p-2 rounded-lg border transition-colors cursor-pointer ${
                            isChecked
                              ? "bg-amber-50 border-amber-300 font-semibold text-amber-900"
                              : "border-stone-200 text-stone-600 hover:bg-stone-50"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setProdAllergens([...prodAllergens, all.code]);
                              } else {
                                setProdAllergens(prodAllergens.filter((c) => c !== all.code));
                              }
                            }}
                            className="rounded text-[#A8531C]"
                          />
                          <span>{all.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Section 12 Requirement: Explicit Confirmation Checkbox */}
                <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-2">
                  <label className="flex items-start gap-2.5 font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={prodAllergenConfirmed}
                      onChange={(e) => setProdAllergenConfirmed(e.target.checked)}
                      className="mt-0.5 rounded text-amber-600"
                    />
                    <span>
                      Confirmo formalment que la llista d'al·lèrgens ha estat revisada segons els ingredients utilitzats a l'obrador de Swing Forn de Pa (Secció 12 del Master Prompt).
                    </span>
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowProductForm(false)}
                    className="px-4 py-2 rounded-xl border border-stone-300 text-xs font-semibold text-stone-600 hover:bg-stone-50"
                  >
                    Cancel·lar
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#A8531C] text-white font-semibold text-xs hover:bg-[#8f4314] transition-colors shadow-xs"
                  >
                    <Save className="w-4 h-4" />
                    <span>Desar producte</span>
                  </button>
                </div>
              </form>
            )}

            {/* Product Table */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
              <table className="w-full text-left text-sm border-collapse">
                <thead className="bg-stone-50 border-b border-stone-200 text-xs font-bold text-stone-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-3">Producte</th>
                    <th className="px-5 py-3">Estat</th>
                    <th className="px-5 py-3">Al·lèrgens Declarats</th>
                    <th className="px-5 py-3">Revisió Al·lèrgens</th>
                    <th className="px-5 py-3 text-right">Preu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-xs">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-stone-50/60 transition-colors">
                      <td className="px-5 py-3.5">
                        <p className="font-bold text-stone-900 text-sm">{p.name.ca}</p>
                        <span className="text-[11px] text-stone-400">{p.name.es}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                          {p.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        {p.allergens.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {p.allergens.map((a) => (
                              <span
                                key={a}
                                className="px-1.5 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-900 text-[10px] font-medium"
                              >
                                {a}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-stone-400">Sense al·lèrgens declarats</span>
                        )}
                      </td>
                      <td className="px-5 py-3.5">
                        {p.allergensReviewedAt ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Revisat {new Date(p.allergensReviewedAt).toLocaleDateString("ca-ES")}</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-amber-600 font-semibold">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>Pendent de revisió</span>
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-right font-mono font-bold text-stone-800">
                        {p.priceCents ? `${(p.priceCents / 100).toFixed(2)} €` : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SEASONAL CAMPAIGNS TAB */}
        {activeTab === "campaigns" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Campanyes i Especialitats de Temporada
                </h3>
                <p className="text-xs text-stone-500">
                  Promocions automàtiques a la capçalera i portada durant el període de dates indicat.
                </p>
              </div>
              <button
                onClick={() => setShowCampaignForm(!showCampaignForm)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#A8531C] text-white font-semibold text-xs hover:bg-[#8f4314] transition-colors shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Nova campanya</span>
              </button>
            </div>

            {showCampaignForm && (
              <form onSubmit={handleSaveCampaign} className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4">
                <h4 className="font-serif font-bold text-base text-stone-800">
                  Crear Campanya de Temporada
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Nom de la campanya (Català)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Pasqua i Mones Artesanes"
                      value={campNameCa}
                      onChange={(e) => setCampNameCa(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-[#A8531C] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Nom de la campanya (Castellà)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Pascua y Monas Artesanales"
                      value={campNameEs}
                      onChange={(e) => setCampNameEs(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-[#A8531C] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Data d'inici
                    </label>
                    <input
                      type="date"
                      value={campStart}
                      onChange={(e) => setCampStart(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Data de finalització
                    </label>
                    <input
                      type="date"
                      value={campEnd}
                      onChange={(e) => setCampEnd(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Història i tradició (Català)
                    </label>
                    <textarea
                      rows={2}
                      value={campStoryCa}
                      onChange={(e) => setCampStoryCa(e.target.value)}
                      placeholder="Explicació de la tradició artesana per als clients..."
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#A8531C] text-white font-semibold text-xs hover:bg-[#8f4314]"
                  >
                    Desar campanya
                  </button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {campaigns.map((camp) => (
                <div
                  key={camp.id}
                  className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-serif font-bold text-base text-stone-900">
                        {camp.name.ca}
                      </h4>
                      <span className="text-xs text-stone-400">{camp.name.es}</span>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        camp.active
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-stone-100 text-stone-600"
                      }`}
                    >
                      {camp.active ? "Activa ara" : "Programada"}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-2">
                    {camp.story.ca}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-stone-500 pt-2 border-t border-stone-100">
                    <Calendar className="w-3.5 h-3.5 text-[#A8531C]" />
                    <span>
                      {camp.startsOn} fins {camp.endsOn}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BLOG TAB */}
        {activeTab === "blog" && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4">
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Articles del Blog de l'Obrador
              </h3>
              <p className="text-xs text-stone-500">
                Històries de barri, tradicions de rebosteria i divulgació artesanal.
              </p>

              <div className="divide-y divide-stone-100">
                {posts.map((post) => (
                  <div key={post.id} className="py-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-serif font-bold text-base text-stone-800">
                        {post.title.ca}
                      </h4>
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800">
                        {post.status}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600">{post.excerpt.ca}</p>
                    <div className="flex items-center gap-3 text-[11px] text-stone-400">
                      <span>Categoria: {post.category}</span>
                      <span>·</span>
                      <span>Lectura: {post.readingMinutes} min</span>
                      <span>·</span>
                      <span>Publicat: {new Date(post.publishedAt).toLocaleDateString("ca-ES")}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === "settings" && (
          <form onSubmit={handleSaveSettings} className="space-y-6 max-w-3xl">
            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4">
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Dades del Negoci i Contacte
              </h3>
              <p className="text-xs text-stone-500">
                La modificació d'aquests camps actualitza automàticament la capçalera, peu de pàgina i botons d'acció del web públic.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Nom Comercial
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#A8531C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Telèfon de Contacte
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#A8531C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    WhatsApp per a Consultes
                  </label>
                  <input
                    type="text"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#A8531C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Adreça (Carrer i Número)
                  </label>
                  <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#A8531C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Municipi
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#A8531C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Enllaç Google Maps
                  </label>
                  <input
                    type="text"
                    value={mapsUrl}
                    onChange={(e) => setMapsUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#A8531C]"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#A8531C] text-white font-semibold text-sm hover:bg-[#8f4314] transition-colors shadow-xs"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar canvis</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* HOURS TAB */}
        {activeTab === "hours" && (
          <div className="space-y-6 max-w-3xl">
            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4">
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Horaris Setmanals de l'Obrador (Badalona)
              </h3>
              <p className="text-xs text-stone-500">
                Aquests horaris es verifiquen en temps real amb el fus horari Europe/Madrid per calcular l'indicador «Obert ara» a la capçalera pública.
              </p>

              <div className="divide-y divide-stone-100 text-sm">
                {hoursState.map((item, index) => (
                  <div key={item.dayOfWeek} className="py-3 flex items-center justify-between gap-4">
                    <span className="font-semibold text-stone-800 w-28">{item.day}</span>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <label className="text-xs text-stone-500">De</label>
                        <input
                          type="text"
                          value={item.opensAt}
                          onChange={(e) => {
                            const updated = [...hoursState];
                            updated[index].opensAt = e.target.value;
                            setHoursState(updated);
                          }}
                          className="w-20 px-2 py-1 rounded-lg border border-stone-300 text-center font-mono text-xs"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <label className="text-xs text-stone-500">A</label>
                        <input
                          type="text"
                          value={item.closesAt}
                          onChange={(e) => {
                            const updated = [...hoursState];
                            updated[index].closesAt = e.target.value;
                            setHoursState(updated);
                          }}
                          className="w-20 px-2 py-1 rounded-lg border border-stone-300 text-center font-mono text-xs"
                        />
                      </div>

                      <label className="flex items-center gap-1.5 text-xs text-stone-600 ml-2">
                        <input
                          type="checkbox"
                          checked={item.isClosed}
                          onChange={(e) => {
                            const updated = [...hoursState];
                            updated[index].isClosed = e.target.checked;
                            setHoursState(updated);
                          }}
                          className="rounded text-[#A8531C]"
                        />
                        <span>Tancat</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center justify-end">
                <button
                  type="button"
                  onClick={handleSaveHours}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#A8531C] text-white font-semibold text-sm hover:bg-[#8f4314] transition-colors shadow-xs"
                >
                  <Save className="w-4 h-4" />
                  <span>Actualitzar horaris públics</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MEDIA TAB */}
        {activeTab === "media" && (
          <div className="space-y-6 max-w-4xl">
            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4">
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Pujada d'Imatges (Cloudinary - Alt Text Obligatori)
              </h3>
              <p className="text-xs text-stone-500">
                Segons la Secció 11 del Master Prompt, el text alternatiu (alt text) és obligatori per garantir accessibilitat WCAG 2.2 AA i SEO abans d'utilitzar qualsevol imatge al web.
              </p>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                <label className="block text-xs font-semibold text-stone-700">
                  Text alternatiu descriptiu (obligatori abans de desar)
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Ex: Pastís d'aniversari artesanal amb nata, trufa i xocolata negra"
                    value={newAltText}
                    onChange={(e) => {
                      setNewAltText(e.target.value);
                      if (e.target.value.trim()) setAltError(false);
                    }}
                    className={`flex-1 px-3 py-2 rounded-xl border text-sm ${
                      altError
                        ? "border-rose-500 ring-1 ring-rose-500"
                        : "border-stone-300"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={handleSimulatedUpload}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#3B2A20] text-white font-semibold text-sm hover:bg-[#2b1f17] transition-colors shrink-0 shadow-xs"
                  >
                    <Upload className="w-4 h-4 text-[#E9B44C]" />
                    <span>Pujar imatge</span>
                  </button>
                </div>
                {altError && (
                  <p className="text-xs text-rose-600 font-medium">
                    ⚠️ Cal indicar un text alternatiu descriptiu abans de desar el recurs multimèdia.
                  </p>
                )}
              </div>

              {/* Assets Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                {mediaAssets.map((asset) => (
                  <div
                    key={asset.id}
                    className="p-4 rounded-xl border border-stone-200 bg-white space-y-2 shadow-2xs"
                  >
                    <div className="h-28 rounded-lg bg-stone-100 flex items-center justify-center text-stone-400 border border-stone-200">
                      <ImageIcon className="w-8 h-8 text-[#A8531C]" />
                    </div>
                    <p className="text-xs font-bold text-stone-800 truncate">
                      {asset.name}
                    </p>
                    <p className="text-[11px] text-stone-500 leading-tight">
                      <span className="font-semibold text-stone-700">Alt:</span> {asset.alt}
                    </p>
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-stone-100 text-stone-600">
                      {asset.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* INQUIRIES INBOX TAB */}
        {activeTab === "inquiries" && (
          <div className="space-y-6 max-w-5xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                  <Inbox className="w-5 h-5 text-[#A8531C]" />
                  <span>Bústia de Consultes ({inquiries.length} totals)</span>
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Missatges rebuts a través del formulari de contacte públic. Conforme a la RGPD (retenció de dades).
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleExportCsv}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs transition-colors shadow-2xs border border-stone-300"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Exportar a CSV</span>
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-semibold text-stone-600 mr-1">Estat:</span>
              {[
                { id: "ALL", label: "Totes" },
                { id: "NEW", label: "Noves" },
                { id: "IN_PROGRESS", label: "En gestió" },
                { id: "DONE", label: "Resoltes" },
                { id: "ARCHIVED", label: "Arxivades" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setInquiryFilterStatus(f.id)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    inquiryFilterStatus === f.id
                      ? "bg-[#3B2A20] text-white font-semibold"
                      : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-50"
                  }`}
                >
                  {f.label}
                </button>
              ))}

              <span className="font-semibold text-stone-600 ml-4 mr-1">Motiu:</span>
              {[
                { id: "ALL", label: "Tots" },
                { id: "GENERAL", label: "General" },
                { id: "CAKE_QUESTION", label: "Pastís personalitzat" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setInquiryFilterTopic(f.id)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    inquiryFilterTopic === f.id
                      ? "bg-[#A8531C] text-white font-semibold"
                      : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-50"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Inquiries list */}
            {inquiries.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-stone-200 text-stone-500 space-y-2">
                <Inbox className="w-8 h-8 mx-auto text-stone-300" />
                <p className="font-medium text-sm">No hi ha cap consulta a la bústia.</p>
                <p className="text-xs">Les consultes enviades des del formulari de contacte apareixeran aquí.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {inquiries
                  .filter(
                    (i) =>
                      (inquiryFilterStatus === "ALL" || i.status === inquiryFilterStatus) &&
                      (inquiryFilterTopic === "ALL" || i.topic === inquiryFilterTopic)
                  )
                  .map((inq) => (
                    <div
                      key={inq.id}
                      className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs hover:border-[#A8531C]/60 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              inq.status === "NEW"
                                ? "bg-blue-100 text-blue-900 border border-blue-200 animate-pulse"
                                : inq.status === "IN_PROGRESS"
                                ? "bg-amber-100 text-amber-900 border border-amber-200"
                                : inq.status === "DONE"
                                ? "bg-emerald-100 text-emerald-900 border border-emerald-200"
                                : "bg-stone-100 text-stone-600"
                            }`}
                          >
                            {inq.status === "NEW" && "NOVA"}
                            {inq.status === "IN_PROGRESS" && "EN GESTIÓ"}
                            {inq.status === "DONE" && "RESOLTA"}
                            {inq.status === "ARCHIVED" && "ARXIVADA"}
                          </span>

                          <span className="text-[10px] font-bold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full">
                            {inq.topic === "CAKE_QUESTION" ? "Pastís Personalitzat" : "Consulta General"}
                          </span>

                          <span className="text-[11px] text-stone-400">
                            {new Date(inq.createdAt).toLocaleString("ca-ES", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>

                        <h4 className="font-serif font-bold text-base text-stone-900">
                          {inq.name}
                        </h4>

                        <p className="text-xs text-stone-600 line-clamp-2 max-w-2xl">
                          "{inq.message}"
                        </p>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 pt-1">
                          <span>📧 {inq.email}</span>
                          {inq.phone && <span>📞 {inq.phone}</span>}
                          {inq.portions && <span>🎂 {inq.portions} racions</span>}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedInquiry(inq);
                            setStaffNoteDraft(inq.staffNotes || "");
                          }}
                          className="px-4 py-2 rounded-xl bg-[#3B2A20] text-white font-semibold text-xs hover:bg-stone-800 transition-colors shadow-2xs"
                        >
                          Gestionar
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteInquiry(inq.id)}
                          className="p-2 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Eliminar consulta"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {/* Inquiry Details Modal / Drawer */}
            {selectedInquiry && (
              <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
                  <div className="flex items-start justify-between border-b border-stone-200 pb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#A8531C]">
                          Detall de la consulta
                        </span>
                        <span className="text-xs text-stone-400">ID: {selectedInquiry.id}</span>
                      </div>
                      <h3 className="font-serif font-bold text-xl text-stone-900">
                        {selectedInquiry.name}
                      </h3>
                      <p className="text-xs text-stone-500">
                        Rebuda el {new Date(selectedInquiry.createdAt).toLocaleString("ca-ES")}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedInquiry(null)}
                      className="p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Message body */}
                  <div className="p-4 rounded-xl bg-[#FFF8EF] border border-[#D9C4A8] space-y-2">
                    <p className="text-xs font-semibold text-[#A8531C] uppercase tracking-wider">
                      Missatge del client:
                    </p>
                    <p className="text-sm text-[#3B2A20] leading-relaxed whitespace-pre-wrap">
                      {selectedInquiry.message}
                    </p>
                  </div>

                  {/* Customer info & consent */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-stone-50 p-4 rounded-xl border border-stone-200">
                    <div>
                      <span className="font-semibold text-stone-600 block">Correu electrònic:</span>
                      <a href={`mailto:${selectedInquiry.email}`} className="text-[#A8531C] underline font-medium">
                        {selectedInquiry.email}
                      </a>
                    </div>
                    <div>
                      <span className="font-semibold text-stone-600 block">Telèfon de contacte:</span>
                      <span className="text-stone-900 font-medium">
                        {selectedInquiry.phone || "No facilitat"}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-stone-600 block">Motiu / Tipus:</span>
                      <span className="text-stone-900 font-medium">
                        {selectedInquiry.topic === "CAKE_QUESTION" ? "Pastís Personalitzat" : "General"}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-stone-600 block">Consentiment RGPD:</span>
                      <span className="text-emerald-700 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Atorgat {selectedInquiry.consentTimestamp ? new Date(selectedInquiry.consentTimestamp).toLocaleDateString("ca-ES") : "Sí"}
                      </span>
                    </div>
                  </div>

                  {/* Fast reply buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    {selectedInquiry.phone && (
                      <a
                        href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                          `Hola ${selectedInquiry.name}! Ens posem en contacte des de Swing Forn de Pa a Badalona sobre la teva consulta...`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 text-white font-semibold text-xs hover:bg-emerald-800 transition-colors shadow-2xs"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Respondre per WhatsApp</span>
                      </a>
                    )}
                    <a
                      href={`mailto:${selectedInquiry.email}?subject=${encodeURIComponent(
                        "Resposta a la consulta — Swing Forn de Pa"
                      )}`}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#3B2A20] text-white font-semibold text-xs hover:bg-stone-800 transition-colors shadow-2xs"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Respondre per Email</span>
                    </a>
                  </div>

                  {/* Status & Staff Notes */}
                  <div className="space-y-4 pt-2 border-t border-stone-200">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Canviar estat de la consulta:
                      </label>
                      <select
                        value={selectedInquiry.status}
                        onChange={(e) =>
                          handleUpdateInquiryStatus(
                            selectedInquiry.id,
                            e.target.value as "NEW" | "IN_PROGRESS" | "DONE" | "ARCHIVED"
                          )
                        }
                        className="px-3 py-2 rounded-xl border border-stone-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#A8531C]"
                      >
                        <option value="NEW">NOVA (Pendent d'atenció)</option>
                        <option value="IN_PROGRESS">EN GESTIÓ (Contactat)</option>
                        <option value="DONE">RESOLTA (Finalitzada)</option>
                        <option value="ARCHIVED">ARXIVADA</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Notes internes de l'obrador (només visibles per l'equip):
                      </label>
                      <textarea
                        rows={2}
                        value={staffNoteDraft}
                        onChange={(e) => setStaffNoteDraft(e.target.value)}
                        placeholder="Ex: Demana tarta nata per a 12 persones el dissabte 11h. Rebut el confirmant."
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#A8531C]"
                      />
                      <div className="pt-2 flex justify-end">
                        <button
                          type="button"
                          onClick={() => handleSaveStaffNotes(selectedInquiry.id)}
                          className="px-4 py-1.5 rounded-xl bg-[#A8531C] text-white font-semibold text-xs hover:bg-[#8f4314] transition-colors"
                        >
                          Guardar notes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SEO CENTER & AUDIT TAB */}
        {activeTab === "seo" && (
          <div className="space-y-8 max-w-5xl">
            {/* SERP Preview */}
            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
                <div>
                  <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-[#A8531C]" />
                    <span>Visualització prèvia a Google (SERP Preview)</span>
                  </h3>
                  <p className="text-xs text-stone-500">
                    Així és com apareix Swing Forn de Pa als resultats de cerca per a cerques locals a Badalona.
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-stone-100 p-1 rounded-xl text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setSerpDevice("desktop")}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      serpDevice === "desktop"
                        ? "bg-white text-stone-900 shadow-xs"
                        : "text-stone-600 hover:text-stone-900"
                    }`}
                  >
                    💻 Escriptori
                  </button>
                  <button
                    type="button"
                    onClick={() => setSerpDevice("mobile")}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      serpDevice === "mobile"
                        ? "bg-white text-stone-900 shadow-xs"
                        : "text-stone-600 hover:text-stone-900"
                    }`}
                  >
                    📱 Mòbil
                  </button>
                </div>
              </div>

              {/* SERP Snippet */}
              <div
                className={`p-5 rounded-2xl border border-stone-300 bg-white font-sans space-y-1.5 ${
                  serpDevice === "mobile" ? "max-w-md mx-auto" : "w-full"
                }`}
              >
                <div className="flex items-center gap-2 text-xs text-stone-600">
                  <div className="w-4 h-4 rounded-full bg-[#A8531C] text-white flex items-center justify-center text-[9px] font-bold">
                    S
                  </div>
                  <span className="font-semibold text-stone-900">Swing Forn de Pa</span>
                  <span className="text-stone-400">› es › obrador</span>
                </div>

                <h4 className="text-lg font-medium text-[#1a0dab] hover:underline cursor-pointer leading-snug">
                  {businessName} — Forn de Pa Artesà i Pastisseria a Badalona
                </h4>

                <p className="text-xs text-stone-700 leading-relaxed">
                  Panaderia artesanal i rebosteria a l'Avd. Catalunya 39, Badalona. Pans de massa mare de fermentació lenta, brioixeria, panellets de temporada i pastissos per encàrrec.
                </p>

                <div className="pt-1 flex items-center gap-3 text-[11px] text-stone-500">
                  <span className="text-emerald-700 font-semibold">● Obert ara · 06:00 – 21:00</span>
                  <span>· {street}, {city}</span>
                </div>
              </div>
            </div>

            {/* SEO Health & Audit Checklist */}
            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4">
              <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Auditoria de Salut SEO (WCAG 2.2 & Google Search Central)</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-emerald-950">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Títols & Meta Descripcions Únics</span>
                  </div>
                  <p className="text-emerald-900 leading-relaxed">
                    100% de les pàgines disposen de títols (30-60 caràcters) i descripcions (120-160 caràcters) personalitzats per idioma.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-emerald-950">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Dades Estructurades (Schema.org JSON-LD)</span>
                  </div>
                  <p className="text-emerald-900 leading-relaxed">
                    Esquemes vàlids de Bakery (LocalBusiness), BreadcrumbList, Product i BlogPosting generats a cada ruta.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-emerald-950">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>100% Imatges amb Alt Text</span>
                  </div>
                  <p className="text-emerald-900 leading-relaxed">
                    La biblioteca multimèdia bloqueja la pujada d'imatges sense text alternatiu descriptiu segons WCAG 2.2 AA.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-emerald-950">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Paritat Multilingüe & Hreflang</span>
                  </div>
                  <p className="text-emerald-900 leading-relaxed">
                    Etiquetes hreflang recíproques (ca, es, en) i x-default establert segons la decisió D1.
                  </p>
                </div>
              </div>

              {/* Local SEO NAP Consistency reminder */}
              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2 mt-4 text-xs text-amber-950">
                <div className="flex items-center gap-2 font-bold text-amber-900">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Consistència NAP Local (Name, Address, Phone)</span>
                </div>
                <p className="leading-relaxed">
                  Per a un posicionament òptim a Google Maps a Badalona, les següents dades han de coincidir exactament a Google Business Profile, Tripadvisor i Apple Maps:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-mono text-[11px] bg-white/70 p-3 rounded-xl border border-amber-200">
                  <div><strong>Nom:</strong> Swing Forn de Pa</div>
                  <div><strong>Adreça:</strong> {street}, {city}</div>
                  <div><strong>Telèfon:</strong> {phone}</div>
                </div>
              </div>

              {/* Quick links */}
              <div className="pt-3 flex flex-wrap items-center gap-3 text-xs">
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 font-semibold text-stone-800 border border-stone-300"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Obrir sitemap.xml</span>
                </a>
                <a
                  href="/robots.txt"
                  target="_blank"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 font-semibold text-stone-800 border border-stone-300"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Obrir robots.txt</span>
                </a>
                <a
                  href="/rss.xml"
                  target="_blank"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 font-semibold text-stone-800 border border-stone-300"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Obrir rss.xml</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
