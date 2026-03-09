---
name: DevOps Backup & Recovery
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/devops/backup-recovery
description: Backup and disaster recovery practices (RPO/RTO).
category: roles
metadata:
  labels: [devops, backup, recovery]
  triggers:
    priority: high
    confidence: 0.8
    keywords: [backup, recovery, rpo, rto]
workflow_ref: orchestrate
---

## **Priority: P1 (OPERATIONAL)**

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

## Core Rules
- Define RPO/RTO.
- Test restores regularly.

## References
- [Examples (Input/Output)](references/examples.md)
