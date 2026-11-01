# DECISIONS.md — Swing Forn de Pa (Badalona)

Record of architectural, business, and design decisions.

| # | Topic | Decision & Status | Rationale |
|---|---|---|---|
| **D1** | Languages at launch | **Catalan (ca) + Spanish (es) + English (en)**. Default locale: `es`, full `ca` parity. | High bilingual requirement in Badalona + tourist/international accessibility. |
| **D2** | Ordering & Payments | **Strictly OUT OF SCOPE** (Owner decision, 1 Nov 2026). | Informational site: browse products, check hours/location, direct contact via phone, WhatsApp, or contact inquiry form. |
| **D3** | Show Prices | Stored as integer cents (EUR); per-site and per-product visibility toggle. Defaults to hidden until confirmed by owner. | Flexibility for artisan bakeries where seasonal ingredients and custom cakes vary. |
| **D4** | Email Notifications | CMS internal inbox is authoritative and functions standalone. Resend integration enabled if API key is provided. | Guarantees inquiries are never lost even without third-party email delivery services. |
| **D5** | Admin UI Language | English (v1) with centralized dictionary for future Catalan/Spanish localization. | Fast, reliable CMS administration with clean dictionary-based labels. |
| **D6** | Analytics | Cookieless / privacy-friendly analytics preferred; consent banner gates any non-essential cookies. | RGPD / LOPDGDD compliance in Spain / EU. |
| **D7** | Domain & Hosting | TBD / Development preview URL active. | Production domain to be assigned by owner at launch. |
| **D8** | Brand & Styling | Warm bakery palette (Cream `#FFF8EF`, Crust Brown `#3B2A20`, Baked Orange `#A8531C`, Golden `#E9B44C`). Verified WCAG 2.2 AA contrast. | Authentic artisan bakery feel aligned with Section 7.2 design tokens. |
