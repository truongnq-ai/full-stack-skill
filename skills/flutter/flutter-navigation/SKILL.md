---
name: Flutter Navigation
description: Flutter navigation patterns including go_router, deep linking, and named routes for Flutter apps.
metadata:
  labels:
    - flutter
    - navigation
    - routing
    - deep-linking
    - go-router
    - flutter-navigation
  triggers:
    priority: medium
    confidence: 0.7
    files:
      - '**/*_route.dart'
      - '**/*_router.dart'
      - '**/main.dart'
    keywords:
      - Navigator
      - GoRouter
      - routes
      - deep link
      - go_router
      - AutoRoute
workflow_ref: ui-ux-pro-max
---

# Flutter Navigation

## **Priority: P1 (OPERATIONAL)**

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

Navigation and routing for Flutter apps using `go_router` or named routes.

## Guidelines

- **Package**: Use `go_router` for modern, declarative routing.
- **Deep Linking**: Configure `AndroidManifest.xml` and `Info.plist` for URL schemes.
- **Validation**: Validate parameters in `redirect` logic before navigation.
- **Stateful Tabs**: Use `IndexedStack` to preserve state in bottom navigation.

[Routing Patterns & Examples](references/routing-patterns.md)

## Anti-Patterns

- **No Manual URL Parsing**: Use `go_router` parsing, never `Uri.parse` manually.
- **No Stateless Tabs**: `Scaffold` body switching loses state; use `IndexedStack`.
- **No Unvalidated Deep Links**: Always check if IDs exist in `redirect`.
- **No Hardcoded Routes**: Use constants (e.g., `Routes.home`) or code generation.

## Related Topics

flutter-design-system | flutter-notifications | mobile-ux-core


## References

- [Examples (Input/Output)](references/examples.md)
