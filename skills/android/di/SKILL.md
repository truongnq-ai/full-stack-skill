---
name: Android Dependency Injection (Hilt)
description: Standards for Hilt Setup, Scoping, and Modules
metadata:
  labels: [android, di, hilt, dagger]
  triggers:
    priority: medium
    confidence: 0.7
    files: ['**/*Module.kt', '**/*Component.kt']
    keywords: ['@HiltAndroidApp', '@Inject', '@Provides', '@Binds']
workflow_ref: smart-release
---

# Android Dependency Injection (Hilt)

## **Priority: P0**

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

- **App**: Must annotate `Application` class with `@HiltAndroidApp`.
- **Entries**: Annotate Activities/Fragments with `@AndroidEntryPoint`.

### Modules

- **Binding**: Use `@Binds` (abstract class) over `@Provides` when possible (smaller generated code).
- **InstallIn**: Be explicit (`SingletonComponent`, `ViewModelComponent`).

### Construction

- **Constructor Injection**: Prefer over Field Injection (`@Inject constructor(...)`).
- **Assisted Injection**: Use for runtime parameters (`@AssistedInject`).

## Anti-Patterns

- **Component Manual Creation**: `**No Manual Dagger**: Use Hilt Standard.`
- **Field Inject in Logic**: `**No Field Inject**: Only in Android Components.`

## References

- [Module Templates](references/files.md)


## References

- [Examples (Input/Output)](references/examples.md)
