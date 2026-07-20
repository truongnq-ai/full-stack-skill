---
name: QA Master Test Plan Definition
description: Creates a formal strategy artifact governing what will be tested, what is excluded, and the resources required for a specific release iteration.
category: roles/qa
metadata:
  labels: [qa, testing, test-plan, strategy, documentation]
  triggers:
    priority: high
    confidence: 0.8
    keywords: [test plan, qa plan, test strategy sheet, master test plan]
---

# 📋 QA Master Test Plan

> **Use this skill when**: a major Epic or Release cycle has just started, and the BA/PM needs QA to commit to exactly what will be evaluated before shipping. Trigger: `/qa-write-plan`.
>
> **Out of scope**: This document does not list the literal step-by-step clicks (those are Test Cases). This is the macro-level governing document (The "What" and the "How").

---

## 🚫 Anti-Patterns

- **The Kitchen Sink**: Saying "We will test everything." (You can't. Prioritize risk-based paths).
- **Ignoring Browsers/Devices**: Forgetting to define if testing requires Safari, mobile Chrome, or legacy IE.
- **Copy-Pasting Older Plans**: Leaving in references to features that were completely refactored 3 sprints ago.

---

## 🛠 Prerequisites & Tooling

1. The Epic or Master Requirements (e.g., `docs/specs/EPIC-05.md`).
2. Familiarity with the project's overall `test-strategy/SKILL.md`.

---

## 🔄 Execution Workflow

### Step 1 — Define Objectives & Scope
Extract the core objective from the BA specification.
Write the exact boundaries of the test:
- **In Scope**: New OAuth Login, Forgotten Password Flow.
- **Out of Scope**: 2FA (Moved to Phase 2), Legacy LDAP Login.

### Step 2 — Environmental Setup Matrix
Explicitly declare WHERE testing will happen.
- **Hardware/Browser**: Mac/Chrome (Primary), iOS/Safari (Secondary).
- **Network**: Standard broadband + 1 test pass under 3G latency.
- **Target Env**: `staging.app.com` connected to `Sandbox Stripe API`.

### Step 3 — Resource & Schedule Planning
Define WHO is doing WHAT and WHEN.
- Date of Code Freeze.
- Date of QA Sign-off.
- Assigned QA Agents/Engineers.

### Step 4 — Define Pass/Fail Criteria (The Gate)
Standardize exactly what warrants a Release vs a Rollback.
*(Reference `roles/qa/qa-gates/SKILL.md`)*.
- **Pass**: 100% Core P1 Tests passed, 0 Open S1/S2 Defects.
- **Suspension Limits**: Testing stops if >3 S1 Bugs are found in the first hour.

### Step 5 — Publish Artifact
Generate the formal markdown file at `docs/qa/plans/Plan-[Feature_Name].md`.

```markdown
# Master Test Plan: V1.5 OAuth Overhaul

## 1. Scope
**In Scope**: Google + GitHub SSO via `/api/auth/sso`.
**Out of Scope**: Legacy Email Login regression (handled by automated CI).

## 2. Environment Matrix
| OS | Browser | Priority |
|---|---|---|
| macOS | Chrome 120 | P1 (Must Pass) |
| iOS 17 | Mobile Safari | P2 |

## 3. Tooling
- **E2E Automation**: Playwright (Focus on Desktop).
- **Manual**: Required for Mobile Safari testing.
```

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Fluid Requirements | The BA hasn't finished the spec | Stop writing the plan. Invoke `/core-comm-contract` to kick it back to BA. You cannot plan a test for a phantom feature. |
| Timeline Unrealistic| PM gives QA 2 hours to test an Epic | Formally Reject the timeline. Provide a Risk Assessment matrix showing what will slip if forced to rush. |

---

## ✅ Done Criteria / Verification

A Formal Test Plan is complete when:

- [ ] Clear In-Scope and Out-Of-Scope boundaries are mapped.
- [ ] Browser, device, and API environment targets are explicitly listed.
- [ ] Suspension and Exit Gate criteria are rigorously defined.
