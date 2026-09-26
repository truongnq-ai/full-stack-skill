---
name: gen-prompt
description: Refines raw user prompts into structured 6-part execution contracts bound to specific skills.
metadata:
  labels:
    - prompt
    - compiler
    - standardization
    - orchestration
    - common
  triggers:
    priority: high
    confidence: 0.85
    keywords:
      - gen-prompt
      - /gen-prompt
      - chuẩn hoá prompt
      - viết lại prompt
      - tạo prompt
      - refine prompt
      - compile prompt
    task_types:
      - planning
      - analysis
      - workflow
# workflow_ref points to gen-prompt.md — intentional skill↔workflow circular pairing.
workflow_ref: gen-prompt
---

# Generate Prompt (`gen-prompt`)

## **Priority: P0 (CRITICAL)**

> **Goal**: Transform ambiguous, raw user prompts into unambiguous, structured 6-part execution prompts with isolated input resources and explicit skills from `@truongnq-ai/full-stack-skill`.

<HARD-GATE>
This skill is OUTPUT-ONLY. When activated:
1. Do NOT execute the raw prompt's request (no file writes, no code generation, no codebase/document modification).
2. Do NOT combine prompt generation with task execution in the same session.
3. The ONLY output is the refined 6-block execution prompt rendered in a Markdown code block.
4. After outputting the prompt, STOP and wait for the user to copy it into a new session for execution.
</HARD-GATE>

## Core Pipeline

1. **Clarify First**: If the raw prompt is missing objective, resources, targets, or scope, **DO NOT GUESS**. Activate `workflows/question.md` or ask clarifying questions without limits until context is complete.
2. **Catalog Resources**: Identify all inputs (files, schemas, mock data, credentials, dependencies) that the executor will need.
3. **Classify & Map**: Determine the task type against `references/task-taxonomy.md` (6 Domains: PM, Dev, AI, DevOps, QA, Technical Writing — plus GEN-00 Fallback) and map matching workflow + skills.
4. **Decompose Sequentially**: Break execution into 3–5 sequential steps. Bind each step to 1–2 specific skills.
5. **Demarcate Scope**: Explicitly define what MUST be done and what MUST NOT be done.
6. **Output Canonical Template**: Format the final output matching `references/prompt-template.md`.

## The 6 Mandatory Blocks

Every refined prompt must output these exact 6 blocks:
- `🎯 1. Mục tiêu cốt lõi (Core Objective)`: 1–2 sentences defining the exact outcome.
- `📦 2. Bối cảnh & Tài nguyên đầu vào (Context & Resources)`: Reference code, mock data, schemas, env vars.
- `🚧 3. Phạm vi & Ràng buộc (Scope & Constraints)`: Explicit In-scope vs. Out-of-scope boundaries.
- `🧰 4. Danh sách Skill/Workflow áp dụng`: Exact skill names from `full-stack-skill`.
- `📋 5. Kế hoạch thực thi (Step-by-Step Breakdown)`: 3–5 atomic steps with bound skills.
- `✅ 6. Tiêu chí hoàn thành (Definition of Done)`: Verification commands and stopping criteria.

## Anti-Patterns

- **No premature execution**: Do NOT write application code or modify codebase while generating prompt; only produce the execution specification.
- **No skipping planning for mutations**: If the task involves Write/Mutate actions (editing code, updating docs, modifying configs, deploying), Block 5 MUST instruct the executor to create an implementation plan (`common/writing-plans` or `/software-dev-plan-implementation`) for user approval BEFORE any file modification. Read-only tasks (analyze, report, review, audit) may execute directly.
- **No silent guessing**: Do ask clarifying questions whenever constraints, tech stack, or business goals are ambiguous; never assume.
- **No arbitrary question limits**: Do ask as many clarifying questions as necessary to achieve complete clarity.
- **No missing resources**: Do explicitly list reference files, schemas, and mock data; never let the agent guess inputs.
- **No unbound steps**: Do bind every single execution step to a concrete skill or workflow; never leave abstract instructions.
- **No omission of Out-of-scope**: Do declare what NOT to do to prevent accidental regression and scope creep.

## Verification Checklist

- [ ] All 6 mandatory blocks are present in the output?
- [ ] Input resources and reference paths clearly declared in Block 2?
- [ ] In-scope and Out-of-scope boundaries clearly defined in Block 3?
- [ ] Each execution step bound to specific skills from `full-stack-skill`?
- [ ] Ambiguities clarified before prompt generation?
- [ ] Output formatted using canonical template?
- [ ] HARD-GATE enforced: prompt generation did NOT trigger any file modification or code execution?
- [ ] Mutation tasks: Block 5 includes mandatory planning step with user approval gate?
- [ ] SKILL.md under 100 lines?
