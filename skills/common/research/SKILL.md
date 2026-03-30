---
name: Evidence-based Research Standard
description: Core methodology for executing technical research, validating assumptions, citing facts, and distinguishing proof from inference.
category: common
metadata:
  labels: [research, methodology, evidence, verification]
  triggers:
    priority: critical
    confidence: 1.0
    keywords: [research, investigate, analyze, study, survey]
---

# 🔬 Evidence-based Research Standard

> **Use this skill when**: the agent begins an investigatory task, analyzes an unknown codebase, evaluates a bug root cause, or plans a major architecture change. Trigger: `/core-research-protocol`.
>
> **Out of scope**: This skill does not dictate *how* to write code. It strictly governs *how* to gather facts before writing code.

---

## 🚫 Anti-Patterns

- **Hallucinated Truths**: Stating "The database uses MongoDB" because of a fleeting clue, without verifying the connection string or dependency list.
- **Blind Commits**: Modifying a function without first running `grep_search` to see where else it is invoked.
- **Surface Scrolling**: Reading only the top 100 lines of a file and assuming the bottom 500 lines don't override the behavior.
- **Tool Spammery**: Running `find /` or generic searches without targeted filters, polluting the context window.

---

## 🛠 Prerequisites & Tooling

1. Mastery of read-only exploration tools: `view_file`, `grep_search`, `list_dir`.
2. Familiarity with the target codebase directory structure.

---

## 🔄 Execution Workflow

### Step 1 — Hypothesis Formulation
Before invoking any tool, explicitly formulate what you are looking for.
*Example*: "Hypothesis: The auth middleware rejects the token before reaching the controller."

### Step 2 — Targeted Tool Selection
Select the most granular tool possible:
- Need to find where `verifyToken` is defined? Use `grep_search` with exact query.
- Need to understand a folder's layout? Use `list_dir`.
- Need deep context of a specific logic block? Use `view_file` on the exact path returned by `grep_search`.

### Step 3 — Fact Gathering & Citation
When collecting data, distinguish between Fact and Inference:
- **Fact**: "File `auth.ts` lines 40-45 contain the `verifyToken` function."
- **Fact**: "Package.json expresses dependency on `jsonwebtoken ^9.0.0`."
- **Inference**: "Therefore, the legacy auth bug is likely caused by version mismatch."

*Rule*: All inferences MUST be backed by at least two Cited Facts. Use line numbers or literal excerpts as citations.

### Step 4 — Negative Testing (Falsification)
Attempt to prove your assumption wrong. 
If you believe `auth.ts` controls all routing security, run `grep_search` for other authentication middlewares (e.g., `passport`, `jwt`) across the repository to verify it's the *only* truth.

### Step 5 — Synthesize Findings
Generate a concise research artifact `docs/research/research-[topic].md`.
Format:
```markdown
### Primary Finding
[Executive summary of the truth]

### Evidence Trail
1. `src/auth.ts:40` - [Excerpt]
2. `package.json` - [Excerpt]

### Unverified Knowns
- [What remains unknown or out of scope]
```

---

## ⚠️ Error Handling (Fallback)

| Scenario | Encountered | Resolution Strategy |
|----------|-------------|---------------------|
| No Results | `grep_search` returns empty | Widen search parameters. Search for synonyms, or fallback to folder-level `list_dir` to look for alternative structures (e.g., searching `login` instead of `auth`). |
| Massive Output | Limit reached on tool | Refine search using exact phrases or specific file extensions (`Includes: ["*.ts"]`). Never read raw compressed bundles (`.min.js`). |
| Conflicting Facts| File A says X, File B says Y | Favor the most recently updated file (check `git log`), or explicitly ask the User for the Single Source of Truth. |

---

## ✅ Done Criteria / Verification

Research phase is officially complete when:

- [ ] A definitive Fact has been retrieved by a direct tool reading (`view_file`/`grep`).
- [ ] At least one attempt at falsification was performed.
- [ ] A summary report or implementation plan was updated with exact file/line citations.
- [ ] The agent state explicitly acknowledges the shift from Phase (Research) to Phase (Execution).
