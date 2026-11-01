export const SUPPORTED_LOCALES = ["ca", "es", "en"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "es";

export const LOCALE_LABELS: Record<Locale, string> = {
  ca: "Català",
  es: "Castellano",
  en: "English",
};

export function isValidLocale(locale: string): locale is Locale {
  return SUPPORTED_LOCALES.includes(locale as Locale);
}

export interface Dictionary {
  openNow: string;
  closed: string;
  call: string;
  whatsapp: string;
  directions: string;
  menu: string;
  seasonal: string;
  customCakes: string;
  about: string;
  blog: string;
  faq: string;
  contact: string;
  allergens: string;
  footerTagline: string;
  address: string;
  hours: string;
  privacy: string;
  legalNotice: string;
  cookies: string;
}

export const DICTIONARIES: Record<Locale, Dictionary> = {
  ca: {
    openNow: "Obert ara",
    closed: "Tancat",
    call: "Trucar",
    whatsapp: "WhatsApp",
    directions: "Com arribar",
    menu: "Productes",
    seasonal: "Especialitats",
    customCakes: "Pastissos per encàrrec",
    about: "El nostre forn",
    blog: "Novetats",
    faq: "Preguntes freqüents",
    contact: "Contacte i Horaris",
    allergens: "Informació d'Al·lèrgens",
    footerTagline: "Forn de pa artesà i pastisseria de barri a Badalona.",
    address: "Avd. Catalunya 39, 08917 Badalona",
    hours: "Dilluns a Divendres 06:00–21:00 · Dissabte i Diumenge 06:00–15:00",
    privacy: "Política de privacitat",
    legalNotice: "Avís legal",
    cookies: "Política de cookies",
  },
  es: {
    openNow: "Abierto ahora",
    closed: "Cerrado",
    call: "Llamar",
    whatsapp: "WhatsApp",
    directions: "Cómo llegar",
    menu: "Productos",
    seasonal: "Especialidades",
    customCakes: "Tartas personalizadas",
    about: "Nuestra panadería",
    blog: "Novedades",
    faq: "Preguntas frecuentes",
    contact: "Contacto y Horarios",
    allergens: "Información de Alérgenos",
    footerTagline: "Panadería artesanal y repostería de barrio en Badalona.",
    address: "Avd. Catalunya 39, 08917 Badalona",
    hours: "Lunes a Viernes 06:00–21:00 · Sábado y Domingo 06:00–15:00",
    privacy: "Política de privacidad",
    legalNotice: "Aviso legal",
    cookies: "Política de cookies",
  },
  en: {
    openNow: "Open now",
    closed: "Closed",
    call: "Call",
    whatsapp: "WhatsApp",
    directions: "Directions",
    menu: "Products",
    seasonal: "Specialties",
    customCakes: "Custom Cakes",
    about: "Our Bakery",
    blog: "Journal",
    faq: "FAQ",
    contact: "Contact & Hours",
    allergens: "Allergen Information",
    footerTagline: "Artisan bakery and neighborhood pastry shop in Badalona.",
    address: "Avd. Catalunya 39, 08917 Badalona",
    hours: "Monday to Friday 06:00–21:00 · Saturday & Sunday 06:00–15:00",
    privacy: "Privacy Policy",
    legalNotice: "Legal Notice",
    cookies: "Cookie Policy",
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale] || DICTIONARIES[DEFAULT_LOCALE];
}
