---
version: "alpha"
name: "Estilo de Ecossistema Digital"
description: "Dynamic and social landing page for a gaming and social platform. Ideal for landing pages, modern websites. AI-ready template."
colors:
  primary: "#00A1DE"
  secondary: "#000000"
  tertiary: "#FFFFFF"
  neutral: "#BF00FF"
  surface: "#00FF00"
  accent: "#FFA500"
typography:
  h1:
    fontFamily: Poppins
    fontSize: 2.5rem
    fontWeight: 700
  body-md:
    fontFamily: Poppins
    fontSize: 1rem
    fontWeight: 400
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    padding: 12px
---

## Overview

Dynamic and social landing page for a gaming and social platform. Ideal for landing pages, modern websites. AI-ready template. WeChat figured it out first. One app, dozens of products — payments, social, gaming, commerce — all feeling like they belong together without feeling identical. That's the trick nobody talks about. Apple did it differently: hardware dictated the language, and software followed. But the principle held. You need a system elastic enough to stretch across wildly different contexts while maintaining something recognizable. A thread.

The super-app era forced designers to abandon the single-product mindset entirely. You're not designing screens anymore — you're designing a gravity field. Every sub-product orbits the same core but has its own atmosphere. Grab, Gojek, Alipay — they all learned this the hard way. Too rigid and your fintech module feels wrong inside your social feed. Too loose and users don't trust that it's all one thing.

What emerged was a new discipline: ecosystem design. Shared primitives, flexible tokens, contextual density. The visual system becomes infrastructure, not decoration. It has to carry meaning across gaming interfaces, payment flows, and messaging — simultaneously. That demands a fundamentally different relationship with consistency.

- Density: 5/10 — Balanced
- Variance: 4/10 — Moderate
- Motion: 4/10 — Subtle

- **Style:** Dynamic, Social, Immersive
- **Keywords:** gaming, social media, fintech, AI, entertainment, vibrant, interactive, community, digital, engaging
- **Era:** 2026+ Entretenimento Conectado
- **Light/Dark:** ✗ No / ✓ Full

## Colors

- **Azul Digital** (#00A1DE) — Accent highlight, links and focus states
- **Preto** (#000000) — Dark surface, primary background
- **Branco** (#FFFFFF) — Light surface, card backgrounds
- **Roxo Elétrico** (#BF00FF) — Accent color, emphasis elements
- **Verde Brilhante** (#00FF00) — Success states, positive indicators
- **Laranja** (#FFA500) — Warm accent, call-to-action secondary
- **Ciano** (#00FFFF) — Extended palette, decorative use
- **Cinza Escuro** (#333333) — Deep contrast surface


## Typography

- **Display / Hero:** Poppins — Weight 700, tight tracking, used for headline impact
- **Body:** Poppins — Weight 400, 16px/1.6 line-height, max 72ch per line
- **UI Labels / Captions:** Poppins — 0.875rem, weight 500, slight letter-spacing
- **Monospace:** JetBrains Mono — Used for code, metadata, and technical values

Scale:
- Hero: clamp(2.5rem, 5vw, 4rem)
- H1: 2.25rem
- H2: 1.5rem
- Body: 1rem / 1.6
- Small: 0.875rem


## Layout

- **Grid:** CSS Grid primary. Max-width containment: 1280px centered with 1.5rem side padding.
- **Spacing rhythm:** Balanced. Base unit: 0.5rem (8px).
- **Section vertical gaps:** clamp(4rem, 8vw, 8rem).
- **Hero layout:** Split-screen (text left, visual right).
- **Feature sections:** Zig-zag alternating text+image rows. No 3-equal-columns.
- **Mobile collapse:** All multi-column layouts collapse below 768px. No horizontal overflow.
- **z-index contract:** base (0) / sticky-nav (100) / overlay (200) / modal (300) / toast (500).


## Elevation & Depth

Animações de partículas dinâmicas, gradientes vibrantes, micro-interações de engajamento social, tipografia moderna e ousada, elementos de gamificação, transições fluidas, visualizações de dados de usuários, efeitos de luz neon.

- **Physics:** Ease-out curves, 200-300ms duration. Smooth and predictable.
- **Entry animations:** Fade + translate-Y (16px → 0) over 420ms ease-out. Staggered cascades for lists: 80ms between items.
- **Hover states:** Subtle color shift + shadow adjustment over 200ms.
- **Page transitions:** Fade only (200ms).
- **Performance:** Only transform and opacity animated. No layout-triggering properties.


## Shapes

Base corner radius: 8px. See rounded tokens in front matter for the full scale.


## Components

- **Primary Button:** Subtly rounded (0.5rem) shape. Accent color fill. Hover: 8% darken + subtle lift shadow. Active: -1px translate tactile press. Font weight 600. No outer glows.
- **Secondary / Ghost Button:** Outline variant. 1.5px border in muted color. Text in primary color. Hover: subtle background fill.
- **Cards:** Subtly rounded (0.5rem) corners. Surface background. Subtle shadow (0 2px 12px rgba(0,0,0,0.06)). 1px border stroke.
- **Inputs:** Label above input. 1px border stroke. Focus ring: 2px accent color offset 2px. Error text below in semantic red. No floating labels.
- **Navigation:** Primary surface background. Active item: accent color indicator. Font weight 500 when active.
- **Skeletons:** Shimmer animation matching component dimensions. No circular spinners.
- **Empty States:** Icon-based composition with descriptive text and action button.


## Do's and Don'ts

- No emojis in UI — use icon system only (Lucide, Heroicons)
- No pure black (#000000) — use off-black or charcoal variants
- No oversaturated accent colors (saturation cap: 80%)
- No 3-column equal-width feature layouts — use zig-zag or asymmetric grid
- No `h-screen` — use `min-h-[100dvh]`
- No AI copywriting clichés: "Elevate", "Seamless", "Unleash", "Next-Gen"
- No broken external image links — use picsum.photos or inline SVG
- No generic lorem ipsum in demos

- Do Animações de partículas
- Do Gradientes vibrantes
- Do Micro-interações sociais
- Do Tipografia ousada
- Do Elementos de gamificação
- Do Efeitos de luz neon.


## Use Case

Landing pages, Modern websites

<!-- Source: https://designmd.app/library/estilo-de-ecossistema-digital · designmd.app -->
