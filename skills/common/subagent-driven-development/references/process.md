# SDD Process Details

## Model Selection
- Mechanical implementation tasks: fast, cheap model
- Integration and judgment tasks: standard model
- Architecture, design, review: most capable model

## Handling Implementer Status
- **DONE**: Proceed to spec compliance review.
- **DONE_WITH_CONCERNS**: Check concerns. If correct/scope concerns, address them.
- **NEEDS_CONTEXT**: Provide information and re-dispatch.
- **BLOCKED**: Assess blocker (give more context, use a stronger model, break task down, or escalate to human).

## Example Workflow
1. Read plan, extract 5 tasks. Task 1: API Setup.
2. Dispatch subagent with Task 1 text.
3. Subagent asks a question. You answer.
4. Subagent implements, tests, self-reviews, and commits.
5. You dispatch Spec Reviewer. It passes.
6. You dispatch Code Quality Reviewer. It fails (magic numbers).
7. Subagent fixes magic numbers.
8. Code Reviewer reviews again and passes.
9. Task 1 complete. Move to Task 2.
