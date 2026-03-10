---
description: Review and audit AI agent workflows against a standardized quality framework. Produces a scored report with actionable improvement recommendations.
---

# 🔍 Workflow Review & Audit

> **Goal**: Evaluate one or more workflow files (`.agent/workflows/*.md`) against a standardized quality framework. Produce a scored audit report and prioritized improvement plan.

> [!IMPORTANT]
> This workflow is both a **review process** and a **quality standard**. Use it to:
> - Audit existing workflows before release
> - Validate new workflows before merging
> - Benchmark workflow quality across the entire repo

---

## Step 1 — Inventory & Scope

Determine what to review.

- If user specifies a file → review that single workflow.
- If user says "all" → inventory the full directory:

```bash
ls -la .agent/workflows/*.md | grep -v workflow-review.md
```

For each file, extract the frontmatter `description` to build a quick summary table:

```bash
for f in .agent/workflows/*.md; do
  desc=$(head -3 "$f" | grep "description:" | sed 's/description: //')
  echo "| $(basename $f) | $desc |"
done
```

**Output**: A table of all workflows with their descriptions. Confirm scope with user before proceeding.

---

## Step 2 — Structural Compliance Check

For each workflow in scope, verify the **mandatory structure**:

| # | Check | Pass Criteria |
|---|-------|---------------|
| S1 | YAML frontmatter | Has `---` block with `description:` field |
| S2 | Title heading | Has exactly one `# Title` (H1) |
| S3 | Step numbering | Uses `## Step N` or `## N.` heading pattern |
| S4 | Step count | Between 3–9 steps (sweet spot: 5–7) |
| S5 | Line count | Total file ≤ 150 lines |

```bash
# Quick structural signals
for f in .agent/workflows/*.md; do
  lines=$(wc -l < "$f")
  steps=$(grep -c "^## " "$f")
  has_front=$(head -1 "$f" | grep -c "^---")
  echo "$(basename $f): ${lines} lines, ${steps} steps, frontmatter=${has_front}"
done
```

---

## Step 3 — Deep Quality Audit (Per Workflow)

Read each workflow in scope. Evaluate against **8 dimensions**, each scored 0–10:

### Dimension Rubric

| # | Dimension | What to Check | Score Guide |
|---|-----------|---------------|-------------|
| D1 | **Scope & Responsibility** | Single clear goal? Not overloaded with multiple unrelated tasks? | 10 = laser-focused, 0 = 5+ unrelated goals |
| D2 | **Trigger Clarity** | Agent knows WHEN to use this? Description field is specific? | 10 = precise context, 0 = vague "for coding" |
| D3 | **Step Decomposition** | Steps are sequential, logical, right granularity? Has decision points? | 10 = deterministic flow, 0 = "fix everything" |
| D4 | **Tool & Command Usage** | Explicit tool calls / bash commands? Agent knows HOW to execute? | 10 = every step has explicit actions, 0 = no tools mentioned |
| D5 | **Error Handling** | What happens if a step fails? Fallback / retry defined? | 10 = explicit fallbacks, 0 = no error handling |
| D6 | **Output Contract** | Clear definition of what the workflow produces? Exit criteria defined? | 10 = exact output format, 0 = undefined ending |
| D7 | **User Interaction** | Approval points defined? Agent knows when to ask vs auto-proceed? | 10 = clear checkpoints, 0 = fully autonomous with no gates |
| D8 | **Token Efficiency** | Concise instructions? No filler text? Scoped file reads? | 10 = lean & imperative, 0 = verbose prose |

### Scoring Rules

- **8-10**: Production-ready, meets all criteria.
- **5-7**: Functional but has clear improvement areas.
- **3-4**: Needs significant rework before use.
- **0-2**: Fundamentally broken, should be rewritten.

---

## Step 4 — Cross-Cutting Checks

After individual audits, check repo-level quality:

| # | Check | Issue if Failed |
|---|-------|-----------------|
| X1 | **Overlap Detection** | Two workflows covering the same use case → agent confusion |
| X2 | **Naming Convention** | File names are kebab-case, descriptive, match the workflow goal |
| X3 | **Modularity** | Workflows reference skills/other workflows instead of hardcoding logic |
| X4 | **Security** | No workflow runs destructive commands with auto-approve. No secret leaks |
| X5 | **Idempotency** | Running workflow twice does not create duplicates or break state |

---

## Step 5 — Scored Report

Output the report in this format:

```
╔══════════════════════════════════════════════════════════════╗
║              🔍 WORKFLOW AUDIT REPORT                        ║
║  Directory: .agent/workflows/                                ║
║  Workflows Reviewed: [N]       Date: [YYYY-MM-DD]           ║
║  Overall Score: [X / 80]                                     ║
╚══════════════════════════════════════════════════════════════╝

### 📊 Per-Workflow Scores

| Workflow | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | Total | Grade |
|----------|----|----|----|----|----|----|----|----|-------|-------|
| code-review.md | 9 | 8 | 9 | 10 | 6 | 8 | 9 | 8 | 67/80 | A |
| plan-feature.md | 10 | 7 | 8 | 6 | 3 | 7 | 9 | 8 | 58/80 | B |

Grade Scale: A (65+), B (50-64), C (35-49), D (20-34), F (<20)

### 🔴 Critical Findings
- **[C-001]** [workflow] — [issue description]

### 🟠 Important Findings
- **[I-001]** [workflow] — [issue description]

### 🟡 Suggestions
- **[S-001]** [workflow] — [improvement idea]

### ❌ Cross-Cutting Issues
- **[X-001]** [issue description]
```

---

## Step 6 — Improvement Plan

For each workflow scoring below **B grade** (< 50/80):

1. List the lowest-scoring dimensions.
2. Provide a concrete rewrite suggestion for each weak dimension.
3. Prioritize by impact: Error Handling > Output Contract > Tool Usage > others.

**Output format**:

```markdown
### 🛠️ Improvement Plan: [workflow-name.md]

| Priority | Dimension | Current | Target | Action |
|----------|-----------|---------|--------|--------|
| P0 | Error Handling (D5) | 3/10 | 7/10 | Add fallback step after test execution |
| P1 | Output Contract (D6) | 4/10 | 8/10 | Define exact output format and save path |
```

---

## Step 7 — Interactive Follow-up

After the report, ask:

1. "Pick a specific workflow to deep-dive and rewrite?"
2. "Generate improved versions of all C/D-grade workflows?"
3. "Create a `task.md` checklist for the improvement plan?"
