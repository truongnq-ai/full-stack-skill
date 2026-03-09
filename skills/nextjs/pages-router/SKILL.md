---
name: Next.js Pages Router & Architecture
description: Legacy routing, getServerSideProps conventions, and strict architectural constraints (FSD).
metadata:
  labels: [nextjs, routing, pages-router, architecture, legacy, react]
  triggers:
    priority: medium
    confidence: 0.7
    files: ['pages/**/*.tsx', 'pages/**/*.ts']
    keywords:
      [Pages Router, getServerSideProps, getStaticProps, _app, useRouter, FSD]
workflow_ref: smart-release
---

# Next.js Pages Router (Legacy)

## **Priority: P0 (CRITICAL)**

## Output Template

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

- **Summary**: <what changed / what was done>
- **Risks**: <known risks or "none">
- **Next Checks**: <tests/verification steps>

> [!IMPORTANT]
> The project uses Next.js **Pages Router** (`pages/` directory). Do NOT use App Router features (`app/` directory, React Server Components, `use server`, `use client`).

## Project Structure & Architecture

Keep files in `pages/` extremely thin. They should purely import assembled pages from business logic layers (like `src/features/` or `src/components/`).

```text
/
├── pages/                    # Routing layer (Keep extremely thin)
│   ├── _app.tsx              # Global setup & Providers
│   ├── _document.tsx         # HTML skeleton (Server only)
│   └── index.tsx             # Thin wrapper importing a feature component
└── src/
    └── features/             # Business logic & domain components
```

- **Component Limits**: Extract complex logic if a UI component exceeds `500` lines.
- **Logic Leakage**: Do not put massive business logic inside UI components. Extract to hooks or services.

## Routing Conventions

- **File-System Routing**: Any `.tsx` or `.jsx` file inside `pages/` becomes a distinct route (`pages/about.tsx` -> `/about`).
- **Dynamic Routes**: Use brackets `[id].tsx` (`pages/posts/[id].tsx` -> `/posts/1`).
- **Catch-All Routes**: `[...slug].tsx` (`pages/shop/[...slug].tsx` -> `/shop/clothes/shirts`).
- **API Routes**: Code inside `pages/api/` runs strictly on the server and is not bundled with client code.

## Data Fetching & State

Do not use modern native `fetch({ cache })` caching.
