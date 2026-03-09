---
name: iOS Navigation
description: SwiftUI navigation and deep linking using NavigationStack and Universal Links.
metadata:
  labels: [ios, swiftui, navigation, deep-linking, universal-links]
  triggers:
    priority: medium
    confidence: 0.7
    files: ['**/*View.swift', '**/*App.swift']
    keywords:
      [
        NavigationStack,
        NavigationLink,
        onOpenURL,
        universalLink,
        NSUserActivity,
      ]
workflow_ref: smart-release
---

# iOS Navigation (SwiftUI)

## **Priority: P2 (OPTIONAL)**

SwiftUI path-based navigation and deep linking.

## Guidelines

- **Stack**: Use `NavigationStack` (iOS 16+) with `NavigationPath` for programmatic control.
- **Deep Links**: Handle `onOpenURL` at the Root View (`WindowGroup`).
- **Universal Links**: Configure Associated Domains (`applinks`) in Entitlements.
- **Tabs**: Maintain separate `NavigationStack` instances per `TabItem`.

[Navigation Patterns](references/swiftui-navigation.md)

## Anti-Patterns

- **No Force Unwrapping**: Use `guard let` when parsing URL components.
- **No Broken Back Stack**: Ensure valid path state before appending destinations.
- **No Missing Validation**: Check content availability before deep-link navigation.

## Related Topics

ios-design-system | ios-notifications | mobile-ux-core


## References

- [Examples (Input/Output)](references/examples.md)
