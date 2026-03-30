---
name: Content & Syntax Audit
description: Audits documentation, user strings, localization files, and generic markdown for clarity, grammar, and brand adherence.
category: roles/reviewer
metadata:
  labels: [reviewer, audit, content, copy, ui-strings]
  triggers:
    priority: low
    confidence: 0.8
    keywords: [audit content, review copy, spellcheck, proofread, localization]
---

# 📝 Content & Syntax Audit

> **Use this skill when**: reviewing UI strings (i18n files), READMEs, API guides, release notes, or public-facing copy. Trigger: `/reviewer-audit-content`.
>
> **Out of scope**: This is NOT for reviewing executable source code logic (use `roles/reviewer/code-review/SKILL.md`). This evaluates *human-readable text*.

---

## 🚫 Anti-Patterns

- **Robotic Vocabulary**: Approving copy that sounds like a database error ("Error 404: User identifier invalid") instead of user-centric copy ("We couldn't find that account.").
- **Ignoring Markdown Syntax**: Leaving broken links `[Like this]( htt://broken)` untouched in documentation.
- **Inconsistent Voice**: Mixing first-person ("I will deploy") with third-person ("The system deploys") in a generic repository README.
- **Grammar Blindness**: Failing to catch obvious typos in high-visibility alert dialogs.

---

## 🛠 Prerequisites & Tooling

1. The target file(s): `README.md`, `locales/en.json`, or `.mdx` doc files.
2. Knowledge of standard Markdown syntax and standard UI UX writing principles (Concise, Clear, Useful).

---

## 🔄 Execution Workflow

### Step 1 — Ingestion & Scope
Load the target text utilizing `view_file`.
Identify the context of the content:
- Is it a **Developer Tool**? (Needs exact, technical, dry tone).
- Is it a **B2C UI Alert**? (Needs empathetic, clear, non-jargon tone).
- Is it an **Executive Summary**? (Needs precise metrics and active voice).

### Step 2 — The 3-Layer Audit
Sweep the text through three distinct lenses:

1. **Syntax & Markdown Checks**
   - Are headers properly sequenced (H1 -> H2 -> H3)?
   - Do all embedded images/links actually resolve structurally?
   - Are fenced code blocks using the correct syntax highlighting flag?
2. **Grammar & Spelling**
   - Identify typos, run-on sentences, and basic grammatical errors.
3. **Tone & UX Quality**
   - Rewrite passive voice into active voice (e.g., "The button is clicked by the user" -> "The user clicks the button").
   - Eliminate redundant words ("in order to" -> "to").
   - Strip out overly hostile UI messages ("You failed to enter a valid email" -> "Please enter a valid email").

### Step 3 — Compile the Feedback
Output the critique in a structured format mapping the line number/JSON key to the suggested change.

```markdown
# 📝 Content Audit Report

**File**: `locales/en.json`

| Key / Line | Current Copy | Suggested Rewrite | Reason |
|------------|--------------|-------------------|--------|
| `auth.err1` | "Login failure timeout reached." | "Login timed out. Please try again." | Too robotic; needs clear next-step. |
| `btn.sub` | "Submitting Data" | "Submit" | UI buttons should use actionable base verbs. |

**File**: `README.md`
- **Line 45**: Broken link. `[API Docs](docs/api)` missing `.md` extension.
- **Line 60**: Typo. "Integartion" -> "Integration".
```

### Step 4 — Verification Output
State if the content requires a major overhaul (Reject) or just minor typo fixes (Approve with Nits).

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Foreign Language | Content isn't English but agent lacks specific domain nuance | Audit strictly for syntax (broken tags, missing JSON quotes) and explicitly bypass tonal/grammar analysis. |
| Massive File | `terms-of-service.md` is 5000 lines | Do NOT rewrite the entire file. Extract the top 5 most critical grammatical flaws and instruct user to use a dedicated spellchecker script. |

---

## ✅ Done Criteria / Verification

An audit is complete when:

- [ ] All broken markdown syntax (unclosed asterisks, broken links) is identified.
- [ ] At least one pass for Active vs. Passive voice has been conducted.
- [ ] Feedback is formatted in an easily actionable table or line-by-line list.
- [ ] Suggestions maintain the original factual meaning of the text.
