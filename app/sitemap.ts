import { MetadataRoute } from "next";
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, Locale } from "@/lib/i18n";
import { getBaseUrl } from "@/lib/seo";
import { contentStore } from "@/lib/content-store";

// Localized route slugs per locale
const STATIC_ROUTES: Array<{
  key: string;
  slugs: Record<Locale, string>;
  priority: number;
  changeFrequency: "daily" | "weekly" | "monthly";
}> = [
  {
    key: "home",
    slugs: { ca: "", es: "", en: "" },
    priority: 1.0,
    changeFrequency: "daily",
  },
  {
    key: "menu",
    slugs: { ca: "productes", es: "productos", en: "products" },
    priority: 0.9,
    changeFrequency: "daily",
  },
  {
    key: "seasonal",
    slugs: { ca: "temporada", es: "temporada", en: "seasonal" },
    priority: 0.8,
    changeFrequency: "weekly",
  },
  {
    key: "custom-cakes",
    slugs: {
      ca: "pastissos-personalitzats",
      es: "tartas-personalizadas",
      en: "custom-cakes",
    },
    priority: 0.8,
    changeFrequency: "weekly",
  },
  {
    key: "about",
    slugs: { ca: "sobre-nosaltres", es: "sobre-nosotros", en: "about-us" },
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    key: "blog",
    slugs: { ca: "blog", es: "blog", en: "blog" },
    priority: 0.8,
    changeFrequency: "weekly",
  },
  {
    key: "faq",
    slugs: {
      ca: "preguntes-frequents",
      es: "preguntas-frecuentes",
      en: "frequently-asked-questions",
    },
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    key: "contact",
    slugs: { ca: "contacte", es: "contacto", en: "contact" },
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    key: "allergens",
    slugs: {
      ca: "informacio-allergens",
      es: "informacion-alergenos",
      en: "allergen-information",
    },
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    key: "legal",
    slugs: { ca: "avis-legal", es: "aviso-legal", en: "legal-notice" },
    priority: 0.3,
    changeFrequency: "monthly",
  },
  {
    key: "privacy",
    slugs: {
      ca: "politica-privadesa",
      es: "politica-privacidad",
      en: "privacy-policy",
    },
    priority: 0.3,
    changeFrequency: "monthly",
  },
  {
    key: "cookies",
    slugs: {
      ca: "politica-cookies",
      es: "politica-cookies",
      en: "cookie-policy",
    },
    priority: 0.3,
    changeFrequency: "monthly",
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const sitemapEntries: MetadataRoute.Sitemap = [];
  const now = new Date();

  // 1. Static Localized Pages
  for (const page of STATIC_ROUTES) {
    for (const locale of SUPPORTED_LOCALES) {
      const pagePath = page.slugs[locale];
      const pageUrl = pagePath ? `${baseUrl}/${locale}/${pagePath}` : `${baseUrl}/${locale}`;

      const languages: Record<string, string> = {};
      for (const loc of SUPPORTED_LOCALES) {
        const altPath = page.slugs[loc];
        languages[loc] = altPath ? `${baseUrl}/${loc}/${altPath}` : `${baseUrl}/${loc}`;
      }
      const defaultPath = page.slugs[DEFAULT_LOCALE];
      languages["x-default"] = defaultPath
        ? `${baseUrl}/${DEFAULT_LOCALE}/${defaultPath}`
        : `${baseUrl}/${DEFAULT_LOCALE}`;

      sitemapEntries.push({
        url: pageUrl,
        lastModified: now,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages,
        },
      });
    }
  }

  // 2. Published Blog Posts
  const posts = contentStore.getPosts().filter((p) => p.status === "PUBLISHED");
  for (const post of posts) {
    for (const locale of SUPPORTED_LOCALES) {
      const postSlug = post.slug[locale] || post.slug.es;
      const postUrl = `${baseUrl}/${locale}/blog/${postSlug}`;

      const languages: Record<string, string> = {};
      for (const loc of SUPPORTED_LOCALES) {
        const altSlug = post.slug[loc] || post.slug.es;
        languages[loc] = `${baseUrl}/${loc}/blog/${altSlug}`;
      }
      languages["x-default"] = `${baseUrl}/${DEFAULT_LOCALE}/blog/${post.slug[DEFAULT_LOCALE] || post.slug.es}`;

      sitemapEntries.push({
        url: postUrl,
        lastModified: new Date(post.publishedAt || now),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages,
        },
      });
    }
  }

  // 3. Published Products
  const products = contentStore.getProducts().filter((p) => p.status === "PUBLISHED");
  for (const product of products) {
    for (const locale of SUPPORTED_LOCALES) {
      const prodSlug = product.slug[locale] || product.slug.es;
      const prodUrl = `${baseUrl}/${locale}/producto/${prodSlug}`;

      const languages: Record<string, string> = {};
      for (const loc of SUPPORTED_LOCALES) {
        const altSlug = product.slug[loc] || product.slug.es;
        languages[loc] = `${baseUrl}/${loc}/producto/${altSlug}`;
      }
      languages["x-default"] = `${baseUrl}/${DEFAULT_LOCALE}/producto/${product.slug[DEFAULT_LOCALE] || product.slug.es}`;

      sitemapEntries.push({
        url: prodUrl,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: {
          languages,
        },
      });
    }
  }

  return sitemapEntries;
}
