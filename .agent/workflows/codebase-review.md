---
description: Review an entire codebase against framework best practices and generate a prioritized improvement plan
---

# 🔍 Codebase Review Workflow

> **Use this workflow when**: user asks to review the entire project, assess overall code health, onboard to a new codebase, or run `/codebase-review`. Typical triggers: "review my project", "how's my codebase?", "audit everything".
>
> **Out of scope**: Does not review individual PRs or diffs — use `code-review` for that. Does not review skill/workflow/rule files — use `skill-review`, `workflow-review`, or `rule-review`.
>
> **Applicable rules**: `agent-skill-standard-rule` • `file-safety-rule` • `skill-integrity-rule` • `code-generation-rule` • `testing-rule` • `commit-message-rule`

> [!IMPORTANT]
> **Token Efficiency First**:
> - Use `grep -c` or `wc -l` for metrics — never read entire files for counts.
> - Summarize findings internally; do not repeat skill rules verbatim.
> - Delegate security and architectural deep-dives to `common/` skills.

---

## Step 1 — Project Discovery

```bash
# Detect architecture and stack
ls -F
cat package.json 2>/dev/null || cat lib/main.dart 2>/dev/null || cat go.mod 2>/dev/null || cat pom.xml 2>/dev/null
find . -maxdepth 2 -not -path '*/.*' -not -path '*/node_modules/*' -not -path '*/build/*'
```

> **Fallback**: If no manifest found, run `find . -maxdepth 3 -name "*.json" -o -name "*.yaml" | head -10` to locate config files.

---

## ⏸️ Checkpoint: Confirm Scan Scope

Present findings to user before running full scan:

```
"Detected: [stack] project with ~[N] source files.
Full scan will read up to 3 representative files + run grep metrics.
Proceed? (Y = full scan / N = stop here)"
```

> Only continue to Step 2 after explicit user confirmation.

---

## Step 2 — Skill Mapping

Match detected project to registry. Load matching skill files with `view_file`:

- `skills/common/system-design/SKILL.md`
- `skills/common/security-standards/SKILL.md`

> **Fallback**: If skill paths missing, run `find .agent/skills/ -name "SKILL.md" | head -10` to locate available skills. If none, proceed with **Lite Audit** fallbacks in Steps 3–4.

---

## Step 3 — Broad Health Metrics

Run ecosystem-aware scans to identify hotspots:

```bash
find . -name "*_test.*" -o -name "*.spec.*" | wc -l          # test files
grep -riE "TODO|FIXME" . --exclude-dir=node_modules | wc -l  # tech debt
find src lib -type f -name "*.*" | xargs wc -l 2>/dev/null | awk '$1 > 1000'  # fat files
grep -riE "password|secret|apiKey|token" . --exclude-dir=node_modules -l | head -10  # secrets
```

---

## Step 4 — Security & Architecture Audit

Apply protocols from loaded skills (Step 2). If skills missing, use **Lite Fallback**:

```bash
grep -rE "\+.*SELECT|\+.*INSERT|query\(.*\+" . --include="*.ts" --include="*.go"  # injection
grep -rE "Repository\.|db\." src/controllers lib/widgets 2>/dev/null | wc -l      # layer leakage
find src lib -maxdepth 2 -type f | xargs wc -l 2>/dev/null | awk '$1 > 1000'     # god files
```

Identify 🔴 Critical (P0) findings. Do not block if specialized skills unavailable.

---

## Step 5 — Targeted Deep Dive

Pick **3 representative files** (UI layer, Logic layer, Data layer) using `view_file`. Assess:

- **Typing**: Strictness vs `any`/`dynamic` usage.
- **Error Handling**: Propagation vs silent swallowing.
- **Modularity**: Compliance with detected framework's best practices.

> **Fallback**: If project has fewer than 3 layers, pick the 3 largest source files.

---

## Step 6 — Generate Scored Report

Save to `docs/codebase-review.md` (create `docs/` if missing).

### Scoring Algorithm (base 100)

| Category | Weight | Deductions |
|----------|--------|------------|
| 🛡️ Security | 40% | -15 per secret/auth leak |
| 🏗️ Architecture | 30% | -8 per god-file or layer violation |
| 🧪 Testing & Quality | 30% | -3 per missing test on critical path |

### Output Format

```
## Codebase Review — [Project] — [Date]

### 📊 Score: [X]/100
Primary Framework: [Detected] | Critical Issues: [N]

### 🔴 CRITICAL FINDINGS
- **[SEC-001]** [Finding] — [Impact] — [Fix]
- **[ARCH-001]** [Finding] — [Impact] — [Fix]

### 🟠 HIGH FINDINGS
- **[H-001]** [Finding] — [Fix]

### 🗺️ Improvement Roadmap
| Phase | Focus | Actions |
|-------|-------|---------|
| Phase 1 | Security & Stability | Fix all P0s |
| Phase 2 | Architecture | Refactor hotspot layers |
| Phase 3 | Quality Polish | Test coverage, docs |
```

---

## Step 7 — Interactive Follow-up

After delivering report, ask:

1. "Generate `task.md` for **Phase 1** so we can start immediately?"
2. "Deep-dive on the worst performing module ([Module])?"
3. "Run `code-review` on the 3 worst files found?"
