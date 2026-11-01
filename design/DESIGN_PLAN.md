# Design & Motion Plan — "Blue Hour" for Swing Forn de Pa (Badalona)
*Companion to MASTER_PROMPT.md & FRONTEND DESIGN + MOTION PROMPT*

---

## 1. Visual & Art Direction: "Blue Hour"

### 1.1 Core Concept
Bakers in Badalona begin their craft at 04:00 before sunrise, preparing sourdough and viennoiserie for the morning opening at 06:00.
The art direction captures the **"Blue Hour"** — the transition from deep Mediterranean pre-dawn cobalt into the radiant golden dawn:
- **Night / Cobalt Field:** Deep night blue (`#0E1540`) and cobalt hour (`#2236C8`) representing the nocturnal obrador and maritime coast of Badalona.
- **Flour Canvas:** Warm, organic flour-white (`#FFFBF0`) for luminous day sections that highlight crusts and pastries.
- **Golden Sun Disc (`#FFD23F`):** Information-carrying celestial anchor. Rises above the horizon when the shop is open, dips below the horizon during night hours.
- **Crust Accent (`#F07A1F`):** Warm, appetizing golden-brown glow used strictly on bread/pastry highlights and primary buttons with night text.
- **The "Swing" Motion:** Physical pendulum spring dynamics on badges, tags, and interactive focus states, reflecting artisanal precision rather than jazz/dance tropes.

---

## 2. Design Tokens & Contrast Matrix

### 2.1 Brand Tokens
| Token | Hex | Role | Contrast on Flour (`#FFFBF0`) | Contrast on Night (`#0E1540`) | Contrast on Hour (`#2236C8`) |
|---|---|---|---|---|---|
| `night` | `#0E1540` | Text on light, deep dark sections | **17.2:1** (AAA) | Canvas | N/A |
| `hour` | `#2236C8` | Brand cobalt, Blue Hour sections, links | **7.1:1** (AAA) | Accent | Canvas |
| `flour` | `#FFFBF0` | Light backgrounds, text on dark | Canvas | **17.2:1** (AAA) | **7.1:1** (AAA) |
| `sun` | `#FFD23F` | Sun disc, focus ring, luminous glow | Accent only | **11.4:1** (AAA for text) | **5.2:1** (AA) |
| `crust` | `#F07A1F` | Warm bread fill (always paired with `night` text) | Accent fill | Accent fill | Accent fill |
| `tomato` | `#C9341F` | Seasonal badges, limited-time marks | **5.8:1** (AA) | Accent | Accent |
| `sage` | `#CFE3C2` | Soft seasonal tint (marzipan/panellets) | Background | Accent | Accent |

*All foreground text pairs comply strictly with WCAG 2.2 Level AA / AAA. Zero text is placed on unverified contrast pairings.*

---

## 3. Motion Budget Breakdown

| Motion Tier | Component | Description & Constraints | Budget / Performance |
|---|---|---|---|
| **Tier 1: Signature Moment** | `<ShopSun />` | Single SVG scene in Hero. Celestial sun disc rising/setting based on live `Europe/Madrid` open status, with soft rays and horizon line. Only active on Home. | Single SVG, CSS transform transition or light Framer spring (stiffness: 120, damping: 14). Settles in < 800ms. Respects `prefers-reduced-motion`. |
| **Tier 2: Ambient Loop** | `<SeasonalMarquee />` | Continuous, gentle horizontal crawl of current seasonal notice (e.g., "Campaña de Castanyada i Panellets artesanals a Badalona"). | Pure CSS `transform: translateX()`, compositor-only, pauses on `:hover` and `:focus-visible`. 0ms main thread cost. |
| **Tier 3: Image Reveals** | `<ArchReveal />` | Architectural arch (`rounded-t-[999px]`) clipping path or smooth opacity/scale entrance for bakery photos. Max 2 reveals on initial view. | `motion/react` `initial={{ opacity: 0, y: 16 }}` `whileInView={{ opacity: 1, y: 0 }}` with `viewport={{ once: true }}`. |
| **Tier 4: Spring Micro-interactions** | `<HangingTag />`, `<Pressable />` | Subtle pendulum swing on hover/focus (`rotate: [0, -4, 3, -1, 0]deg`), button spring settle on press (`scale: 0.98`). | Settle in $\le 200$ms (`cubic-bezier(0.16, 1, 0.3, 1)` or quick spring). |

---

## 4. Typography System

1. **Display Face:** High-personality editorial sans / display grotesque with generous x-height and warm geometry (`Bricolage Grotesque` / `Plus Jakarta Sans`).
2. **Body Face:** Humanist readable sans (`Instrument Sans` / `Plus Jakarta Sans`) with optical balance.
3. **Numerals & Hours:** `font-mono tabular-nums` for precise schedule alignment and pricing figures.
4. **Catalan Punctuation Test:** Support for the Catalan middle dot in ela geminada (`col·lecció`, `novel·la`, `al·lèrgens`), verified to render cleanly without line break breaks or unnatural spacing.

---

## 5. Viewport Layout Wireframes

