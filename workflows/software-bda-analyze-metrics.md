---
description: BDA (Business Data Analyst) analyzes system and business metrics post-release to evaluate success and identify optimization opportunities.
---

# 📊 BDA Analyze Metrics

> **Use this workflow when**: A feature has been released to production and sufficient data has been collected to measure its impact. Trigger: `/software-bda-analyze-metrics`.
>
> **Out of scope**: Does not implement performance fixes — use `/software-dev-optimize-performance`.
>
> **Activates skills**: `skills/roles/bda/metrics-analysis/SKILL.md`, `skills/roles/bda/report-generation/SKILL.md`

---

## Step 1 — Review Success Metrics

Review the original PRD to identify the target KPIs and success metrics for the feature:

```bash
view_file docs/specs/prd-[feature_name].md
```

Extract the baseline numbers and the expected targets.

---

## Step 2 — Data Gathering

Gather data from available analytics platforms, databases, or logs.
This may involve:
- Querying application databases for conversion rates.
- Analyzing monitoring tools (Grafana, Datadog) for system performance, error rates, and load times.
- Checking user behavior analytics (Mixpanel, Google Analytics).

---

## Step 3 — Metrics Analysis

Compare the gathered data against the target KPIs.
1. Did the feature meet its business goals?
2. Are there any unexpected drop-offs in the user funnel?
3. Did the release negatively impact system performance or introduce hidden errors?

---

## Step 4 — Report Generation

Save to `docs/reports/bda-analysis-[feature_name]-[date].md`:

```markdown
## Metrics Analysis — [Feature Name]

### Executive Summary
- Overall success rating (e.g., Met Target, Underperformed, Exceeded).

### KPI Evaluation
- **Metric 1**: Target [X] vs Actual [Y].
- **Metric 2**: Target [X] vs Actual [Y].

### Funnel & Behavior Analysis
- Observations on how users are interacting with the feature.

### System Performance
- Latency, error rates, and infrastructure impact.

### Recommendations for Optimization
- Business adjustments.
- Technical improvements (handover to DEV).
```

---

## Done Criteria

- [ ] `docs/reports/bda-analysis-[feature_name]-[date].md` created
- [ ] Clear recommendations for optimization are provided to the PO/DEV team

> **⏸️ Checkpoint**: Xin phép user trước khi hoàn tất.

> **🔄 Fallback**: Nếu gặp lỗi, log lại chi tiết và hỏi ý kiến user.

> **Required Skill**: [analyze-metrics](file:///D:/GitHub/skill/full-stack-skill/skills/roles/bda/analyze-metrics/SKILL.md)
