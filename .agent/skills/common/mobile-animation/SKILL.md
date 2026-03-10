---
name: Mobile Animation
description: Motion design principles for mobile apps. Covers timing curves, transitions, gestures, and performance-conscious animations. Activates on mobile UI files with animation-related code.
metadata:
  labels: [mobile, animation, motion, transitions, ux]
  triggers:
    files: ['**/*_page.dart', '**/*_screen.dart', '**/*.swift', '**/*Activity.kt', '**/*Screen.tsx']
    keywords: [Animation, AnimationController, Animated, MotionLayout, transition, gesture, easing, opacity, transform, hero, SharedElement]
    negative: ["user asks for layout/UI structure without animation — use mobile-ux-core", "user asks for backend — out of scope"]
---

# Mobile Animation

## **Priority: P1 (OPERATIONAL)**

**This skill does NOT**: handle layout structure or touch targets — use `mobile-ux-core` for those. Does not cover web CSS animations — use `ui-ux-pro-max` workflow.

**Compatible skills**: `mobile-ux-core` (interaction layer), `performance-engineering` (60fps validation).

## Timing Standards

| Duration | Use Case |
|----------|---------|
| 100–150ms | Toggles, press states |
| 250–350ms | Navigation, modals |
| 400–600ms | Shared elements, complex state |

> **Rule**: Never exceed 600ms. Animations >600ms feel slow on mobile.

## Guidelines

- **Easing**: `Curves.fastOutSlowIn` (Material) or `easeInOut` (iOS). Never `linear`.
- **Performance**: Animate `transform` (scale/translate) and `opacity` only. Never `width`/`height`.
- **Gestures**: `onPanUpdate` / `interactivePopGestureRecognizer` for physics-based UX.
- **Optimization**: `FadeTransition`/`SlideTransition` over `AnimatedBuilder` for simple cases.

> To load animation patterns: `view_file .agent/skills/common/mobile-animation/references/animation-patterns.md`

> **Fallback**: If platform-specific animation API unavailable, use CSS transitions with `transform` and `opacity` only.

## 🚫 Anti-Patterns

**`No Linear Easing`**: `linear` feels robotic. Use platform easing curves.

**`No Layout Animation`**: Never animate `width`, `height`, or `padding` — triggers layout recalculation.

**`No Controller Leak`**: Always `dispose()` AnimationControllers in `dealloc`/`dispose`.

**`No UI Thread Blocking`**: Move heavy calculation out of animation frames.

**`No >600ms Animation`**: Feels slow. Split into micro-animations if needed.

## ✅ Verification Checklist

- [ ] All animations use easing curves (no `linear`)
- [ ] Only `transform`/`opacity` animated (no layout properties)
- [ ] AnimationControllers disposed in cleanup method
- [ ] Animation duration ≤600ms
- [ ] 60fps confirmed on target device (no frame drops in debug overlay)

## 📚 References

- [Animation Patterns](references/animation-patterns.md)
