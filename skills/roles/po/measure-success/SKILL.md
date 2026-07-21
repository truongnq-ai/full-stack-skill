---
name: po-measure-success
description: Product Owner defines, tracks, and reports on product success metrics — OKRs, KPIs, feature adoption rates, and business impact analysis.
category: roles
metadata:
  labels: [po, metrics, okr, kpi, success, analytics, measurement]
  triggers:
    priority: high
    confidence: 0.85
    keywords: [measure success, track metrics, okr, kpi, feature adoption, business impact, success criteria]
    file_patterns: ["metrics.md", "okr.md", "success-report.md"]
    context: ["user asks to measure feature success", "user asks to define KPIs or OKRs"]
    negative: ["user asks to write code", "user asks to debug"]
---

# 📊 Product Owner — Measure Success

> **Use this skill when**: PO needs to define success metrics for a feature/product, track adoption after launch, build OKR/KPI dashboards, or generate business impact reports.
>
> **Out of scope**: Technical performance profiling (use `dev/performance-guardrails`). A/B test implementation (use engineering skills). Financial accounting or revenue forecasting beyond product scope.

---

## **Priority: P1 (OPERATIONAL)**

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

---

## 🔄 Workflow

### Step 1 — Define Success Criteria
Before launch, the PO must define measurable success criteria tied to the PRD goals:

1. **Map PRD Goals → Metrics**: Each product goal must have ≥1 measurable metric.
2. **SMART Criteria**: Every metric must be Specific, Measurable, Achievable, Relevant, Time-bound.
3. **Baseline Capture**: Document the current state before the feature launches.

```markdown
| Goal | Metric | Baseline | Target | Deadline |
|------|--------|----------|--------|----------|
| Reduce churn | Monthly churn rate | 8% | <5% | Q3 2025 |
| Improve onboarding | Signup-to-activation rate | 35% | >55% | 30 days post-launch |
```

### Step 2 — Choose Measurement Framework

Select one or combine:
- **OKR (Objectives & Key Results)**: For quarterly strategic goals.
- **HEART (Happiness, Engagement, Adoption, Retention, Task Success)**: For user-centric products.
- **Pirate Metrics (AARRR)**: Acquisition, Activation, Retention, Referral, Revenue.

> **⏸️ Checkpoint**:
> "I have drafted the success metrics framework. Review and confirm before proceeding to tracking setup. (Y/N)"

### Step 3 — Set Up Tracking Plan
Create `docs/metrics/tracking-plan.md`:
- List every event/metric to be tracked.
- Map each to the analytics tool (GA4, Mixpanel, Amplitude, custom DB queries).
- Define who is responsible for instrumentation (Dev) vs. analysis (PO/BDA).

### Step 4 — Post-Launch Measurement
At defined intervals (7-day, 30-day, 90-day post-launch):
1. Collect data against baselines.
2. Calculate % change and trend direction.
3. Flag any metric that is >20% below target as 🔴 Critical.

### Step 5 — Generate Success Report
Output a structured report to `docs/metrics/success-report-YYYY-MM-DD.md`:

```markdown
# 📊 Success Report — [Feature Name]

## Summary
- Launch Date: YYYY-MM-DD
- Measurement Period: [7/30/90] days

## Results
| Metric | Baseline | Target | Actual | Status |
|--------|----------|--------|--------|--------|
| Churn rate | 8% | <5% | 4.2% | 🟢 Met |
| Activation | 35% | >55% | 42% | 🔴 Below |

## Insights & Recommendations
- [Actionable insight 1]
- [Actionable insight 2]
```

---

## 🚫 Anti-Patterns
- **Vanity Metrics**: Tracking page views or total signups without context (e.g., active users, retention). These numbers look good but don't indicate real product health.
- **No Baseline**: Measuring "improvement" without capturing the pre-launch state makes the data meaningless.
- **Metric Overload**: Tracking >10 KPIs dilutes focus. Limit to 3-5 core metrics per feature.
- **Post-hoc Goal Setting**: Defining success criteria AFTER seeing the data to make results look favorable.
- **Ignoring Negative Signals**: Cherry-picking only the metrics that improved while ignoring degradation elsewhere.

---

## 🛠️ Tools
- Google Analytics 4, Mixpanel, Amplitude (product analytics)
- Looker, Metabase, Google Data Studio (dashboards)
- Jira, Linear (linking metrics to epics/stories)
- `view_file`, `write_to_file` (for file-based reports)
- Mermaid (for trend charts in markdown)

---

## ⚠️ Error Handling

| Issue | Cause | Fallback Action |
|-------|-------|-----------------|
| No analytics data available | Instrumentation not deployed | Document as "Data Pending" and set a follow-up date |
| Metric shows unexpected spike | Bot traffic or data pipeline error | Cross-validate with a secondary data source before reporting |
| Baseline missing | Feature launched before metrics were defined | Use earliest available data point as proxy baseline, note the gap |

---

## ✅ Verification
- [ ] Every PRD goal has ≥1 mapped, measurable metric.
- [ ] All metrics follow SMART criteria.
- [ ] Baselines are captured before launch.
- [ ] Tracking plan is documented and shared with engineering.
- [ ] Success report is generated at each measurement interval.
- [ ] Metrics below target are flagged with recommended actions.

---

## 📚 References
- [Google HEART Framework](https://research.google/pubs/pub36299/)
- [Pirate Metrics (AARRR)](https://www.productplan.com/glossary/aarrr-framework/)
- [What Matters — OKR Framework](https://www.whatmatters.com/faqs/okr-meaning-definition-example)
- [Amplitude — North Star Metric](https://amplitude.com/blog/north-star-metric)
