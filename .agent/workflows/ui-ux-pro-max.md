---
description: Comprehensive UI/UX design system generator for web and mobile. Covers 50+ styles, 97 color palettes, 57 font pairings across 10 stacks.
---

# 🎨 UI/UX Pro Max Workflow

> **Use this workflow when**: user requests UI/UX design, wants to build/improve a visual interface, or runs `/ui-ux-pro-max`. Trigger phrases: "design X", "build UI", "make it look like Linear/Magic UI", "improve the interface".
>
> **Out of scope**: Does not handle backend logic, API design, or database schema. Does not generate images — use image generation tools for assets.

---

## Prerequisites

Verify Python is available:

```bash
python3 --version || python --version
```

> **Fallback**: If Python missing, install it:
> - macOS: `brew install python3`
> - Ubuntu: `sudo apt update && sudo apt install python3`
> - Windows: `winget install Python.Python.3.12`

---

## Step 1 — Analyze Requirements

Extract from user request:

| Signal | Examples |
|--------|---------|
| **Product type** | SaaS, e-commerce, portfolio, dashboard, landing page |
| **Style keywords** | minimal, playful, professional, dark mode, glassmorphism |
| **Industry** | healthcare, fintech, gaming, education, beauty |
| **Stack** | React, Vue, Next.js → default to `html-tailwind` if unspecified |

---

## Step 2 — Generate Design System (REQUIRED)

Always run `--design-system` first:

```bash
python3 .agent/.shared/ui-ux-pro-max/scripts/search.py "<product_type> <industry> <keywords>" --design-system [-p "Project Name"]
```

This returns: pattern, style, colors, typography, effects, and anti-patterns.

**To persist across sessions:**
```bash
python3 .agent/.shared/ui-ux-pro-max/scripts/search.py "<query>" --design-system --persist -p "Project Name"
# Creates design-system/MASTER.md (global) and design-system/pages/<page>.md (overrides)
```

> **Fallback**: If `search.py` not found, run `find . -name "search.py" -path "*ui-ux*"` to locate it. If missing entirely, proceed using design principles: pick a color palette manually, select Google Font pairing, define spacing scale.

---

## Step 3 — Supplement with Domain Searches

After design system is generated, add detail as needed:

```bash
python3 .agent/.shared/ui-ux-pro-max/scripts/search.py "<keyword>" --domain <domain>
```

| Domain | Use For |
|--------|---------|
| `style` | More UI style options |
| `ux` | Animation, accessibility best practices |
| `chart` | Chart type and library recommendations |
| `typography` | Alternative font pairings |
| `landing` | Page structure, CTA strategies |

---

## Step 4 — Stack Guidelines

Get implementation-specific rules. Default: `html-tailwind`.

```bash
python3 .agent/.shared/ui-ux-pro-max/scripts/search.py "<keyword>" --stack html-tailwind
```

Available stacks: `html-tailwind`, `react`, `nextjs`, `vue`, `svelte`, `swiftui`, `react-native`, `flutter`, `shadcn`, `jetpack-compose`

---

## Step 5 — Implement

Synthesize the design system + domain searches and build the UI. Apply these universal rules:

**Icons & Logos**
- Use SVG icons (Heroicons, Lucide, Simple Icons) — never emoji as UI icons
- Verify brand logos from Simple Icons before using

**Interaction**
- All clickable elements: `cursor-pointer`
- Hover states: `transition-colors duration-200`
- No layout shift on hover (avoid `scale` transforms)

**Light/Dark Mode**
- Light mode glass: `bg-white/80` minimum opacity
- Light mode text: `#0F172A` (slate-900) or darker
- Borders visible in both modes

**Layout**
- Floating navbar: `top-4 left-4 right-4` spacing
- Consistent max-width: `max-w-6xl` or `max-w-7xl`
- Responsive breakpoints: 375px, 768px, 1024px, 1440px

---

## Step 6 — Pre-Delivery Checklist

Before delivering UI code, verify:

**Visual**
- [ ] No emojis used as icons (SVG only)
- [ ] Hover states don't cause layout shift
- [ ] Light mode text contrast ≥ 4.5:1

**Interaction**
- [ ] All clickable elements have `cursor-pointer`
- [ ] Transitions: 150–300ms
- [ ] Focus states visible for keyboard navigation

**Responsive**
- [ ] No horizontal scroll on mobile (375px)
- [ ] Content not hidden behind fixed navbars
- [ ] Tested at all 4 breakpoints

**Accessibility**
- [ ] All images have `alt` text
- [ ] Form inputs have `<label>` elements
- [ ] `prefers-reduced-motion` respected
