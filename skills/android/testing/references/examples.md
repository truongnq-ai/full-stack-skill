# Examples — Android Testing (Refined)

## Example 1 — UI Test

**Input**
```kotlin
// manual UI checks
```

**Output**
```kotlin
composeTestRule.onNodeWithText("Login").performClick()
```

**Why**
- Automated UI test.

---

## Example 2 — Unit Test

**Input**
```kotlin
// no unit tests
```

**Output**
```kotlin
@Test fun add() { assertEquals(2, add(1,1)) }
```

**Why**
- Verifies logic.
