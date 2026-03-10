---
description: Review and audit AI agent skills (SKILL.md files) against a standardized quality framework. Produces a scored report with actionable improvement recommendations.
---

# 🧠 Skill Review & Audit

> **Goal**: Evaluate one or more `SKILL.md` files against a skill quality framework designed to prevent LLM hallucination, wrong-tool usage, and scope violations. Produce a scored report and prioritized improvement plan.

> [!IMPORTANT]
> A skill is not documentation — it is **prompt engineering**. Evaluate every dimension through the lens of:
> _"Will this instruction make an LLM activate correctly, execute precisely, and not break the project?"_

---

## Step 1 — Inventory & Discovery

Determine the scope of the review.

- If user specifies a skill → review that single `SKILL.md`.
- If user specifies a category → enumerate all skills in that directory.
- If user says "all" → full repo scan:

```bash
# Count and list all SKILL.md files
find . -name "SKILL.md" | sort

# Count skills per category
find . -name "SKILL.md" | sed 's|/[^/]*/SKILL.md||' | sort | uniq -c

# Quick health signals — detect missing critical sections
echo "=== Missing triggers ==="
grep -rL "triggers:\|Use this skill when\|Use when" . --include="SKILL.md"

echo "=== Missing anti-patterns section ==="
grep -rL "Anti-Pattern\|anti-pattern" . --include="SKILL.md"

echo "=== Oversized skills (>100 lines) ==="
find . -name "SKILL.md" -exec awk 'END{if(NR>100) print FILENAME": "NR" lines"}' {} \;
```

Confirm scope with user before proceeding to deep audit.

---

## Step 2 — Structural Compliance Check

For each skill in scope, verify mandatory structure **before reading the body**:

| # | Check | Pass Criteria |
|---|-------|---------------|
| S1 | YAML frontmatter | Has `---` block with `name:` and `description:` |
| S2 | Priority marker | Has `P0`, `P1`, or `P2` severity label |
| S3 | Trigger section | Has "Use this skill when" or `triggers:` block |
| S4 | Anti-patterns section | Has `## Anti-Patterns` or equivalent |
| S5 | Verification checklist | Has pass/fail checklist at end |
| S6 | Line count | Body ≤ 100 lines (references go in `references/`) |

```bash
# Run all structural checks for a skill
f="path/to/SKILL.md"
echo "Lines: $(wc -l < $f)"
echo "Has trigger: $(grep -c 'Use this skill when\|triggers:' $f)"
echo "Has anti-patterns: $(grep -c 'Anti-Pattern\|anti-pattern' $f)"
echo "Has checklist: $(grep -c '- \[ \]\|- \[x\]\|✅\|☑' $f)"
echo "Has priority: $(grep -c 'P0\|P1\|P2\|CRITICAL\|HIGH\|LOW' $f)"
```

---

## Step 3 — Deep Quality Audit (Per Skill)

Read each skill in scope. Score **10 dimensions** (0–10 each, total 100 pts):

### Dimension Rubric

| # | Dimension | What to Evaluate | Score Guide |
|---|-----------|------------------|-------------|
| **D1** | **Purpose & Scope** | Clear single responsibility? Defines what skill does NOT do? No overlap with other skills? | 10 = laser-focused with explicit "out of scope" | 0 = vague `help with X` |
| **D2** | **Trigger Precision** | Agent knows exactly WHEN to activate? Uses specific phrases, file types, context signals? | 10 = multi-signal triggers (keyword + file + context) | 0 = `use when working with X` |
| **D3** | **Anti-Pattern Design** | Lists concrete forbidden behaviors? Format: `**No X**: Do Y [≤15 words]`? Actionable, not descriptive? | 10 = all patterns actionable with clear alternatives | 0 = no anti-patterns section |
| **D4** | **Workflow & Determinism** | Steps are numbered, sequential, specific? No ambiguous instructions like "improve" or "ensure quality"? | 10 = every step is a single deterministic action | 0 = vague multi-step blob |
| **D5** | **Tool & Context Awareness** | Explicitly names tools to use? Defines which files to read/write? Scopes context (no "read entire repo")? | 10 = explicit tool + scope for every action | 0 = no tool mention |
| **D6** | **Error & Safety** | Defines fallback if step fails? Prevents dangerous actions (delete, overwrite)? Safety constraints explicit? | 10 = fallback for each step + safety constraints | 0 = no error handling |
| **D7** | **Verification Mechanism** | Has a mandatory done-checklist? Exit criteria are testable pass/fail? Agent knows when task is "complete"? | 10 = all checklist items are objectively verifiable | 0 = no checklist |
| **D8** | **Reference Architecture** | Heavy knowledge in `references/`? SKILL.md stays thin? Links to templates, examples, and guides? | 10 = body ≤ 100 lines + organized references/ folder | 0 = everything inlined, >200 lines |
| **D9** | **Token Efficiency** | Imperative mood throughout? No conversational filler? Instructions are dense, not verbose? | 10 = every sentence is a direct instruction | 0 = paragraph-style explanations |
| **D10** | **Modularity & Composability** | No hardcoded project paths? Lists compatible/conflicting skills? Reusable across projects? | 10 = zero project-specific coupling | 0 = hardcoded paths and assumptions |

