import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const isDemo = process.env.DEMO_MODE === "true";
const defaultStatus = isDemo ? "PUBLISHED" : "DRAFT";

export async function main() {
  console.log(`Starting ${isDemo ? "DEMO" : "STARTER DRAFT"} seed for Swing Forn de Pa...`);

  // 1. SiteSettings
  const siteSettings = await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
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
    },
  });

  // SiteSettings Translations
  const settingsTranslations = [
    {
      locale: "ca",
      tagline: "Forn de pa artesà i pastisseria de barri a Badalona",
      description: "Pa d'obrador, rebosteria artesanal, panellets de temporada i pastissos personalitzats.",
      announcement: "Obrador obert cada dia des de les 06:00 del matí a l'Avd. Catalunya 39.",
    },
    {
      locale: "es",
      tagline: "Panadería artesanal y repostería de barrio en Badalona",
      description: "Pan de masa madre, dulces de temporada y tartas personalizadas en Badalona.",
      announcement: "Obrador abierto todos los días desde las 06:00 de la mañana en Avda. Catalunya 39.",
    },
    {
      locale: "en",
      tagline: "Artisan bakery and neighborhood pastry shop in Badalona",
      description: "Fresh sourdough bread, seasonal Catalan specialties, and custom celebration cakes.",
      announcement: "Open daily from 06:00 in Avd. Catalunya 39, Badalona.",
    },
  ];

  for (const st of settingsTranslations) {
    await prisma.siteSettingsTranslation.upsert({
      where: {
        siteSettingsId_locale: {
          siteSettingsId: siteSettings.id,
          locale: st.locale,
        },
      },
      update: st,
      create: {
        siteSettingsId: siteSettings.id,
        ...st,
      },
    });
  }

  // 2. OpeningHours (Mon–Fri 06:00–21:00; Sat–Sun 06:00–15:00)
  const standardHours = [
    { dayOfWeek: 1, opensAt: "06:00", closesAt: "21:00", isClosed: false }, // Mon
    { dayOfWeek: 2, opensAt: "06:00", closesAt: "21:00", isClosed: false }, // Tue
    { dayOfWeek: 3, opensAt: "06:00", closesAt: "21:00", isClosed: false }, // Wed
    { dayOfWeek: 4, opensAt: "06:00", closesAt: "21:00", isClosed: false }, // Thu
    { dayOfWeek: 5, opensAt: "06:00", closesAt: "21:00", isClosed: false }, // Fri
    { dayOfWeek: 6, opensAt: "06:00", closesAt: "15:00", isClosed: false }, // Sat
    { dayOfWeek: 0, opensAt: "06:00", closesAt: "15:00", isClosed: false }, // Sun
  ];

  for (const h of standardHours) {
    const existing = await prisma.openingHours.findFirst({
      where: { dayOfWeek: h.dayOfWeek },
    });
    if (existing) {
      await prisma.openingHours.update({
        where: { id: existing.id },
        data: h,
      });
    } else {
      await prisma.openingHours.create({ data: h });
    }
  }

  // 3. The 14 EU Allergens (EU Regulation 1169/2011)
  const euAllergens = [
    { code: "gluten", icon: "Wheat", names: { ca: "Gluten (cereals)", es: "Gluten (cereales)", en: "Gluten (cereals)" } },
    { code: "crustaceans", icon: "Shrimp", names: { ca: "Crustacis", es: "Crustáceos", en: "Crustaceans" } },
    { code: "eggs", icon: "Egg", names: { ca: "Ous", es: "Huevos", en: "Eggs" } },
    { code: "fish", icon: "Fish", names: { ca: "Peix", es: "Pescado", en: "Fish" } },
    { code: "peanuts", icon: "Nut", names: { ca: "Cacauets", es: "Cacahuetes", en: "Peanuts" } },
    { code: "soybeans", icon: "Bean", names: { ca: "Soia", es: "Soja", en: "Soybeans" } },
    { code: "milk", icon: "Milk", names: { ca: "Llet i làctics", es: "Leche y lácteos", en: "Milk & dairy" } },
    { code: "nuts", icon: "Nut", names: { ca: "Fruits de closca", es: "Frutos de cáscara", en: "Tree nuts" } },
    { code: "celery", icon: "Leaf", names: { ca: "Api", es: "Apio", en: "Celery" } },
    { code: "mustard", icon: "Flame", names: { ca: "Mostassa", es: "Mostaza", en: "Mustard" } },
    { code: "sesame", icon: "Seed", names: { ca: "Sèsam", es: "Sésamo", en: "Sesame" } },
    { code: "sulphites", icon: "Wine", names: { ca: "Sulfits", es: "Sulfitos", en: "Sulphites" } },
    { code: "lupin", icon: "Flower", names: { ca: "Altramussos", es: "Altramuces", en: "Lupin" } },
    { code: "molluscs", icon: "Shell", names: { ca: "Mol·luscs", es: "Moluscos", en: "Molluscs" } },
  ];

  for (const allergen of euAllergens) {
    const record = await prisma.allergen.upsert({
      where: { code: allergen.code },
      update: { iconKey: allergen.icon },
      create: { code: allergen.code, iconKey: allergen.icon },
    });

    for (const locale of ["ca", "es", "en"] as const) {
      await prisma.allergenTranslation.upsert({
        where: { allergenId_locale: { allergenId: record.id, locale } },
        update: { name: allergen.names[locale] },
        create: { allergenId: record.id, locale, name: allergen.names[locale] },
      });
    }
  }

  // 4. Categories (7 suggested categories)
  const categoriesData = [
    { key: "bread", sort: 1, names: { ca: "Pa i Masses Mares", es: "Pan y Masas Madre", en: "Bread & Sourdough" } },
    { key: "pastries", sort: 2, names: { ca: "Pastisseria i Brioixeria", es: "Pastelería y Bollería", en: "Pastries & Viennoiserie" } },
    { key: "cakes", sort: 3, names: { ca: "Pastissos de Celebració", es: "Tartas de Celebración", en: "Celebration Cakes" } },
    { key: "sweets", sort: 4, names: { ca: "Galetes i Dolços Petits", es: "Galletas y Pastas", en: "Cookies & Confectionery" } },
    { key: "savoury", sort: 5, names: { ca: "Salat i Entrepans", es: "Salado y Bocadillos", en: "Savoury & Sandwiches" } },
    { key: "breakfast", sort: 6, names: { ca: "Esmorzars", es: "Desayunos", en: "Breakfast Combos" } },
    { key: "seasonal", sort: 7, names: { ca: "Especialitats de Temporada", es: "Especialidades de Temporada", en: "Seasonal Specialties" } },
  ];

  for (const cat of categoriesData) {
    const catRecord = await prisma.category.create({
      data: { sortOrder: cat.sort },
    });

    for (const locale of ["ca", "es", "en"] as const) {
      const slug = cat.names[locale].toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      await prisma.categoryTranslation.create({
        data: {
          categoryId: catRecord.id,
          locale,
          slug: `${slug}-${catRecord.id.slice(0, 4)}`,
          published: isDemo,
          name: cat.names[locale],
          description: `[PLACEHOLDER] Productes de la categoria ${cat.names[locale]} a Swing Forn de Pa.`,
        },
      });
    }
  }

  // 5. Collections (SEASONAL, DRAFT)
  const seasonalCollections = [
    { key: "panellets", name: "Castanyada (Panellets)", story: "[PLACEHOLDER] Tradició de panellets artesans d'ametlla i pinyons." },
    { key: "christmas", name: "Nadal i Reis", story: "[PLACEHOLDER] Dolços tradicionals per a festes familiars." },
    { key: "tortell", name: "Tortell de Reis", story: "[PLACEHOLDER] Tortell amb fava i rei el 6 de gener." },
    { key: "carnestoltes", name: "Carnestoltes", story: "[PLACEHOLDER] Coques de llardons i botifarra d'ou." },
    { key: "easter", name: "Pasqua (Mones i Torrijas)", story: "[PLACEHOLDER] Mones de xocolata i pastissos tradicionals." },
    { key: "sant-jordi", name: "Sant Jordi", story: "[PLACEHOLDER] Pa de Sant Jordi amb formatge, sobrassada i nous." },
    { key: "sant-joan", name: "Sant Joan (Coques)", story: "[PLACEHOLDER] Coques de brioix amb fruita confitada o crema." },
  ];

  for (const col of seasonalCollections) {
    const record = await prisma.collection.create({
      data: { type: "SEASONAL" },
    });

    for (const locale of ["ca", "es", "en"] as const) {
      await prisma.collectionTranslation.create({
        data: {
          collectionId: record.id,
          locale,
          slug: `${col.key}-${record.id.slice(0, 4)}`,
          published: isDemo,
          name: col.name,
          story: col.story,
        },
      });
    }
  }

  // 6. Pages (shells, DRAFT)
  const systemPages = [
    { key: "home", template: "HOME", titles: { ca: "Inici", es: "Inicio", en: "Home" } },
    { key: "menu", template: "MENU_INDEX", titles: { ca: "Productes", es: "Productos", en: "Products" } },
    { key: "seasonal", template: "SEASONAL_INDEX", titles: { ca: "Especialitats", es: "Especialidades", en: "Specialties" } },
    { key: "custom-cakes", template: "CUSTOM_CAKES", titles: { ca: "Pastissos per encàrrec", es: "Tartas personalizadas", en: "Custom Cakes" } },
    { key: "about", template: "ABOUT", titles: { ca: "El nostre forn", es: "Nuestra panadería", en: "About Us" } },
    { key: "blog", template: "BLOG_INDEX", titles: { ca: "Novetats", es: "Novedades", en: "Journal" } },
    { key: "faq", template: "FAQ", titles: { ca: "Preguntes freqüents", es: "Preguntas frecuentes", en: "FAQ" } },
    { key: "contact", template: "CONTACT", titles: { ca: "Contacte i Horaris", es: "Contacto y Horarios", en: "Contact & Hours" } },
    { key: "aviso-legal", template: "LEGAL", titles: { ca: "Avís legal", es: "Aviso legal", en: "Legal Notice" } },
    { key: "privacy", template: "LEGAL", titles: { ca: "Política de privacitat", es: "Política de privacidad", en: "Privacy Policy" } },
    { key: "cookies", template: "LEGAL", titles: { ca: "Política de cookies", es: "Política de cookies", en: "Cookie Policy" } },
    { key: "allergen-information", template: "LEGAL", titles: { ca: "Informació d'Al·lèrgens", es: "Información de Alérgenos", en: "Allergen Information" } },
  ];

  for (const page of systemPages) {
    const pageRecord = await prisma.page.upsert({
      where: { key: page.key },
      update: { template: page.template },
      create: {
        key: page.key,
        template: page.template,
        status: isDemo ? "PUBLISHED" : "DRAFT",
        blocks: [],
      },
    });

    for (const locale of ["ca", "es", "en"] as const) {
      const slug = page.key;
      await prisma.pageTranslation.upsert({
        where: { pageId_locale: { pageId: pageRecord.id, locale } },
        update: {
          title: page.titles[locale],
          published: isDemo,
        },
        create: {
          pageId: pageRecord.id,
          locale,
          slug,
          published: isDemo,
          title: page.titles[locale],
          intro: `[PLACEHOLDER] Contingut oficial de ${page.titles[locale]} a Swing Forn de Pa.`,
        },
      });
    }
  }

  // 7. Navigation Menus
  const headerMenu = await prisma.navMenu.upsert({
    where: { key: "HEADER" },
    update: {},
    create: { key: "HEADER" },
  });

  const headerItems = [
    { linkType: "PAGE" as const, targetId: "menu", sort: 1, labels: { ca: "Productes", es: "Productos", en: "Products" } },
    { linkType: "PAGE" as const, targetId: "seasonal", sort: 2, labels: { ca: "Especialitats", es: "Especialidades", en: "Specialties" } },
    { linkType: "PAGE" as const, targetId: "custom-cakes", sort: 3, labels: { ca: "Pastissos", es: "Tartas personalizadas", en: "Custom Cakes" } },
    { linkType: "PAGE" as const, targetId: "about", sort: 4, labels: { ca: "El nostre forn", es: "Sobre nosotros", en: "About" } },
    { linkType: "PAGE" as const, targetId: "contact", sort: 5, labels: { ca: "Contacte", es: "Contacto", en: "Contact" } },
  ];

  for (const item of headerItems) {
    const navItem = await prisma.navItem.create({
      data: {
        menuId: headerMenu.id,
        sortOrder: item.sort,
        linkType: item.linkType,
        targetId: item.targetId,
      },
    });

    for (const locale of ["ca", "es", "en"] as const) {
      await prisma.navItemTranslation.create({
        data: {
          navItemId: navItem.id,
          locale,
          label: item.labels[locale],
        },
      });
    }
  }

  // 8. Admin User
  const adminEmail = process.env.SEED_ADMIN_EMAIL || "admin@swingforndepa.cat";
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { role: "ADMIN" },
    create: {
      email: adminEmail,
      name: "Responsable Swing Forn de Pa",
      role: "ADMIN",
    },
  });

  console.log("✅ Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seed execution note:", e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
