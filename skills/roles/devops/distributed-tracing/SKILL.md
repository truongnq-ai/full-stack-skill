---
name: DevOps Distributed Tracing
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/devops/distributed-tracing
description: Tracing standards across services (OpenTelemetry).
category: roles
metadata:
  labels: [devops, tracing, observability]
  triggers:
    priority: medium
    confidence: 0.7
    keywords: [tracing, opentelemetry, spans]
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
- Propagate trace_id across services.
- Sample intelligently to reduce cost.

## References
- [Examples (Input/Output)](references/examples.md)
