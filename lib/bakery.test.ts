import test from "node:test";
import assert from "node:assert/strict";
import { resolvePath } from "./resolve-path";
import { getBakeryOpenStatus, DEFAULT_WEEKLY_HOURS } from "./hours";
import {
  buildBakeryJsonLd,
  buildBreadcrumbJsonLd,
  buildProductJsonLd,
} from "./jsonld";
import { constructMetadata } from "./seo";
import { contentStore, ProductItem } from "./content-store";
import { submitInquiryAction } from "../server/actions/content";

test("resolvePath: correctly maps localized top-level and nested slugs", async () => {
  // Home
  const homeEs = await resolvePath("es", []);
  assert.equal(homeEs.type, "HOME");

  // Menu index in Catalan and Spanish
  const menuCa = await resolvePath("ca", ["productes"]);
  assert.equal(menuCa.type, "MENU_INDEX");

  const menuEs = await resolvePath("es", ["productos"]);
  assert.equal(menuEs.type, "MENU_INDEX");

  // Custom cakes
  const cakesCa = await resolvePath("ca", ["pastissos-personalitzats"]);
  assert.equal(cakesCa.type, "CUSTOM_CAKES");

  const cakesEs = await resolvePath("es", ["tartas-personalizadas"]);
  assert.equal(cakesEs.type, "CUSTOM_CAKES");

  // Nested product
  const prodNested = await resolvePath("ca", ["productes", "pa-de-pages-tradicional"]);
  assert.equal(prodNested.type, "PRODUCT");
  assert.equal(prodNested.slug, "pa-de-pages-tradicional");

  // Unknown route -> NOT_FOUND
  const notFound = await resolvePath("es", ["slug-inventat-inexistent"]);
  assert.equal(notFound.type, "NOT_FOUND");
});

test("hours: getBakeryOpenStatus honors weekly schedule and holiday closures", () => {
  // Test with closed schedule
  const closedSchedule = DEFAULT_WEEKLY_HOURS.map((h) => ({ ...h, isClosed: true }));
  const statusClosed = getBakeryOpenStatus(closedSchedule, [], "es");
  assert.equal(statusClosed.isOpen, false);
  assert.match(statusClosed.statusText, /Cerrado/);

  // Test special holiday closure
  const today = new Date().toISOString().slice(0, 10);
  const specialClosure = [
    {
      dateFrom: today,
      dateTo: today,
      isClosed: true,
      note: "Dia de Nadal",
    },
  ];
  const holidayStatus = getBakeryOpenStatus(DEFAULT_WEEKLY_HOURS, specialClosure, "ca");
  assert.equal(holidayStatus.isOpen, false);
  assert.match(holidayStatus.statusText, /Tancat/);
  assert.match(holidayStatus.statusText, /Nadal/);
});

test("jsonld: buildBakeryJsonLd generates valid Schema.org specification", () => {
  const dummySettings = {
    businessName: "Swing Forn de Pa",
    phone: "+34 934 60 66 70",
    whatsapp: "+34 934 60 66 70",
    street: "Avd. Catalunya 39",
    city: "Badalona",
    postcode: "08917",
    region: "Barcelona",
    country: "España",
    lat: 41.4502221,
    lng: 2.2296483,
    googleMapsUrl: "https://maps.app.goo.gl/Vr26Zu4LZqhYDtpR8",
    defaultLocale: "es",
    enabledLocales: ["ca", "es", "en"],
    timeZone: "Europe/Madrid",
    showPrices: true,
  };

  const jsonLd = buildBakeryJsonLd(dummySettings, DEFAULT_WEEKLY_HOURS, "https://swingforndepa.cat");
  assert.equal(jsonLd["@context"], "https://schema.org");
  assert.deepEqual(jsonLd["@type"], ["Bakery", "FoodEstablishment"]);
  assert.equal(jsonLd.name, "Swing Forn de Pa");
  assert.equal(jsonLd.telephone, "+34 934 60 66 70");
  assert.equal(jsonLd.address.addressLocality, "Badalona");
  assert.ok(jsonLd.openingHoursSpecification.length > 0);
});

