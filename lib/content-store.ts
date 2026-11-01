import { Locale } from "./i18n";

export interface LocalizedString {
  ca: string;
  es: string;
  en: string;
}

export interface ProductItem {
  id: string;
  name: LocalizedString;
  slug: LocalizedString;
  categoryId: string;
  priceCents?: number;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  allergens: string[]; // e.g. ["gluten", "milk", "eggs"]
  allergensReviewedAt: string | null; // ISO Date string
  allergensReviewedBy: string | null;
  isFeatured: boolean;
  isSeasonal: boolean;
  description: LocalizedString;
  badge?: string;
}

export interface CategoryItem {
  id: string;
  name: LocalizedString;
  slug: LocalizedString;
  sortOrder: number;
}

export interface SeasonalCampaign {
  id: string;
  name: LocalizedString;
  slug: LocalizedString;
  startsOn: string;
  endsOn: string;
  story: LocalizedString;
  active: boolean;
  productIds: string[];
}

export interface BlogPostItem {
  id: string;
  title: LocalizedString;
  slug: LocalizedString;
  excerpt: LocalizedString;
  content: string; // HTML or Markdown
  category: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  publishedAt: string; // ISO Date string
  readingMinutes: number;
}

export interface FaqItem {
  id: string;
  category: string;
  question: LocalizedString;
  answer: LocalizedString;
  sortOrder: number;
}

export interface TestimonialItem {
  id: string;
  authorName: string;
  sourceLabel: string;
  quote: LocalizedString;
  consentDate: string;
  isFeatured: boolean;
}

export interface PageBlock {
  id: string;
  type:
    | "hero"
    | "media_text"
    | "rich_text"
    | "feature_grid"
    | "product_showcase"
    | "seasonal_banner"
    | "image_gallery"
    | "testimonials"
    | "cta_banner"
    | "visit_info"
    | "faq_list"
    | "latest_posts";
  label: string;
  data: Record<string, unknown>;
}

export interface InquiryItem {
  id: string;
  createdAt: string; // ISO string
  name: string;
  email: string;
  phone: string;
  topic: "GENERAL" | "CAKE_QUESTION" | "ALLERGEN_INFO" | "HOURS_VISIT";
  message: string;
  eventDate?: string;
  portions?: number;
  consentGiven: boolean;
  consentTimestamp: string;
  ipHash?: string;
  status: "NEW" | "IN_PROGRESS" | "DONE" | "ARCHIVED";
  staffNotes?: string;
}

// In-memory reactive store initialized with verified bakery data
class ContentStore {
  private categories: CategoryItem[] = [
    {
      id: "cat-1",
      name: { ca: "Pa i Masses Mares", es: "Pan y Masas Madre", en: "Bread & Sourdough" },
      slug: { ca: "pa-i-masses-mares", es: "pan-y-masas-madre", en: "bread-and-sourdough" },
      sortOrder: 1,
    },
    {
      id: "cat-2",
      name: { ca: "Pastisseria i Brioixeria", es: "Pastelería y Bollería", en: "Pastries & Viennoiserie" },
      slug: { ca: "pastisseria-i-brioixeria", es: "pasteleria-y-bolleria", en: "pastries-and-viennoiserie" },
      sortOrder: 2,
    },
    {
      id: "cat-3",
      name: { ca: "Pastissos de Celebració", es: "Tartas de Celebración", en: "Celebration Cakes" },
      slug: { ca: "pastissos-de-celebracio", es: "tartas-de-celebracion", en: "celebration-cakes" },
      sortOrder: 3,
    },
    {
      id: "cat-4",
      name: { ca: "Especialitats de Temporada", es: "Especialidades de Temporada", en: "Seasonal Specialties" },
      slug: { ca: "especialitats-de-temporada", es: "especialidades-de-temporada", en: "seasonal-specialties" },
      sortOrder: 4,
    },
  ];

