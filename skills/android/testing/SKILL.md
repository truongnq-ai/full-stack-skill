---
name: Android Testing
description: Standards for Unit Tests, UI Tests (Compose), and Hilt Integration
metadata:
  labels: [android, testing, junit, compose-test]
  triggers:
    priority: medium
    confidence: 0.7
    files: ['**/*Test.kt', '**/*Rule.kt']
    keywords: ['@Test', 'runTest', 'composeTestRule']
workflow_ref: battle-test
---

# Android Testing Standards

## **Priority: P0**

## Output Template

- **Summary**: <what changed / what was done>
- **Risks**: <known risks or "none">
- **Next Checks**: <tests/verification steps>

## Implementation Guidelines

### Unit Tests

- **Scope**: ViewModels, Usecases, Repositories, Utils.
- **Coroutines**: Use `runTest` (kotlinx-coroutines-test). Use `MainDispatcherRule` to mock Main dispatcher.
- **Mocking**: Use MockK.

### UI Integration Tests (Instrumentation)

- **Scope**: Composable Screens, Navigation flows.
- **Rules**: Use `createAndroidComposeRule` + Hilt (`HiltAndroidRule`).
- **Isolation**: Fake repositories in DI modules (`@TestInstallIn`).

## Anti-Patterns

- **Real Network**: `**No Real APIs**: Always mock network calls.`
- **Flaky Delays**: `**No Thread.sleep**: Use IdlingResource or 'waitUntil'.`

## References

- [Test Rules](references/implementation.md)


## References

- [Examples (Input/Output)](references/examples.md)
