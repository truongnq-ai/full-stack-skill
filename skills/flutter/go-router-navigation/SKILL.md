---
name: Flutter GoRouter Navigation
description: Typed routes, route state, and redirection using go_router.
metadata:
  labels:
    - navigation
    - go-router
    - routing
    - flutter
    - go-router-navigation
  triggers:
    priority: medium
    confidence: 0.7
    files:
      - '**/router.dart'
      - '**/app_router.dart'
    keywords:
      - GoRouter
      - GoRoute
      - StatefulShellRoute
      - redirection
      - typed-routes
workflow_ref: deep-security-audit
---

# GoRouter Navigation

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

Type-safe deep linking and routing system using `go_router` and `go_router_builder`.

## Structure

```text
core/router/
├── app_router.dart # Router configuration
└── routes.dart # Typed route definitions (GoRouteData)
```

## Implementation Guidelines

- **Typed Routes**: Always use `GoRouteData` from `go_router_builder`. Never use raw path strings.
- **Root Router**: One global `GoRouter` instance registered in DI.
- **Sub-Routes**: Nest related routes using `TypedGoRoute` and children lists.
- **Redirection**: Handle Auth (Login check) in the `redirect` property of the `GoRouter` config.
- **Parameters**: Use `@TypedGoRoute` to define paths with `:id` parameters.
- **Transitions**: Define standard transitions (Fade, Slide) in `buildPage`.
- **Navigation**: Use `MyRoute().go(context)` or `MyRoute().push(context)`.

## Code

```dart
// Route Definition
@TypedGoRoute<HomeRoute>(path: '/')
class HomeRoute extends GoRouteData {
  @override
  Widget build(context, state) => const HomePage();
}

// Router Config
final router = GoRouter(
  routes: $appRoutes,
  redirect: (context, state) {
    if (notAuthenticated) return '/login';
    return null;
  },
);
```

## Related Topics

layer-based-clean-architecture | auto-route-navigation | security


## References

- [Examples (Input/Output)](references/examples.md)
