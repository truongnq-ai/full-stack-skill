---
name: Next.js Styling & UI Performance
description: Zero-runtime CSS strategies (Tailwind) and RSC compatibility.
metadata:
  labels: [nextjs, styling, tailwind, css]
  triggers:
    priority: medium
    confidence: 0.7
    files: ['**/*.css', 'tailwind.config.ts', '**/components/ui/*.tsx']
    keywords: [tailwind, css modules, styled-components, clsx, cn]
workflow_ref: performance
---

# Styling & UI Performance

## **Priority: P1 (HIGH)**

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

Prioritize **Zero-Runtime** CSS for Server Components.

## Library Selection

| Library                    | Verdict            | Reason                                             |
| :------------------------- | :----------------- | :------------------------------------------------- |
| **Tailwind / shadcn**      | **Preferred (P1)** | Zero-runtime, RSC compatible. Best for App Router. |
| **CSS Modules / SCSS**     | **Recommended**    | Scoped, zero-runtime. Good for legacy projects.    |
| **Ant Design**             | **Supported**      | Use with Client Component wrappers for RSCs.       |
| **MUI / Chakra (Runtime)** | **Avoid**          | Forces `use client` widely. Degrades performance.  |

## Library Patterns

For specific library setups, see:

- [references/scss.md](references/scss.md)
- [references/ant-design.md](references/ant-design.md)
- [references/tailwind.md](references/tailwind.md) (Tailwind/shadcn)

## Patterns

1. **Dynamic Classes**: Use `clsx` + `tailwind-merge` (`cn` utility).
   - _Reference_: [Dynamic Classes & Button Example](references/implementation.md)
2. **Font Optimization**: Use `next/font` to prevent Cumulative Layout Shift (CLS).
   - _Reference_: [Font Setup](references/implementation.md)
3. **CLS Prevention**: Always specify `width`/`height` on images.


## References

- [Examples (Input/Output)](references/examples.md)
