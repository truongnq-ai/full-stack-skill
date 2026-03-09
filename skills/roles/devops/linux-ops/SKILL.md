---
name: DevOps Linux Ops
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/devops/linux-ops
description: "Linux operations: systemd, logs, processes."
category: roles
metadata:
  labels: [devops, linux, ops]
  triggers:
    priority: medium
    confidence: 0.7
    keywords: [systemd, journalctl, ps, top]
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
- Inspect logs before restart.
- Capture system state (CPU/MEM/DISK).

## References
- [Examples (Input/Output)](references/examples.md)
