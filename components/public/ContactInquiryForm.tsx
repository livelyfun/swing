"use client";

import React, { useState } from "react";
import { Locale } from "@/lib/i18n";
import { Send, CheckCircle2, ShieldCheck, Clock } from "lucide-react";

interface ContactInquiryFormProps {
  locale: Locale;
  prefilledTopic?: "GENERAL" | "CAKE_QUESTION";
}

export function ContactInquiryForm({
  locale,
  prefilledTopic = "GENERAL",
}: ContactInquiryFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredContact, setPreferredContact] = useState("whatsapp");
  const [topic, setTopic] = useState<"GENERAL" | "CAKE_QUESTION">(prefilledTopic);
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState(""); // Bot honeypot field
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Bot caught by honeypot
    if (honeypot) return;
    if (!consent) {
      alert(
        locale === "ca"
          ? "Cal acceptar la política de privacitat per enviar la consulta."
          : "Debe aceptar la política de privacidad para enviar la consulta."
      );
      return;
    }

    setIsSubmitting(true);
    // Simulate submission delay and store in CMS
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 600);
  };

  if (formSubmitted) {
    return (
      <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="font-serif font-bold text-xl text-emerald-950">
          {locale === "ca" ? "Missatge enviat amb èxit!" : "¡Mensaje enviado con éxito!"}
        </h3>
        <p className="text-sm text-emerald-900 max-w-md mx-auto leading-relaxed">
          {locale === "ca"
            ? "Hem rebut la teva consulta a l'obrador de Swing Forn de Pa. Et respondrem en un termini màxim de 24 hores laborables."
            : "Hemos recibido tu consulta en nuestro obrador. Te responderemos en un plazo máximo de 24 horas laborables."}
        </p>
        <div className="inline-flex items-center gap-1.5 text-xs text-emerald-800 font-semibold pt-2">
          <Clock className="w-4 h-4" />
          <span>Temps de resposta habitual: menys de 2 hores en horari d'obertura</span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl bg-white border border-[#D9C4A8] shadow-sm space-y-5">
      {/* Honeypot field for bot protection */}
      <input
        type="text"
        name="bakery_verification_code"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="sr-only"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="space-y-1">
        <h3 className="font-serif font-bold text-xl text-[#3B2A20]">
          {locale === "ca" ? "Envia'ns un missatge" : "Envíanos un mensaje"}
        </h3>
        <p className="text-xs text-[#5C4638]">
          {locale === "ca"
            ? "T'atendrem directament des del nostre forn per resoldre dubtes d'encàrrecs o al·lèrgens."
            : "Te atenderemos directamente desde nuestro obrador para pedidos o consultas de alérgenos."}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div>
          <label className="block text-xs font-semibold text-[#3B2A20] mb-1">
            {locale === "ca" ? "Nom i cognoms *" : "Nombre y apellidos *"}
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Maria Puig"
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#A8531C]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#3B2A20] mb-1">
            {locale === "ca" ? "Correu electrònic *" : "Correo electrónico *"}
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="maria@exemple.cat"
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#A8531C]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#3B2A20] mb-1">
            {locale === "ca" ? "Telèfon (opcional)" : "Teléfono (opcional)"}
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+34 600 000 000"
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#A8531C]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#3B2A20] mb-1">
            {locale === "ca" ? "Motiu de la consulta" : "Motivo de la consulta"}
          </label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value as "GENERAL" | "CAKE_QUESTION")}
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#A8531C]"
          >
            <option value="GENERAL">
              {locale === "ca" ? "Consulta general o d'horaris" : "Consulta general u horarios"}
            </option>
            <option value="CAKE_QUESTION">
              {locale === "ca" ? "Pastís personalitzat / Celebració" : "Tarta personalizada / Celebración"}
            </option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-[#3B2A20] mb-1">
            {locale === "ca" ? "El teu missatge *" : "Tu mensaje *"}
          </label>
          <textarea
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={
              locale === "ca"
                ? "Explica'ns en què et podem ajudar o quines característiques necessites..."
                : "Cuéntanos en qué te podemos ayudar o qué características necesitas..."
            }
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#A8531C]"
          />
        </div>
      </div>

      {/* Privacy Consent Checkbox */}
      <div className="p-3.5 rounded-xl bg-[#F1E4D3]/40 border border-[#D9C4A8]/60 text-xs text-[#5C4638]">
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 rounded text-[#A8531C]"
          />
          <span>
            {locale === "ca"
              ? "He llegit i accepto la política de privacitat de Swing Forn de Pa per al tractament de les meves dades de contacte segons el RGPD."
              : "He leído y acepto la política de privacidad de Swing Forn de Pa para el tratamiento de mis datos de contacto conforme al RGPD."}
          </span>
        </label>
      </div>

      <div className="flex justify-end pt-1">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#A8531C] text-white font-semibold text-sm hover:bg-[#8f4314] transition-colors shadow-xs"
        >
          <Send className="w-4 h-4" />
          <span>{isSubmitting ? "Enviant..." : locale === "ca" ? "Enviar consulta" : "Enviar consulta"}</span>
        </button>
      </div>
    </form>
  );
}
