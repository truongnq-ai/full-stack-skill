---
description: "Establish Observability: Logging, Alerts, Grafana Dashboards, and Distributed Tracing."
---
# DevOps: Monitor and Observe

> **Trigger**: Use when setting up observability stacks, debugging telemetry issues, or creating new dashboards.
> **Tools**: Browser (Grafana UI), API clients.

## Step 1 - Logging and Aggregation
Configure centralized logging for the target services.
- **Skills**: skills/roles/devops/logging-standards/SKILL.md, skills/roles/devops/monitoring/log-aggregation/SKILL.md

## Step 2 - Distributed Tracing
Instrument applications with distributed tracing headers (e.g., OpenTelemetry).
- **Skills**: skills/roles/devops/distributed-tracing/SKILL.md
- **Fallback**: If tracing instrumentation fails, revert to standard JSON logging.

## Step 3 - Dashboards and Alerts Checkpoint
Build Grafana dashboards and set up actionable alerts.
- **Skills**: skills/roles/devops/monitoring/dashboard-design/SKILL.md, skills/roles/devops/monitoring/alert-setup/SKILL.md
- **Checkpoint**: Show the alert configuration to the user. Ask them to verify threshold levels.

## Step 4 - Output
- **Exit Criteria**: Dashboards are live, alerts route to correct channels, and telemetry flows into the backend.
