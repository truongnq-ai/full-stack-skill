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

## Anti-Patterns
- Not propagating trace context across all service boundaries.
- Excessive sampling leading to missing critical error traces.
- Logging PII or sensitive data in trace attributes.

## Tools
- OpenTelemetry, Jaeger, Zipkin
- Datadog APM, New Relic, Dynatrace
- AWS X-Ray, GCP Cloud Trace

## Verification
- Generate a synthetic request and verify the trace appears in the APM tool.
- Check that trace IDs are consistently logged across all microservices involved in a transaction.
- Validate sampling rates are configured correctly.
