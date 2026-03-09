---
name: React Component Patterns
description: Modern React component architecture and composition patterns.
metadata:
  labels: [react, components, composition, patterns]
  triggers:
    priority: medium
    confidence: 0.7
    files: ['**/*.jsx', '**/*.tsx']
    keywords: [component, props, children, composition, hoc, render-props]
workflow_ref: performance
---

# React Component Patterns

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

Standards for building scalable, maintainable React components.

## Implementation Guidelines

- **Function Components**: Only hooks. No classes.
- **Composition**: Use `children` prop. Avoid inheritance.
- **Props**: Explicit TS interfaces. Destructure in params.
- **Boolean Props**: Shorthand `<Cmp isVisible />` vs `isVisible={true}`.
- **Imports**: Group: `Built-in` -> `External` -> `Internal` -> `Styles`.
- **Error Boundaries**: Wrap app/features with `react-error-boundary`.
- **Size**: Small (< 250 lines). One component per file.
- **Naming**: `PascalCase` components. `use*` hooks.
- **Exports**: Named exports only.
- **Conditionals**: Ternary (`Cond ? <A/> : <B/>`) over `&&` for rendering consistency.
- **Hoisting**: Extract static JSX/Objects outside component to prevent recreation.

## Anti-Patterns

- **No Classes**: Use hooks.
- **No Prop Drilling**: Use Context/Zustand.
- **No Nested Definitions**: Define components at top level.
- **No Index Keys**: Use stable IDs.
- **No Inline Handlers**: Define before return.

## Reference & Examples

See [references/patterns.md](references/patterns.md) for Composition, Compound Components, and Render Props examples.

## Related Topics

hooks | state-management | performance


## References

- [Examples (Input/Output)](references/examples.md)