  private products: ProductItem[] = [
    {
      id: "prod-1",
      name: {
        ca: "Pa de Pagès Tradicional",
        es: "Pan de Payés Tradicional",
        en: "Traditional Catalan Sourdough Bread",
      },
      slug: {
        ca: "pa-de-pages-tradicional",
        es: "pan-de-payes-tradicional",
        en: "traditional-catalan-sourdough",
      },
      categoryId: "cat-1",
      priceCents: 240,
      status: "PUBLISHED",
      allergens: ["gluten"],
      allergensReviewedAt: "2026-10-15T08:00:00Z",
      allergensReviewedBy: "Obrador Swing",
      isFeatured: true,
      isSeasonal: false,
      description: {
        ca: "Fermentació de 24 hores amb massa mare natural, crosta cruixent i molla humida i airejada.",
        es: "Fermentación lenta de 24 horas con masa madre natural, corteza crujiente y miga esponjosa.",
        en: "Slow-fermented sourdough bread with crisp crust and open crumb.",
      },
      badge: "Diari",
    },
    {
      id: "prod-2",
      name: {
        ca: "Croissant Artesà de Mantega",
        es: "Croissant Artesano de Mantequilla",
        en: "Artisan Butter Croissant",
      },
      slug: {
        ca: "croissant-artesa-mantega",
        es: "croissant-artesano-mantequilla",
        en: "artisan-butter-croissant",
      },
      categoryId: "cat-2",
      priceCents: 160,
      status: "PUBLISHED",
      allergens: ["gluten", "milk", "eggs"],
      allergensReviewedAt: "2026-10-15T08:00:00Z",
      allergensReviewedBy: "Obrador Swing",
      isFeatured: true,
      isSeasonal: false,
      description: {
        ca: "Massa fullada amb mantega pura de primera qualitat, cruixent per fora i tendre per dins.",
        es: "Hojaldrado artesanal con mantequilla pura, textura crujiente y aromática.",
        en: "Hand-rolled flaky croissant made with pure churned butter.",
      },
      badge: "Diari",
    },
    {
      id: "prod-3",
      name: {
        ca: "Panellets de Pinyons del País",
        es: "Panellets de Piñones del País",
        en: "Catalan Pine Nut Panellets",
      },
      slug: {
        ca: "panellets-de-pinyons",
        es: "panellets-de-pinones",
        en: "catalan-pine-nut-panellets",
      },
      categoryId: "cat-4",
      priceCents: 450,
      status: "PUBLISHED",
      allergens: ["nuts", "eggs"],
      allergensReviewedAt: "2026-10-20T10:00:00Z",
      allergensReviewedBy: "Obrador Swing",
      isFeatured: true,
      isSeasonal: true,
      description: {
        ca: "Massapà tradicional d'ametlla marcona i sucre cobert generosament amb pinyons daurats.",
        es: "Mazapán tradicional de almendra marcona recubierto de piñones del país seleccionados.",
        en: "Traditional Catalan All Saints' almond sweets coated in toasted pine nuts.",
      },
      badge: "Temporada",
    },
    {
      id: "prod-4",
      name: {
        ca: "Pantxineta Artesana amb Crema",
        es: "Pantxineta Artesana con Crema",
        en: "Pantxineta Custard Pastry",
      },
      slug: {
        ca: "pantxineta-artesana-crema",
        es: "pantxineta-artesana-crema",
        en: "pantxineta-custard-pastry",
      },
      categoryId: "cat-2",
      priceCents: 320,
      status: "PUBLISHED",
      allergens: ["gluten", "milk", "eggs", "nuts"],
      allergensReviewedAt: "2026-10-20T10:00:00Z",
      allergensReviewedBy: "Obrador Swing",
      isFeatured: true,
      isSeasonal: false,
      description: {
        ca: "Fullat cruixent farcit de crema pastissera aromatitzada amb vainilla i ametlles torrades.",
        es: "Hojaldre crujiente relleno de crema pastelera casera y almendras laminadas.",
        en: "Crisp puff pastry filled with vanilla custard and sliced toasted almonds.",
      },
      badge: "Especialitat",
    },
  ];

