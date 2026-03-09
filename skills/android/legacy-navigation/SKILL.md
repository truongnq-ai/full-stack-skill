---
name: Android Legacy Navigation
description: Standards for Jetpack Navigation Component (XML) and SafeArgs
metadata:
  labels: [android, navigation, xml, safeargs]
  triggers:
    priority: medium
    confidence: 0.7
    files: ['navigation/*.xml']
    keywords: ['findNavController', 'NavDirections', 'navArgs']
workflow_ref: smart-release
---

# Android Legacy Navigation Standards

## **Priority: P1**

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

## Implementation Guidelines

### Setup

- **Single Activity**: Use one Host Activity with a `NavHostFragment`.
- **SafeArgs**: MANDATORY for passing data between fragments.

### Graph Management

- **Nested Graphs**: Modularize `navigation/` resources (e.g., `nav_auth.xml`, `nav_main.xml`) to keep graphs readable.
- **Deep Links**: Define explicit `<deepLink>` in graph, not AndroidManifest intent filters (Nav handles them).

## Anti-Patterns

- **Bundle Keys**: `**No "strings"**: Use SafeArgs generated classes.`
- **Fragment Transations**: `**No Manual commit()**: Use NavController.`

## References

- [XML Graph & SafeArgs](references/implementation.md)


## References

- [Examples (Input/Output)](references/examples.md)
