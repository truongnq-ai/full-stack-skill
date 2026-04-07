---
name: systematic-debugging
description: Use when encountering any bug, test failure, or unexpected behavior, before proposing fixes. Mandates root cause investigation before any fix attempt.
triggers: bug, error, fail, fix, debug, exception, trace, unexpected, broken, crash, regression
priority: P0
---

# Systematic Debugging

> **Goal**: ALWAYS find root cause before attempting fixes. Random fixes waste time and create new bugs. Symptom fixes are failure.

## The Iron Law

```
╔═══════════════════════════════════════════════════╗
║  NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST  ║
║  If Phase 1 is not complete, you cannot propose   ║
║  fixes. This is non-negotiable.                   ║
╚═══════════════════════════════════════════════════╝
```

**Use this ESPECIALLY when:**
- Under time pressure (emergencies make guessing tempting)
- "Just one quick fix" seems obvious
- You've already tried multiple fixes
- Previous fix didn't work
- You don't fully understand the issue

## The Four Phases

You MUST complete each phase before proceeding to the next.

### Phase 1: Root Cause Investigation

**BEFORE attempting ANY fix:**

1. **Read error logs completely** — use `read_terminal` or `view_file`. Don't skip warnings. Read stack traces end-to-end. Note line numbers, file paths, error codes.
2. **Reproduce consistently** — Can you trigger it reliably? What are exact steps? If not reproducible → gather more data, do NOT guess.
3. **Check recent changes** — `git diff HEAD~1`. What changed that could cause this? New dependencies, config changes, environmental differences.
4. **Trace data flow backward** — Where does the bad value originate? Keep tracing up until you find the source. Fix at source, not at symptom. See `references/root-cause-tracing.md`.
5. **In multi-component systems** — Add diagnostic instrumentation at each boundary BEFORE proposing fixes. Log what enters and exits each component. Run once to gather evidence, then analyze.

### Phase 2: Pattern Analysis

1. Find working examples in the codebase using `grep_search`.
2. Compare against references — read the working pattern COMPLETELY. Don't skim.
3. Identify every difference between working and broken, however small.
4. Understand all dependencies and assumptions.

### Phase 3: Hypothesis and Testing

1. Form **one** specific hypothesis: `"I think X is the root cause because Y"`
2. Write it down. Be specific, not vague.
3. Test minimally — make the **smallest possible change** to test hypothesis.
4. **One variable at a time.** Do not bundle multiple changes.
5. If hypothesis fails → form a NEW hypothesis. Do NOT add more fixes on top.

### Phase 4: Implementation

1. Create a failing test case first (use `tdd` skill for writing proper tests).
2. Implement **ONE** single fix addressing the identified root cause.
3. Verify fix: tests pass, no other tests broken, issue actually resolved.
4. **If fix doesn't work**: STOP. Count how many fixes have been attempted.

### ⚠️ 3-Fix Limit: Escalate to Architecture Review

```
If 3 or more fix attempts have failed → HARD STOP.
Do NOT attempt Fix #4 without human decision.
```

**Pattern indicating architectural problem:**
- Each fix reveals new shared state, coupling, or problem in a different place.
- Fixes require "massive refactoring" to implement.
- Each fix creates new symptoms elsewhere.

**Action required:** Stop and discuss with the user:
> "I've attempted 3 fixes and each revealed a new problem in a different place. This suggests the issue may be architectural rather than a single bug. Should we step back and re-examine the design?"

## Common Rationalizations (STOP if you think these)

| Excuse | Reality |
|--------|---------|
| "Issue is simple, don't need investigation" | Simple bugs have root causes too. Process is fast for simple bugs. |
| "Emergency, no time for process" | Systematic debugging is FASTER than guess-and-check thrashing. |
| "Just try this first, then investigate" | First fix sets the pattern. Do it right from the start. |
| "Multiple fixes at once saves time" | Can't isolate what worked. Creates new bugs. |
| "I see the problem, let me fix it" | Seeing symptoms ≠ understanding root cause. |
| "One more fix attempt" (after 2+ failures) | 3+ failures = architectural problem. Question the pattern. |

## Red Flags — STOP and return to Phase 1

- "Quick fix for now, investigate later"
- "Just try changing X and see if it works"
- Adding multiple changes hoping one works
- Proposing solutions before tracing data flow
- "One more fix attempt" (when already tried 2+)
- Each fix reveals new problem in a different place

## Supporting Techniques

- `references/root-cause-tracing.md` — Trace bugs backward through call stack to find origin.
- `references/defense-in-depth.md` — Add validation at multiple layers after root cause found.
- `references/condition-based-waiting.md` — Replace arbitrary timeouts with condition polling.

## Anti-Patterns

- **No guessing**: Never modify code without root cause evidence from logs or tracing.
- **No bundled refactoring**: "While I'm here" improvements during debugging are forbidden.
- **No ignoring architecture flags**: After 3 failed fixes, do not attempt a 4th without discussion.
- **No proposing fixes early**: Never propose solutions before tracing data flow and producing evidence.
- **No symptom masking**: Never wrap in try-catch to silence without handling root cause.

## Verification

- [ ] I read the complete error logs and stack traces (not skimmed).
- [ ] I traced the data flow and identified the exact failing component.
- [ ] I formed a specific, single root cause hypothesis before touching code.
- [ ] I created a failing test case or reproduction script first.
- [ ] I implemented exactly ONE fix addressing the root cause.
- [ ] The fix was verified — tests pass, no regressions, issue resolved.
- [ ] If 3+ fixes failed, I escalated to architecture discussion rather than attempting a 4th.
