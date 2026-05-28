# SCUDOdoc Website — Design Spec
**Date:** 2026-04-16  
**Status:** Approved

---

## Overview

A modern, professional website for SCUDOdoc — a medical technology startup developing Ion Plasma Mask Filter Technology for healthcare professionals. The site serves as both a product showcase and an investor-facing platform.

**Reference:** https://www.scudo-mind.health (parallel company, same design language)

---

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | Python / Flask |
| Templating | Jinja2 |
| CSS | TailwindCSS via CDN (no build step) |
| Custom CSS | `static/css/styles.css` |
| JavaScript | Vanilla JS — `static/js/main.js` |
| No database | Static content only |

---

## Brand Identity

- **Company:** SCUDOdoc (SCUDO)
- **Tagline:** "Enabling Our Medical Care Givers to Safely Operate Without Mask Fatigue — One SCUDO-Mask At The Time"
- **Primary color:** Teal `#1ABC9C`
- **Secondary color:** Deep Blue `#2E86AB`
- **Text:** Dark Gray `#333333`
- **Background:** White / Light `#f8fffe`
- **Style:** Rounded corners, generous whitespace, teal CTA buttons, subtle card shadows, Inter/system font stack

---

## Visual Design Direction

**Option B — Clean & Approachable:**  
Light/white background, teal as hero accent, rounded elements. Friendly modern startup feel. Matching scudo-mind.health's aesthetic. No dark backgrounds.

---

## Site Architecture: Hybrid Flask App

One rich scrolling homepage covers the full investor/product story. Dedicated sub-pages provide deeper content per topic. All server-side rendered with Flask + Jinja2.

### File Structure

```
scudodoc/
├── app.py
├── requirements.txt
├── static/
│   ├── css/styles.css
│   ├── js/main.js
│   └── images/
│       ├── logo.png                  (SCUDOdoc teal+blue logo)
│       ├── hero-mask.jpeg            (clear transparent mask render — hero)
│       ├── wear-shot-1.png           (woman wearing device, front angle)
│       ├── wear-shot-2.png           (woman wearing device, side angle)
│       ├── benny.png
│       ├── shai.png
│       ├── michal.png
│       ├── shahak.png
│       └── product-video.mp4
├── templates/
│   ├── base.html
│   ├── index.html
│   ├── technology.html
│   ├── esg.html
│   ├── market.html
│   ├── team.html
│   └── contact.html
└── docs/
    └── superpowers/specs/
        └── 2026-04-16-scudodoc-website-design.md
```

### Source Asset Locations (to copy into static/images/)

| Destination | Source |
|---|---|
| `logo.png` | `../make-the-doc-much-smaller_...cover_hd.png` |
| `hero-mask.jpeg` | `WhatsApp Image 2026-04-16 at 20.52.02.jpeg` (already in project dir) |
| `wear-shot-1.png` | `../Picture1.png` |
| `wear-shot-2.png` | `../Picture2.png` |
| `benny.png` | `../benny.png` |
| `shai.png` | `../shai.png` |
| `michal.png` | `../michal.png` |
| `shahak.png` | `../shahak.png` |
| `product-video.mp4` | `../scudo option 1 (1).mp4` |
| `product-video-2.mp4` | `~/Downloads/WhatsApp Video 2026-04-10 at 16.08.41.mp4` |

---

## Flask Routes

| Route | Template | Description |
|---|---|---|
| `/` | `index.html` | Homepage — full scrolling investor story |
| `/technology` | `technology.html` | Ion Plasma deep-dive, science table, video |
| `/esg` | `esg.html` | Full ESG stats, ECO-SCUDO program |
| `/market` | `market.html` | Market phases, revenue model, projections |
| `/team` | ~~removed~~ | Team snippets on homepage only; full profiles on `/contact` |
| `/contact` | `contact.html` | Contact form (mailto) |

---

## Base Template (`base.html`)

Every page shares:

1. **Confidential banner** — thin amber/teal top bar: `"Confidential — For qualified investors only"`
2. **Sticky navigation header:**
   - Left: SCUDOdoc logo (image)
   - Center/right links: Technology | ESG Impact | Market | Team | Contact
   - CTA button: `"Get in Touch →"` (mailto:benny@scudodoc.com)
   - Mobile: hamburger menu collapsing to full-screen overlay
3. **Footer:**
   - Closing message: *"Finally, after 100 Years... Our medical care givers can breathe — freely & safely"*
   - Nav links
   - Legal: © 2026 SCUDO · Confidential — For qualified investors only · Benny Shoham, Founder & CEO
4. **Meta tags:** Open Graph, description, title per page

---

## Homepage (`index.html`) — Section Order

### 1. Hero
- **Headline:** "A Paradigm Shift in Medical Personal Protective Equipment"
- **Subheadline:** "Ion Plasma Mask Filter Technology · ESG-Aligned"
- **Description paragraph** (from spec)
- **3 animated stat counters:** 93.6% · 10,000 · €3.0B
- **CTA button:** "Connect with the Team →"
- **Scroll indicator:** "Scroll ↓"
- **Hero image:** `hero-mask.jpeg` (large, right side or full-width background)

### 2. The Problem
- **Title:** "Why 100-Year-Old Technology Still Dominates"
- **6 problem cards** (icon + title + body):
  1. Fatigue & Discomfort
  2. Poor Patient Interaction
  3. Mediocre Protection (N95 60%, KN95 48.3%, surgical 10-15%)
  4. High Ongoing Costs (€500–€1,000/yr per clinic)
  5. Massive ESG Failure (~4B masks/yr, 100% non-recyclable, DASRI, 450+ yr microplastics)
  6. Supply Chain Vulnerability (EU 70%, USA 90% from China; EU Reg. 2025/1197)

