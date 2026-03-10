---
description: Review and audit AI agent rules against a standardized quality framework. Produces a scored report with conflict analysis and actionable improvement recommendations.
---

# 📏 Rule Review & Audit

> **Goal**: Evaluate one or more rule files (`.agent/rules/*.md`) against a quality framework designed to ensure rules effectively constrain LLM behavior — preventing hallucination, file corruption, scope drift, and security violations.

> **Out of scope**: Does not review workflows or skills — use `workflow-review` or `skill-review` for those.
>
> **Applicable rules**: `agent-skill-standard-rule` • `file-safety-rule` • `skill-integrity-rule` • `commit-message-rule`

> [!IMPORTANT]
> A rule is not documentation — it is a **behavioral constraint** injected into the LLM's context.
> Evaluate every rule through this lens:
> _"Will this instruction reliably override LLM default behavior, and can a reviewer verify compliance?"_

---

## Step 1 — Inventory & Discovery

Determine scope of the review.

- If user specifies a file → review that rule file.
- If user says "all" → full scan:

```bash
# List all rule files
find . -name "*.md" -path "*rules*" | sort

# Quick health signals
echo "=== Vague rules (likely unenforced) ==="
grep -rn "carefully\|appropriate\|when possible\|try to\|consider" .agent/rules/

echo "=== Rules without explicit scope ==="
grep -rL "applies when\|only when\|do not.*in\|scope:" .agent/rules/

echo "=== Oversized rule files (>80 lines) ==="
find .agent/rules/ -name "*.md" -exec awk 'END{if(NR>80) print FILENAME": "NR" lines"}' {} \;
```

Confirm scope with user before proceeding.

---

## Step 2 — Structural Compliance Check

For each rule file, verify mandatory structure **before reading** the content:

| # | Check | Pass Criteria |
|---|-------|---------------|
| S1 | YAML frontmatter | Has `---` block with `description:` or `applyTo:` |
| S2 | Priority declaration | Has `GLOBAL` / `CONTEXTUAL` or priority level |
| S3 | Scope declaration | Explicit "applies when" or "applies to" statement |
| S4 | Instruction format | Uses imperative mood: "Do X" / "Never Y" |
| S5 | Line count | Rule file ≤ 80 lines. Individual rules ≤ 2 lines each |

```bash
f="path/to/rule.md"
echo "Lines: $(wc -l < $f)"
echo "Has scope: $(grep -c 'applies when\|applies to\|scope\|applyTo' $f)"
echo "Has priority: $(grep -c 'GLOBAL\|CONTEXTUAL\|CRITICAL\|P0\|P1' $f)"
echo "Vague words: $(grep -c 'carefully\|appropriate\|when possible' $f)"
```

---

## Step 3 — Deep Quality Audit (Per Rule File)

Read each rule file. Score **8 dimensions** (0–10 each, total 80 pts):

### Dimension Rubric

| # | Dimension | What to Evaluate | Score Guide |
|---|-----------|------------------|-------------|
| **D1** | **Purpose & Necessity** | Rule addresses a clear, specific risk? Not redundant with another rule? Has a reason to exist? | 10 = single risk, clearly justified \| 0 = vague "be careful" with no identifiable risk |
| **D2** | **Scope & Applicability** | Clear about when rule applies (global vs contextual)? Agent knows in which tasks to activate it? | 10 = explicit global/contextual + trigger condition \| 0 = no scope definition |
| **D3** | **Instruction Precision** | Specific, measurable, unambiguous instruction? No hedging words? Tells agents exactly what to do OR not do? | 10 = concrete, quantifiable (`≤3 files`, `must run tests`) \| 0 = `be careful`, `try to avoid` |
| **D4** | **Enforceability & Testability** | Can compliance be verified? Has a test command or verification step? Pass/fail is objectively deterministic? | 10 = has explicit verification command \| 0 = cannot be tested, purely honor-based |
| **D5** | **Safety & Boundaries** | Protects against file deletion, secret exposure, dependency breakage, or production corruption? | 10 = covers all relevant safety vectors \| 0 = no safety consideration |
| **D6** | **Conflict & Layering** | No conflict with existing skills/workflows? Override order defined? If conflict exists, resolution is explicit? | 10 = no conflicts OR explicit override declared \| 0 = silent conflict with workflow |
| **D7** | **Hallucination Prevention** | Forces agent to gather information before acting? Prevents assumption-based actions? Uses tool-first pattern? | 10 = explicit "read before write", "verify before delete" \| 0 = assumes agent knows file structure |
| **D8** | **Framing & Token Efficiency** | Positive framing where possible ("Do X" > "Don't Y")? Alternative action provided with negatives? Concise (≤2 lines per rule)? | 10 = positive + alternative + ≤2 lines \| 0 = lengthy negative-only instruction with no alternative |

### Scoring Scale