### Scoring Scale

| Score | Grade | Meaning |
|-------|-------|---------|
| 85–100 | **A** | Production-ready. Ship it. |
| 65–84 | **B** | Functional. Minor fixes needed. |
| 45–64 | **C** | Works but unreliable. Needs rework. |
| 25–44 | **D** | High hallucination risk. Major rewrite needed. |
| 0–24 | **F** | LLM will behave unpredictably. Do not use. |

---

## Step 4 — LLM Behavior Simulation

For each skill below **B grade**, simulate how an LLM would actually behave:

Ask yourself (or test with an LLM):

1. **Activation test**: Would an LLM know to use this skill given a typical user prompt?
2. **Scope test**: Would the LLM stay within the skill's boundaries or drift?
3. **Hallucination test**: Are there any ambiguous instructions where the LLM might invent behavior?
4. **Safety test**: Could the LLM cause harm (overwrite, delete, expose secrets) following this skill?

Document findings as:
```
🔴 ACTIVATION FAILURE — The skill would not trigger on "[typical prompt]" due to missing trigger signal.
🟠 SCOPE DRIFT — Step 3 instruction "improve the code" would cause LLM to refactor beyond intended scope.
🟡 AMBIGUITY — "Ensure tests pass" has no fallback — LLM may loop indefinitely.
```

---

## Step 5 — Scored Report

Output the report in this format:

```
╔══════════════════════════════════════════════════════════════╗
║               🧠 SKILL AUDIT REPORT                          ║
║  Category: [path]              Date: [YYYY-MM-DD]            ║
║  Skills Reviewed: [N]          Overall Score: [X / 100]      ║
╚══════════════════════════════════════════════════════════════╝

### 📊 Dimension Scores

| Skill | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Total | Grade |
|-------|----|----|----|----|----|----|----|----|----|-----|-------|-------|
| skill-name | 9 | 8 | 4 | 7 | 6 | 3 | 2 | 8 | 7 | 9 | 63 | B |

### 🔴 Critical Findings (Fix before use)
- **[C-001]** `[skill-id]` — D3: No anti-patterns section. LLM will invent behavior boundaries.
- **[C-002]** `[skill-id]` — D7: No verification checklist. Agent never knows when it's done.

### 🟠 Important Findings
- **[I-001]** `[skill-id]` — D2: Trigger too broad (`use when working with X`). Risk of wrong activation.
- **[I-002]** `[skill-id]` — D6: No fallback if test fails. LLM may loop or give up silently.

### 🟡 Suggestions
- **[S-001]** `[skill-id]` — D8: 180-line body. Move examples to `references/examples.md`.
- **[S-002]** `[skill-id]` — D9: Step 2 uses passive voice. Rewrite as imperative.

### ⚠️ LLM Behavior Risks
- **[B-001]** `[skill-id]` — Would trigger on unrelated Python tasks due to broad trigger.
- **[B-002]** `[skill-id]` — Step 3 "improve the code" will cause scope drift.
```

---

## Step 6 — Improvement Plan

For each skill below **B grade**, provide a concrete fix plan:

```markdown
### 🛠️ Improvement Plan: [skill-name]

| Priority | Dimension | Score | Target | Action |
|----------|-----------|-------|--------|--------|
| P0 | Trigger Precision (D2) | 3/10 | 8/10 | Rewrite trigger: add file-type + keyword + context signals |
| P0 | Verification (D7) | 2/10 | 8/10 | Add done checklist: "✅ Tests pass ✅ No lint errors ✅ PR ready" |
| P1 | Anti-Patterns (D3) | 4/10 | 7/10 | Convert to "**No X**: Do Y" format. Remove descriptive prose. |
| P2 | Reference Architecture (D8) | 5/10 | 8/10 | Extract examples from body into references/examples.md |
```

Focus order for fixes:
1. **P0**: D2 (Trigger) + D3 (Anti-patterns) — highest hallucination risk
2. **P1**: D7 (Verification) + D6 (Error handling) — agent safety
3. **P2**: D8 (References) + D9 (Token efficiency) — maintainability

---

## Step 7 — Interactive Follow-up

After the report, ask:

1. "Fix **[C-001]** now? I'll rewrite the trigger section and add anti-patterns."
2. "Generate a `task.md` for the full improvement plan?"
3. "Deep-dive on a specific category (e.g., `security`, `database`)?"
4. "Run `battle-test` workflow to cross-validate against Skill Creator standard?"
