---
name: Flutter Localization
description: Standards for multi-language support using easy_localization with CSV or JSON.
metadata:
  labels:
    - localization
    - l10n
    - i18n
    - easy_localization
    - csv
    - flutter
  triggers:
    priority: medium
    confidence: 0.7
    files:
      - '**/assets/translations/*.json'
      - '**/assets/langs/*.csv'
      - main.dart
    keywords:
      - localization
      - multi-language
      - translation
      - tr()
      - easy_localization
      - sheet_loader
workflow_ref: ui-ux-pro-max
---

# Localization

## **Priority: P1 (STANDARD)**

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

Consistent multi-language support using `easy_localization`.

## Format Selection

- **CSV** (Recommended for teams with translators):
  - Non-technical editors can update easily
  - Native Google Sheets compatibility via `sheet_loader_localization`
  - Store in `assets/langs/` (common convention)
- **JSON** (Developer-friendly):
  - Nested structure support (e.g., `items_count.zero`)
  - IDE validation and autocomplete
  - Store in `assets/translations/`

Both formats work identically with `easy_localization`.
## References
- [Examples (Input/Output)](references/examples.md)
- [Notes](references/notes.md)