| Score | Grade | Meaning |
|-------|-------|---------|
| 70–80 | **A** | Production-ready. LLM will reliably comply. |
| 55–69 | **B** | Functional. Minor precision gaps. |
| 35–54 | **C** | Partially effective. Inconsistent LLM compliance likely. |
| 20–34 | **D** | Mostly unenforced. High hallucination risk. |
| 0–19 | **F** | LLM will ignore or misinterpret. Do not use. |

---

## Step 4 — Conflict Analysis

This step is **unique to rule review**. Check for conflicts across the entire agent system:

### Cross-system conflict checks

```bash
# Extract all "never / do not" constraints from rules
grep -rh "Never\|Do not\|Must not\|Avoid" .agent/rules/ | sort

# Extract all "actions" from workflows
grep -rh "update\|modify\|delete\|install\|run\|write" .agent/workflows/ | sort

# Manually cross-check: does a workflow action violate a rule constraint?
```

### Conflict severity classification

| Type | Description | Example |
|------|-------------|---------|
| 🔴 **Hard Conflict** | Rule explicitly forbids what workflow requires | Rule: "Never modify config" / Workflow: "Update `.env` to fix issue" |
| 🟠 **Soft Conflict** | Rule restricts scope that workflow partially touches | Rule: "Only edit files in `src/`" / Workflow edits `docs/` |
| 🟡 **Ambiguous Overlap** | Rule and workflow both address same concern with different standards | Rule: "3 files max" / Workflow has no file limit |

For each conflict found:
1. Document which rule and which workflow/skill are in conflict.
2. Recommend resolution: relax rule scope, update workflow with override declaration, or add contextual exception.

---

## Step 5 — LLM Compliance Simulation

For rules scoring below **B grade**, simulate LLM compliance:

Ask:
1. **Precision test**: Given this rule, would an LLM know **exactly** what is allowed and forbidden?
2. **Enforcement test**: Could a reviewer tell if the LLM violated this rule, or is it invisible?
3. **Framing test**: Would the LLM comply better if the rule was phrased differently?

Document findings:
```
🔴 UNENFORCED — "Write clean code" — no LLM can reliably comply; no way to verify.
🟠 PRECISION GAP — "Avoid large changes" — LLM will interpret "large" differently each run.
🟡 NEGATIVE FRAMING — "Don't use any type" alone. Add: "Use explicit types or `unknown` instead."
```

---

## Step 6 — Scored Report

Output:

```
╔══════════════════════════════════════════════════════════════╗
║                📏 RULE AUDIT REPORT                          ║
║  Directory: .agent/rules/          Date: [YYYY-MM-DD]        ║
║  Rules Reviewed: [N]               Overall Score: [X / 80]   ║
╚══════════════════════════════════════════════════════════════╝

### 📊 Dimension Scores

| Rule File | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | Total | Grade |
|-----------|----|----|----|----|----|----|----|----|-------|-------|
| agent-skill-standard-rule.md | 8 | 7 | 6 | 4 | 8 | 5 | 7 | 6 | 51/80 | C |

### ⚔️ Conflict Map
| Rule | Conflicts With | Type | Resolution |
|------|---------------|------|------------|
| "Never modify config" | sync.md Step 4 | 🔴 Hard | Add override: "except during sync workflow" |

### 🔴 Critical Findings
- **[C-001]** `[rule]` — D3: Rule uses "avoid when possible" — not enforceable.

### 🟠 Important Findings
- **[I-001]** `[rule]` — D6: Conflicts with `[workflow]` Step N — no override declared.

### 🟡 Suggestions
- **[S-001]** `[rule]` — D8: Rephrase from "Don't use X" to "Use Y instead of X".

### ⚠️ LLM Compliance Risks
- **[B-001]** `[rule]` — LLM will interpret "large changes" inconsistently across runs.
```

---

## Step 7 — Improvement Plan

For each rule file below **B grade**:

```markdown
### 🛠️ Improvement Plan: [rule-file.md]

| Priority | Dimension | Score | Action |
|----------|-----------|-------|--------|
| P0 | Instruction Precision (D3) | 3/10 | Replace "be careful with X" → "Never modify X without user confirmation" |
| P0 | Enforceability (D4) | 2/10 | Add: "Verify: grep -r 'X' src/ → must return 0 results" |
| P1 | Conflict Resolution (D6) | 4/10 | Declare override in conflicting workflow: "Rule Y does not apply in this workflow" |
| P2 | Framing (D8) | 5/10 | Rewrite all "Do not X" rules to "Do X instead" with alternative |
```

Fix order priority:
1. **P0**: D3 (Precision) + D4 (Enforceability) — unenforced rules are worse than no rules
2. **P1**: D6 (Conflicts) — silent conflicts corrupt the agent system silently
3. **P2**: D8 (Framing) + D7 (Hallucination prevention) — quality of life improvements

---

## Step 8 — Interactive Follow-up

After the report, ask:

1. "Fix **[C-001]** now? I'll rewrite the rule with explicit instruction and verification command."
2. "Resolve conflict **[conflict-001]**? I'll add an override declaration to the workflow."
3. "Generate a global conflict map across all rules, skills, and workflows?"
4. "Run `skill-review` or `workflow-review` for a full 3-layer system audit?"
