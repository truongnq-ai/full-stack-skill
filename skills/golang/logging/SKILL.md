---
name: Logging
description: Standards for structured logging and observability in Golang.
metadata:
  labels: [golang, logging, slog, zap, observability]
  triggers:
    priority: medium
    confidence: 0.7
    files: ['go.mod', 'pkg/logger/**']
    keywords: [logging, slog, structured logging, zap]
workflow_ref: performance
---

# Golang Logging Standards

## **Priority: P1 (STANDARD)**

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

## Principles

- **Structured Logging**: Use JSON or structured text. Readable by machines and humans.
- **Leveled Logging**: Debug, Info, Warn, Error.
- **Contextual**: Include correlation IDs (TraceID, RequestID) in logs.
- **No `log.Fatal`**: Avoid terminating app inside libraries. Return error instead. Only `main` should exit.

## Libraries

- **`log/slog` (Recommended)**: Stdlib since Go 1.21. Fast, structured, zero-dep.
- **Zap (`uber-go/zap`)**: High performance, good if pre-1.21 or extreme throughput needed.
- **Zerolog**: Zero allocation, fast JSON logger.

## Guidelines

- Initialize logger at startup.
- Inject logger or use a global singleton configured at startup (pragmatic choice).
- Use `slog.Attr` for structured data.

## References

- [Slog Patterns](references/slog-patterns.md)


## References

- [Examples (Input/Output)](references/examples.md)
