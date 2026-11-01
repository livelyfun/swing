# Visual & UX Audit — Swing Forn de Pa (Badalona)
*Date: November 2026 | Viewports tested: 390×844 (mobile), 768×1024 (tablet), 1440×900 (desktop)*

---

## 1. Executive Summary: Why the Current Site Looks Ugly & Templated

The existing site demonstrates classic "AI bakery template" slop:
1. **Generic Cliché Palette:** Warm cream background (`#FFF8EF`) + dark brown serif headings (`#3B2A20`) + terracotta/clay accents (`#A8531C`). It looks like a generic generated theme with zero personality or connection to Badalona or the Mediterranean coast.
2. **Pill Enclosure Obsession (Banned Default §2):** Everything is trapped inside rounded pills: the open badge (`rounded-full`), the language switcher (`rounded-full`), the primary CTA buttons (`rounded-full`), the "OPEN" status badge, the product category chips, the allergen badges, and the submit buttons.
3. **The "SaaS Card Kit" Syndrome:** Content is uniformly chopped into rounded-2xl cards with identical `border-[#D9C4A8]` borders and faint shadows. There is no architectural rhythm, no asymmetric emphasis, and no editorial confidence.
4. **Mechanical Eyebrow Shouting:** Uppercase tracked micro-labels (`HORARI A BADALONA`, `NUESTRO OBRADOR`, `OPINIONES DEL BARRIO`) appear like code-comment headers above sections.
5. **Arrow ("→") & Middle-Dot Clutter:** Every link has a mechanical arrow (`Demana →`, `Consultar →`, `Productos →`), and metadata strings rely on repetitive middle-dots (`Abierto ahora · Cierra a las 15:00`).
6. **Zero Memorable Anchors:** The open-now status is buried in a plain table. There is no visual metaphor, no dynamic sunlight transition, no tactile swinging tag, and no brand character.
7. **Mobile Breakages:** On mobile (390px), a floating dark circle (Next.js dev indicator / unstyled button) overlaps the "Llamar" action in the bottom bar, and the horizontal banner buttons wrap haphazardly.

---

## 2. Page-by-Page Audit

### 2.1 Home (`/es`)
- **Screenshots:** `design/audit/home-390.png`, `design/audit/home-768.png`, `design/audit/home-1440.png`
- **Weaknesses:**
  - **Hero:** A split grid with standard left-aligned serif headline and a bland schedule box on the right. No emotional connection to fresh morning bread or pre-dawn baking.
  - **Opening Status:** The most important business question ("Is it open right now?") is rendered as an uninspired tabular widget with a green pill tag.
  - **Campaign Banner:** The Castanyada/Panellets campaign is a flat dark-orange rectangle sandwiched between sections without character or celebratory atmosphere.
  - **Featured Products:** 4 identical cards with `Demana →` (which violated the "no ordering/demana" rule by implying online orders!). Cards have no imagery, relying solely on text in boxes.
  - **Trust/Reviews:** Quotation mark icons inside identical rounded cards. Feels fabricated and sterile.
  - **Map Section:** Plain boxed placeholder with a generic button.

### 2.2 Menu / Products (`/es/productos`)
- **Screenshots:** `design/audit/menu-390.png`, `design/audit/menu-768.png`, `design/audit/menu-1440.png`
- **Weaknesses:**
  - Filter chips look like pill candies wrapped in pills.
  - Search input sits with no clear relationship to the category filters.
  - Every product card is an identical empty box with thin borders and a tiny allergen shield. Without real artisanal product photography and distinctive typography, it looks like an unstyled wireframe.
  - "Consultar →" action repeats monotonously on every card.

### 2.3 Product Detail (`/es/productos/pan-de-payes-tradicional`)
- **Screenshots:** `design/audit/product-390.png`, `design/audit/product-768.png`, `design/audit/product-1440.png`
- **Weaknesses:**
  - Standard two-column split with a massive empty image placeholder that looks broken.
  - Allergens list uses static pill badges instead of clean typographic list formatting.
  - "Contactar per aquest producte" is a generic green pill button.
  - Lacks tactile storytelling (dough fermentation time, IGP Pa de Pagès recognition, crust texture).

### 2.4 Blog (`/es/blog`)
- **Screenshots:** `design/audit/blog-390.png`, `design/audit/blog-768.png`, `design/audit/blog-1440.png`
- **Weaknesses:**
  - Identical generic card grid with placeholder dates and excerpt text.
  - Overused serif titles on cream surfaces.
  - No editorial pacing or feature article anchor.

### 2.5 Contact & Hours (`/es/contacto`)
- **Screenshots:** `design/audit/contact-390.png`, `design/audit/contact-768.png`, `design/audit/contact-1440.png`
- **Weaknesses:**
  - Standard contact form on the left, two stacked boxes on the right.
  - Direct contact links (phone, WhatsApp) are buried in small text inside a card instead of prominent, accessible actions.
  - Privacy consent checkbox and map reveal button look mechanical.

---

## 3. Banned Defaults Checklist for Replacement

| Banned Default | Status in Audit | Replacement in "Blue Hour" Direction |
|---|---|---|
| Warm cream + high-contrast serif + terracotta | **Present everywhere** | Replace with "Blue Hour" palette: deep cobalt (`#2236C8`), night blue (`#0E1540`), flour-white (`#FFFBF0`), golden sun (`#FFD23F`), and warm crust glow (`#F07A1F`). |
| "SaaS card kit" with identical radii & grey shadows | **Present everywhere** | Replace with architectural arch geometries (`rounded-t-[999px]`), asymmetrical hero placement, clean hairline dividers, and unboxed sections. |
| Tiny ALL-CAPS tracked eyebrow headers | **Present everywhere** | Eliminate all pseudo-technical uppercase eyebrows. Use clean, natural editorial titles. |
| Pill badges on metadata / categories / status | **Present everywhere** | Zero-pill discipline: unboxed text separated by typographic slashes or subtle dots; interactive filters as clean tactile segmented buttons. |
| Arrows (`→`) on every link | **Present everywhere** | Remove all superfluous arrows. Let clear typographic links and interactive buttons speak for themselves. |
| Monotonous fade-and-slide on every section | **Present** | Signature dynamic SVG Shop Sun moment on Home (open/closed visual state), ambient seasonal marquee, and springy pendulum hover on badges (`swing`). |
| Redundant ordering verbs ("Demana") | **Present** | Remove all ordering / cart implications. Explicitly orient toward "Visita'ns a l'obrador" (Visit us), WhatsApp chat, or direct phone call. |

---

## 4. Layout Retention Rule
**Zero layouts from the audit will be reused.** Every view will be rebuilt from scratch under the "Blue Hour" art direction, starting strictly with the Home page checkpoint.
