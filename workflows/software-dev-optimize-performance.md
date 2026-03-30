---
description: Dev audits and optimizes web/app performance — measures baseline, identifies bottlenecks, applies surgical fixes, verifies delta improvement.
---

# ⚡ Dev Performance Optimization

> **Use this workflow when**: dev needs to improve page speed, reduce bundle size, fix Core Web Vitals, or optimize backend queries. Trigger: `/software-dev-optimize-performance`.
>
> **Out of scope**: Does not fix functional bugs — use `software-dev-fix-bug`. Does not refactor architecture — use `software-dev-audit-codebase`.
>
> **Activates skills**: `skills/roles/dev/performance-guardrails/SKILL.md`, `skills/common/performance-engineering/SKILL.md`

---

## Step 1 — Define Scope

| Mode | Action |
|------|--------|
| **Specific page/route** | User provides URL or component path |
| **Full app audit** | All major routes |
| **Specific concern** | Bundle size / images / DB queries / hydration |

> **Approval gate**: Confirm scope before running audit tools.

---

## Step 2 — Baseline Profiling

```bash
lighthouse <url> --output json --output-path ./docs/lighthouse-before.json
find .next dist build -name "*.js" | xargs wc -c | sort -rn | head -20
```

Capture: Lighthouse Score, LCP, CLS, Bundle Size. Target: Score ≥95, LCP <2.5s, CLS <0.1.

> **Fallback**: If Lighthouse unavailable, record metrics manually from Chrome DevTools.

---

## Step 3 — Bottleneck Identification

| Priority | Signal |
|----------|--------|
| P0 | Unoptimized images (no WebP, no lazy-load) |
| P0 | Render-blocking scripts/CSS |
| P1 | Unused JS/CSS (>30% dead code) |
| P1 | No caching headers |
| P1 | N+1 DB queries |

Document top 3 bottlenecks.

---

## ⏸️ Checkpoint: Confirm Fix Plan

```
"Top bottlenecks:
1. [Bottleneck] — estimated gain: [X]%
2. [Bottleneck] — estimated gain: [X]%
Proceed? (Y = apply all / N = select)"
```

---

## Step 4 — Surgical Fixes

**Images**: Convert to WebP/AVIF, add `loading="lazy"`.
**Bundle**: Dynamic imports for non-critical components.
**Caching**: `Cache-Control: public, max-age=31536000, immutable`.
**DB**: Add missing indices, replace N+1 with JOINs.

> **Fallback**: Use `view_file` on framework-specific skill for guidance.

---

## Step 5 — Verify Delta

```bash
lighthouse <url> --output json --output-path ./docs/lighthouse-after.json
```

---

## Step 6 — Report

Save to `docs/performance-report.md`:

```
## Performance Report — [Date]
| Metric | Before | After | Delta |
### Fixes Applied
### Remaining Opportunities
```

---

## Done Criteria

- [ ] Baseline metrics captured
- [ ] Fixes applied to top bottlenecks
- [ ] Delta verified (Lighthouse ≥95, LCP <2.5s)
- [ ] `docs/performance-report.md` saved
