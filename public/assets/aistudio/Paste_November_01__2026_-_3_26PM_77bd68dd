# MASTER PROMPT — Bakery Website + CMS ("Swing Forn de Pa", Badalona)

> Paste this whole file into your AI coding agent (OpenCode, Claude Code, Antigravity, etc.), or save it in the repo as `MASTER_PROMPT.md` and tell the agent to read it first.
> Research date: 1 Nov 2026 (scope revised the same day: no ordering or payments). Everything marked **[VERIFIED]** was found on a third-party listing; everything marked **[SUGGESTED]** is my recommendation; **[ASK OWNER]** must be confirmed before launch.

---

## 0. How you (the agent) must work

You are a team of five principals in one: **Principal UI/UX Designer (bakery & local food retail)**, **Principal Bakery-Website Strategist**, **Principal Software Architect**, **Principal CMS Engineer**, and **Principal SEO/Local-SEO Engineer**.

Operating rules, in priority order:

1. **Never invent business facts.** If a fact is not in this file or provided by the owner (legal name, tax ID, prices, allergens, story, team, awards), leave a clearly marked placeholder in the *database seed*, not in code, and list it in the "Owner inputs needed" report.
2. **Nothing business-related is hardcoded.** No business name, address, phone, hours, product, price, copy, image, link, SEO text or social handle may live in `src/`. All of it lives in PostgreSQL and is editable in the CMS. Only technical constants (route keys, enums, design-token *names*, env var names) may live in code. The one allowed exception is `prisma/seed.ts` (initial data).
3. **Simplicity contract** (the owner of this project explicitly wants simple code — see section 14). Prefer boring, readable code over clever abstractions. If two designs work, pick the one a junior developer can understand in five minutes.
4. **Work in phases** (section 15). At the end of each phase: run `lint`, `typecheck`, `build`, and the tests; commit; then print a short status (what works, what's missing, what you need from the owner). Do not start the next phase until the current one's acceptance criteria pass.
5. **Verify current docs before using any library API.** Next.js, Prisma, Better Auth, next-cloudinary and Neon change quickly. Read the docs for the *installed* version instead of relying on memory. If this prompt conflicts with the current docs, follow the docs and note the deviation.
6. **Ask, don't guess, on the "Open decisions" (section 4)** — but only once, in a single batched question at the start of Phase 0. If no answer arrives, use the recommended default and record it in `DECISIONS.md`.
7. **No scraping or reuse of third-party content.** Do not copy photos, review text or copy from Tripadvisor, Google Maps, Instagram or competitor sites. Use owner-supplied assets; during development use neutral placeholder images.

---

## 1. Project brief (one paragraph)

Build a fast, mobile-first, multilingual marketing website with a full custom CMS for a neighbourhood bakery-café in Badalona (Barcelona area, Catalonia, Spain). Visitors must be able to learn what the bakery makes, check **open-now status, hours, location and directions**, see seasonal specialties, understand allergens, get in touch with the bakery (call, WhatsApp or a simple contact form), and read the blog. Staff with no technical skills must be able to change *every* piece of content, image, menu item, hour, SEO field and navigation link themselves. Stack: **Next.js, PostgreSQL on Neon, Cloudinary** (plus the small supporting libraries listed in section 5).

**Explicitly out of scope (owner decision, 1 Nov 2026):** online ordering, carts/checkout, payments, pre-order or order-date flows, deposits, gift cards and any payment-provider integration. The site is informational: browse, visit, call/WhatsApp, and send a contact message. If you catch yourself adding order statuses, order dates, quantities, checkout or payment code, stop — it is out of scope.

---

## 2. Business context (from research)

### 2.1 Identity and location

| Field | Value | Status |
|---|---|---|
| Listing name | "Swing Forn de Pa" (Tripadvisor); Google Maps pin title: "Swing" | [VERIFIED] — **[ASK OWNER]** exact trading name |
| Type | Bakery / café (cafe category, breakfast–brunch–lunch–dinner meal types, "$$–$$$") | [VERIFIED] |
| Address | Avd. Catalunya 39, 08917 Badalona, Barcelona, Spain | [VERIFIED] |
| Coordinates | 41.4502221, 2.2296483 (from the Maps link); Tripadvisor's directions link uses 41.450127, 2.229858 | [VERIFIED] — the two sources agree, which is how the Maps link was matched to this business |
| Maps link given by owner | https://maps.app.goo.gl/Vr26Zu4LZqhYDtpR8 | [VERIFIED] |
| Phone | +34 934 60 66 70 | [VERIFIED] on Tripadvisor — **[ASK OWNER]** confirm; also ask for WhatsApp |
| Hours (listing) | Mon–Fri 06:00–21:00 · Sat 06:00–15:00 · Sun 06:00–15:00 | [VERIFIED] on an *unclaimed* Tripadvisor listing → may be outdated. **[ASK OWNER]** |
| Accessibility | Listed as wheelchair accessible | [VERIFIED] — **[ASK OWNER]** |
| Time zone | Europe/Madrid (DST applies) | fact |
| Currency / VAT display | EUR | fact |

### 2.2 What the bakery appears to sell (from guest-photo captions on the listing)

Pastries ("repostería"), **panellets** (Catalan All Saints' almond sweets), **pantxineta** (Basque custard-and-almond pastry), homemade sponge cakes ("bizcochos caseros"), **custom and special-occasion cakes**, breakfast combos, sandwiches ("bocatas"), delicatessen items. **[ASK OWNER]** for the real product list — these are hints only, not a catalogue.

### 2.3 What I could NOT verify (do not fabricate)

- Official website, Instagram/Facebook handles, logo, brand colours, brand story, founders/team.
- Google Maps rating, review count, opening hours and photos (the Maps page could not be rendered; the third-party listing was used instead).
- Legal entity name and tax ID (needed for the Spanish legal notice).
- Whether they deliver, bake gluten-free/vegan items, or need advance notice for custom cakes.
- The Google Place ID (needed for the "Leave a review" link).

### 2.4 Local-market observations that shape the design

- The area is Catalan-speaking and bilingual (Catalan + Spanish), with tourist/English demand → **multilingual from day one**.
- Customers search by need + town: "pastisseria Badalona", "panadería Badalona", "tartas personalizadas Badalona", "panellets", "tortell de Reis". **[SUGGESTED]** keyword themes; validate with Search Console after launch (search volumes were not verified).
- Competing local bakeries are discovered mainly via Google Maps/Business Profile and Tripadvisor, so **NAP consistency** (name, address, phone identical everywhere) and a claimed Google Business Profile matter as much as the website. The Tripadvisor listing is unclaimed.
- Catalonia has a strong **seasonal calendar** (Castanyada/panellets, Santa Llúcia, Christmas, Tortell de Reis, Carnestoltes, Easter *mones*/torrijas, Sant Jordi, Sant Joan *coca*). The CMS must make seasonal campaigns a first-class feature, not a hack.

---

## 3. Goals, audience, success metrics

**Jobs to be done (ranked by traffic expectation, mobile-first):**

1. "Is it open right now, where is it, how do I get there?"
2. "What do you have / what does it cost?"
3. "Do you make custom cakes, and how do I get in touch about one?"
4. "Can I eat this? (allergens, dietary needs)"
5. "Can I trust them?" (real photos, story, curated testimonials)
6. "What's special this season?"

**Conversion hierarchy:** Call / WhatsApp → Directions → Contact form → Browse menu → Blog.

**Primary KPIs** (tracked as analytics events — names are fixed): `click_call`, `click_whatsapp`, `click_directions`, `submit_inquiry` (with `topic`), `view_product`, `view_seasonal`.
**SEO KPIs:** impressions/clicks for local-intent queries, Google Business Profile actions, indexed pages vs. sitemap pages.
**Quality bars:** see section 13.

---

## 4. Open decisions (ask once, then record in `DECISIONS.md`)

| # | Decision | Recommended default |
|---|---|---|
| D1 | Languages at launch | Catalan + Spanish + English enabled; `defaultLocale` is a CMS setting (owner picks). If undecided: **es** default with **ca** fully supported. |
| D2 | Ordering and payments | **Out of scope — decided by the owner.** No cart, checkout, pre-orders, order dates, deposits or payment integration. Visitors call, use WhatsApp, or send a contact message. |
| D3 | Show prices? | Per-site and per-product toggle; prices stored as integer cents, EUR. |
| D4 | Email notifications for contact messages | Resend (or SMTP) — optional; the CMS inbox always works without it. |
| D5 | Admin UI language | English in v1, all admin labels in one dictionary file so Catalan/Spanish can be added later. |
| D6 | Analytics | Cookieless/privacy-friendly (Plausible/Umami/Vercel Analytics) or GA4 behind consent. ID is a CMS setting. |
| D7 | Domain | **[ASK OWNER]** |
| D8 | Brand | Logo, colours, fonts, 15–25 real photos of products, shopfront, team. If none: use the placeholder theme in 7.2 and flag it. |

---

## 5. Stack and architecture

**Required:** Next.js (latest stable App Router; 16.x at time of writing — verify), TypeScript (strict), PostgreSQL on **Neon**, **Cloudinary**.

**Supporting libraries (keep the list short; justify any addition in `DECISIONS.md`):**

| Concern | Choice | Why |
|---|---|---|
| ORM | **Prisma** (current major, with `@prisma/adapter-neon`) | Simple schema-first modelling, great TypeScript types. Follow Neon's current Prisma guide. Runtime uses the **pooled** Neon URL; migrations use the **direct** URL. Do not install Neon's serverless driver or `ws` separately if the adapter already bundles them. |
| Auth | **Better Auth** (self-hosted, Prisma adapter) | Email+password, roles, rate limiting, optional TOTP 2FA, no per-seat cost. **Public sign-up disabled**; users are created by an ADMIN. |
| Styling/UI | Tailwind CSS + shadcn/ui (Radix) | Fast, accessible primitives. |
| Forms/validation | React Hook Form + **Zod** | One schema validates client and server. |
| Rich text | **TipTap** (JSON stored in DB) | WYSIWYG for non-technical staff; render server-side; sanitize. |
| Images | `next-cloudinary` (`CldImage`, `CldUploadWidget` with **signed** uploads) + `cloudinary` Node SDK | See section 11. |
| Testing | Vitest (unit), Playwright (e2e), axe (a11y) | Modest but meaningful. |
| Email (optional) | Resend | Only if D4 = yes. |

**Rendering model:** public pages are server components, cached/static, and **invalidated on publish with cache tags** (use the Next.js caching API that is current for the installed version — read its docs first). Admin is dynamic and authenticated. Client JavaScript on public pages must stay minimal (language switcher, mobile nav, filters, consent banner, forms).

**Runtime/DB rules:** Node runtime for DB-touching routes; never open a raw Postgres connection per request; one shared Prisma client; select only needed fields; index every foreign key and every `(locale, slug)` pair.

**Authorization rule (security-critical):** the Next.js proxy/middleware may do an *optimistic* redirect for `/admin`, but **every server action, route handler and data-access function must re-check the session and role itself.** Never rely on the proxy alone.

**Suggested folder structure (adapt, but stay this flat):**

```
prisma/            schema.prisma, seed.ts, migrations/
src/
  app/
    [locale]/[[...slug]]/page.tsx    # one public catch-all, resolved from DB
    admin/                           # CMS (noindex, auth required)
    api/                             # auth, cloudinary-sign, preview, revalidate, cron
    sitemap.ts  robots.ts  manifest.ts
  components/  ui/ public/ admin/ blocks/
  lib/         db.ts auth.ts cloudinary.ts seo.ts jsonld.ts hours.ts i18n.ts
               resolve-path.ts revalidate.ts env.ts rate-limit.ts
  server/      queries/ (read)  actions/ (write; each starts with authorize())
tests/         unit/ e2e/
scripts/       check-no-hardcoded.ts
```

---

## 6. Information architecture and URLs

### 6.1 Sitemap (public)

| Page | Purpose | Notes |
|---|---|---|
| **Home** | Convert + orient | Blocks, fully editable |
| **Menu** (index) + **Category** pages + **Product** pages | Show what's made | Photo-first, filters, allergens |
| **Seasonal** (index) + **Campaign** pages | Castanyada, Reis, Easter, etc. | Auto-promoted on Home when active |
| **Custom Cakes** | Informational landing (what is possible, how to get in touch) | Gallery + contact CTA |
| **About** (our story) | Trust | Team, values, process, gallery |
| **Blog** (index, category, post) | SEO + seasonal storytelling | RSS feed |
| **FAQ** | Reduce calls, capture questions | Grouped, searchable |
| **Contact & Visit** | Hours, map, directions, form | "Open now" status |
| **Legal**: Aviso legal, Privacidad, Cookies, Allergen information | Compliance | Content editable, legal data from Settings |
| 404 / search-empty / error | Graceful failure | Friendly, editable copy |

Optional later: Gallery page (until then a gallery *block*), Catering information, Jobs.

### 6.2 URL and i18n strategy

- Always locale-prefixed: `/{locale}/…` (e.g. `/ca/…`, `/es/…`, `/en/…`). `/` redirects to the default locale (do **not** auto-redirect by `Accept-Language`; crawlers don't send it).
- **Slugs are per-locale and live in the DB.** "System pages" (home, menu, seasonal, custom-cakes, about, blog, faq, contact, legal) are `Page` rows with a fixed `key` and `template`; their slugs, titles and SEO are editable per locale. Product, category, campaign and post URLs are nested under their index page's slug.
- One public catch-all route calls `resolvePath(locale, segments)` → returns `{ type, entity }` or 404. Keep it small (<~100 lines) and unit-tested. Reserve `admin`, `api`, `_next`.
- **Missing translation = no URL** (404 for that locale), excluded from sitemap and hreflang; the language switcher falls back to that locale's home. Never serve default-language content under another locale's URL.
- Every indexable page outputs `rel=canonical`, `hreflang` for each *existing* translation and `x-default`.
- **Slug changes auto-create a 301** (Redirect table) — see section 10.

---

## 7. UX and design direction

### 7.1 Principles

1. **Mobile-first, thumb-first.** Most visitors are on a phone, outside, hungry. A **sticky bottom action bar** on mobile: Call · WhatsApp · Directions (≥44px tap targets). Desktop shows the same actions in the header.
2. **Answer "open now?" in under one second.** Header chip: "Open now · closes 21:00" / "Closed · opens tomorrow 06:00", computed in **Europe/Madrid** (never in server/browser local time — the developer's machine is in another time zone), honouring special closures.
3. **Photography does the selling.** Real photos, large, cropped consistently, `alt` text mandatory. No stock-photo feel.
4. **Warm, local, honest tone.** No hype, no invented claims ("artisan", "since 19xx", "wood-fired" only if the owner states it).
5. **Allergen safety over aesthetics.** Missing allergen data is never shown as "no allergens". Unreviewed products display "Ask in store for allergen information". Allergens are shown as icon **plus text**.
6. **Seasonality is a feature.** Active campaign banner on Home and Menu showing its date range.
7. **Motion is subtle and optional.** Respect `prefers-reduced-motion`. No heavy animation libraries on public pages.
8. **Accessible by default** (WCAG 2.2 AA): contrast, focus rings, skip link, landmarks, labelled forms, keyboard-operable accordion/menus.

### 7.2 Design tokens (editable in CMS → Brand; stored as CSS variables)

Starting placeholders only — replace with the owner's brand; the agent must verify every text/background pair reaches **≥4.5:1** (≥3:1 for large text/UI).

| Token | Placeholder |
|---|---|
| `--background` | `#FFF8EF` (warm cream) |
| `--foreground` | `#3B2A20` (crust brown) |
| `--primary` | `#A8531C` (baked orange; passes AA on cream for text) |
| `--accent` | `#E9B44C` (golden — decorative/large UI only, not body text) |
| `--muted` | `#F1E4D3` |
| Fonts | One warm display face for headings + one highly legible sans for body, loaded with `next/font` (self-hosted, `display: swap`). Brand font from owner overrides. |
| Radius / spacing | Soft radius (12–16px), generous whitespace, 4/8px spacing scale |

The CMS Brand screen offers a *constrained* choice (colour pickers with live contrast check that blocks failing combinations; font selection from a curated list) — staff must not be able to make the site unreadable.

### 7.3 Page specifications (all content from DB; sections are CMS "blocks")

**Global shell:** announcement bar (optional, editable) · header (logo, nav from CMS, language switcher, open-now chip, Call/WhatsApp) · footer (columns from CMS nav, address, hours summary, socials, legal links) · mobile sticky action bar · cookie/consent banner (equal-prominence Accept/Reject).

**Home** (default blocks, reorderable): 1) Hero — real photo, headline, sub, two CTAs ("View menu", "Ask about a custom cake"), open-now chip. 2) Seasonal banner (auto: active campaign) 3) Featured products (4–8, from flags) 4) Why us / three value props 5) About teaser 6) Testimonials (curated) 7) Custom-cake info band (links to contact) 8) Latest blog posts (3) 9) Visit block (hours, address, map, directions).

