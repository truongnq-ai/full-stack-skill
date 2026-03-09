---
name: Routing
description: Standards for Angular Router, Lazy Loading, and Guards.
metadata:
  labels: [angular, routing, guards, lazy-loading]
  triggers:
    priority: medium
    confidence: 0.7
    files: ['*.routes.ts']
    keywords: [angular router, loadComponent, canActivate, resolver]
workflow_ref: smart-release
---

# Routing

## **Priority: P0 (CRITICAL)**

## Output Template

- **Summary**: <what changed / what was done>
- **Risks**: <known risks or "none">
- **Next Checks**: <tests/verification steps>

## Principles

- **Lazy Loading**: Use `loadComponent` for standalone components and `loadChildren` for route files.
- **Functional Guards**: Use function-based guards (`CanActivateFn`) instead of class-based guards (Deprecated).
- **Component Inputs**: Enable `withComponentInputBinding()` to map route params directly to component inputs.

## Guidelines

- **Title Strategy**: Use `TitleStrategy` service to auto-set page titles from route data.
- **Resolvers**: Use `resolve` to pre-fetch critical data before navigation completes, but avoid blocking UI for too long.

## Anti-Patterns

- **Logic in Routes**: Keep route definitions clean. Move logic to Guards or Resolvers.
- **Eager Loading features**: Never direct import feature components in root routes.

## References

- [Routing Patterns](references/routing-patterns.md)


## References

- [Examples (Input/Output)](references/examples.md)
