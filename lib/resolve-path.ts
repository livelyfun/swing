import { Locale } from "./i18n";

export type ResolvedPageType =
  | "HOME"
  | "MENU_INDEX"
  | "PRODUCT"
  | "SEASONAL_INDEX"
  | "CAMPAIGN"
  | "CUSTOM_CAKES"
  | "ABOUT"
  | "BLOG_INDEX"
  | "POST"
  | "FAQ"
  | "CONTACT"
  | "LEGAL"
  | "NOT_FOUND";

export interface ResolvedEntity {
  type: ResolvedPageType;
  key?: string;
  slug?: string;
  params?: Record<string, string>;
}

// Built-in path mappings for initial slug resolution
const DEFAULT_SLUG_MAP: Record<string, ResolvedPageType> = {
  // Catalan
  "productes": "MENU_INDEX",
  "temporada": "SEASONAL_INDEX",
  "especialitats": "SEASONAL_INDEX",
  "pastissos-personalitzats": "CUSTOM_CAKES",
  "el-nostre-forn": "ABOUT",
  "sobre-nosaltres": "ABOUT",
  "blog": "BLOG_INDEX",
  "novetats": "BLOG_INDEX",
  "preguntes-frequents": "FAQ",
  "contacte": "CONTACT",
  "avis-legal": "LEGAL",
  "politica-privadesa": "LEGAL",
  "politica-de-privacitat": "LEGAL",
  "politica-cookies": "LEGAL",
  "informacio-allergens": "LEGAL",

  // Spanish
  "productos": "MENU_INDEX",
  "especialidades": "SEASONAL_INDEX",
  "tartas-personalizadas": "CUSTOM_CAKES",
  "sobre-nosotros": "ABOUT",
  "preguntas-frecuentes": "FAQ",
  "faq": "FAQ",
  "contacto": "CONTACT",
  "aviso-legal": "LEGAL",
  "politica-privacidad": "LEGAL",
  "politica-de-privacidad": "LEGAL",
  "informacion-alergenos": "LEGAL",

  // English
  "menu": "MENU_INDEX",
  "products": "MENU_INDEX",
  "seasonal": "SEASONAL_INDEX",
  "custom-cakes": "CUSTOM_CAKES",
  "about": "ABOUT",
  "about-us": "ABOUT",
  "journal": "BLOG_INDEX",
  "frequently-asked-questions": "FAQ",
  "contact": "CONTACT",
  "legal-notice": "LEGAL",
  "privacy-policy": "LEGAL",
  "cookie-policy": "LEGAL",
  "cookies": "LEGAL",
  "allergen-information": "LEGAL",
};

export async function resolvePath(
  locale: Locale,
  segments: string[] = []
): Promise<ResolvedEntity> {
  // Home path: /es, /ca, /en
  if (segments.length === 0) {
    return { type: "HOME", key: "home" };
  }

  const primarySegment = segments[0]?.toLowerCase();

  // Single-segment system pages
  if (segments.length === 1) {
    const matchedType = DEFAULT_SLUG_MAP[primarySegment];
    if (matchedType) {
      return { type: matchedType, slug: primarySegment };
    }
  }

  // Nested routes (e.g. /es/productos/croissant, /ca/especialitats/panellets)
  if (segments.length === 2) {
    const subSlug = segments[1]?.toLowerCase();
    if (["productos", "productes", "producto", "producte", "menu", "products"].includes(primarySegment)) {
      return { type: "PRODUCT", slug: subSlug, params: { categoryOrProduct: subSlug } };
    }
    if (["especialidades", "especialitats", "seasonal"].includes(primarySegment)) {
      return { type: "CAMPAIGN", slug: subSlug, params: { campaign: subSlug } };
    }
    if (["blog", "novetats", "journal"].includes(primarySegment)) {
      return { type: "POST", slug: subSlug, params: { post: subSlug } };
    }
  }

  return { type: "NOT_FOUND" };
}
