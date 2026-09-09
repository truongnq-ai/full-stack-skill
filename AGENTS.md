# Project Context for AI Agents

> [!IMPORTANT]
> **To all AI Agents working ON this repository:**
> This repository is the source code for `@truongnq-ai/full-stack-skill`.
>
> 1. **Architecture**: Understanding the Registry -> CLI -> Project flow is critical. See `ARCHITECTURE.md`.
> 2. **Token Economy**: All changes to `skills/` must be optimized for token usage.
> 3. **Documentation**: Keep `ARCHITECTURE.md` and `CHANGELOG.md` up to date.
>
> ---

<!-- SKILLS_INDEX_START -->
# Agent Skills Index

> [!IMPORTANT]
> **Prefer retrieval-led reasoning over pre-training-led reasoning.**
> Before writing any code, you MUST CHECK if a relevant skill exists in the index below.
> If a skill matches your task, READ the file using `view_file`.

## **Rule Zero: Zero-Trust Engineering**

- **Skill Authority:** Loaded skills always override existing code patterns.
- **Audit Before Write:** Audit every file write against the `common/feedback-reporter` skill.

- **[common/executing-plans]**: Use when you have a written implementation plan to execute in a single session with review checkpoints
- **[common/finishing-a-development-branch]**: Use when implementation is complete, tests pass, and you need to integrate the work
- **[common/questioning]**: Use when requirements are ambiguous, technical trade-offs exist, or decisions require user input via structured multiple-choice questions. (triggers: /question, question, clarify, ambiguity, decision, options, trade-off, đặt câu hỏi, làm rõ)
- **[common/receiving-code-review]**: Use when receiving code review feedback, before implementing suggestions
- **[common/requesting-code-review]**: Use when completing tasks, implementing major features, or before merging to verify work meets requirements
- **[common/review-plan]**: Use when reviewing an implementation plan before execution. Conducts rigorous Senior Tech Lead audit for gaps, cross-system impacts, and refactors into a hardened plan. (triggers: /review-plan, review plan, audit plan, check plan, review lại plan, đánh giá plan)
- **[common/systematic-debugging]**: Use when encountering any bug, test failure, or unexpected behavior, before proposing fixes. Mandates root cause investigation before any fix attempt.
- **[common/tdd]**: Enforces Test-Driven Development (Red-Green-Refactor cycle). Use when implementing any feature or bugfix, before writing implementation code.
- **[common/using-git-worktrees]**: Use when starting feature work that needs isolation from current workspace
- **[common/verification-before-completion]**: Use when about to claim work is complete, fixed, or passing, before committing or creating PRs
- **[common/writing-plans]**: Use when you have a spec or requirements for a multi-step task, before touching any code. Creates bite-sized TDD implementation plans assuming zero codebase context.
- **[common/writing-skills]**: Use when creating new skills, editing existing skills, or verifying skills work

<!-- SKILLS_INDEX_END -->
