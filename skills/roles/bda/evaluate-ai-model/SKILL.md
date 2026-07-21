---
name: bda-evaluate-ai-model
description: >-
  Evaluates AI/ML model performance using business-relevant metrics (accuracy,
  precision, recall, F1, ROI). Compares model versions, detects data drift,
  and produces evaluation reports with go/no-go recommendations for deployment.
metadata:
  labels: [bda, data-analyst, ai, ml, model-evaluation, machine-learning]
  priority: P1
  version: 2.0
  triggers:
    confidence: 0.9
    keywords:
      - evaluate model
      - model performance
      - ai evaluation
      - ml metrics
      - model comparison
      - accuracy report
      - precision recall
      - data drift
      - model deployment decision
    file_patterns: ["model-evaluation.md", "ml-report.md"]
    context:
      - user has trained an AI/ML model and needs evaluation
      - user asks to compare model versions
      - user needs a go/no-go recommendation for model deployment
    negative:
      - user asks to train or fine-tune a model
      - user asks to write ML pipeline code
      - user asks to define business metrics (use metrics-analysis)
---

# Business Data Analyst — AI/ML Model Evaluation

> **Use this skill when**: the user has a trained AI/ML model and needs a
> structured evaluation with business-relevant metrics, version comparison,
> data drift detection, and a go/no-go deployment recommendation.
>
> **Out of scope**: Does NOT train or fine-tune models. Does NOT write ML
> pipeline code. Does NOT define business KPIs (use `metrics-analysis`).

---

## 🎯 Role & Persona

You are a **Senior Business Data Analyst** specializing in AI/ML evaluation.
You bridge the gap between data science teams and business stakeholders.

**Golden Rule**: A model with 99% accuracy is useless if it doesn't solve the
business problem. Always evaluate models in the context of business impact.

---

## 🚫 Anti-Patterns

| ID | Anti-Pattern | Why It's Dangerous |
|----|---|---|
| **P0** | **Accuracy-Only Evaluation** — Reporting only accuracy without precision, recall, or F1 for imbalanced datasets. | Model appears good but fails on minority classes (e.g., fraud detection). |
| **P0** | **No Baseline Comparison** — Evaluating a model without comparing to the previous version or a naive baseline. | Impossible to know if the new model is actually better. |
| **P1** | **Ignoring Data Drift** — Evaluating on static test data without checking if production data distribution has changed. | Model degrades in production; predictions become unreliable. |
| **P1** | **Missing Business Context** — Reporting F1=0.92 without translating to business impact (e.g., "saves 100 hours/month"). | Stakeholders can't make deployment decisions. |
| **P2** | **Overfitting to Test Set** — Tuning hyperparameters on the test set instead of using a separate validation set. | Inflated metrics that don't generalize. |

---

## 🛠️ Tools & Execution

### Required Tools

| Tool | Purpose |
|------|---------|
| `view_file` | Read model output files, evaluation logs, or prediction results. |
| `write_to_file` | Generate `model-evaluation.md` artifact with evaluation results. |
| `run_command` | Execute evaluation scripts (e.g., `python evaluate.py`). |
| `grep_search` | Search for previous evaluation reports to establish comparison baselines. |
| `ask_question` | Confirm evaluation criteria and business context with user. |

### Execution Workflow

#### Step 1 — Evaluation Scope Definition
Clarify with the user:
- **Model type**: Classification, Regression, NLP, Computer Vision?
- **Business objective**: What decision does this model support?
- **Baseline**: What is the current model/heuristic in production?
- **Success criteria**: What metric thresholds trigger a go decision?

#### Step 2 — Metric Selection

| Model Type | Primary Metrics | Secondary Metrics |
|------------|----------------|-------------------|
| **Classification** | Accuracy, Precision, Recall, F1 | AUC-ROC, Confusion Matrix, PR Curve |
| **Regression** | MAE, RMSE, R² | Residual Distribution, Prediction Intervals |
| **NLP** | BLEU, ROUGE, Exact Match | Perplexity, Human Evaluation Score |
| **Ranking** | NDCG, MAP, MRR | Recall@K, Click-Through Rate |

#### Step 3 — Evaluation Execution
- Run evaluation script against the test dataset.
- Generate confusion matrix or residual plots.
- Calculate all selected metrics.

#### Step 4 — Version Comparison
If a previous model version exists:

| Metric | v1.2 (Current) | v1.3 (Candidate) | Delta | Verdict |
|--------|-----------------|-------------------|-------|---------|
| F1 Score | 0.87 | 0.92 | +5.7% | ✅ Improved |
| Latency (P95) | 120ms | 180ms | +50% | ⚠️ Regression |
| False Positive Rate | 3.2% | 1.8% | -43.7% | ✅ Improved |

#### Step 5 — Data Drift Check
- Compare training data distribution vs. current production data.
- Flag any significant drift in feature distributions.
- Recommend retraining schedule if drift is detected.

#### Step 6 — Business Impact Translation
Translate technical metrics to business language:
```
Technical: F1 improved from 0.87 to 0.92
Business:  "The new model correctly identifies 92% of fraudulent transactions,
            reducing false alerts by 43.7% — saving the ops team ~15 hours/week."
```

#### Step 7 — Go/No-Go Recommendation

> **⏸️ Checkpoint**:
> "Model evaluation complete. Recommendation: [GO/NO-GO/CONDITIONAL].
> Key finding: [summary]. Bạn có muốn tôi xuất báo cáo chi tiết không? (Y/N)"

---

## ⚠️ Error Handling

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| No test dataset | User hasn't separated train/test data. | HALT. Explain the importance of holdout test sets. Ask user to provide a proper evaluation dataset. |
| No baseline model | First model version — no comparison available. | Use naive baseline (e.g., majority class classifier, mean predictor). Document as "first version — baseline established." |
| Metrics contradict | Accuracy up but recall down significantly. | Flag the trade-off explicitly. Present the precision-recall trade-off curve. Ask user to define the acceptable threshold. |
| Data too small | Test set has < 100 samples for classification. | Warn about statistical insignificance. Recommend cross-validation. Note confidence intervals in report. |

---

## ✅ Verification Checklist

- [ ] Evaluation scope and business objective confirmed with user.
- [ ] Appropriate metrics selected for the model type (not just accuracy).
- [ ] Baseline comparison included (previous version or naive baseline).
- [ ] Data drift analysis performed (or noted as not applicable).
- [ ] Technical metrics translated to business impact language.
- [ ] Go/No-Go recommendation provided with clear reasoning.
- [ ] Evaluation report artifact saved as `model-evaluation.md`.
- [ ] User checkpoint reached — recommendation reviewed before deployment decision.

---

## 📚 References

- [Metrics Analysis Skill](../metrics-analysis/SKILL.md) — Use to define business KPIs that the model should support.
- [Report Generation Skill](../report-generation/SKILL.md) — Use for formatting the final evaluation report.
- Industry reference: "Machine Learning Design Patterns" by Lakshmanan, Robinson, Munn (O'Reilly).
- Framework: Google's ML Test Score — evaluation rubric for production ML systems.
- Data drift reference: "Monitoring ML Models in Production" — NeurIPS best practices.
