---
name: Flutter Notifications
description: Push notifications and local notifications for Flutter using Firebase Cloud Messaging and flutter_local_notifications.
metadata:
  labels: [flutter, notifications, fcm, firebase, push, local-notifications]
  triggers:
    files: ['**/*notification*.dart', '**/main.dart']
    keywords:
      [
        FirebaseMessaging,
        FlutterLocalNotificationsPlugin,
        FCM,
        notification,
        push,
      ]
workflow_ref: smart-release
---

# Flutter Notifications

## **Priority: P1 (OPERATIONAL)**

## Output Template

- **Summary**: <what changed / what was done>
- **Risks**: <known risks or "none">
- **Next Checks**: <tests/verification steps>

Push and local notifications interactions.

## Guidelines

- **Stack**: Use `firebase_messaging` (Push) + `flutter_local_notifications` (Local/Foreground).
- **Lifecycle**: Handle all 3 states explicitly: Foreground, Background, Terminated.
- **Permissions**: Prime users with a custom dialog explaining benefits _before_ system request.
- **Navigation**: Validate notification payload data strictly before navigating.
- **Badges**: Manually clear iOS app badges when visiting relevant screens.

[Implementation Details](references/implementation.md)

## Anti-Patterns

- **No Unconditional Permission**: Don't ask on startup without context.
- **No Missing State Handlers**: Forgetting `getInitialMessage()` breaks "open from terminated".
- **No Forgotten Badge Clear**: Leaving notifications un-cleared frustrates users.
- **No Direct Navigation**: Parsing JSON payloads without validation leads to crashes.

## Related Topics

flutter-navigation | mobile-ux-core | firebase/fcm


## References

- [Examples (Input/Output)](references/examples.md)