**Menu:** category chips + dietary/allergen filters (client-side filtering over server-rendered list), product cards (photo, name, short description, price if enabled, badges: *Seasonal until DD/MM*, *availability note, e.g. "Please ask a day ahead"*, dietary tags). Empty/no-results states. **Product page:** gallery, description, ingredients, allergen panel (14 EU allergens, icon+text, "reviewed on <date>"), price/note, availability window, "Ask about this product" CTA (opens the contact form with the product prefilled), related products, breadcrumbs, JSON-LD.

**Seasonal:** list of campaigns (upcoming/active/past hidden by default). **Campaign page:** hero, story, product grid, key dates (season start/end), contact CTA.

**Custom Cakes:** hero, what is possible (size/serving guide, flavours and fillings from CMS), gallery of past work, advance-notice guidance (information only), FAQ block, and a **contact CTA** (call, WhatsApp or the contact form — see 9.6). Reference photos in v1: "send them on WhatsApp" (no public uploads in v1 — reduces abuse and GDPR exposure).

**About:** story (rich text + media), values, process, team (optional), gallery, CTA to visit.

**Blog:** index with category filter, cards (cover, title, excerpt, date, reading time), pagination; post page with cover, author, date, TOC for long posts, related posts, share links, CTA block, JSON-LD, RSS feed.