### 3. The Solution
- **Title:** "Ion Plasma Mask Filter Technology"
- **Subtitle:** "Natural Breathing with Superior Real-Protection vs. N95/FFP Masks"
- **6 feature tiles** (icon + title + body):
  1. Active Ion Plasma Filtration — 93.6% PM2.5 vs N95's 71.6%
  2. Zero Heat/Moisture Buildup
  3. Full Vocal & Facial Clarity
  4. Continuous Self-Sanitizing
  5. Connected & Digital (app, battery, NAI status)
  6. Totally Safe (peer-reviewed research)
- **NAI explainer box:** Forest Bath / Shin-rin-yoku 森林浴 callout
- **Product wear shots:** `wear-shot-1.png` + `wear-shot-2.png`
- **"Learn More →"** link to `/technology`

### 4. ESG Impact (Summary)
- **Title:** "ECO SCUDO — Reducing Medical Mask Waste"
- **4 large impact counters:** 10,000 masks · 2,137 kg CO₂-eq (≡ 9,200 km) · 3.6 kg microplastics · >1.26B masks/yr avoided
- **Brief ESG crisis context** (2-3 sentences)
- **"Learn More →"** link to `/esg`

### 5. Competitive Positioning
- **Title:** "SCUDOdoc Competitive Positioning"
- **2×2 matrix visual** (SVG or CSS grid): X = patient interaction, Y = filtration efficiency. SCUDOdoc dot in top-right quadrant.
- **Comparison table:** Standard FFP2/N95 vs SCUDOdoc (5 rows)
- **Value proposition checklist:** ✓ No Fatigue · ✓ Best infection protection · ✓ Clear patient interaction · ✓ Eco & Social impact · ✓ Cost efficient

### 6. Market Opportunity (Summary)
- **Title:** "SCUDOdoc Global Market — €3 Billion"
- **4-phase market table** (condensed)
- **3 key stats:** €3.0B TAM · €1.875B SAM · €400M Revenue Yr 6
- **"Learn More →"** link to `/market`

### 7. Team (Snippets)
- **Title:** "Team, Funding & Usage"
- **2 team cards:** Benny Shoham (Founder & CEO) + Shai Rubanenko Shalgi (COO & AI Lead)
- Photo + name + title + 2-line bio each
- **"Meet the Full Team →"** link to `/team`

### 8. Investment CTA
- **Title:** "Investment & Use of Funds"
- **Funding ask:** Seed funding of $4.0M for 18-24 months
- **4 use-of-funds bullets**
- **4 large metric boxes:** €3.0B TAM · <80% Gross Margin · $4.0M Seed · €400M Year 6
- **CTA:** "Connect with the Team →" (mailto)

---

## Sub-pages

### `/technology` — Technology
- Full Ion Plasma explanation
- NAI science (forest bath, peer-reviewed research)
- Virus efficacy table (SARS-CoV-2, Influenza A, RSV, Common Cold, PM2.5)
- POC results highlight (93.6% vs 71.6%)
- Product platform variants (5 variants)
- Embedded product video (`<video>` tag)

### `/esg` — ESG Impact
- Full ESG stats with large counters
- Environmental crisis context (4B masks, 82,000 tonnes CO₂-eq, 450+ yr microplastics)
- ECO-Social program description
- Supply chain resilience angle

### `/market` — Market
- 4-phase market table (full detail)
- Revenue model (€400/device/year → €300 yr 3+)
- Revenue projection table (Years 1-6, France/EU/Global columns)
- Key stats: €3.0B TAM, €1.875B SAM, €400M target

### `/team` — Team & Investment
- Full profiles: Benny Shoham + Shai Rubanenko Shalgi
- Photos + full bio bullets
- Investment section (seed ask, use of funds, key metrics)
- Contact CTA

### `/contact` — Contact
- Simple contact section
- Benny Shoham, Founder & CEO
- mailto: link
- Company address/context

---

## JavaScript Features (`main.js`)

| Feature | Implementation |
|---|---|
| Animated counters | `IntersectionObserver` — count up from 0 when stat enters viewport |
| Smooth scroll | `scrollIntoView({ behavior: 'smooth' })` on anchor clicks |
| Mobile menu toggle | `classList.toggle('hidden')` on hamburger click |
| Scroll indicator | Fade out after first scroll |
| Scroll animations | Fade-in/slide-up on section entry via `IntersectionObserver` |

---

## Responsive Behavior

- **Mobile-first** Tailwind breakpoints
- Navigation collapses to hamburger at `md` breakpoint
- Problem cards: 1 col mobile → 2 col tablet → 3 col desktop
- Tables collapse to card layout on mobile
- Hero: stacked on mobile, side-by-side on desktop

---

## Contact

- **Method:** `mailto:` link (no form backend required)
- **Email:** Benny Shoham, Founder & CEO
- **CTA:** "Get in Touch →" in nav + "Connect with the Team →" in hero and investment section

---

## Content Notes

- Confidentiality notice on every page: "Confidential — For qualified investors only"
- CO₂-eq equivalency: "2,137 kg CO₂-eq per clinic (≡ 9,200 km not driven)" — from one-pager
- Phase I launch: France (47K dentists) → EU (360K dentists)
- Investment close goal: CE/MDR/PPE regulatory clearance + manufacturing partners + channel partners
- Team photos: only Benny and Shai are used. Michal and Shahak photos are not relevant to SCUDOdoc.
