# Testimonials Page Design

**Date:** 2026-05-28
**Status:** Approved

## Overview

Add a dedicated `/testimonials` route to the Scudo Doc Website featuring a single testimonial from Dr. Eyal Politi (dentist). Page is designed to accommodate future testimonials without structural rework.

## Content

**Testimonial author:** Dr. Eyal Politi, Dentist  
**Photos:** Two photos provided — front-facing (wearing mask) and side profile  
**Quote:**

> "I wore the SCUDOdoc mask every day for the whole day for three weeks at the clinic, and I couldn't be happier with it.
>
> Breathing is easy and comfortable and it totally eliminated my eye glass fogging — far more than I expected, and definitely compared to a regular medical mask. During the day, I noticed a real difference in my energy levels. Less fatigue, better focus.
>
> But what surprised me the most was my patients' reactions. They love it. They tell me they could see my face, hear me clearly, and actually feel my presence — not like I was hidden behind a barrier. It completely changed the dynamic during treatment.
>
> ScudoDoc doesn't just protect — it transforms the care experience, for me and for my patient alike."

## Architecture

- **Route:** `GET /testimonials` added to `app.py`
- **Template:** `templates/testimonials.html` (extends `base.html`)
- **Images:** Two photos saved to `static/images/` as `dr-politi-front.jpg` (front-facing) and `dr-politi-side.jpg` (side profile)
- No new dependencies; uses existing Tailwind CDN + vanilla JS patterns

## Page Sections

### 1. Page Header
- Background: `bg-gray-50`, centered, `py-16`
- Eyebrow label: "FROM THE FIELD" — small teal uppercase tracking-widest
- H1: "What Professionals Say" — `text-4xl font-extrabold text-gray-900`
- Fade-in animation on load

### 2. Main Split Layout
- Background: white, `py-24`
- Grid: `lg:grid-cols-5` — left 3 cols (quote), right 2 cols (photos)
- Fade-in animation on scroll (uses existing `.fade-in` + IntersectionObserver pattern)

**Left column:**
- Large decorative teal `"` quotation mark (display element, not semantic)
- Full testimonial text: `text-lg text-gray-700 leading-relaxed`
- Byline: "Dr. Eyal Politi" in `font-bold text-gray-900` + "Dentist" badge in teal
- Thin teal bottom-border accent under byline

**Right column:**
- Primary image: front-facing photo, `rounded-2xl shadow-lg`, full column width
- Secondary image: side-profile photo, `rounded-xl shadow-md`, smaller (~75% width), right-aligned below primary — creates natural photo stack

### 3. Bottom CTA
- Background: `bg-gray-900`, `py-16`, centered
- Heading: "Ready to transform your practice?" — white, `text-3xl font-bold`
- Two buttons:
  - "Contact Us" — teal fill, links to `/contact`
  - "Learn More" — white outline, links to `/`

## Styling Conventions (matches existing site)
- Colors: `#1ABC9C` (primary teal), `#2E86AB` (secondary blue), gray scale
- Font: Inter (inherited from base.html)
- Animations: existing `.fade-in` CSS class + IntersectionObserver in `main.js`
- Rounded corners: `rounded-2xl` for primary image, `rounded-xl` for secondary
- No new CSS needed — all Tailwind utilities

## Navigation
- Add "Testimonials" link to the navbar in `base.html` pointing to `/testimonials`

## Out of Scope
- No carousel or pagination (single testimonial)
- No star ratings
- No CMS or dynamic data — hardcoded in template
