import { Locale, DEFAULT_LOCALE } from "./i18n";
import { DEFAULT_WEEKLY_HOURS, OpeningHoursRange } from "./hours";

export interface PublicSiteSettings {
  businessName: string;
  legalName?: string;
  taxId?: string;
  phone: string;
  whatsapp: string;
  email?: string;
  street: string;
  postcode: string;
  city: string;
  region: string;
  country: string;
  lat: number;
  lng: number;
  googleMapsUrl: string;
  googlePlaceId?: string;
  googleReviewUrl?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  defaultLocale: string;
  enabledLocales: string[];
  timeZone: string;
  showPrices: boolean;
  tagline?: string;
  description?: string;
  announcement?: string;
}

// In-memory reactive settings store (synced with DB & updated by CMS)
let activeSettings: PublicSiteSettings = {
  businessName: "Swing Forn de Pa",
  legalName: "[PLACEHOLDER - Confirm legal entity name]",
  taxId: "[PLACEHOLDER - Confirm NIF/CIF]",
  phone: "+34 934 60 66 70",
  whatsapp: "+34 934 60 66 70",
  email: "info@swingforndepa.cat",
  street: "Avd. Catalunya 39",
  postcode: "08917",
  city: "Badalona",
  region: "Barcelona",
  country: "España",
  lat: 41.4502221,
  lng: 2.2296483,
  googleMapsUrl: "https://maps.app.goo.gl/Vr26Zu4LZqhYDtpR8",
  defaultLocale: "es",
  enabledLocales: ["ca", "es", "en"],
  timeZone: "Europe/Madrid",
  showPrices: false,
  tagline: "Forn de pa artesà i pastisseria de barri a Badalona",
  description: "Pa d'obrador, rebosteria artesanal, panellets de temporada i pastissos personalitzats.",
  announcement: "Obrador obert cada dia des de les 06:00 del matí a l'Avd. Catalunya 39.",
};

let activeWeeklyHours: OpeningHoursRange[] = [...DEFAULT_WEEKLY_HOURS];

export async function getSiteSettings(locale: Locale = DEFAULT_LOCALE): Promise<PublicSiteSettings> {
  // Locale-dependent taglines
  const localizedTaglines: Record<Locale, string> = {
    ca: "Forn de pa artesà i pastisseria de barri a Badalona.",
    es: "Panadería artesanal y repostería de barrio en Badalona.",
    en: "Artisan bakery and neighborhood pastry shop in Badalona.",
  };

  return {
    ...activeSettings,
    tagline: localizedTaglines[locale] || activeSettings.tagline,
  };
}

export async function getWeeklyHours(): Promise<OpeningHoursRange[]> {
  return activeWeeklyHours;
}

export function updateActiveSettings(newSettings: Partial<PublicSiteSettings>) {
  activeSettings = { ...activeSettings, ...newSettings };
}

export function updateActiveWeeklyHours(newHours: OpeningHoursRange[]) {
  activeWeeklyHours = newHours;
}
