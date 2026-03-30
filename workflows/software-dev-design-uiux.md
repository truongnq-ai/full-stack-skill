---
description: Dev generates comprehensive UI/UX design system with color palettes, typography, effects, and implements responsive interfaces across web and mobile stacks.
---

# 🎨 Dev UI/UX Design

> **Use this workflow when**: dev needs to design or improve a visual interface with professional design system. Trigger: `/software-dev-design-uiux`.
>
> **Out of scope**: Does not handle backend logic or API design — use `software-dev-design-api`. Does not generate images — use image generation tools.
>
> **Activates skills**: `skills/common/mobile-ux-core/SKILL.md`, `skills/common/mobile-animation/SKILL.md`

---

## Step 1 — Analyze Requirements

Extract from request: product type (SaaS, dashboard, landing), style keywords (minimal, dark mode), industry (fintech, healthcare), stack (React, Vue, Flutter).

---

## Step 2 — Generate Design System

```bash
python3 .agent/.shared/ui-ux-pro-max/scripts/search.py "<product> <industry> <keywords>" --design-system
```

Returns: pattern, style, colors, typography, effects, anti-patterns.

> **Fallback**: If script missing, manually pick: color palette (HSL-based), Google Font pairing, spacing scale (4px base).

---

## Step 3 — Supplement with Domain Searches

```bash
python3 .agent/.shared/ui-ux-pro-max/scripts/search.py "<keyword>" --domain <domain>
```

Domains: `style`, `ux`, `chart`, `typography`, `landing`.

---

## Step 4 — Stack-Specific Guidelines

```bash
python3 .agent/.shared/ui-ux-pro-max/scripts/search.py "<keyword>" --stack <stack>
```

Stacks: `html-tailwind`, `react`, `nextjs`, `vue`, `svelte`, `swiftui`, `react-native`, `flutter`, `shadcn`.

> **Fallback**: Default to `html-tailwind` if unspecified.

---

## Step 5 — Implement

**Icons**: SVG only (Heroicons, Lucide) — never emoji as UI icons.
**Interaction**: `cursor-pointer` on clickables, `transition-colors duration-200` on hover, no layout shift.
**Light/Dark**: Light glass `bg-white/80` min, text `#0F172A` or darker.
**Layout**: Floating navbar `top-4`, `max-w-7xl`, responsive at 375/768/1024/1440px.

---

## Step 6 — Pre-Delivery Checklist

- [ ] No emojis as icons (SVG only)
- [ ] Hover states don't cause layout shift
- [ ] Light mode text contrast ≥4.5:1
- [ ] `cursor-pointer` on all clickable elements
- [ ] No horizontal scroll at 375px
- [ ] `prefers-reduced-motion` respected
- [ ] All images have `alt` text

---

## Done Criteria

- [ ] Design system generated and applied
- [ ] All checklist items verified
- [ ] Responsive at all 4 breakpoints
