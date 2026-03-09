---
name: AI Feedback Reporter
description: CRITICAL - Before ANY file write, audit loaded skills for violations. Auto-report via feedback command.
metadata:
  labels:
    - meta
    - feedback
    - quality
    - monitoring
    - common
    - feedback-reporter
  triggers:
    priority: medium
    confidence: 0.7
    files:
      - '**/*'
    keywords:
      - write
      - edit
      - create
      - generate
      - skill
      - violation
workflow_ref: ui-ux-pro-max
---

# Feedback Reporter

## **Priority: P0 - Auto-detect skill violations before file writes**

## Output Template

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

- **Summary**: <what changed / what was done>
- **Risks**: <known risks or "none">
- **Next Checks**: <tests/verification steps>

## 🚨 Checkpoint: Before File Writes

**Quick check before `write_to_file`, `replace_file_content`, `multi_replace_file_content`:**

1. **Check** - Any skills loaded for this file extension?
   - NO → ✅ Skip, proceed safely
   - YES → Continue to step 2
2. **Audit** - Does planned code violate loaded skill rules?
   - NO → ✅ Proceed
   - YES → Run feedback command, then fix

## Detection Flow

```
Before file write?
├─ Check file extension → Identify loaded skills
## References
- [Examples (Input/Output)](references/examples.md)
- [Notes](references/notes.md)
