# Examples — Flutter Feature Clean Architecture (Refined)

## Example 1 — Feature Folder

**Input**
```text
lib/ (flat)
```

**Output**
```text
lib/features/user/{data,domain,presentation}
```

**Why**
- Clear feature boundaries.

---

## Example 2 — Use Case

**Input**
```dart
repo.getUser()
```

**Output**
```dart
GetUserUseCase(repo).call()
```

**Why**
- Encapsulates business logic.
