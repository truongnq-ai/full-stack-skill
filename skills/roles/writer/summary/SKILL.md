---
name: Executive Summary & Briefs
description: Condenses extensive technical discussions, git histories, or requirements into high-value, C-level executive summaries.
category: roles/writer
metadata:
  labels: [writer, summarization, tldr, executive-brief]
  triggers:
    priority: medium
    confidence: 0.8
    keywords: [summarize, tldr, brief, abstract, condense]
---

# 📝 Executive Summary & Briefs

> **Use this skill when**: the user requests a "TL;DR", a release brief, or an executive summary of a massive, multi-page technical document or Slack thread. Trigger: `/writer-summarize`.
>
> **Out of scope**: This is NOT for rewriting the actual codebase documentation (use `skills/roles/writer/docs/SKILL.md`). This does not translate code to other languages.

---

## 🚫 Anti-Patterns

- **Fluff Generation**: Using words like "In this comprehensive report we will explore..." instead of jumping straight into the facts.
- **Lost Metrics**: Summarizing a performance document without citing the explicit drop in latency (e.g., dropping the "200ms -> 50ms" fact).
- **Paragraph Walls**: Outputting a 500-word block of prose. Executives read bullet points.
- **Jargon Overload**: Assuming non-technical stakeholders understand "Redis LUA unblocked the event loop" instead of "Fixed the system freeze issue".

---

## 🛠 Prerequisites & Tooling

1. The target raw text, file, or `docs/` repository path to be summarized.
2. Read access to `view_file` or `grep_search` to ingest the source material.

---

## 🔄 Execution Workflow

### Step 1 — Ingestion & Triage
Load the raw document using `view_file`.
Highlight the three components of a perfect brief:
- **The Core Problem** (Why did we do this?)
- **The Core Solution** (What did we actually build/fix?)
- **The Business Impact** (How does this save time/money or reduce risk?)

### Step 2 — Draft the TL;DR Layer (The 5-Second Read)
Write exactly 2 to 3 sentences summarizing the entire event.
*Example*: "We migrated the authentication system to OAuth2. This resolves the critical security vulnerability (BUG-101) and allows users to login via Google, expected to boost conversion by 15%."

### Step 3 — Draft the Bulleted Details (The 30-Second Read)
Extract the most critical metrics and technical changes into a strict list of 3-5 bullet points.
- Omit code snippets.
- Use bold text for key metrics.
- Attribute stakeholders if necessary (e.g., "Led by Backend Team").

### Step 4 — Target Persona Adjustment
If the prompt specifies a target audience:
- **For PMs**: Highlight sprint velocity, blockers cleared, and remaining scope.
- **For Devs**: Highlight architecture shifts and new dependencies added.
- **For C-Level**: Highlight cost reduction, uptime, and user adoption metrics.

### Step 5 — Output Generation
Save to `docs/briefs/[Topic]-Summary.md` or output directly to the conversational context formatted with blockquotes.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Irrelevant Source | The source document is empty or unrelated code | Reply immediately: "Cannot summarize. Source document [X] lacks conversational or narrative context." |
| Metric Hallucination | Agent attempts to guess the impact percentage | Strip all unverified numbers. Use qualitative terms ("significant improvement") if hard data is absent. |

---

## ✅ Done Criteria / Verification

A summary is ready when:

- [ ] It can be read and understood completely in under 45 seconds.
- [ ] It contains ZERO introductory conversational fluff ("Sure, I can help you with that").
- [ ] At least one absolute fact/metric is carried over accurately from the source.
- [ ] The TL;DR layer and Bulleted layer are clearly visually separated.
