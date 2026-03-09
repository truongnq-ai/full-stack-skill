---
name: iOS App Lifecycle
description: Standards for AppDelegate, SceneDelegate, Deep Linking, and Background Tasks.
metadata:
  labels: [ios, lifecycle, scenedelegate, background-tasks]
  triggers:
    files: ['AppDelegate.swift', 'SceneDelegate.swift']
    keywords:
      [
        didFinishLaunchingWithOptions,
        willConnectTo,
        backgroundTask,
        Shortcut,
        UserActivity,
      ]
workflow_ref: smart-release
---

# iOS App Lifecycle Standards

## **Priority: P0**

## Output Template

- **Summary**: <what changed / what was done>
- **Risks**: <known risks or "none">
- **Next Checks**: <tests/verification steps>

## Implementation Guidelines

### App & Scene Delegate

- **SceneDelegate**: Use for UI windows and scene-specific state in iOS 13+.
- **AppDelegate**: Focus on app-wide setup (DI, Analytics, Push notification registration).
- **Slim Delegates**: Move initialization logic to dedicated `Bootstrapper` or `AppCoordinator`.

### Deep Linking

- **Universal Links**: Prefer over custom URL schemes. Handle via `scene(_:continue:userActivity:)`.
- **Handling logic**: Routing should be handled by the Root Coordinator to navigate to specific screens.

### Background Tasks

- **Background Fetch**: Use `BGTaskScheduler` for periodically refreshing data.
- **Expiration**: Handle `expirationHandler` to avoid app kill by the system.

## Anti-Patterns

- **Fat AppDelegate**: `**No complex logic in didFinishLaunching**: Use a Bootstrapper service.`
- **Direct UI in AppDelegate**: `**No UIWindow setup in AppDelegate**: Use SceneDelegate for iOS 13+.`
- **Blocking Launch**: `**No synchronous network calls in launch**: Move to background thread or defer.`

## References

- [Lifecycle & Background Tasks](references/implementation.md)


## References

- [Examples (Input/Output)](references/examples.md)