  private campaigns: SeasonalCampaign[] = [
    {
      id: "camp-1",
      name: {
        ca: "Campanya de Castanyada i Panellets",
        es: "Campaña de Castanyada y Panellets",
        en: "Castanyada & Panellets Season",
      },
      slug: {
        ca: "castanyada-panellets",
        es: "castanada-panellets",
        en: "castanyada-panellets",
      },
      startsOn: "2026-10-15",
      endsOn: "2026-11-08",
      story: {
        ca: "Celebrem la tardor a Badalona amb els nostres panellets artesans fets a mà amb pinyons, ametlla, cafè i xocolata.",
        es: "Celebramos el otoño con nuestros panellets tradicionales elaborados a mano en Badalona.",
        en: "Autumn tradition featuring handcrafted almond and pine nut sweets.",
      },
      active: true,
      productIds: ["prod-3"],
    },
    {
      id: "camp-2",
      name: {
        ca: "Tortell de Reis Artesanal",
        es: "Tortel de Reyes Artesanal",
        en: "Three Kings Epiphany Cake",
      },
      slug: {
        ca: "tortell-de-reis",
        es: "tortel-de-reyes",
        en: "three-kings-cake",
      },
      startsOn: "2026-12-28",
      endsOn: "2027-01-08",
      story: {
        ca: "Massa de brioix esponjosa amb massapà, nata o trufa, amb fava i figura de rei.",
        es: "Brioche tierno con mazapán, nata o trufa, con haba y figurita tradicional.",
        en: "Traditional crown brioche for Three Kings celebration.",
      },
      active: false,
      productIds: [],
    },
  ];

  private posts: BlogPostItem[] = [
    {
      id: "post-1",
      title: {
        ca: "Com elaborem els panellets a Swing Forn de Pa",
        es: "Cómo elaboramos los panellets en Swing Forn de Pa",
        en: "How we bake panellets at Swing Forn de Pa",
      },
      slug: {
        ca: "com-elaborem-els-panellets",
        es: "como-elaboramos-los-panellets",
        en: "how-we-bake-panellets",
      },
      excerpt: {
        ca: "Secrets del massapà tradicional i la importància de triar pinyons de proximitat.",
        es: "Secretos del mazapán tradicional y la selección de piñones del país.",
        en: "The secret behind our almond marzipan and local pine nuts.",
      },
      content:
        "<p>Cada any per Tots Sants el nostre obrador de l'Avinguda Catalunya s'omple de l'aroma dolça d'ametlla marcona i pinyons torrats...</p>",
      category: "Rebosteria",
      status: "PUBLISHED",
      publishedAt: "2026-10-22T09:00:00Z",
      readingMinutes: 3,
    },
  ];

  private faqs: FaqItem[] = [
    {
      id: "faq-1",
      category: "Horaris i Comandes",
      question: {
        ca: "Quin és l'horari habitual del forn?",
        es: "¿Cuál es el horario habitual de la panadería?",
        en: "What are your standard opening hours?",
      },
      answer: {
        ca: "Obrim de dilluns a divendres de 06:00 a 21:00 ininterrompudament, i dissabtes i diumenges de 06:00 a 15:00.",
        es: "Abrimos de lunes a viernes de 06:00 a 21:00 ininterrumpidamente, y sábados y domingos de 06:00 a 15:00.",
        en: "We are open Monday to Friday 06:00 to 21:00, and Saturday & Sunday 06:00 to 15:00.",
      },
      sortOrder: 1,
    },
    {
      id: "faq-2",
      category: "Pastissos Personalitzats",
      question: {
        ca: "Amb quant de temps he d'encarregar un pastís d'aniversari?",
        es: "¿Con cuánto tiempo debo encargar una tarta de cumpleaños?",
        en: "How much advance notice is required for custom cakes?",
      },
      answer: {
        ca: "Recomanem encarregar amb 24 a 48 hores d'antelació mitjançant el nostre WhatsApp o trucant al 934 60 66 70.",
        es: "Recomendamos encargar con 24 a 48 horas de antelación vía WhatsApp o llamando al 934 60 66 70.",
        en: "We recommend 24 to 48 hours notice via WhatsApp or calling +34 934 60 66 70.",
      },
      sortOrder: 2,
    },
    {
      id: "faq-3",
      category: "Al·lèrgens",
      question: {
        ca: "Teniu informació clara sobre al·lèrgens?",
        es: "¿Tenéis información detallada sobre alérgenos?",
        en: "Do you provide transparent allergen information?",
      },
      answer: {
        ca: "Sí, declarem els 14 al·lèrgens regulats per la normativa europea (UE 1169/2011) en cadascun dels nostres productes.",
        es: "Sí, declaramos los 14 alérgenos regulados por la normativa europea (UE 1169/2011) en cada producto.",
        en: "Yes, we rigorously declare the 14 EU regulated allergens for each product.",
      },
      sortOrder: 3,
    },
  ];

