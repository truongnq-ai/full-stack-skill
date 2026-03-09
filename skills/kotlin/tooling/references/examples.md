# Examples — Kotlin Tooling (Refined)

## Example 1 — Ktlint

**Input**
```sh
// no formatter
```

**Output**
```sh
./gradlew ktlintFormat
```

**Why**
- Consistent style.

---

## Example 2 — Detekt

**Input**
```sh
// no static analysis
```

**Output**
```sh
./gradlew detekt
```

**Why**
- Finds code smells early.
