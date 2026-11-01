import type { Metadata } from "next";
import { Locale, SUPPORTED_LOCALES, DEFAULT_LOCALE } from "./i18n";
import { getSiteSettings } from "./settings";

export interface SeoOptions {
  locale: Locale;
  path?: string; // relative path without locale prefix, e.g. "productos" or "blog/post-slug"
  title?: string;
  description?: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  noIndex?: boolean;
}

const OG_LOCALE_MAP: Record<Locale, string> = {
  es: "es_ES",
  ca: "ca_ES",
  en: "en_US",
};

export function getBaseUrl(): string {
  if (process.env.APP_URL) return process.env.APP_URL.replace(/\/$/, "");
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "https://swingforndepa.cat";
}

/**
 * Universal SEO metadata generator implementing section 10 & 14 guidelines:
 * - Fallback chain: metaTitle -> title -> site default
 * - Fallback chain: metaDescription -> excerpt -> site default
 * - Strict OpenGraph and Twitter cards
 * - Reciprocal hreflang alternates (ca, es, en, and x-default pointing to Spanish)
 * - Strict robots index/noindex control
 */
export async function constructMetadata(options: SeoOptions): Promise<Metadata> {
  const {
    locale,
    path = "",
    title: customTitle,
    description: customDescription,
    image: customImage,
    type = "website",
    publishedTime,
    modifiedTime,
    authors,
    noIndex = false,
  } = options;

  const settings = await getSiteSettings(locale);
  const baseUrl = getBaseUrl();

  // Normalize path without leading slash
  const cleanPath = path ? path.replace(/^\//, "") : "";

  // Title fallback chain (30-60 chars target)
  const siteBrand = settings.businessName;
  const pageTitle = customTitle
    ? `${customTitle} | ${siteBrand}`
    : `${siteBrand} — ${settings.tagline || "Forn de Pa i Pastisseria"}`;

  // Description fallback chain (120-160 chars target)
  const pageDescription =
    customDescription ||
    settings.description ||
    "Forn de pa artesanal i pastisseria de barri a Badalona. Pans de fermentació lenta amb massa mare, pastissos i rebosteria tradicional.";

  // Canonical & hreflang alternates
  const canonicalUrl = cleanPath ? `${baseUrl}/${locale}/${cleanPath}` : `${baseUrl}/${locale}`;

  const languages: Record<string, string> = {};
  for (const loc of SUPPORTED_LOCALES) {
    languages[loc] = cleanPath ? `${baseUrl}/${loc}/${cleanPath}` : `${baseUrl}/${loc}`;
  }
  // D1 decision: Spanish (es) is the default x-default
  languages["x-default"] = cleanPath ? `${baseUrl}/${DEFAULT_LOCALE}/${cleanPath}` : `${baseUrl}/${DEFAULT_LOCALE}`;

  // Fallback OG image
  const defaultOgImage = `${baseUrl}/assets/og-swing-bakery.jpg`;
  const ogImageUrl = customImage || defaultOgImage;

  return {
    title: pageTitle,
    description: pageDescription,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      siteName: siteBrand,
      locale: OG_LOCALE_MAP[locale] || "es_ES",
      alternateLocale: SUPPORTED_LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALE_MAP[l]),
      type,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${siteBrand} - ${settings.city}`,
        },
      ],
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [ogImageUrl],
    },
  };
}
