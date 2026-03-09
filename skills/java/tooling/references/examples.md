# Examples — Java Tooling (Refined)

## Example 1 — Gradle Version Catalog

**Input**
```kts
implementation("org.slf4j:slf4j-api:2.0.9")
```

**Output**
```kts
implementation(libs.slf4j.api)
```

**Why**
- Centralized dependency versions.

---

## Example 2 — Checkstyle

**Input**
```sh
// no lint
```

**Output**
```sh
./gradlew check
```

**Why**
- Enforces coding standards.