  private testimonials: TestimonialItem[] = [
    {
      id: "test-1",
      authorName: "Marta S.",
      sourceLabel: "Clienta habitual de Badalona",
      quote: {
        ca: "El millor pa de pagès de la zona. Es nota la massa mare autèntica i la crosta cruixent que aguanta dies.",
        es: "El mejor pan de payés de la zona. Se nota la masa madre auténtica y la corteza crujiente.",
        en: "The best sourdough bread in Badalona. Real crust and authentic quality.",
      },
      consentDate: "2026-09-10",
      isFeatured: true,
    },
    {
      id: "test-2",
      authorName: "Jordi G.",
      sourceLabel: "Aniversari familiar, 2026",
      quote: {
        ca: "Vam encarregar un pastís de nata i trufa per als 50 anys del meu germà. Tot un èxit, fresc i saborós.",
        es: "Encargamos una tarta de nata y trufa para el cumpleaños de mi hermano. Exquisita y fresca.",
        en: "We ordered a custom chocolate and cream cake for a family celebration. Absolutely delicious.",
      },
      consentDate: "2026-10-01",
      isFeatured: true,
    },
  ];

  // Getters
  public getProducts() {
    return [...this.products];
  }

  public getCategories() {
    return [...this.categories];
  }

  public getCampaigns() {
    return [...this.campaigns];
  }

  public getPosts() {
    return [...this.posts];
  }

  public getFaqs() {
    return [...this.faqs];
  }

  public getTestimonials() {
    return [...this.testimonials];
  }

  // Mutations
  public addProduct(product: ProductItem) {
    this.products.unshift(product);
    return product;
  }

  public updateProduct(id: string, updates: Partial<ProductItem>) {
    const idx = this.products.findIndex((p) => p.id === id);
    if (idx !== -1) {
      this.products[idx] = { ...this.products[idx], ...updates };
      return this.products[idx];
    }
    return null;
  }

  public deleteProduct(id: string) {
    this.products = this.products.filter((p) => p.id !== id);
  }

  public addCampaign(campaign: SeasonalCampaign) {
    this.campaigns.unshift(campaign);
    return campaign;
  }

  public updateCampaign(id: string, updates: Partial<SeasonalCampaign>) {
    const idx = this.campaigns.findIndex((c) => c.id === id);
    if (idx !== -1) {
      this.campaigns[idx] = { ...this.campaigns[idx], ...updates };
      return this.campaigns[idx];
    }
    return null;
  }

  public addPost(post: BlogPostItem) {
    this.posts.unshift(post);
    return post;
  }

  public updatePost(id: string, updates: Partial<BlogPostItem>) {
    const idx = this.posts.findIndex((p) => p.id === id);
    if (idx !== -1) {
      this.posts[idx] = { ...this.posts[idx], ...updates };
      return this.posts[idx];
    }
    return null;
  }

  public addFaq(faq: FaqItem) {
    this.faqs.push(faq);
    return faq;
  }

  public addTestimonial(test: TestimonialItem) {
    this.testimonials.push(test);
    return test;
  }
}

declare global {
  // eslint-disable-next-line no-var
  var __contentStore: ContentStore | undefined;
}

export const contentStore = globalThis.__contentStore ?? new ContentStore();

if (process.env.NODE_ENV !== "production") {
  globalThis.__contentStore = contentStore;
}
