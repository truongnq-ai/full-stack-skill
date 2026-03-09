---
name: Flutter Security
description: Security standards for Flutter applications based on OWASP Mobile.
metadata:
  labels: [security, owasp, pii, encryption]
  triggers:
    priority: medium
    confidence: 0.7
    files: ['lib/infrastructure/**', 'pubspec.yaml']
    keywords: [secure_storage, obfuscate, jailbreak, pinning, PII, OWASP]
workflow_ref: deep-security-audit
---

# Mobile Security

## **Priority: P0 (CRITICAL)**

## Output Template

- **Summary**: <what changed / what was done>
- **Risks**: <known risks or "none">
- **Next Checks**: <tests/verification steps>

Standards for basic mobile security and PII protection.

## Implementation Guidelines

- **Secure Storage**: Use `flutter_secure_storage` for tokens/PII. Never use `shared_preferences`.
- **Hardcoding**: Never store API keys or secrets in Dart code. Use `--dart-define` or `.env`.
- **Obfuscation**: Always release with `--obfuscate` and `--split-debug-info`. Note: This is a deterrent, not cryptographic protection. For sensitive logic, move to backend.
- **SSL Pinning**: For high-security apps, use `dio_certificate_pinning`.
- **Root Detection**: Use `flutter_jailbreak_detection` for financial/sensitive applications.
- **PII Masking**: Mask sensitive data (email, phone) in logs and analytics.

## Reference & Examples

For SSL Pinning and Secure Storage implementation details:
See [references/REFERENCE.md](references/REFERENCE.md).
See [references/examples.md](references/examples.md).

## Related Topics

common/security-standards | layer-based-clean-architecture | performance
