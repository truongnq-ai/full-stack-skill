---
name: Flutter Design System
description: Enforce strict Design Language System (DLS) adherence. Prevents hardcoded colors, spacing, and typography. Detects and uses project tokens.
metadata:
  labels: [flutter, dls, design-tokens, theme, styling]
  triggers:
    priority: medium
    confidence: 0.7
    files:
      [
        '**/theme/**',
        '**/*_theme.dart',
        '**/*_colors.dart',
        '**/*_dls/**',
        '**/foundation/**',
      ]
    keywords:
      [
        ThemeData,
        ColorScheme,
        AppColors,
        VColors,
        VSpacing,
        AppTheme,
        design token,
      ]
workflow_ref: smart-release
---

# Flutter Design System Enforcement

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

Zero tolerance for hardcoded design values.

## **Phase 0: Context Discovery (MANDATORY)**

Before any UI refactoring, you MUST identify the project's Theme Archetype:

1.  **Check `main.dart`**: Look for `MaterialApp` theme configuration.
2.  **Determine Pattern**:
    - **Theme-Driven (Adaptive)**: If you see `VThemeData(...).toThemeData()` or extensive `ThemeData` overrides, you MUST use `Theme.of(context).textTheme` or `theme.textTheme` for feature code.
    - **Token-Driven (Static)**: Only use static tokens (`VTypography.*`) if there is no global theme bridge or if you are defining the theme itself.

## Guidelines

- **Colors**: Use tokens (`VColors.*`, `AppColors.*`), never `Color(0xFF...)` or `Colors.red`.
- **Spacing**: Use tokens (`VSpacing.*`), never magic numbers like `16` or `24`.
- **Typography**: Prioritize `theme.textTheme.*` for adaptive UI. Use `VTypography.*` tokens only for theme definitions or non-contextual logic. Never use inline `TextStyle`.
- **Borders**: Use tokens (`VBorders.*`), never raw `BorderRadius.`
- **Components**: Use DLS widgets (`VButton`) over raw Material widgets (`ElevatedButton`) if available.

[Detailed Examples](references/usage.md)

## Anti-Patterns

- **No Hex Colors**: `Color(0xFF...)` is strictly forbidden.
- **No Color Enums**: `Colors.blue` is forbidden in UI code.
- **No Magic Spacing**: `SizedBox(height: 10)` is forbidden.
- **No Inline Styles**: `TextStyle(fontSize: 14)` is forbidden.
- **No Raw Widgets**: Don't use `ElevatedButton` when `VButton` exists.

## Related Topics

mobile-ux-core | flutter/widgets | idiomatic-flutter


## References

- [Examples (Input/Output)](references/examples.md)
