---
name: DevOps Release Strategy
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/devops/release-strategy
description: Release patterns, versioning, and rollback.
category: roles
metadata:
  labels: [devops, release, versioning]
  triggers:
    priority: high
    confidence: 0.8
    keywords: [release, version, rollback]
workflow_ref: smart-release
---

## **Priority: P1 (OPERATIONAL)**

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

## Core Rules
- Tag releases.
- Document rollback steps.

## References
- [Examples (Input/Output)](references/examples.md)

## Anti-Patterns
- Releasing features without the ability to roll them back.
- Releasing large batches of changes infrequently.
- Not having a clear communication plan for releases.

## Tools
- LaunchDarkly, Split (Feature Flags)
- Argo Rollouts
- Spinnaker

## Verification
- Perform a canary release and verify traffic shifting.
- Test a feature flag toggle to enable/disable a feature.
- Verify release notes are automatically generated.
