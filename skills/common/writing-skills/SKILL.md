---
name: writing-skills
description: Use when creating new skills, editing existing skills, or verifying skills work
triggers: write skill, create skill, new skill, edit skill, verify
priority: P1
---

# Writing Skills

> **Goal**: Create highly effective, deterministic AI agent skills by applying Test-Driven Development (TDD) to process documentation.

## Core Principle: TDD for Skills
If you didn't watch an agent fail without the skill, you don't know if the skill teaches the right thing. 
**NO SKILL WITHOUT A FAILING TEST FIRST.**

1. **RED**: Run a baseline scenario WITHOUT the skill. Document how the agent fails or rationalizes.
2. **GREEN**: Write a minimal skill addressing only those specific failures.
3. **REFACTOR**: Find new loopholes, add explicit anti-patterns, and re-test.

*(See `references/testing-skills-with-subagents.md` for the full methodology).*

## Skill Construction Rules

- **Line Count**: Keep `SKILL.md` under 100 lines. Heavy references go in `references/` folder.
- **Triggers**: Must include `triggers:` in YAML and a descriptive `description:` starting with "Use when..."
- **Format**: Use the standard `name` (with hyphens) and `description` frontmatter.
- **Anti-Patterns**: Must use the `**No X**: Do Y` format to close loopholes explicitly.
- **Verification**: End with a checklist to confirm the skill's directives have been applied.

## Anti-Patterns

- **No summarizing workflow in description**: Do use the description ONLY for triggering conditions, never for step-by-step workflow.
- **No testing-free edits**: Do test every addition or change to a skill; never deploy an untested reference.
- **No verbose narratives**: Do write in imperative mood; use minimal examples over long explanations.
- **No implicit cross-references**: Do explicitly mark other skills as `**REQUIRED SUB-SKILL:**` instead of vaguely linking.

## Tools
- `write_to_file` to draft the skill.
- Subagent testing scripts or manual test prompts to verify the skill.
- Refer to `references/anthropic-best-practices.md` and `references/persuasion-principles.md` for advanced prompting syntax.

## Verification

- [ ] I ran a baseline test and watched the agent fail WITHOUT the skill.
- [ ] The `SKILL.md` is under 100 lines.
- [ ] The skill has a `triggers:` tag and explicit `description:` (no workflow summary).
- [ ] The skill includes concrete `**No X**: Do Y` anti-patterns.
- [ ] I ran a verification test WITH the skill and confirmed the agent complies.
