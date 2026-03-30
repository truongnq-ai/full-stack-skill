---
name: Requirements Elicitation
description: Conducts simulated interviews and extracts structured requirements from raw transcripts, user chat, or unstructured braindumps.
category: roles/ba
metadata:
  labels: [ba, elicitation, requirements, interview, discovery]
  triggers:
    priority: medium
    confidence: 0.9
    keywords: [elicit, discover, interview, extract requirements, raw to spec]
---

# 🎤 Requirements Elicitation

> **Use this skill when**: the user drops a massive, unstructured brain-dump of ideas, or when a feature request is too vague and requires the agent to act as a provocative Business Analyst to extract clarity. Trigger: `/ba-elicit`.
>
> **Out of scope**: This is NOT for writing the final Developer Handoff spec (that relies on `handover-to-dev/SKILL.md`). This is the raw *Discovery* phase.

---

## 🚫 Anti-Patterns

- **Passive Acceptance**: Accepting vague constraints like "Make it highly scalable" without asking "What is the expected requests per second?".
- **Direct Code Generation**: Translating a one-line idea directly into Python code without defining the Business Value or Data Model first.
- **Interrogation Mode**: Asking 25 questions in a single response, overwhelming the User.
- **Ignoring Stakeholders**: Forgetting to ask *who* exactly uses the feature (Actor identification).

---

## 🛠 Prerequisites & Tooling

1. Familiarity with the `5 Whys` and `MoSCoW` (Must, Should, Could, Won't have) frameworks.
2. A temporary scratchpad artifact: `docs/discovery/raw-feature-notes.md`.

---

## 🔄 Execution Workflow

### Step 1 — Initial Intake & Active Listening
Analyze the human user's incoming prompt.
Extract the raw nouns (Entities), verbs (Actions), and adjectives (Non-Functional Requirements).
*Example*: "I want a dashboard connecting to Stripe that shows fast metrics."
Entities: Dashboard, Stripe. Actions: Shows metrics. NFR: "Fast".

### Step 2 — Gap Analysis Formatting
Identify missing critical dimensions. A comprehensive feature needs:
1. **Target Persona** (Who?)
2. **Business Goal** (Why?)
3. **Core Input/Output Data** (What?)
4. **Boundary/Edge Cases** (What if it fails?)
5. **Scale/Constraint** (How fast/secure?)

### Step 3 — The Socratic Inquiry (Max 3 Questions)
Respond to the user with a synthesized summary, followed by a maximum of 3 highly targeted, provocative questions.
*Example*:
> "Got it. You need a Stripe Metric Dashboard. To ensure accuracy:
> 1. By 'Fast', do you require real-time WebSockets, or is a 5-minute cache refresh acceptable?
> 2. What happens if the Stripe API rate limits us? 
> 3. Does this dashboard need role-based access control, or is it internal admin only?"

### Step 4 — Progressive Distillation
As the user answers, update `docs/discovery/raw-feature-notes.md`.
Use the MoSCoW method to categorize their desires:
- **Must Have**: Core Stripe integration.
- **Could Have**: WebSocket realtime updates (pushed to Phase 2).

### Step 5 — Epilogue & Handoff Preparation
Once core clarity is reached, synthesize the `raw-feature-notes.md` into a formal `REQ-[ID].md` or `US-[ID].md` draft, ready for standard User Story workflows.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Encountered | Fallback Action |
|----------|-------------|-----------------|
| User Ghosting / Vague | "Just build it whatever way" | Assume standard industry defaults. Document assumptions clearly with a `> ⚠️ ASSUMPTION:` tag and proceed to spec draft. |
| Feature Creep | User keeps adding massive unrelated requests | Halt elicitation. Invoke `/ba-split-story` protocol. Segregate the new requests into a separate Epic. |

---

## ✅ Done Criteria / Verification

Elicitation is successfully completed when:

- [ ] A definitive Target Persona (Actor) is identified.
- [ ] At least one Non-Functional Requirement (e.g., performance, security) is explicitly defined.
- [ ] Vague emotional words ("fast", "pretty", "secure") are translated into testable constraints.
- [ ] The raw braindump has been structurally formatted into `docs/discovery/raw-feature-notes.md`.
