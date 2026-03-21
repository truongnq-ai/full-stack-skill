---
name: verification-before-completion
description: Use when about to claim work is complete, fixed, or passing, before committing or creating PRs
triggers: verify, test, complete, claim success, done
priority: P0
---

# Verification Before Completion

> **Goal**: Ensure no completion claims are made without fresh, explicit verification evidence.

## The Iron Law

**NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE.**
If you haven't run the verification command in this message, you cannot claim it passes.

## The Gate Function

BEFORE claiming any status or expressing satisfaction:

1. **IDENTIFY**: What command proves this claim?
2. **RUN**: Execute the FULL command (fresh, complete).
3. **READ**: Full output, check exit code, count failures.
4. **VERIFY**: Does output confirm the claim?
   - If NO: State actual status with evidence.
   - If YES: State claim WITH evidence.
5. **ONLY THEN**: Make the claim.

## Anti-Patterns

- **No assumptions**: Do NOT claim "it should work now" without running the verification command.
- **No trusting linter for build**: Do NOT claim the build passes just because the linter passes. Run the build command.
- **No trusting agent success blindly**: Do NOT accept a subagent's "success" report without checking the VCS diff and running tests.
- **No skipping red-green**: Do NOT claim a regression test works without running it to fail (`RED`) and then pass (`GREEN`).

## Tools & Context
- `run_command` to execute tests, linters, and build commands.
- `command_status` to wait for and read the full output of the verification command.

## Verification

- [ ] I identified the correct command to prove completion.
- [ ] I ran the full command and verified its output.
- [ ] The output matches the success criteria.
- [ ] I included the evidence before making the claim.
