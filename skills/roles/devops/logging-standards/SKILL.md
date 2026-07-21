---
name: DevOps Logging Standards
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/devops/logging-standards
description: Structured logging, correlation IDs, and retention.
category: roles
metadata:
  labels: [devops, logging, observability]
  triggers:
    priority: high
    confidence: 0.8
    keywords: [logging, structured logs, correlation id]
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
- Include request_id in every log.
- Avoid logging secrets.

## References
- [Examples (Input/Output)](references/examples.md)

## Anti-Patterns
- Logging unstructured text instead of structured JSON.
- Logging sensitive information (passwords, PII).
- Inconsistent log levels (e.g. using ERROR for informational messages).

## Tools
- ELK Stack (Elasticsearch, Logstash, Kibana)
- Fluentd, Fluent Bit
- Datadog, Splunk
- Promtail, Loki

## Verification
- Verify logs are ingested into the centralized logging system.
- Check that logs are structured correctly.
- Perform a search for sensitive data to ensure it is not being logged.
