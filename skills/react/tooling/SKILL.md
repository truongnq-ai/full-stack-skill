---
name: React Tooling
description: Debugging, build analysis, and ecosystem tools.
metadata:
  labels: [react, tooling, debug, performance]
  triggers:
    priority: medium
    confidence: 0.7
    files: ['package.json']
    keywords: [devtool, bundle, strict mode, profile]
workflow_ref: performance
---

# React Tooling

## **Priority: P2 (OPTIONAL)**

Tools for analysis and debugging.

## Implementation Guidelines

- **DevTools**: Use "Highlight Updates" to spot re-renders.
- **Debugger**: `useDebugValue` for custom hooks.
- **Performance**: `why-did-you-render` to catch wasted renders.
- **Bundle**: `source-map-explorer` or `bundle-visualizer`.
- **Linting**: `eslint-plugin-react-hooks` (Errors) + `react-refresh`.
- **Strict Mode**: Enable for double-invoke checks (effects/reducers).

## Code

```tsx
// Debugging Hooks
useDebugValue(isOnline ? 'Online' : 'Offline');

// why-did-you-render
if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}
```


## References

- [Examples (Input/Output)](references/examples.md)
