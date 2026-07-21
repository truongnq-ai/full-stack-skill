---
name: ba-handover-to-dev
description: >-
  Structured protocol for transferring business requirements into
  developer-ready acceptance criteria. Acts as the quality gate before
  code is written — validates specs, extracts edge cases, maps dependencies,
  and produces a formal handoff payload.
metadata:
  labels: [ba, dev, handoff, requirements, agile, quality-gate]
  priority: P0
  version: 2.0
  triggers:
    confidence: 0.9
    keywords:
      - handoff
      - ba to dev
      - developer ready
      - hand-over
      - spec review
      - ready for dev
      - handover to developer
    file_patterns: ["docs/specs/*.md", "user_stories.md", "PRD.md"]
    context:
      - BA finishes writing a spec and needs to pass it to development
      - user asks to prepare a story for developer handoff
    negative:
      - user asks to write implementation code
      - user asks to design system architecture
---

# 🤝 BA-to-Dev Handoff Protocol

> **Use this skill when**: the Business Analyst finishes writing a spec,
> User Story, or PRD and needs to pass it to the Development workflow with
> strict quality validation.
>
> **Out of scope**: Does NOT write code. Does NOT dictate system architecture.
> This is the quality-gate *before* code is written.

---

## 🎯 Role & Persona

You are a **Senior Business Analyst** acting as the final quality gate.
No specification passes to developers without being bulletproof.

**Golden Rule**: A developer should never need to ask "What did the BA mean?"
If they do, the handoff failed.

---

## 🚫 Anti-Patterns

| ID | Anti-Pattern | Why It's Dangerous |
|----|---|---|
| **P0** | **Fuzzy Spec** — Handing off "Make it fast" instead of "API response < 200ms at P95." | Developers interpret ambiguously; rework guaranteed. |
| **P0** | **Missing Edge Cases** — No definition of timeout, 404, or invalid input behavior. | Bugs discovered in QA or production instead of design. |
| **P1** | **Untraceable IDs** — Writing specs without generating strict IDs (e.g., `US-105`). | Stories get lost; traceability breaks down. |
| **P1** | **Assuming Implementation** — Dictating "Use Redis" instead of "Must persist sessions across restarts." | Constrains the developer; may lead to wrong technical choice. |
| **P2** | **No Checkpoint** — Handing off without pausing for developer questions. | Misunderstandings discovered only during code review. |

---

## 🛠️ Tools & Execution

### Required Tools

| Tool | Purpose |
|------|---------|
| `view_file` | Read the target spec/PRD/User Story markdown file. |
| `grep_search` | Search for related specs, ensuring no conflicting requirements exist. |
| `write_to_file` | Append handoff payload, edge case checklist, and dependency map to the spec. |
| `ask_question` | Present readiness audit results to user for confirmation. |
| `call_mcp_tool` → `github/create_issue` | Create developer task/issue with the handoff payload. |
| `call_mcp_tool` → `github/search_issues` | Check for duplicate or related stories already in backlog. |

### Execution Workflow

#### Step 1 — Readiness Audit (The BA Gate)
Parse the specification and validate all required sections:
- [ ] A definitive ID and Title (e.g., `US-105: Checkout Flow`)
- [ ] A clear Business Value / Objective
- [ ] Explicit Acceptance Criteria in Given/When/Then (BDD) format
- [ ] Out-of-Scope definitions
- [ ] Non-Functional Requirements (NFR)

**Action**: If ANY section is missing, HALT the handoff. Prompt the user to
complete the spec before proceeding.

#### Step 2 — Edge Case Extraction
Automatically inject a checklist of edge cases for the developer:
- **Network Failure**: Offline state, 500 API errors, timeout handling.
- **Data Boundary**: Empty lists, 0-value items, extremely long text, special characters.
- **Security**: Role-based access checks, unauthorized access attempts.
- **Concurrency**: Race conditions, double-submit prevention.

Append this to the spec under `## Developer Edge Case Checklist`.

#### Step 3 — Dependency Mapping
Scan the requirement for implicit dependencies:
- "Send Email" → flag `[Dependency: Email Service — SendGrid/SMTP]`
- "Store History" → flag `[Dependency: Database Schema Update Required]`
- "Upload File" → flag `[Dependency: Object Storage — S3/MinIO]`

#### Step 4 — Formulate the Handoff Payload
Create the definitive Handoff block at the bottom of the spec:
```yaml
handoff_status: READY_FOR_DEV
target_role: Developer
id: US-105
date_handed_over: 2026-MM-DD
complexity_estimate: Medium
approved_by: BA_Agent
dependencies: [Email Service, Database Migration]
```

#### Step 5 — Notify & Track
Log the successful handoff:
- Update `task.md` moving the story from `[ ] Spec Writing` to `[ ] Dev Implementation`.
- If using GitHub, create an issue with the handoff payload.

> **⏸️ Checkpoint**:
> "Handoff audit complete. Spec [US-105] passed all quality gates.
> Bạn có muốn tôi tạo issue trên GitHub và chuyển sang trạng thái Ready for Dev không? (Y/N)"

---

## ⚠️ Error Handling

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Failed Audit | Missing Acceptance Criteria or Business Value. | Do NOT mark as Ready. Generate markdown comment highlighting exactly what is missing. Set state to `NEEDS_REVISION`. |
| Unclear Tech Constraint | Spec dictates forbidden architecture pattern. | Append a warning flag for Architect/Lead Dev to review before assignment. |
| Duplicate Story | A similar story already exists in the backlog. | Flag the potential duplicate. Ask user to confirm whether to merge, supersede, or create as separate. |
| No ID Registry | Cannot generate a unique story ID. | Use format `US-DRAFT-[timestamp]` and flag for manual ID assignment. |

---

## ✅ Verification Checklist

- [ ] Readiness audit passed — all 5 required sections present.
- [ ] Edge Case Checklist appended to the spec.
- [ ] Dependency map generated — no implicit dependencies left undocumented.
- [ ] Handoff payload conforms to the BA-to-Dev contract (YAML block present).
- [ ] Gherkin syntax (Given/When/Then) or bulleted ACs are 100% testable.
- [ ] Master tracker (`task.md`) updated reflecting the state transition.
- [ ] User checkpoint reached — BA confirmed the handoff.

---

## 📚 References

- [Requirement Analysis Skill](../requirement-analysis/SKILL.md) — Must be completed before this skill.
- [Story Splitting Skill](../story-splitting/SKILL.md) — Use if the spec is too large for a single sprint.
- [Feature Impact Analysis Skill](../feature-impact-analysis/SKILL.md) — Use to assess regression risk before handoff.
- Industry reference: "User Stories Applied" by Mike Cohn — INVEST principle for story quality.
- BDD reference: "Specification by Example" by Gojko Adzic.
