# Claude Search Optimization (CSO)

**Critical for discovery:** Future Claude needs to FIND your skill.

### 1. Rich Description Field
Start with "Use when..." to focus on triggering conditions.
**CRITICAL: Description = When to Use, NOT What the Skill Does**
Do NOT summarize the skill's process or workflow in the description. If you do, Claude might skip reading the file and just follow the summary.

### 2. Keyword Coverage
Use words Claude would search for:
- Error messages: "Hook timed out"
- Symptoms: "flaky", "hanging"
- Tools: commands, library names

### 3. Descriptive Naming
Use active voice, verb-first:
- `creating-skills` not `skill-creation`

### 4. Cross-Referencing
Use skill name only, with explicit requirement markers:
- `**REQUIRED SUB-SKILL:** Use superpowers:test-driven-development`
- `**REQUIRED BACKGROUND:** You MUST understand superpowers:systematic-debugging`
- Avoid `@skills/...` as it force-loads files and consumes context.
