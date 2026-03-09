# Examples — Android Architecture

## Example 1 — Layered Flow

**Input**
```kotlin
viewModel.load()
repository.getData()
```

**Output**
```kotlin
viewModel.load()
useCase.execute()
repository.getData()
```

**Why**
- Enforces Domain layer.

---

## Example 2 — UI Logic in Activity

**Input**
```kotlin
class MainActivity { fun onClick() { /* business logic */ } }
```

**Output**
```kotlin
class MainActivity { fun onClick() { viewModel.onClick() } }
```

**Why**
- Keeps UI layer thin.
