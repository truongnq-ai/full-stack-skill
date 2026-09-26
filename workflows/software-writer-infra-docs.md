---
description: "Document infrastructure, system architecture, ADRs, and deployment runbooks."
---

# ✍️ Writer: Infrastructure & Architecture Docs

> **Use this workflow when**: Writer needs to document infrastructure setup, architecture decisions (ADR), deployment runbooks, environment configs, or system topology. Trigger: `/software-writer-infra-docs`.
>
> **Out of scope**: Does not document APIs — use `/software-writer-api-docs`. Does not document user-facing features — use `/software-writer-user-manuals`. Does not design the architecture — use `/software-ba-system-design`.
>
> **Activates skills**: `skills/roles/writer/infra-docs/SKILL.md`, `skills/roles/dev/architecture-decision-records/SKILL.md`, `skills/common/documentation/SKILL.md`

---

## Step 1 — Load Skills & Classify Doc Type

```
view_file skills/roles/writer/infra-docs/SKILL.md
view_file skills/roles/dev/architecture-decision-records/SKILL.md
```

Determine what type of document is needed:

| Type | Trigger phrase | Output file |
|---|---|---|
| ADR | "architecture decision", "why did we choose" | `docs/adr/ADR-NNN-<title>.md` |
| Runbook | "deployment steps", "how to deploy", "rollback" | `docs/runbooks/<service>-runbook.md` |
| Architecture overview | "system diagram", "topology", "C4 diagram" | `docs/architecture/overview.md` |
| Environment config | "env vars", "configuration guide" | `docs/configuration.md` |

---

## Step 2 — Gather Context

Read existing infra files for context:

```bash
cat docker-compose*.yml 2>/dev/null | head -60
cat .env.example 2>/dev/null
find docs/adr -name "*.md" 2>/dev/null | tail -5
```

> **Fallback**: If no infra files exist, ask user for:
> 1. List of services (name, port, language)
> 2. Environment names (e.g., dev, staging, prod)
> 3. Deployment platform (Docker / K8s / bare metal / cloud)
> Then draft the document from user answers.

---

## Step 3 — Write Document

**For ADR** — use template:
```markdown
## ADR-NNN: <Title>
**Status**: Accepted | Proposed | Deprecated
**Date**: YYYY-MM-DD
**Context**: <problem statement>
**Decision**: <what was decided>
**Rationale**: <why this choice>
**Consequences**: <trade-offs>
```

**For Runbook** — include:
- Pre-conditions (env vars, access required)
- Step-by-step procedure (numbered, imperative)
- Rollback procedure
- Health check commands

**For Architecture Overview** — include Mermaid C4 diagram + component table.

---

## ⏸️ Checkpoint: Doc Review

```
"Draft complete:
- Document type: [ADR / Runbook / Architecture / Config]
- Sections complete: [N/total]
- Diagrams included: [Y/N]

Approve and save? (Y / N — revise first)"
```

---

## Step 4 — Save & Link

Save to target path. Update `docs/README.md` index:

```bash
# Guard: create README if missing
[ -f docs/README.md ] || echo "# Documentation Index" > docs/README.md
echo "- [<Title>](<path>)" >> docs/README.md
```

---

## Done Criteria

- [ ] Document saved to correct path under `docs/`
- [ ] ADR: has Status + Context + Decision + Consequences
- [ ] Runbook: has rollback procedure and health check commands
- [ ] Architecture: has Mermaid diagram
- [ ] `docs/README.md` updated with link

> **Required Skill**: `skills/roles/dev/architecture-decision-records/SKILL.md`
