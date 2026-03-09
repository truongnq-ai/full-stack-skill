---
name: Android Persistence
description: Standards for Room Database and DataStore
metadata:
  labels: [android, persistence, room, database]
  triggers:
    priority: medium
    confidence: 0.7
    files: ['**/*Dao.kt', '**/*Database.kt', '**/*Entity.kt']
    keywords: ['@Dao', '@Entity', 'RoomDatabase']
workflow_ref: ui-ux-pro-max
---

# Android Persistence Standards

## **Priority: P0**

## Output Template

- **Summary**: <what changed / what was done>
- **Risks**: <known risks or "none">
- **Next Checks**: <tests/verification steps>

## Implementation Guidelines

### Room

- **Async**: Return `Flow<List<T>>` for queries, use `suspend` for Write/Insert.
- **Entities**: Keep simple `@Entity` data classes. Map to Domain models in Repository.
- **Transactions**: Use `@Transaction` for multi-table queries (Relations).

### DataStore

- **Usage**: Replace `SharedPreferences` with `ProtoDataStore` (Type-safe) or `PreferencesDataStore`.
- **Scope**: Inject singleton instance via Hilt.

## Anti-Patterns

- **Main Thread**: `**No IO on Main**: Use Dispatchers.IO (Room helper does this, but verify flow collection).`
- **Domain Leak**: `**No Entities in UI**: Map to Domain/UI Models.`

## References

- [DAO Templates](references/implementation.md)


## References

- [Examples (Input/Output)](references/examples.md)
