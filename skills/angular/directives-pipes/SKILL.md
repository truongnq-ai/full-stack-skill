---
name: Directives & Pipes
description: Composition patterns using HostDirectives and Pure Pipes.
metadata:
  labels: [angular, directives, pipes, composition]
  triggers:
    priority: medium
    confidence: 0.7
    files: ['**/*.directive.ts', '**/*.pipe.ts']
    keywords: [hostDirectives, PipeTransform, pure]
workflow_ref: smart-release
---

# Directives & Pipes

## **Priority: P2 (MEDIUM)**

## Principles

- **Composition**: Use `hostDirectives` to compose behaviors onto components/directives without inheritance.
- **Pure Pipes**: Pipes must be `pure: true` (default). They cache results based on input reference.
- **Directive Logic**: Encapsulate reusable DOM manipulation or behavioral logic in Directives (e.g., `appFocusTrap`, `appTooltip`).

## Guidelines

- **Signal Inputs**: Directives also support signal inputs.
- **Standalone**: All Pipes and Directives must be standalone.

## References

- [Composition](references/composition.md)


## References

- [Examples (Input/Output)](references/examples.md)
