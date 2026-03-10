---
description: Audit and optimize web/app performance. Measures baseline, identifies bottlenecks, applies targeted fixes, and verifies delta improvement.
---

# ⚡ Performance Optimization Workflow

> **Use this workflow when**: user wants to improve page speed, reduce bundle size, fix Core Web Vitals, or runs `/performance`. Trigger phrases: "make it faster", "optimize performance", "Lighthouse score too low", "reduce load time".
>
> **Out of scope**: Does not fix functional bugs or refactor architecture — use `code-review` or `codebase-review` for those. Backend DB query optimization beyond indexing is out of scope.

$ARGUMENTS

---

## Step 1 — Define Scope

Ask user which target to optimize:

- **(A) Specific page or route** — user provides URL or component path
- **(B) Full app audit** — all major routes
- **(C) Specific concern** — bundle size / images / DB queries / hydration

> **Approval gate**: Confirm scope before running any audit tools.

---

## Step 2 — Baseline Profiling

Run tools based on detected stack:

**Web (browser-accessible):**
```bash
# Lighthouse CLI audit (install if missing: npm install -g lighthouse)
lighthouse <url> --output json --output-path ./docs/lighthouse-before.json
lighthouse <url> --output html --output-path ./docs/lighthouse-before.html

# Local dev server if needed
npm run dev  # or equivalent
```

**Bundle analysis:**
```bash
# Next.js / Webpack
npx @next/bundle-analyzer  # or ANALYZE=true npm run build

# Vite
npx vite-bundle-visualizer

# Generic
find .next dist build -name "*.js" | xargs wc -c | sort -rn | head -20
```

> **Fallback**: If Lighthouse unavailable, use Chrome DevTools manually and record: LCP, FID/INP, CLS, TTFB. Document in `docs/perf-baseline.md`.

Capture baseline metrics:

| Metric | Baseline | Target |
|--------|----------|--------|
| Lighthouse Score | [X] | ≥ 95 |
| LCP | [X]s | < 2.5s |
| CLS | [X] | < 0.1 |
| Bundle Size (main JS) | [X]kb | Minimize |

---

## Step 3 — Bottleneck Identification

Analyze baseline results. Check these signals in order:

| Priority | Signal | Detection |
|----------|--------|-----------|
| P0 | Unoptimized images (no WebP/AVIF, no lazy-load) | Lighthouse "Properly size images" |
| P0 | Render-blocking scripts/CSS | Lighthouse "Eliminate render-blocking resources" |
| P1 | Unused JS/CSS (>30% dead code) | Lighthouse "Remove unused JavaScript" |
| P1 | No caching headers (assets served fresh every request) | DevTools Network → Response Headers |
| P1 | N+1 DB queries | Slow query log or ORM debug output |
| P2 | Large hydration payload (SSR frameworks) | Lighthouse "Avoid large layout shifts" |
| P2 | Missing CDN for static assets | Network tab → server location vs user location |

Document top 3 bottlenecks before proceeding.

---

## ⏸️ Checkpoint: Confirm Fix Plan

```
"Top bottlenecks found:
1. [Bottleneck 1] — estimated gain: [X]%
2. [Bottleneck 2] — estimated gain: [X]%
3. [Bottleneck 3] — estimated gain: [X]%

Proceed with fixes? (Y = apply all / N = select specific items)"
```

---

## Step 4 — Surgical Fixes

Apply fixes targeting identified bottlenecks. Use `view_file` before modifying any file.

**Images:**
- Convert to WebP/AVIF. Add `loading="lazy"` to below-fold images.
- For Next.js: use `<Image>` component with `priority` only for LCP image.

**Bundle:**
- Add dynamic imports for non-critical components: `const Comp = dynamic(() => import('./Comp'))`
- Move large libraries to CDN or replace with lighter alternatives.

**Caching:**
- Static assets: set `Cache-Control: public, max-age=31536000, immutable`
- API responses: add Redis layer or HTTP caching headers.

**DB Queries:**
- Add missing indices on `WHERE`/`JOIN` columns.
- Replace N+1 patterns with `JOIN` or batch queries.

> **Fallback**: If stack-specific optimization is unclear, use `view_file` to read the relevant skill file (`skills/nextjs/SKILL.md`, `skills/database/SKILL.md`) for guidance.

---

## Step 5 — Verify Delta

Re-run the same tools from Step 2 after fixes:

```bash
lighthouse <url> --output json --output-path ./docs/lighthouse-after.json
lighthouse <url> --output html --output-path ./docs/lighthouse-after.html
```

> **Fallback**: If Lighthouse unavailable, re-record Core Web Vitals manually.

---

## Step 6 — Report

Save to `docs/performance-report.md` (create `docs/` if missing):

```
## Performance Report — [Date] — [Scope]

### Before vs After
| Metric | Before | After | Delta |
|--------|--------|-------|-------|
| Lighthouse | [X] | [Y] | +[Z] 🚀 |
| LCP | [X]s | [Y]s | -[Z]s |
| CLS | [X] | [Y] | -[Z] |
| Bundle (main JS) | [X]kb | [Y]kb | -[Z]kb |

### Fixes Applied
1. [Fix 1] — [File changed] — [Impact]
2. [Fix 2] — [File changed] — [Impact]

### Remaining Opportunities
- [P2 item not addressed] — [Estimated gain]
```

> [!IMPORTANT]
> Lighthouse Score target ≥ 95. LCP < 2.5s. If targets not met after fixes, return to Step 3 and identify next bottleneck.
