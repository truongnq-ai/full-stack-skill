---
name: Debugging Expert
description: Systematic troubleshooting using the Scientific Method. Activates when a bug, crash, error, or unexpected behavior is reported.
metadata:
  labels: [debugging, troubleshooting, bug-fixing, root-cause]
  triggers:
    files: ['**/*.log', '**/*.ts', '**/*.js', '**/*.py']
    keywords: [debug, fix bug, crash, error, exception, troubleshooting, stack trace, unexpected behavior, regression, broken]
    negative: ["user asks to optimize performance — use performance-engineering skill", "user asks to design architecture — use system-design skill"]
---

# Debugging Expert

## **Priority: P1 (OPERATIONAL)**

**This skill does NOT**: fix performance issues — use `performance-engineering`. Does not redesign architecture — use `system-design`. DB query debugging belongs to `db-workflow`.

**Compatible skills**: `performance-engineering` (after bug confirmed as perf issue), `tdd` (write regression test after fix), `code-review` (validate fix quality).

## 🔬 The Scientific Method (Follow in Order)

1. **OBSERVE** — Gather all signals before touching code:
   - Exact error message + stack trace
   - Steps to reproduce (minimum viable)
   - When it worked last (git log / recent commits)
   
2. **HYPOTHESIZE** — Form one theory: "I think X causes Y because Z."
   - Never form multiple hypotheses simultaneously.
   
3. **EXPERIMENT** — Test the single hypothesis:
   - Change ONE variable at a time.
   - Use binary search: comment out half, verify which half fails.
   
4. **FIX** — Implement solution only after root cause is proven. Implement ONE change at a time. No bundled refactoring.

5. **3-FIX LIMIT** — If 3 or more fix attempts have failed:
   - **STOP immediately.** Do NOT attempt Fix #4.
   - Escalate to `systematic-debugging` skill or discuss with user.
   - > "I've tried 3 fixes and each revealed a new problem. This may be an architectural issue — should we step back?"
   - Pattern: each fix reveals new coupling/shared state in a different file → wrong architecture, not a single bug.

5. **VERIFY** — Confirm fix + no regressions:
   - Run existing tests. Write regression test for this exact bug.
   - `view_file` the changed file after edit to confirm change is correct.

> **Fallback**: If can't reproduce locally, add structured logging at each layer then re-run. Never debug blind.

## 🛠 Best Practices

- **Diff Diagnosis**: `git diff HEAD~1` — what changed since last working state?
- **Minimal Repro**: Smallest code that reproduces the issue. Remove everything else.
- **Rubber Ducking**: Explain the code line-by-line out loud (or in comments).

## 🚫 Anti-Patterns

**`No Shotgun Debugging`**: Never change multiple things simultaneously hoping one works.

**`No Console Spam`**: Remove all debug `console.log`/`print` before committing fix.

**`No Repeated Guessing`**: Never attempt a 4th fix without a fundamentally different root cause hypothesis or an architectural discussion. If 3 fixes failed, the problem is likely not where you think it is.

**`No Symptom Masking`**: Never wrap in `try-catch` to silence without handling root cause.

**`No Guessing`**: Every hypothesis must be testable and falsifiable.

**`No Fix Without Test`**: Every bug fix requires a regression test that would catch it again.

## ✅ Verification Checklist

- [ ] Root cause identified and documented (not just symptom)
- [ ] Fix addresses root cause (not symptom)
- [ ] Regression test written for this exact bug
- [ ] All existing tests still pass
- [ ] No debug logging left in code

## 📚 References

- [Bug Report Template](references/bug-report-template.md)