**FAQ:** category tabs, accessible accordion, client-side filter; optional "Still have a question?" CTA → Contact.

**Contact & Visit:** hours table (today highlighted + special closures), address, directions button (Google Maps link from settings), **consent-gated map** (static image/placeholder until the visitor clicks "Load map"; no third-party requests before consent), phone/WhatsApp/email, contact form, accessibility note, parking/transport note (if provided).

**Legal pages:** rich text from CMS; legal entity data injected from Settings (denominación social, NIF/CIF, registered address, contact email) — **[ASK OWNER]**.

---

## 8. Content model (PostgreSQL via Prisma)

**Patterns used everywhere (keep them uniform):**

- **Translation tables.** Translatable entities have `<Entity>` (language-neutral: status, flags, relations, dates) and `<Entity>Translation` (`locale`, `slug`, `published` boolean default false, text fields, SEO fields). `@@unique([entityId, locale])` and `@@unique([locale, slug])` (scope the slug unique per entity type/parent where needed).
- **Shared SEO columns** on Page/Post/Product/Category/Collection translations: `metaTitle`, `metaDescription`, `canonicalUrl` (override), `ogTitle`, `ogDescription`, `ogImageId`, `noindex`, `nofollow`, `jsonLdOverride` (JSON, advanced). Define the field list once as a shared Zod schema + helper.
- **Status:** `DRAFT | PUBLISHED | ARCHIVED`, plus `publishedAt`. A post is public when `status=PUBLISHED AND publishedAt <= now()` (scheduling needs no cron; public listings revalidate hourly as a safety net and instantly on publish).
- **Timestamps** `createdAt/updatedAt`, `createdById/updatedById` on content entities.
- Money = integer cents + `currency` (default EUR). Dates in UTC; display in site time zone.

