import { PublicSiteSettings } from "./settings";
import { OpeningHoursRange } from "./hours";
import { Locale } from "./i18n";
import { BlogPostItem, ProductItem } from "./content-store";

const DAY_MAP_SCHEMA: Record<number, string> = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  0: "Sunday",
};

/**
 * Generates Schema.org Bakery (LocalBusiness / FoodEstablishment)
 * Validated against Google Rich Results specification
 */
export function buildBakeryJsonLd(
  settings: PublicSiteSettings,
  weeklyHours: OpeningHoursRange[],
  baseUrl: string
) {
  const openingHoursSpecification = weeklyHours
    .filter((h) => !h.closed && h.openTime && h.closeTime)
    .map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: DAY_MAP_SCHEMA[h.dayOfWeek] || "Monday",
      opens: h.openTime,
      closes: h.closeTime,
    }));

  return {
    "@context": "https://schema.org",
    "@type": ["Bakery", "FoodEstablishment"],
    "@id": `${baseUrl}#bakery`,
    name: settings.businessName,
    description: settings.description,
    telephone: settings.phone,
    email: settings.email,
    url: `${baseUrl}/${settings.defaultLocale}`,
    hasMap: settings.googleMapsUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.street,
      addressLocality: settings.city,
      addressRegion: settings.region,
      postalCode: settings.postcode,
      addressCountry: "ES",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: settings.lat,
      longitude: settings.lng,
    },
    openingHoursSpecification,
    priceRange: "€",
    servesCuisine: ["Catalan", "Panadería artesanal", "Masa madre", "Pastelería"],
    currenciesAccepted: "EUR",
    paymentAccepted: "Cash, Credit Card, Contactless",
  };
}

/**
 * Generates Schema.org BreadcrumbList for hierarchical SEO navigation
 */
export function buildBreadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
  baseUrl: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => {
      const fullUrl = item.path.startsWith("http")
        ? item.path
        : `${baseUrl}/${item.path.replace(/^\//, "")}`;
      return {
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: fullUrl,
      };
    }),
  };
}

/**
 * Generates Schema.org BlogPosting for articles
 */
export function buildBlogPostJsonLd(
  post: BlogPostItem,
  locale: Locale,
  baseUrl: string,
  settings: PublicSiteSettings
) {
  const postUrl = `${baseUrl}/${locale}/blog/${post.slug[locale] || post.slug.es}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title[locale] || post.title.es,
    description: post.excerpt[locale] || post.excerpt.es,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    author: {
      "@type": "Organization",
      name: settings.businessName,
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: settings.businessName,
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/assets/logo.png`,
      },
    },
  };
}

/**
 * Generates Schema.org Product with EU 1169/2011 allergens declaration
 */
export function buildProductJsonLd(
  product: ProductItem,
  locale: Locale,
  baseUrl: string,
  settings: PublicSiteSettings
) {
  const name = product.name[locale] || product.name.es;
  const description = product.description[locale] || product.description.es;
  const productUrl = `${baseUrl}/${locale}/producto/${product.slug[locale] || product.slug.es}`;

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    url: productUrl,
    brand: {
      "@type": "Brand",
      name: settings.businessName,
    },
    category: product.categoryId,
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "EU Regulation 1169/2011 Allergens",
        value: product.allergens.length > 0 ? product.allergens.join(", ") : "None declared",
      },
    ],
  };

  if (settings.showPrices && product.priceCents) {
    jsonLd.offers = {
      "@type": "Offer",
      price: (product.priceCents / 100).toFixed(2),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      priceValidUntil: "2027-12-31",
      seller: {
        "@type": "Organization",
        name: settings.businessName,
      },
    };
  }

  return jsonLd;
}

/**
 * Generates Schema.org FAQPage for FAQ rich snippets in Google
 */
export function buildFaqJsonLd(
  faqs: Array<{ question: Record<string, string>; answer: Record<string, string> }>,
  locale: Locale
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question[locale] || faq.question.es,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer[locale] || faq.answer.es,
      },
    })),
  };
}
