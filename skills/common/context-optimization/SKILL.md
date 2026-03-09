---
name: Context Optimization
description: >-
  Techniques to maximize context window efficiency, reduce latency, and prevent 'lost in middle' issues through
  strategic masking and compaction.
metadata:
  labels:
    - context
    - optimization
    - tokens
    - memory
    - performance
    - common
    - context-optimization
  triggers:
    priority: medium
    confidence: 0.7
    files:
      - '*.log'
      - chat-history.json
    keywords:
      - reduce tokens
      - optimize context
      - summarize history
      - clear output
workflow_ref: performance
---

## **Priority: P1 (OPTIMIZATION)**

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

Manage the Attention Budget. Treat context as a scarce resource.

## 1. Observation Masking (Noise Reduction)

**Problem**: Large tool outputs (logs, JSON lists) flood context and degrade reasoning.
**Solution**: Replace raw output with semantic summaries _after_ consumption.

1.  **Identify**: outputs > 50 lines or > 1kb.
2.  **Extract**: Read critical data points immediately.
3.  **Mask**: Rewrite history to replace raw data with `[Reference: <summary_of_findings>]`.
4.  **See**: `references/masking.md` for patterns.

## 2. Context Compaction (State Preservation)

**Problem**: Long conversations drift from original intent.
**Solution**: Recursive summarization that preserves _State_ over _Dialogue_.

1.  **Trigger**: Every 10 turns or 8k tokens.
2.  **Compact**:
    - **Keep**: User Goal, Active Task, Current Errors, Key Decisions.
    - **Drop**: Chat chit-chat, intermediate tool calls, corrected assumptions.
3.  **Format**: Update `System Prompt` or `Memory File` with compacted state.
4.  **See**: `references/compaction.md` for algorithms.

## 3. KV-Cache Awareness (Latency)

**Goal**: Maximize pre-fill cache hits.

- **Static Prefix**: strict ordering: System -> Tools -> RAG -> User.
- **Append-Only**: Avoid inserting into the middle of history if possible.

## References

- [Observation Masking Patterns](references/masking.md)
- [Compaction Algorithms](references/compaction.md)


## References

- [Examples (Input/Output)](references/examples.md)