**Entities:**

| Entity | Key fields |
|---|---|
| `User` (+ Better Auth tables) | name, email, `role: ADMIN \| EDITOR`, 2FA fields |
| `SiteSettings` (singleton) + translation | business name, legal name, tax ID, tagline/description (translated), phone, WhatsApp, email, address (street, postcode, city, region, country), lat/lng, `googleMapsUrl`, `googlePlaceId`, `googleReviewUrl`, social links, `defaultLocale`, `enabledLocales[]`, `timeZone` (default Europe/Madrid), `showPrices`, default OG image, logo/favicon media IDs, brand tokens (JSON), analytics ID, Search Console/Bing verification tokens, announcement bar (translated), 404 copy |
| `OpeningHours` | `dayOfWeek`, `opensAt`, `closesAt`, `isClosed`; multiple ranges per day allowed (e.g. split shifts) |
| `SpecialHours` | `dateFrom`, `dateTo`, `isClosed`, optional `opensAt/closesAt`, translated note (e.g. "Closed 25 Dec") |
| `Page` + translation | `key`, `template` (HOME, MENU_INDEX, SEASONAL_INDEX, CUSTOM_CAKES, ABOUT, BLOG_INDEX, FAQ, CONTACT, LEGAL, GENERIC), status, `blocks` JSON (validated), title, intro, SEO |
| `Category` + translation | sort order, cover media, name, description, SEO |
| `Product` + translation | `categoryId`, status, `priceCents?`, `priceNote?` (e.g. "from"; prices are display-only), `isFeatured`, `isSeasonal`, `availableFrom/To`, `dietaryTags[]`, `allergensReviewedAt`, sort order; translated name, short/long description, ingredients, optional `availabilityNote` (e.g. "Please ask a day ahead"), SEO |
| `Allergen` + translation | the **14 EU allergens** (cereals containing gluten, crustaceans, eggs, fish, peanuts, soybeans, milk, tree nuts, celery, mustard, sesame, sulphites, lupin, molluscs), seeded; icon key |
| `ProductAllergen` | `productId`, `allergenId`, `level: CONTAINS \| MAY_CONTAIN` |
| `ProductMedia` | `productId`, `mediaId`, sort order |
| `Collection` + translation | `type: SEASONAL \| CURATED`, `startsOn/endsOn`, hero media, products (M:N with order), name, story, SEO |
| `PostCategory`, `Tag` + translations | name, slug |
| `Post` + translation | `authorId`, cover media, status, `publishedAt`, `isFeatured`; title, excerpt, content (TipTap JSON), reading time (derived), SEO; M:N tags/category |
| `FaqCategory`, `Faq` + translations | sort order, question, answer (rich text) |
| `Testimonial` | author display name, source label (e.g. "Customer, 2026"), quote (translated), optional link, `consentGivenAt`, `isFeatured`. **Manual entry only** — never auto-import or copy third-party review text. |
| `MediaAsset` + translation | `publicId`, `resourceType`, `width`, `height`, `format`, `bytes`, `folder`, tags; **translated `alt` (required) and `caption`**; `usedBy` computed |
| `NavMenu`, `NavItem` + translation | menu key (HEADER/FOOTER_1/FOOTER_2), parent, sort, link type (PAGE/PRODUCT/CATEGORY/POST/COLLECTION/EXTERNAL/PHONE/WHATSAPP/EMAIL), target id or URL, optional label override |
| `Redirect` | `fromPath`, `toPath`, `status` (301/302), `hits`, `createdAt` |
| `Inquiry` (a contact message) | `topic: GENERAL \| CAKE_QUESTION`, name, email, phone (optional), preferred contact, message, optional product/campaign ref, `status: NEW \| IN_PROGRESS \| DONE \| ARCHIVED`, internal notes, `locale`, `consentAt` + consent text version, `ipHash`, timestamps. No order, date, quantity or price fields. |
| `ContentRevision` | entity type/id, locale, JSON snapshot, author, createdAt — last 20 per entity (Pages, Posts, Products) with one-click restore |
| `RateLimit` | `key`, `windowStart`, `count` (for public forms) |
| `UiString` + translation | `key`, text — **microcopy** (button labels, form labels, empty states, error messages) seeded from a key list, editable in CMS. Code references keys only. |

