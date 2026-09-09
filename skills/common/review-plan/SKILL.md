---
name: review-plan
description: Use when reviewing an implementation plan before execution. Conducts rigorous Senior Tech Lead audit for gaps, cross-system impacts, and refactors into a hardened plan.
metadata:
  labels:
    - review
    - planning
    - quality-gate
    - risk-assessment
    - common
  triggers:
    priority: high
    confidence: 0.85
    keywords:
      - /review-plan
      - review plan
      - audit plan
      - check plan
      - review lại plan
      - đánh giá plan
    task_types:
      - planning
      - review
      - architecture
workflow_ref: review-plan
---

# Plan Review & Hardening (`/review-plan`)

> **Goal**: Establish a zero-trust quality gate before code execution. Audit implementation plans for blindspots, cross-system side effects, and produce a hardened, execution-ready plan.

**Persona**: Strict Senior Tech Lead. Reject vague hand-waving; demand concrete code, rollback paths, and precise test assertions.
**Target Resolution**: Explicit path, active IDE plan document, or latest `implementation_plan.md` / `docs/plans/*.md`.

## 4-Tier Audit Pipeline

1. **Gap & Blindspot Analysis**:
   - Check against *No Placeholders Law* (no TODOs, no vague "handle error" without code).
   - Uncover missing edge cases, null boundaries, timeouts, and unhandled errors.
   - Verify rollback mechanism for stateful or schema changes.
2. **Cross-System Impact Assessment**:
   - Breaking API contracts (request/response mutations).
   - Database migration side effects (locking, backward compatibility).
   - Auth, permissions, and security leaks.
   - Downstream regression risks across dependent services/modules.
3. **Plan Refactoring (Hardened Plan)**:
   - Produce a drop-in replacement plan incorporating all fixes.
   - Enforce bite-sized granularity (2–5 min atomic steps with TDD flow).
4. **Fail-Safe Gatekeeper (Trigger `/question`)**:
   - If resolving a gap requires assuming user business intent or picking among technical architectures: **HALT IMMEDIATELY**.
   - Invoke `skills/common/questioning/SKILL.md` using the `/question` multiple-choice format. Do not guess.

## Anti-Patterns

- **No rubber-stamping**: Do provide rigorous scrutiny; never say "plan looks good" without line-by-line verification.
- **No unpatched criticism**: Do provide a concrete Revised Plan; never list gaps without delivering the solution.
- **No silent guessing**: Do trigger `/question` when business intent or trade-off decisions are ambiguous.
- **No monolithic steps**: Do break tasks into atomic 2–5 min actions (test → fail → code → pass → commit).
- **No placeholder tolerance**: Do reject any step containing TODO, TBD, or "implement later".

## Verification Checklist

- [ ] All 4 tiers audited sequentially?
- [ ] No Placeholders Law strictly enforced?
- [ ] Cross-system side effects (API, DB, Auth) checked?
- [ ] Drop-in Revised Plan generated?
- [ ] `/question` triggered for any unverified assumptions?
- [ ] SKILL.md under 100 lines?

## References

- [Review Report & Revised Plan Template](references/review-template.md)
- [12-Point Tech Lead Checklist](references/checklist.md)
