---
name: Mobile UX Core
description: Universal mobile UX principles for touch-first interfaces. Enforces touch targets, safe areas, keyboard handling, and platform-specific interaction patterns.
metadata:
  labels: [mobile, ux, design, accessibility, cross-platform]
  triggers:
    files: ['**/*_page.dart', '**/*_screen.dart', '**/*_view.dart', '**/*.swift', '**/*Activity.kt', '**/*Screen.tsx']
    keywords: [mobile, responsive, SafeArea, touch, gesture, viewport, keyboard, insets, notch, bottom bar, haptic]
    negative: ["user asks for animation — use mobile-animation skill", "user asks for web layout — use ui-ux-pro-max workflow"]
---

# Mobile UX Core

## **Priority: P0 (CRITICAL)**

**This skill does NOT**: handle animations — use `mobile-animation` for motion design. Web layout design belongs to `ui-ux-pro-max` workflow.

**Compatible skills**: `mobile-animation` (motion layer), `performance-engineering` (rendering performance).

## Touch & Layout Guidelines

- **Touch Targets**: Minimum 44×44pt (iOS) / 48×48dp (Android). Add padding if visual element is smaller.
- **Safe Areas**: Wrap root content in `SafeArea`/`WindowInsets`. No content behind notch or home indicator.
- **Typography**: Minimum 16sp body text. Line height 1.5×. Never clip text.
- **Keyboards**: Auto-scroll inputs when keyboard appears. Set correct `InputType` (email/number/phone).

## Code Examples

```dart
// ✅ Correct Touch Target
IconButton(icon: Icon(Icons.close), padding: EdgeInsets.all(12))

// ❌ Too Small — no visible touch area
Icon(Icons.close, size: 16)
```

> **Fallback**: If `SafeArea` widget unavailable, manually apply `MediaQuery.of(context).padding` insets.

## Platform Conventions

- **Android**: Material Design components, ripple feedback, bottom navigation.
- **iOS**: Cupertino components, 44pt back swipe target, `interactivePopGestureRecognizer`.
- **Cross-platform**: Never use hover effects — mobile has no cursor. Use pressed states.

## Interaction Standards

- **Active States**: Every tappable element has a pressed/active visual response.
- **Haptics**: Short haptic on confirm actions. No haptics on navigation.
- **Scroll**: `physics: BouncingScrollPhysics` (iOS), `ClampingScrollPhysics` (Android) per platform.

## 🚫 Anti-Patterns

**`No Hover Effects`**: Mobile has no cursor. Replace hover with pressed state.

**`No Tiny Targets`**: All tappable elements ≥44pt. Add invisible padding if needed.

**`No Fixed Bottom Elements`**: Account for Home Indicator (iOS) and keyboard (both platforms).

**`No OS Mix`**: Use Material on Android, Cupertino on iOS. Never swap platform conventions.

**`No Text Clipping`**: Never constrain text height. Use `maxLines` + `overflow: TextOverflow.ellipsis`.

## ✅ Verification Checklist

- [ ] All touch targets ≥44×44pt confirmed
- [ ] Content wrapped in SafeArea — no content behind notch/home indicator
- [ ] Keyboard shows/hides without breaking layout (test on physical device)
- [ ] No hover effects present
- [ ] Platform conventions used correctly (Material/Cupertino)

## 📚 References

- [Mobile Animation](../mobile-animation/SKILL.md)
- [Performance Engineering](../performance-engineering/SKILL.md)