**Block types** (for `Page.blocks`; define each once as `{ type, label, fields[] }` and **generate both the Zod schema and the editor form from that definition**; renderers are hand-written):
`hero`, `media_text`, `rich_text`, `feature_grid`, `product_showcase` (featured | category | collection | manual), `seasonal_banner` (auto-picks active campaign), `image_gallery`, `testimonials`, `cta_banner`, `visit_info` (pulls hours/address/map from Settings), `faq_list`, `latest_posts`.
Link fields use one **link picker** (internal entity | external URL | phone | WhatsApp | email) so internal links survive slug changes (stored by id).

---

## 9. CMS specification (`/admin`, `noindex`, authenticated)

### 9.1 Roles
- **ADMIN:** everything, including Users, Settings, Redirects, Brand, danger actions.
- **EDITOR:** content (Pages, Products, Posts, FAQ, Testimonials, Media, Inquiries, Opening hours). Cannot manage users, brand/legal settings or delete in bulk.

### 9.2 Global editor behaviours (all content types)
- Locale tabs on every translatable form with completeness indicators (e.g. "ca ✓ · es ✓ · en ✗"), "copy from default language", and a per-locale "ready to publish" switch.
- Draft → Published, **Schedule publish**, Archive, **Preview** (Next.js draft mode with signed token; previews are `noindex`).
- Autosave drafts; unsaved-changes warning; revision history + restore (Pages, Posts, Products).
- Slug auto-generated from title (accent-safe: *pastissos-personalitzats*), editable; **uniqueness check per locale**; changing a published slug creates a 301 automatically after a confirmation.
- Every save calls `revalidateTag` for the affected entity, listings, sitemap and navigation.
- Plain-language labels and inline help; a short "What does this do?" tooltip beside every SEO field.

