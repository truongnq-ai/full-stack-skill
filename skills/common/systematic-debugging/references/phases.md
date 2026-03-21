# Systematic Debugging Roles & Phases

## Phase 1: Root Cause Investigation
**BEFORE attempting ANY fix:**
1. **Read Error Messages Carefully**: Read stack traces completely. Note line numbers, file paths, error codes.
2. **Reproduce Consistently**: Find exact steps. If not reproducible, gather more data.
3. **Check Recent Changes**: Git diff, recent commits, env differences.
4. **Gather Evidence in Multi-Component Systems**: Add diagnostic instrumentation (logging data explicitly at boundaries) and run once to gather evidence showing WHERE it breaks.
5. **Trace Data Flow**: Trace bug backward through call stack to find original trigger. Fix at source, not symptom.

## Phase 2: Pattern Analysis
**Find the pattern before fixing:**
1. **Find Working Examples**: Locate similar working code in the same codebase.
2. **Compare Against References**: Read reference implementations COMPLETELY.
3. **Identify Differences**: List every difference between working and broken code.
4. **Understand Dependencies**: Check settings, config, and environment assumptions.

## Phase 3: Hypothesis and Testing
**Scientific method:**
1. **Form Single Hypothesis**: State clearly: "I think X is the root cause because Y".
2. **Test Minimally**: Make the SMALLEST possible change to test hypothesis. One variable at a time.
3. **Verify Before Continuing**: Did it work? Yes -> Phase 4. Didn't work? Form NEW hypothesis. DON'T add more fixes on top.
4. **When You Don't Know**: Ask for help or research more.

## Phase 4: Implementation
**Fix the root cause, not the symptom:**
1. **Create Failing Test Case**: Simplest possible reproduction (Automated test or one-off script). MUST have before fixing.
2. **Implement Single Fix**: Address the root cause identified. ONE change at a time. No bundled refactoring.
3. **Verify Fix**: Ensure test passes and no other tests are broken.
4. **If Fix Doesn't Work**: If < 3 fixes tried, return to Phase 1. If 3+ fixes failed, STOP and question the architecture. Discuss with human partner before attempting more fixes.
