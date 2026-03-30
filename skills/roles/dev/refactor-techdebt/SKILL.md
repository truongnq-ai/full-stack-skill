---
name: Refactor & Tech Debt
description: A formalized approach to safely rewriting legacy systems, improving code quality without breaking existing functionality (The Boy Scout Rule).
category: roles/dev
metadata:
  labels: [dev, refactor, tech-debt, legacy-code, clean-code]
  triggers:
    priority: medium
    confidence: 0.95
    keywords: [refactor, fix tech debt, clean up code, legacy code]
---

# 🧹 Refactor & Tech Debt Strategy

> **Use this skill when**: you encounter a messy, untestable 2,000-line legacy function, and you need to clean it up before adding new features to it. Trigger: `/dev-refactor`.
>
> **Out of scope**: Writing new features. Refactoring, by definition, implies zero change to the external behavior of the code.

---

## 🚫 Anti-Patterns

- **The Grand Rewrite**: Declaring "This Node app is garbage, I'm rewriting the entire thing in Rust." A massive, 6-month halted feature-freeze that usually fails and gets cancelled.
- **Refactoring Without Tests**: Gutting a legacy billing function without writing a test first. You will break something, and you will not know until a customer screams.
- **The "While I'm Here" Tangent**: Doing a CSS ticket, but taking a detour to refactor the database connector because it looked ugly, completely destabilizing the PR.

---

## 🛠 Prerequisites & Tooling

1. `roles/dev/unit-test-best-practices/SKILL.md` (Tests are the safety net).
2. Deep understanding of the Strangler Fig Architectural pattern for major refactors.

---

## 🔄 Execution Workflow

### Step 1 — The Boy Scout Rule (Daily Tidy)
*Leave the campground cleaner than you found it.*
If you are adding a parameter to a function, and you notice the function has awful variable names, rename them. Small, iterative cleanup during normal tickets prevents massive tech-debt buildup.

### Step 2 — The Safety Net (Test Verification)
Before touching legacy code (e.g., a massive `switch` statement):
Write "Characterization Tests". Feed the old function 10 different inputs, and record the exact outputs.
Ensure the test suite passes on the OLD code.

### Step 3 — The Mechanical Refactor
Use IDE automation (Extract Method, Rename Symbol) whenever possible instead of manual typing to prevent syntax errors.
Restructure the code (e.g., replace the `switch` statement with a Strategy pattern interface).

### Step 4 — Verify Invariance
Run the Characterization Tests from Step 2.
They MUST pass against the newly refactored code. If `input A` suddenly yields `output X` instead of `output Y`, you have broken external behavior. Revert and try again.

### Step 5 — Dedicated Tech Debt Epic (Large Scale)
For system-wide refactors (e.g., migrating an entire API from Express.js to NestJS):
Never combine the migration with a new feature.
Create a dedicated Agile Epic for "V2 API Migration". Use Feature Flags (`feature-flag-practice/SKILL.md`) to dark-launch the new refactored system and dual-write traffic to compare outputs before flipping the switch.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| The Untestable Monolith | The function is so tightly coupled to the DOM/Database that you physically cannot write a Unit Test for it | Use the "Extract Interface" or "Seam" method. Wrap the nasty dependency in an interface, mock the interface for testing, and THEN begin refactoring the core logic safely. |

---

## ✅ Done Criteria / Verification

A Refactor operation is successful when:

- [ ] External behavior of the API/UI is 100% physically identical to the user.
- [ ] Internal Cyclomatic Complexity (the number of nested IF statements) has been reduced.
- [ ] An automated test suite was strictly utilized as a safety net during the code transformation.
