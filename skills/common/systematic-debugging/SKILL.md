---
name: systematic-debugging
description: Use when encountering any bug, test failure, or unexpected behavior, before proposing fixes
triggers: bug, error, fail, fix, debug, exception, trace, unexpected
priority: P0
---

# Systematic Debugging

> **Goal**: ALWAYS find root cause before attempting fixes. Symptom fixes are failure.

## The Iron Law
**NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST**. If you haven't completed Phase 1, you cannot propose fixes.

## The Four Phases Workflow
You MUST complete each phase sequentially:

1. **Phase 1: Root Cause Investigation**
   - Read error logs completely using tools like `read_terminal` or `view_file`.
   - Trace data flow backward to find the origin (see `references/root-cause-tracing.md`).
   - If a multi-component system, add diagnostic instrumentation before proposing a fix.
2. **Phase 2: Pattern Analysis**
   - Find working examples in the codebase using `grep_search`.
   - Identify differences between working and broken code.
3. **Phase 3: Hypothesis and Testing**
   - Form a single hypothesis ("X is the cause because Y").
   - Test minimally (one variable at a time).
4. **Phase 4: Implementation**
   - Create a failing test case first using `test-driven-development` skill.
   - Implement ONE change at a time.
   - If 3+ fixes fail, STOP and question the architecture with the user.

*(See `references/phases.md` for detailed instructions on each phase).*

## Anti-Patterns

- **No guessing**: Do perform root cause investigation with terminal logs or file tracing before modifying code.
- **No bundled refactoring**: Do implement one fix at a time. Never add "while I'm here" improvements during debugging.
- **No ignoring architecture flags**: Do stop and ask the user if 3+ fixes have failed; do not attempt a 4th fix silently.
- **No proposing fixes early**: Do not propose solutions before tracing data flow and producing evidence.

## Supporting Techniques
- Use `references/root-cause-tracing.md` to trace call stacks backward.
- Use `references/defense-in-depth.md` to add validation at multiple layers.
- Use `references/condition-based-waiting.md` to replace arbitrary timeouts.

## Verification

- [ ] I have read the complete error logs and stack traces.
- [ ] I have traced the data flow and identified the exact component failing.
- [ ] I have formed a specific root cause hypothesis.
- [ ] I have created a failing test case or reproduction script.
- [ ] I have verified the fix without breaking existing tests.
