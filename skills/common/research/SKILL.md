---
name: Research Standard
description: Evidence-based research — choose the right tool, cite sources, distinguish fact from inference.
metadata:
  labels:
    - research
    - sources
    - citations
    - common
  triggers:
    priority: medium
    confidence: 0.7
    keywords:
      - research
      - sources
      - citations
      - verify
      - fact check
    task_types:
      - research
      - analysis
workflow_ref: update-docs
---

# Research — Source-Backed Knowledge

## **Priority: P1 (OPERATIONAL)**

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

## Context

When answering technical or business questions, every conclusion must be backed by a real source. Never guess or hallucinate.

## Tool Selection

```
What information do you need?
│
├─ Content from a specific URL / static docs?
│   └─→ read_url_content (fast, no JS)
│
├─ General web search?
│   └─→ search_web
│
├─ Page needs login / JS / visual?
│   └─→ browser_subagent (heaviest, use last)
│
## References
- [Examples (Input/Output)](references/examples.md)
- [Notes](references/notes.md)
