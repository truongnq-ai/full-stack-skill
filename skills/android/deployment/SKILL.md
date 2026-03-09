---
name: Android Deployment
description: Standards for App Distribution (Signing, Obfuscation, App Bundles)
metadata:
  labels: [android, deployment, release, proguard]
  triggers:
    files: ['build.gradle.kts', 'proguard-rules.pro']
    keywords: ['signingConfigs', 'proguard', 'minifyEnabled', '.aab']
workflow_ref: smart-release
---

# Android Deployment Standards

## **Priority: P0**

## Output Template

- **Summary**: <what changed / what was done>
- **Risks**: <known risks or "none">
- **Next Checks**: <tests/verification steps>

## Implementation Guidelines

### Build Configuration

- **Minification**: Always enable `isMinifyEnabled = true` and `isShrinkResources = true` for Release builds (R8).
- **Format**: Publish using **App Bundles (.aab)** for Play Store optimization.
- **Signing**: NEVER commit keystores or passwords. Use Environment Variables / Secrets.

### Proguard / R8

- **Rules**: Keep rules minimal. Use annotations (`@Keep`) for reflection-heavy classes instead of broad wildcard rules.
- **Mapping**: Upload `mapping.txt` to Play Console for crash de-obfuscation.

## Anti-Patterns

- **Debug in Release**: `**No Debug Flags**: Ensure debuggable = false.`
- **Hardcoded Secrets**: `**No Secrets in Repo**: Use local.properties or Env Vars.`

## References

- [Signing & R8](references/implementation.md)


## References

- [Examples (Input/Output)](references/examples.md)
