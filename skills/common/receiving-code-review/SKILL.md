---
name: receiving-code-review
description: Use when receiving code review feedback, before implementing suggestions
triggers: review feedback, address review, implement suggestion
priority: P1
---

# Receiving Code Review

> **Goal**: Evaluate code review technically instead of emotionally. Verify before implementing. Ask before assuming.

## The Response Pattern

1. **READ**: Complete feedback without reacting.
2. **UNDERSTAND**: Clarify requirements.
3. **VERIFY**: Check against current codebase reality and constraints.
4. **EVALUATE**: Determine if technically sound for THIS codebase and check YAGNI.
5. **RESPOND**: Technical acknowledgment or reasoned pushback.
6. **IMPLEMENT**: Implement one confirmed item at a time and test each.

*(See `references/process.md` for specific handling of external reviewers vs trusted reviewers).*

## Anti-Patterns

- **No performative agreement**: Do NOT say "You're absolutely right!" or "Great point!". Just write the fix and say "Fixed".
- **No blind implementation**: Do verify suggestions against the codebase before writing code.
- **No skipping YAGNI**: Do push back to avoid "proper" implementation of totally unused features.
- **No batching fixes without tests**: Do test each fix individually before pushing.
- **No avoiding pushback**: Do use precise technical reasoning to reject bad feedback.

## Tools
- `run_command` with `grep/rg` or `tests` to verify claims and check usages.
- Standard IDE modification tools.

## Verification

- [ ] I read and understood the entire feedback before acting.
- [ ] I identified which items needed clarification and asked for it FIRST.
- [ ] I pushed back technically on any incorrect feedback.
- [ ] I implemented the correct feedback one item at a time with tests.
- [ ] I did not use performative conversational fillers like "Thank you".
