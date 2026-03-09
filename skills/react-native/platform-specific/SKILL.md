---
name: React Native Platform-Specific Code
description: Handling iOS and Android differences with Platform API and native modules.
metadata:
  labels:
    - react-native
    - platform
    - ios
    - android
    - native-modules
    - platform-specific
  triggers:
    priority: medium
    confidence: 0.7
    files:
      - '**/*.tsx'
      - '**/*.ts'
      - '**/*.ios.*'
      - '**/*.android.*'
    keywords:
      - Platform
      - Platform.select
      - native-module
      - ios
      - android
workflow_ref: smart-release
---

# React Native Platform-Specific Code

## **Priority: P1 (OPERATIONAL)**

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

## Platform Detection

```tsx
import { Platform } from 'react-native';

// Simple Check
if (Platform.OS === 'ios') {
  // iOS-specific code
}

// Object Selection
const styles = Platform.select({
  ios: { paddingTop: 20 },
  android: { paddingTop: 0 },
## References
- [Examples (Input/Output)](references/examples.md)
- [Notes](references/notes.md)
