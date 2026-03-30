---
name: Root Cause Analysis (Lite)
description: Facilitates quick, effective 5-Whys investigations into Escaping Defects to improve QA coverage in future sprints.
category: roles/qa
metadata:
  labels: [qa, rca, root-cause, escaping-defects, retrospective]
  triggers:
    priority: medium
    confidence: 0.8
    keywords: [rca, root cause, 5 whys, bug slipped, post-mortem lite]
---

# 🔍 Root Cause Analysis (RCA Lite)

> **Use this skill when**: a severe defect (S1/S2) slips past QA and hits Production (Escaping Defect), requiring an investigation not just into the code, but into *why the testing process failed to catch it*. Trigger: `/qa-rca`.
>
> **Out of scope**: This is NOT a massive technical architecture post-mortem (use DevOps runbooks for that). This is purely a QA/Process improvement tool.

---

## 🚫 Anti-Patterns

- **Blaming Individuals**: "Dev forgot to test it." RCA is about system/process failures, not human error. Good: "CI pipeline lacked static typing enforcement."
- **Stopping at Symptom**: "Why did it crash? Because of a NullPointer." (That's not the root cause. Why was it null? Why didn't the test mock a null state?)
- **Action-less RCAs**: Writing a great analysis document but failing to generate new Test Cases to prevent it next time.

---

## 🛠 Prerequisites & Tooling

1. The referenced Bug Report ID that slipped to production (e.g., `BUG-808`).
2. Familiarity with the `5 Whys` framework.
3. Access to `skills/common/id-registry/SKILL.md` to map new safety Action Items.

---

## 🔄 Execution Workflow

### Step 1 — Define the Slipped Defect
Identify the exact defect that escaped into production.
*Example*: "Production app crashes when submitting a checkout form with a specific foreign character in the address."

### Step 2 — Execute the 5-Whys Method
Formulate a chain of "Whys" diving backward from the symptom to the systemic failure.

1. **Why did it crash?** -> DB threw a varchar encoding error.
2. **Why was there an encoding error?** -> The frontend sent UTF-16, but DB expected UTF-8.
3. **Why didn't Dev catch this?** -> Local DB defaults to UTF-16, Prod DB is strict UTF-8. (Environment Mismatch).
4. **Why didn't QA catch this?** -> The regression suite only uses standard ASCII characters for test data.
5. **Why only ASCII?** -> We don't have a centralized Edge Case Test Data generation strategy.

### Step 3 — Generate Process Fixes (Action Items)
For every root cause, assign a mitigation action.
- *DevOps Action*: Sync staging/local DB encoding with Prod.
- *QA Action*: Update `TC-004-Checkout` to explicitly include French and Japanese characters in the payload.

### Step 4 — Formalize the RCA Report
Create `docs/incidents/RCA-BUG-808.md`.

```markdown
# 🔍 RCA Lite: [BUG-808] Checkout Encoding Crash

**Date**: 2026-03-30
**Impact**: 45 user checkouts failed in Prod over 2 hours.

### 5-Whys Analysis
1. App crashed on UTF-16 input.
2. DB expected UTF-8.
3. Local Dev environment masking the behavior (UTF-16 native).
4. QA regression suite missing non-ASCII payload boundaries.

### 🛠 Preventative Action Items
- `[ ]` **(QA)** Write 3 new Edge Case Data payloads (Kanji, Emoji, Accents).
- `[ ]` **(DevOps)** Re-provision Docker images to force UTF-8 strictness locally.
```

### Step 5 — Implement
Immediately trigger the QA agent to write the missing Test Cases referenced in the Action Items.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Encountered | Fallback Action |
|----------|-------------|-----------------|
| Lack of Evidence | Cannot determine why it slipped because logs vanished | Mark Root Cause as `Insufficient Telemetry`. Top Action Item becomes setting up Datadog/Sentry logging. |
| Endless Whys | Agent spirals into philosophy ("Why does software exist?") | Cap the iteration strictly at 5 levels. If it hits 5, force an Action Item generation loop. |

---

## ✅ Done Criteria / Verification

RCA is complete when:

- [ ] A formalized RCA document is saved in `docs/incidents/`.
- [ ] At least 3 tiers of `Why` have been established, moving from Code -> Testing -> Process.
- [ ] At least ONE actionable task is created for QA to permanently plug the testing hole (e.g., a new Test Case).