test("jsonld: buildProductJsonLd includes EU 1169/2011 allergens metadata", () => {
  const sampleProduct: ProductItem = {
    id: "prod-test",
    name: { ca: "Pa d'espelta", es: "Pan de espelta", en: "Spelt Bread" },
    slug: { ca: "pa-espelta", es: "pan-espelta", en: "spelt-bread" },
    categoryId: "cat-1",
    priceCents: 350,
    status: "PUBLISHED",
    allergens: ["gluten", "sesame"],
    allergensReviewedAt: "2026-10-20T10:00:00Z",
    allergensReviewedBy: "Obrador Swing",
    isFeatured: true,
    isSeasonal: false,
    description: { ca: "Pa artesà", es: "Pan artesano", en: "Artisan bread" },
  };

  const dummySettings = {
    businessName: "Swing Forn de Pa",
    phone: "+34 934 60 66 70",
    whatsapp: "+34 934 60 66 70",
    street: "Avd. Catalunya 39",
    city: "Badalona",
    postcode: "08917",
    region: "Barcelona",
    country: "España",
    lat: 41.4502221,
    lng: 2.2296483,
    googleMapsUrl: "https://maps.app.goo.gl/Vr26Zu4LZqhYDtpR8",
    defaultLocale: "es",
    enabledLocales: ["ca", "es", "en"],
    timeZone: "Europe/Madrid",
    showPrices: true,
  };

  const productLd = buildProductJsonLd(sampleProduct, "ca", "https://swingforndepa.cat", dummySettings);
  assert.equal(productLd["@type"], "Product");
  assert.equal(productLd.name, "Pa d'espelta");
  assert.ok(productLd.offers);
  // Verify EU allergens property
  const allergenProp = (productLd.additionalProperty as Array<{ name: string; value: string }>).find(
    (p) => p.name.includes("Allergens")
  );
  assert.ok(allergenProp);
  assert.match(allergenProp.value, /gluten/);
});

test("seo: constructMetadata builds reciprocal hreflang and x-default", async () => {
  const meta = await constructMetadata({
    locale: "ca",
    path: "productes",
    title: "Carta de Pans",
  });

  const baseUrl = (await import("./seo")).getBaseUrl();

  assert.match(meta.title as string, /Carta de Pans/);
  assert.match(meta.title as string, /Swing Forn de Pa/);
  assert.ok(meta.alternates?.languages);
  assert.equal(meta.alternates.languages["es"], `${baseUrl}/es/productes`);
  assert.equal(meta.alternates.languages["ca"], `${baseUrl}/ca/productes`);
  assert.equal(meta.alternates.languages["x-default"], `${baseUrl}/es/productes`);
});

test("inquiry: submitInquiryAction verifies validation, bots and store insertion", async () => {
  // Bot caught by honeypot -> silently accepted
  const botResult = await submitInquiryAction({
    name: "Spam Bot",
    email: "bot@spam.com",
    message: "Buy cheap pills",
    consent: true,
    honeypot: "sneaky-bot-text",
  });
  assert.equal(botResult.success, true);

  // Missing consent -> fails
  const noConsent = await submitInquiryAction({
    name: "Joan Pi",
    email: "joan@badalona.cat",
    message: "Vull informació",
    consent: false,
  });
  assert.equal(noConsent.success, false);
  assert.match(noConsent.error || "", /privacitat/);

  // Legitimate inquiry -> succeeds and creates record
  const legitResult = await submitInquiryAction({
    name: "Carme Soler",
    email: "carme.soler@badalona.cat",
    phone: "+34 611 22 33 44",
    topic: "CAKE_QUESTION",
    message: "Hola! Teniu pastís de massapà per a 8 persones?",
    portions: 8,
    consent: true,
  });
  assert.equal(legitResult.success, true);
  assert.ok(legitResult.inquiryId);

  // Record exists in store
  const found = contentStore.getInquiryById(legitResult.inquiryId);
  assert.ok(found);
  assert.equal(found.name, "Carme Soler");
  assert.equal(found.status, "NEW");
});