### 9.3 Modules
1. **Dashboard** — new inquiries, drafts, scheduled items, **"Needs owner content"** checklist (seeded placeholders still in DRAFT), **SEO health** (missing meta description, missing alt text, duplicate titles, pages with noindex), upcoming seasonal dates, quick actions.
2. **Pages** — block editor (add/reorder/duplicate/remove, per-block validation), SEO panel.
3. **Menu** — Products (grid + table, bulk publish/unpublish/feature, duplicate), Categories, **Allergens panel on each product** with required "reviewed on" confirmation, Collections/**Seasonal campaigns** (date range, product picker).
4. **Blog** — Posts (TipTap editor: headings, lists, links, images from media library, quotes, CTA/embed blocks), Categories, Tags, authors, scheduled publishing, featured flag.
5. **FAQ** — categories + questions, drag-to-reorder.
6. **Testimonials** — curated, with consent date.
7. **Media Library** — Cloudinary-backed grid: upload (signed), search, tag, filter, **alt text required before an image can be used**, replace-in-place, usage list, safe delete (blocks deletion while in use).
8. **Navigation** — header/footer menus, nested items, link picker.
9. **Opening hours** — weekly schedule + special days/closures with a live "what visitors see now" preview.
10. **Inquiries inbox** — list/filter by status/topic/date, detail view, status workflow, internal notes, reply via mailto/WhatsApp deep-link, **CSV export**, bulk archive, and **automatic deletion/anonymization after a retention period** (default 12 months; setting).
11. **SEO Center** — see section 10.4.
12. **Site Settings** — Business, Contact, Locales, Brand, Legal entity, Social, Analytics/verification, Announcement bar, UI strings (searchable microcopy editor), 404 copy.
13. **Users** (ADMIN) — invite/create, role, disable, force password reset, enable 2FA.

### 9.4 Editor UX details that matter for non-technical staff
Big, clear primary buttons; autosave indicator; image picker opens the media library inline; paste-from-Word cleanup in TipTap; destructive actions need confirmation with consequences stated ("This image is used on 3 pages"); empty states explain the next step; all admin text is plain language.

### 9.5 Preview
`/api/preview?token=…&path=…` enables draft mode for that session only; banner "Preview — not published"; `X-Robots-Tag: noindex`.

### 9.6 Public contact form
Fields (CMS-configurable labels via UiStrings): name, email, phone (optional), preferred contact (phone/WhatsApp/email), topic (general question or custom-cake question), message, optional product/campaign prefilled, **required privacy consent checkbox** (text from CMS; store timestamp + text version). Spam defence without extra paid services: honeypot field + minimum-fill-time + DB-backed rate limit (hashed IP, e.g. 5/hour) + server-side Zod validation; Cloudflare Turnstile only as an optional extra if spam appears after launch (it adds a third-party service, so it needs the owner's OK). On success: friendly confirmation with the bakery's stated response time (from Settings), store in DB, optional email to staff and a confirmation email to the customer. Never display or log raw IPs.

---

## 10. SEO and metadata system

### 10.1 Metadata resolution (one helper, `lib/seo.ts`)
For every page type, `generateMetadata` calls the same helper with the fallback chain:
`metaTitle → title`, `metaDescription → excerpt/intro (trimmed to ~155 chars) → site description`, `og:image → entity cover → site default OG image`. Title template: `%s | {businessName}` (editable per locale). Always set `metadataBase`, `alternates.canonical`, `alternates.languages` (existing translations + `x-default`), `openGraph` (type, locale, alternateLocale, images with width/height), `twitter` (summary_large_image), and `robots` (`noindex` for drafts, previews, search/empty states, and any entity flagged noindex).

### 10.2 Structured data (JSON-LD, built by pure functions in `lib/jsonld.ts` and unit-tested)
- **Site-wide:** `Bakery` (LocalBusiness subtype) with name, image/logo, `url`, `telephone`, `address` (PostalAddress), `geo`, `hasMap`, `priceRange`, `sameAs` (social + Google Business Profile), and **`openingHoursSpecification`** built from OpeningHours; special closures expressed with `validFrom/validThrough`. Plus `WebSite` (no `SearchAction` unless real site search exists).
- **Pages:** `BreadcrumbList` everywhere; `Article`/`BlogPosting` on posts (author, dates, image); `Product` on product pages (include `offers` only when a price is public; never fake availability); `FAQPage` on the FAQ is optional — Google now limits FAQ rich results to a narrow set of sites, so treat it as low-value and never write FAQs *for* markup; write them for people.
- **Do not** output `AggregateRating`/`Review` markup from the site's own testimonials (self-serving reviews don't qualify and risk a manual action).
- `jsonLdOverride` lets an ADMIN replace/extend markup per entity; validate that it parses as JSON.
- Validate output with Google's Rich Results Test and Schema.org validator during QA.

### 10.3 Crawling and indexing
- `app/sitemap.ts`: dynamic; only published, indexable, translated URLs; per-URL `lastModified` from `updatedAt`; **`alternates.languages`** for hreflang. Split into multiple sitemaps if >5,000 URLs (unlikely).
- `app/robots.ts`: allow public; disallow `/admin`, `/api`, preview; point to sitemap; a CMS toggle "Discourage indexing" for staging/pre-launch (default ON until launch; staging always `noindex` via env).
- RSS feed per locale for the blog.
- **Redirect engine:** table-driven 301/302 handled before 404; loop detection; hit counter; auto-create on slug change; CSV import/export; 404 log (top missing URLs) to turn into redirects.
- Optional `llms.txt` generated from CMS data (business facts, key pages) — low-effort, low-certainty benefit; keep it off the critical path.
- Clean HTML: one `<h1>` per page, ordered headings, descriptive link text, `lang` attribute per locale, semantic landmarks, image `alt` from the media library, `loading`/`priority` set correctly (hero image is the LCP element).

### 10.4 SEO Center (CMS)
- **Global:** title templates, default OG image, default descriptions, site-wide `noindex` switch, verification tags (Google Search Console, Bing), analytics ID.
- **Per-entity SEO panel** (every content type): Google-style **SERP preview** (desktop/mobile), social card preview, character counters with *guidance, not hard rules* (title ≈ 30–60 chars, description ≈ 70–160), canonical override, noindex/nofollow, OG overrides, advanced JSON-LD override, and a **checklist** (has meta description · unique title · image alt present · one H1 · internal links ≥ 2 · slug is readable).
- **SEO audit report:** scans all published content and lists issues by severity with "Fix" links (missing/duplicate/too long titles & descriptions, missing alt text, noindex pages, broken internal links, orphan pages, missing translations for enabled locales). Re-runs on demand; counts shown on the Dashboard.
- **Redirects manager** and **404 monitor**.
- **Local-SEO panel:** NAP consistency reminder (compare Settings vs. a "Where else is the business listed?" checklist: Google Business Profile, Tripadvisor, Apple Maps, Bing Places, Facebook), link to claim the Tripadvisor listing, **"Leave a Google review" link** from `googleReviewUrl`.
- **[SUGGESTED] editorial calendar** to seed in Blog drafts (titles only; owner supplies facts): Castanyada & panellets · Santa Llúcia · Christmas / Sant Esteve · Tortell de Reis · Carnestoltes · Easter *mones* & torrijas · Sant Jordi · Mother's Day · Sant Joan *coca* · "Custom cakes: what is possible and how to get in touch (sizes, flavours, advance notice)" · "Allergens: how to ask and what we can do".

### 10.5 Local keyword themes **[SUGGESTED — validate in Search Console]**
ca: forn de pa Badalona · pastisseria Badalona · pastissos personalitzats Badalona · panellets Badalona · tortell de Reis Badalona.
es: panadería Badalona · pastelería Badalona · tartas personalizadas Badalona · desayunos Badalona · panellets Badalona.
en: bakery Badalona · custom cakes Badalona · Catalan pastries.
Place these naturally in titles, H1/H2s, slugs and copy; never stuff.

---

## 11. Cloudinary media strategy

- **Uploads (admin only):** `CldUploadWidget` with `signatureEndpoint` → `/api/cloudinary-sign` (route handler that **requires an authenticated ADMIN/EDITOR**, accepts only whitelisted params, fixes the folder, size and format limits, and signs with the server-side secret). The API secret never reaches the browser. Use a **signed** upload preset only; no unsigned presets.
- **Folders/prefixes:** `bakery/{env}/products|blog|pages|site|campaigns` (env = production/preview/development).
- **Store in DB:** `publicId`, dimensions, format, bytes, tags — **not** full URLs. Build URLs at render time.
- **Delivery:** `CldImage` (or an equivalent thin wrapper in `components/ui/media.tsx`) with `f_auto`, `q_auto`, responsive `sizes`, explicit width/height (prevents layout shift), blur-up placeholder, and `priority` only for the LCP hero. Crop with `c_fill,g_auto` using named presets (`card`, `hero`, `og` 1200×630, `thumb`).
- **Alt text** is a required, translated field before an asset can be placed on a page.
- **Delete safely:** server-side Admin API `destroy` only when the asset isn't referenced.
- Monitor plan credits/bandwidth; expose a simple "storage/credits" hint in Settings if the API allows.
- Use only owner-supplied images in production; development placeholders must be visibly labelled.

---

## 12. Security, privacy and legal (Spain / EU)

**Security**
- Better Auth: email+password, strong password policy, built-in rate limiting, sessions in `httpOnly`+`secure`+`SameSite` cookies, optional/required TOTP for ADMIN, password-reset flow, admin-created accounts only.
- Validate every input with Zod on the server; **sanitize** rich text on render (allow-list tags); escape everywhere else.
- Security headers: strict CSP (nonce or hashes; allow Cloudinary, analytics, and the map provider only after consent), HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `frame-ancestors 'none'` for the whole site.
- Env validation at boot (`lib/env.ts` with Zod); fail fast; no secrets in client bundles (`NEXT_PUBLIC_` only for truly public values).
- Public forms rate-limited; admin login rate-limited; audit "who changed what" via `ContentRevision` and `updatedById`.
- Backups: use Neon point-in-time restore/branching; document a restore drill in `docs/OPERATIONS.md`. Preview deployments use a **separate Neon branch**, never production data.

**Privacy / GDPR (RGPD + LOPDGDD) and LSSI-CE** — *I'm not a lawyer; have the owner's advisor review final legal text.*
- Consent banner with equal-prominence Accept/Reject; **no non-essential cookies or third-party requests before consent**; prefer cookieless analytics. Consent choice stored client-side and revisitable from the footer.
- Privacy notice and legal notice pages with the data from Settings (controller identity, tax ID, address, email, purposes, legal basis, retention, rights, how to complain to the AEPD). The inquiry form stores consent evidence.
- Data minimisation and **retention job** for inquiries (default 12 months) via a protected cron route (`CRON_SECRET`). Provide "export/delete a person's data" actions in the Inquiry detail view.
- No customer data in logs or analytics events.

**Allergen information (EU Regulation 1169/2011 — the 14 allergens)**
- Product pages show allergens only from reviewed data; unreviewed → "Ask in store". Include a standing notice (editable) that cross-contact is possible in a bakery environment, and a dedicated, editable **Allergen information** page.
- The CMS blocks marking a product's allergens as "reviewed" without an explicit confirmation (user + date stored). **[ASK OWNER]** to confirm the exact obligations for non-prepacked food with their food-safety advisor.

---

## 13. Quality bars (definition of "good enough to launch")

| Area | Target |
|---|---|
| Core Web Vitals (mobile, 4G, field-like lab test) | LCP < 2.5 s · CLS < 0.1 · INP < 200 ms |
| Lighthouse (mobile) | Performance ≥ 90 · Accessibility ≥ 95 · Best Practices ≥ 95 · SEO ≥ 95 (on Home, a Product, a Post, Contact) |
| Accessibility | WCAG 2.2 AA; axe has no serious/critical issues on key pages; full keyboard navigation; screen-reader labels on icon buttons |
| JS budget | Public pages: no large client bundles; each client component justified |
| SEO | Valid JSON-LD; sitemap lists only 200/indexable URLs; hreflang reciprocal; no duplicate titles; no broken internal links |
| Content freedom | `npm run check:hardcoded` passes (script greps `src/` for the seeded business name, phone, address, hours and domain; any hit fails) |
| Security | No secrets client-side; every server action authorizes itself; security headers present; forms rate-limited |
| Reliability | Build passes with an empty DB (friendly empty states, no crashes) and with a full seed |
| Admin usability | A non-technical person can: add a product with photo + allergens, publish a seasonal campaign, edit hours for a holiday, write and schedule a blog post, and fix an SEO issue — each in under ~5 minutes, unaided |

---

## 14. Code conventions — the "simplicity contract"

- TypeScript `strict`. No `any` without a comment explaining why.
- Server Components by default; add `"use client"` only for interactivity.
- Small files, small functions (aim ≤ ~40 lines), descriptive names, early returns. Comment **why**, not what.
- No premature abstraction: no generic repositories, no DI containers, no "framework within the framework". Direct Prisma calls inside `server/queries` and `server/actions`.
- One way to do each thing: one data-fetching pattern, one form pattern (RHF + Zod), one image component, one place for SEO helpers.
- Dependencies: add a library only if it removes meaningful code and is well-maintained; record why in `DECISIONS.md`.
- Shared Zod schemas are the single source of truth for validation and types.
- Public UI strings come from `UiString` keys; admin strings from one dictionary file; no inline literals that are business copy.
- Naming: DB `snake_case` via Prisma `@map`; code `camelCase`/`PascalCase`.
- Tests that matter: `resolvePath`, slug generation/uniqueness, open-now/hours (including DST and special closures), SEO fallback chain, JSON-LD builders, redirect resolution, authorization (editor can't reach admin-only actions), inquiry rate limit. One Playwright happy path per major flow.

---

## 15. Build phases and acceptance criteria

**Phase 0 — Decisions & inputs (no code).** Send the batched questions from section 4 and the "Owner inputs needed" list (Appendix B). Create `DECISIONS.md`.
**Accept:** decisions recorded (or defaults noted).

**Phase 1 — Foundation.** Create the app, TS strict, Tailwind, shadcn/ui, ESLint, env validation, Prisma + Neon (pooled runtime / direct migrations), Better Auth (ADMIN-created users, roles, rate limit), locale routing + `resolvePath` skeleton, design-token system, layout shell (header/footer/mobile action bar) reading from Settings, error/404 pages, CI script (`lint`, `typecheck`, `test`, `build`).
**Accept:** admin can log in; unauthenticated `/admin` is blocked at proxy **and** at the action level (test); build passes with an empty DB.

**Phase 2 — Core data + seed + settings.** Full Prisma schema + migrations; idempotent `seed.ts` (Appendix A); SiteSettings, OpeningHours/SpecialHours, UiStrings, Navigation, Media Library (Cloudinary signed uploads, alt required).
**Accept:** editing phone/hours/nav/logo in CMS changes the public shell after revalidation; upload → library → used in settings works; `check:hardcoded` passes.

**Phase 3 — Content modules.** Pages + block editor + revisions; Categories/Products/Allergens/Collections; Blog (TipTap) + categories/tags; FAQ; Testimonials; draft/schedule/preview.
**Accept:** each module supports create/edit/translate/publish/unpublish/preview; slugs unique per locale; scheduled post appears at its time; allergen "reviewed" confirmation enforced.

**Phase 4 — Public site.** Home, Menu/Category/Product, Seasonal/Campaign, Custom Cakes, About, Blog (+RSS), FAQ, Contact & Visit, Legal, 404; open-now logic (Europe/Madrid); consent-gated map; filters; empty/loading/error states.
**Accept:** every page renders from DB in all enabled locales; missing translation → 404 + excluded from sitemap; zero hardcoded business content.

**Phase 5 — SEO system.** `lib/seo.ts`, JSON-LD builders, sitemap/robots/manifest/RSS, hreflang, redirect engine + auto-301 on slug change + 404 log, SEO panel (SERP preview, checklist), SEO Center + audit report, verification tags, analytics events.
**Accept:** Rich Results Test passes for Bakery, BreadcrumbList, BlogPosting, Product; sitemap/hreflang validated; changing a slug creates a working 301; SEO audit shows real findings on a deliberately broken sample.

**Phase 6 — Contact messages.** Contact form, anti-spam, rate limit, inbox with status/notes/CSV, optional email notifications, retention job.
**Accept:** end-to-end submission appears in the inbox; honeypot/rate-limit tests pass; consent stored; retention route deletes aged records.

**Phase 7 — Hardening & handover.** Accessibility pass (axe + manual keyboard/screen-reader checks), performance pass (Lighthouse on the four key pages), security headers/CSP, legal pages filled from Settings, QA on real phones, Playwright happy paths, docs: `README.md`, `docs/ADMIN_GUIDE.md` (step-by-step with screenshots placeholders for non-technical staff), `docs/OPERATIONS.md` (env, deploys, backups, restore drill, rotating secrets), launch checklist.
**Accept:** all quality bars in section 13 met or each exception documented.

**Phase 8 — Optional backlog (not requested; do not build now):** newsletter with double opt-in, Google reviews sync, public reference-photo uploads (with malware/abuse controls), global site search (Postgres full-text), dynamic OG images via Cloudinary overlays, multi-branch support, admin UI localisation. Ordering and payments are out of scope, not backlog.

**Launch checklist (agent prepares, owner executes):** domain + HTTPS · turn off "Discourage indexing" · submit sitemap in Google Search Console and Bing Webmaster · claim/verify **Google Business Profile** and the **Tripadvisor listing** and align NAP · add the site URL to those profiles · set up analytics goals/events · 301 map if replacing an old site · test forms and emails on production · confirm legal pages · take a database backup and test a restore.

---

## Appendix A — Seed data (`prisma/seed.ts`, idempotent via upserts)

Seed creates **structure and starter content as `DRAFT`** (so placeholder text cannot go live by accident) and surfaces them on the Dashboard "Needs owner content" list. `npm run seed:demo` (non-production only) publishes sample content for demos and screenshots.

1. **SiteSettings:** business name "Swing Forn de Pa" *(confirm)*; address Avd. Catalunya 39, 08917 Badalona, Barcelona, Spain; lat/lng 41.4502221 / 2.2296483; phone +34 934 60 66 70 *(confirm)*; `googleMapsUrl` = the short link above; `timeZone` Europe/Madrid; `enabledLocales` = per D1; `showPrices` = false until the owner decides; legal fields empty.
2. **OpeningHours** (marked "from third-party listing — verify"): Mon–Fri 06:00–21:00; Sat 06:00–15:00; Sun 06:00–15:00.
3. **Allergen:** the 14 EU allergens with translated names (ca/es/en) and icon keys.
4. **Pages (shells, DRAFT):** home, menu, seasonal, custom-cakes, about, blog, faq, contact, aviso-legal, privacy, cookies, allergen-information — each with default block layouts from 7.3 and **neutral placeholder copy** clearly tagged "PLACEHOLDER".
5. **Categories (suggested; owner confirms):** Bread · Pastries · Cakes & celebration cakes · Cookies & small sweets · Savoury & sandwiches · Breakfast · Seasonal specialties.
6. **Collections (SEASONAL, DRAFT, no dates):** Castanyada (panellets) · Christmas · Tortell de Reis · Carnestoltes · Easter · Sant Jordi · Sant Joan — dates set by the owner each year.
7. **FAQ starter questions (answers left for the owner):** What are your opening hours and holiday closures? · Do you make custom cakes and how much notice do you need? · How can I ask about a cake for a special date? · Do you have information on allergens? · Do you offer vegan, vegetarian or gluten-free options? · Do you offer delivery or only pickup? · What payment methods do you accept? · Is the shop accessible? · Do you have seating / serve breakfast? · How can I contact you quickly?
8. **Navigation:** Header — Menu, Seasonal, Custom cakes, About, Blog, Contact. Footer — shop info, legal links, social links (empty until provided).
9. **UiStrings:** the full key list for public microcopy (CTA labels, form labels/errors, empty states, "Open now/Closed", "Ask in store for allergen information", cookie banner, etc.) with ca/es/en placeholders.
10. **Admin user:** created from `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` env vars (never committed); force password change on first login.

## Appendix B — Owner inputs needed (agent must output this list, with checkboxes, at the end of Phase 0 and keep it updated)

Trading name & legal entity (denominación social, NIF/CIF, registered address) · logo and brand colours/fonts · 15–25 high-quality photos (shopfront, interior, products, team, custom cakes) with permission to publish · confirmed opening hours and holiday closures · confirmed phone/WhatsApp/email · social handles · product list with descriptions, prices (if public), allergens verified by the owner · custom-cake information to publish (sizes, flavours, advance notice, how to get in touch) · seasonal calendar with dates · languages and who writes/translates content · domain name and DNS access · Google Business Profile and Tripadvisor ownership · analytics preference · who will be ADMIN vs EDITOR · retention period and privacy contact.

## Appendix C — Final instruction to the agent

Start now with **Phase 0**: reply with (1) a 10-line restatement of the project as you understand it, (2) the batched questions for D1–D8, (3) the "Owner inputs needed" checklist, and (4) the exact commands and files you will create in Phase 1. Then wait for answers (or proceed with the recommended defaults if none arrive) and build phase by phase, reporting at each boundary.