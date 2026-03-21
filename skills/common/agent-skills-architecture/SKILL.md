---
name: Agent Skills Architecture
description: Foundational standard for token-optimized agent skill design, CLI-based automated activation, and progressive disclosure loading. Activates when designing or evaluating skill structure.
metadata:
  labels: [architecture, high-density, meta, optimization, cli-integration]
  triggers:
    files: ['.skillsrc', 'metadata.json', 'SKILL.md']
    keywords: [skill architecture, high-density standard, modular skills, dependency exclusion, skill separation, token economy, skill design]
    negative: ["user asks to implement application code — use framework skills", "user asks to write workflow — use workflow-review"]
---

# Agent Skills Architecture Standard

## **Priority: P0 (CRITICAL)**

**This skill does NOT**: define individual skill content — use `skill-creator/SKILL.md` for that. Does not review workflows — use `workflow-review`.

**Compatible skills**: `skill-creator` (creation standard), `skill-review` workflow (audit process).

## Core Architectural Pillars

**1. Separation by Package**
- Separate skills per specific library/framework dependency.
- Goal: Avoid context pollution. Don't load Riverpod rules into a BLoC project.
- Example: `flutter/bloc-state-management` ≠ `flutter/riverpod-state-management`.

**2. Presence = Active**
- If a skill is listed in `.skillsrc`, it is active. No `enabled` flags.
- Control activation via inclusion/exclusion lists only.

**3. CLI Detection & Dynamic Exclusion**
- CLI maps `package.json`/`pubspec.yaml` to skill IDs.
- Irrelevant sub-skills auto-added to `exclude` during `init` if packages missing.

> **Fallback**: If CLI unavailable, manually edit `.skillsrc` exclude list.

**4. Progressive Disclosure (Three-Level Loading)**
- Level 1 — Metadata: triggers activation via keywords/files.
- Level 2 — SKILL.md Body: core imperative logic (<100 lines).
- Level 3 — references/: detailed examples, lazy-loaded on-demand.

> To inspect current skill loading: `view_file .skillsrc` then `view_file .agent/skills/<id>/SKILL.md`.

## ID & Naming Standards

- Category: lowercase (e.g., `flutter`, `nestjs`).
- Skill ID: kebab-case matching directory name.
- Registry ID: must match Skill ID for CLI detection.

## Writing Style

- **Imperative**: "Use X", "Avoid Y". No "Please" / "You should".
- **Token-compressed**: Skip articles. Bullets > paragraphs.
- **No conversational intros**: "In this skill..." → Delete.

## 🚫 Anti-Patterns

**`No Fat Skills`**: SKILL.md >100 lines? Extract to `references/`.

**`No Coupled IDs`**: Registry ID must always match directory name exactly.

**`No Manual Activation`**: Skills should auto-activate via `.skillsrc` + CLI. Never require user to load manually.

**`No Inlined Examples`**: Code >10 lines belongs in `references/`, not SKILL.md body.

## ✅ Verification Checklist

- [ ] SKILL.md ≤100 lines
- [ ] Directory name matches registry ID
- [ ] `.skillsrc` entry exists and matches
- [ ] Heavy examples in `references/`, not inlined
- [ ] Triggers cover file patterns + keywords

## 📚 References

- [Skill Creator Standard](../../skill-creator/SKILL.md)
- [Resource Organization](../../skill-creator/references/resource-organization.md)
