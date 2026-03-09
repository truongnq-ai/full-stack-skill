# Examples — Clarification (Refined)

## Example 1 — Ambiguous Requirement

**Input**
"Add discount field"

**Output**
"Ask: A) percentage B) fixed amount C) tiered. Recommend B based on current pricing model."

**Why**
- Avoids wrong assumptions.

---

## Example 2 — Multiple Valid Approaches

**Input**
"Cache user profile"

**Output**
"Ask: A) Redis B) in-memory LRU. Recommend Redis for multi-instance scale."

**Why**
- Surfaces trade-offs before implementation.
