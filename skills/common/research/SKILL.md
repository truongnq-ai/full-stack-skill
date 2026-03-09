---
name: Research Standard
description: Evidence-based research — choose the right tool, cite sources, distinguish fact from inference.
metadata:
  labels: [research, sources, citations]
  triggers:
    priority: medium
    confidence: 0.7
    keywords: [research, sources, citations, verify, fact check]
    task_types: [research, analysis]
workflow_ref: update-docs
---

# Research — Source-Backed Knowledge

## **Priority: P1 (OPERATIONAL)**

## Output Template

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
├─ Search within codebase?
│   └─→ grep_search, find_by_name, view_file_outline
│
└─ Search past conversations/knowledge?
    └─→ KI system (knowledge items)
```

## Output Format

```markdown
## Question

<reformulated, verifiable question>

## Results

### Facts (sourced)

- <content> — [Source: <name>](url)

### Analysis / Inference

- <content> _(no direct source, based on reasoning)_

## Conclusion

<concise, actionable summary>
```

## Rules

1. **No hallucination** — if no source found → say "No source found to confirm this"
2. **Cite specific URLs**, not just "according to documentation"
3. **Note access date** when info may expire (API versions, pricing)
4. **Don't use info older than 2 years** for frameworks/cloud services
5. **Reliability tiers**: official docs > GitHub main > dated blog posts
6. **Read 2-3 search results** minimum before concluding


## References

- [Examples (Input/Output)](references/examples.md)
