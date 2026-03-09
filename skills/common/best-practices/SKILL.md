---
name: Global Best Practices
description: Universal principles for clean, maintainable, and robust code across all environments.
metadata:
  labels: [best-practices, solid, clean-code, architecture]
  triggers:
    priority: medium
    confidence: 0.7
    keywords: [solid, kiss, dry, yagni, naming, conventions]
workflow_ref: deep-security-audit
---

# Global Best Practices

## **Priority: P0 (FOUNDATIONAL)**

## Output Template

- **Summary**: <what changed / what was done>
- **Risks**: <known risks or "none">
- **Next Checks**: <tests/verification steps>

## 🏗 SOLID & Architectural Principles

- **SRP (Single Responsibility)**: One class/function = One reason to change. Separate business logic from delivery (UI/API).
- **OCP (Open-Closed)**: Extended via composition/interfaces; closed to source modification.
- **LSP (Liskov)**: Subtypes must be transparently replaceable for base types. Use `@override` carefully.
- **ISP (Interface Segregation)**: Granular interfaces > "Fat" general-purpose ones.
- **DIP (Dependency Inversion)**: Depend on abstractions (interfaces), not concretions. Use DI containers.
- **Modular Design**: Break complex systems into small, independent, and swappable components to reduce cognitive load.

## 🧹 Clean Code Standards (KISS/DRY/YAGNI)

- **KISS**: Favor readable, simple logic over "clever" one-liners.
- **DRY**: Abstract repeated logic into reusable utilities. No magic numbers/strings.
- **YAGNI**: Implement only current requirements. Avoid "just in case" abstractions.
- **Meaningful Names**: Use intention-revealing names (`isUserAuthenticated` > `checkUser`).
- **Naming Conventions**: Follow language-specific standards:
  - `camelCase`: Variables/Functions (JS/Java/Dart).
  - `snake_case`: Variables/Functions (Python/Ruby).
  - `PascalCase`: Classes/Types (universal).
  - `kebab-case`: Files/CSS/URLs.
- **Function Size**: Keep functions small (target < 30 lines) and single-responsibility.
- **File Size**: Maintain manageable file lengths to reduce cognitive load and agent noise:
  - **Logic/Services**: Target < 600 LOC. (Critical Breach: 800)
  - **Utilities/Helpers**: Target < 400 LOC. (Critical Breach: 600)
  - **Unit Tests**: Target < 1200 LOC.
  - **Integration Tests**: Target < 2000 LOC.
- **Guard Clauses**: Prefer early returns to avoid deep nesting (Pyramid of Doom).
- **Comments**: Explain **why**, not **what**. Refactor unclear code before commenting.

## 🛡 Security & Performance Foundations

- **Sanitization**: Always validate external input (API, User, Env) to prevent Injection/XSS.
- **Early Return**: Guard clauses first to minimize nesting and improve readability.
