---
name: Exploratory Testing Strategy
description: Guidance for structured, session-based exploratory testing to uncover edge cases outside the rigid test plan.
category: roles/qa
metadata:
  labels: [qa, exploratory, edge-case, testing, manual]
  triggers:
    priority: low
    confidence: 0.8
    keywords: [exploratory, poke around, monkey test, unscripted]
---

# 🕵️‍♂️ Exploratory Testing Strategy

> **Use this skill when**: formal test plans (the "Happy/Sad Paths") are completed, and the QA agent needs to allocate time to break the application creatively using unscripted session-based testing. Trigger: `/qa-explore`.
>
> **Out of scope**: This is NOT an excuse to avoid writing test cases. Exploratory testing happens *after* the scripted regression suite is green.

---

## 🚫 Anti-Patterns

- **Aimless Clicking**: Randomly clicking buttons for 10 minutes without a specific persona or goal in mind (Monkey Testing).
- **Silent Discovery**: Finding a quirky UI glitch but forgetting to write down exactly how you got there because it "wasn't in the script".
- **Infinite Timeboxing**: Doing exploratory testing for 3 days. (It must be strictly timeboxed).
- **Ignoring Security Vectors**: Testing business logic but failing to inject basic SQL snippets (`' OR 1=1;--`) or XSS boundaries into text fields.

---

## 🛠 Prerequisites & Tooling

1. A stabilized, QA-approved feature deployment.
2. An active session recording tool or a scratchpad ready (`docs/qa/exploratory-notes.md`).

---

## 🔄 Execution Workflow

### Step 1 — Define the Charter (Session Goal)
Exploratory testing must have a "Charter".
*Example*: "Charter 1: I will explore the checkout workflow while simulating a user on an extremely slow 3G connection repeatedly losing signal."
*Example*: "Charter 2: I will input maximum boundary values (9999999) into every numerical input on the Dashboard."

### Step 2 — Timebox the Session
Set a strict limit per Charter (typically 30 to 45 minutes). Do not exceed.

### Step 3 — Execution & Note Taking
Perform the unscripted maneuvers. During the session, maintain a log of three things:
1. **Setup**: What state is the DB in?
2. **Notes**: "Double clicking the 'Pay' button quickly causes a UI flicker, but doesn't double-charge."
3. **Bugs**: Any actual `HTTP 500` or blocking flaw encountered.

### Step 4 — Formalize Escaping Defects
If a legitimate bug is found:
- Immediately halt the Session.
- Invoke `skills/roles/qa/bug-reporting-standard/SKILL.md` to formally log `BUG-XXX`.
- Crucially, ask: *Why wasn't this in the Master Test Plan?* Add a note to backfill a scripted test case for this newly discovered edge case.

### Step 5 — Debrief Summary
Generate a brief markdown summary of the session:
```markdown
# Exploratory Session: Checkout Network Drops
**Duration**: 30m
**Bugs Found**: `BUG-112` (Spinner freezes on disconnect).
**Observations**: The websocket reconnects nicely, but the UI state doesn't reflect the reconnection without a hard refresh.
```

---

## ⚠️ Error Handling (Fallback)

| Scenario | Encountered | Fallback Action |
|----------|-------------|-----------------|
| Unreproducible Ghost | You saw a crash but absolutely cannot trigger it again | Log it as an "Anomaly Observation". Do not log a formal Bug. Pass the trace ID to Backend Dev to search Datadog/Sentry. |
| Production Scope | Accidentally doing exploratory testing in Prod | ABORT IMMEDIATELY. Exploratory testing frequently modifies state in unpredictable ways. Confine to QA/Staging environments. |

---

## ✅ Done Criteria / Verification

An exploratory session is complete when:

- [ ] A specific Charter and Timebox were defined prior to start.
- [ ] Any discovered defects were formally logged and converted into repeatable Test Cases for the future.
- [ ] A session Debrief note is saved for PM/Lead review.
