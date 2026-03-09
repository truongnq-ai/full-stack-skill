---
name: Spring Boot Scheduling
description: Standards for scheduled tasks and distributed locking with ShedLock
metadata:
  labels: [spring-boot, scheduling, job]
  triggers:
    priority: medium
    confidence: 0.7
    files: ['**/*Scheduler.java', '**/*Job.java']
    keywords: [scheduled, shedlock, cron]
workflow_ref: ui-ux-pro-max
---

# Spring Boot Scheduling Standards

## **Priority: P0**

## Output Template

- **Summary**: <what changed / what was done>
- **Risks**: <known risks or "none">
- **Next Checks**: <tests/verification steps>

## Implementation Guidelines

### Scheduled Tasks

- **ThreadPool**: ALWAYS configure a dedicated `TaskScheduler` (default is 1 thread).
- **Async**: Keep `@Scheduled` methods light; offload to `@Async`/Queues.

### Distributed Locking (ShedLock)

- **Problem**: `@Scheduled` runs on ALL pods in K8s.
- **Solution**: Use **ShedLock** to guarantee single execution.
- **Config**: Set `lockAtMostFor` (deadlock safety) and `lockAtLeastFor` (debounce).

## Anti-Patterns

- **Default Pool**: `**No Default Pool**: Configure ThreadPool.`
- **No Locking**: `**No duplicates**: Use Distributed Lock.`
- **Stateful Tasks**: `**No State**: Assume pod restarts.`

## References

- [Implementation Examples](references/implementation.md)


## References

- [Examples (Input/Output)](references/examples.md)
