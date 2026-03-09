---
name: Global Guardrails
description: Global safety rules for all agent actions — scope, confirmation, and data protection.
metadata:
  labels: [guardrails, safety, global]
  triggers:
    keywords: [guardrail, safety, confirm, risk, production]
    task_types: [implementation, refactor, debugging, ops]
workflow_ref: smart-release
---

# Global Guardrails

## **Priority: P0 (CRITICAL)**

## Output Template

- **Summary**: <what changed / what was done>
- **Risks**: <known risks or "none">
- **Next Checks**: <tests/verification steps>

## Non-Negotiables

- **No destructive actions** without explicit confirmation in the current turn.
- **No scope drift** — if new files/actions appear, stop and ask.
- **No secrets exposure** — never log tokens, keys, or credentials.
- **No production changes** without plan + confirmation.

## Confirmation Gates (Must Ask)

- Delete data/files, drop tables, reset/clean git
- Restart/stop services, deploy, migrate DB
- Modify auth/permissions/ACLs, rotate keys

## Safe Execution Rules

- Read before write. Prefer minimal edits over full overwrite.
- If multiple valid approaches exist → present options.
- Always report what changed + what needs verification.

## Output Contract

- If blocked: ask 1 clear question with options.
- If executed: provide summary + risks/next checks.

## References

- [Examples (Input/Output)](references/examples.md)
