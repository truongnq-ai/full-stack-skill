---
name: Android Background Work
description: Standards for WorkManager and Background Processing
metadata:
  labels: [android, background, workmanager]
  triggers:
    priority: medium
    confidence: 0.7
    files: ['**/*Worker.kt']
    keywords: ['CoroutineWorker', 'WorkManager', 'doWork']
workflow_ref: smart-release
---

# Android Background Work Standards

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

### WorkManager

- **CoroutineWorker**: Use for all background tasks.
- **Constraints**: Be explicit (Require Network, Charging).
- **Hilt**: Use `@HiltWorker` for DI integration.

### Foreground Services

- **Only When Necessary**: Use generating visible notifications only for tasks the user is actively aware of (Playback, Calls, Active Navigation). Otherwise use WorkManager.

## Anti-Patterns

- **IntentService**: `**Deprecated**: Use WorkManager.`
- **Short Jobs**: `**No short background jobs**: Use standard Coroutines in VM.`

## References

- [Worker Template](references/implementation.md)


## References

- [Examples (Input/Output)](references/examples.md)