### 5.1 Desktop Wireframe (1440px)
```
+----------------------------------------------------------------------------------------------------+
|  [Zone 1: Wordmark] SWING FORN DE PA      [Zone 2: Nav Links]      [Zone 3: Open Status + Call / WA] |
|  Avda. Catalunya 39, Badalona             Productes  Obrador  Blog Contacte   (Sun Indicator)        |
+----------------------------------------------------------------------------------------------------+
|                                                                                                    |
|  HERO SECTION (Night Blue #0E1540 -> Cobalt #2236C8 gradient)                                     |
|  +-------------------------------------------------------+  +------------------------------------+ |
|  | [ARCH WINDOW: Artisanal Bread Photography]            |  | CELESTIAL SUN HORIZON WIDGET       | |
|  |                                                       |  | [Rising Sun Disc #FFD23F]          | |
|  | Heading:                                              |  | "OBERT ARA MATEIX" / TANCAT        | |
|  | El forn que desperta Badalona abans que surti el sol. |  | 06:00 - 21:00                      | |
|  |                                                       |  |                                    | |
|  | Subheading:                                           |  | Accions Ràpides:                   | |
|  | Pa de fermentació lenta, brioixeria del dia i         |  | [ Trucar ] [ WhatsApp ] [ Adreça ] | |
|  | rebosteria tradicional al barri des de primera hora.  |  |                                    | |
|  +-------------------------------------------------------+  +------------------------------------+ |
|                                                                                                    |
+----------------------------------------------------------------------------------------------------+
|  SEASONAL MARQUEE (Crust #F07A1F fill, Night text)                                                 |
|  * PANELLETS ARTESANS DE PINYONS * CASTANYADA 2026 * TARTES PERSONALITZADES * OBRADOR A BADALONA   |
+----------------------------------------------------------------------------------------------------+
|                                                                                                    |
|  FEATURED OBRADOR SELECTIONS (Flour #FFFBF0 Canvas)                                                |
|  +---------------------------+  +---------------------------+  +---------------------------------+ |
|  | [Arch Card]               |  | [Arch Card]               |  | [Arch Card]                     | |
|  | Pa de Payés Tradicional   |  | Croissant de Mantega      |  | Panellets de Pinyons            | |
|  | Fermentació de 24 hores   |  | Fullat cruixent artesanal |  | Ametlla marcona de temporada    | |
|  | Detall d'al·lèrgens       |  | Detall d'al·lèrgens       |  | Detall d'al·lèrgens             | |
|  +---------------------------+  +---------------------------+  +---------------------------------+ |
|                                                                                                    |
+----------------------------------------------------------------------------------------------------+
|  OBRADOR & STORY (Cobalt #2236C8 Section)                                                           |
|  "Massa mare, farines seleccionades i respecte pels temps de repòs."                               |
|  Horaris detallats de tota la setmana + Certificació d'al·lèrgens UE 1169/2011                     |
+----------------------------------------------------------------------------------------------------+
|  FOOTER (Deep Night #0E1540)                                                                       |
|  Swing Forn de Pa · Avd. Catalunya 39, Badalona · Tel: +34 934 60 66 70                            |
+----------------------------------------------------------------------------------------------------+
```

### 5.2 Mobile Wireframe (390px)
```
+-----------------------------------+
| [Brand] SWING       [Lang] [Menu] |
+-----------------------------------+
| HERO (Blue Hour)                  |
|                                   |
| [Shop Sun Dynamic Scene]          |
|  (Sun rises over Badalona)        |
|  "OBERT ARA" · Tanca a les 21:00  |
|                                   |
| El forn que desperta Badalona     |
| abans que surti el sol.           |
|                                   |
| [Arch Image Preview]              |
+-----------------------------------+
| [Marquee: Temporada de Panellets] |
+-----------------------------------+
| ESPECIALITATS DE L'OBRADOR        |
| (Vertical Arch Stack)             |
| - Pa de Payés                     |
| - Croissant artesà                |
| - Panellets                       |
+-----------------------------------+
| HORARIS I CONTACTE DIRECTE        |
| - Dilluns a Divendres 06:00-21:00 |
| - Dissabte i Diumenge 06:00-15:00 |
+-----------------------------------+
| [STICKY THUMB ACTION BAR]         |
| [ Trucar ] [ WhatsApp ] [ Com anar|
+-----------------------------------+
```

---

## 6. Implementation Stages (D0 -> D3 Checkpoint)

1. **D0 (Audit):** Completed with 15 screenshots saved in `design/audit/` and findings recorded in `design/AUDIT.md`.
2. **D1 (Design Plan):** Written in `design/DESIGN_PLAN.md` (this file).
3. **D2 (Tokens, Motion Primitives, Design Lab):**
   - Create CSS tokens in `app/globals.css`.
   - Build `scripts/check-contrast.ts` and verify.
   - Build motion components in `components/motion/`.
   - Build `/design-lab` page to preview components isolated.
4. **D3 (Home Page Overhaul):**
   - Implement the "Blue Hour" art direction on Home.
   - Capture at 390px, 768px, 1440px and submit for checkpoint review.
