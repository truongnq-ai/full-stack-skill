---
name: AI Integration & Prompt Engineering
description: Standards for integrating LLM/AI models into applications — prompt design, structured output, context management, cost control, and safety guardrails.
category: roles/dev
metadata:
  labels: [dev, ai-integration, prompt-engineering, llm, openai, gemini]
  triggers:
    priority: high
    confidence: 0.95
    keywords: [integrate ai, prompt engineering, context window, llm api, openai, gemini, ai service, structured output]
    file_patterns: ["prompts/*.txt", "ai_service.*", "**/llm/**", "**/ai/**"]
    context: ["user asks to integrate an LLM", "user builds an AI-powered feature", "user asks about prompt design"]
    negative: ["user asks to train a model from scratch", "user asks about ML pipeline infrastructure"]
---

# 🤖 AI Integration & Prompt Engineering

> **Use this skill when**: building features that call external LLM APIs (OpenAI, Gemini, Claude, local models) — designing system prompts, parsing structured outputs, managing token limits, and implementing fallback chains. Trigger: `/dev-ai-integration`.
>
> **Out of scope**: Training or fine-tuning ML models (`roles/bda/evaluate-ai-model/SKILL.md`). This skill governs the *application-layer integration* of pre-trained AI models.

---

## 🚫 Anti-Patterns

- **Naked API Calls**: Calling an LLM API without `try/catch`, retry logic, or timeout. The API returns a 429 rate-limit, and the entire user-facing request crashes with an unhandled exception.
- **Trusting LLM Output Blindly**: Feeding raw LLM JSON output into a database `INSERT` statement without schema validation. The model hallucinates an extra field, and the DB throws a column mismatch error in production.
- **Hardcoded Prompts in Frontend**: Embedding the system prompt inside a React component. A user opens DevTools, reads the prompt, and reverse-engineers your proprietary classification logic.
- **The Infinite Context Dump**: Stuffing the entire 50-page user manual into the prompt context every single call, burning $2.50 per request when 90% of the context is irrelevant.
- **No Fallback Model**: Using only GPT-4o. When OpenAI has an outage (which happens monthly), the feature is 100% dead with no degradation path.

---

## 🛠 Prerequisites & Tooling

1. An LLM API key with rate-limit awareness (OpenAI, Google AI, Anthropic).
2. A schema validation library (Zod for TypeScript, Pydantic for Python).
3. Understanding of token economics (input tokens vs output tokens vs cached tokens).

---

## 🔄 Execution Workflow

### Step 1 — System Prompt Design (Prompts as Code)

Define the prompt using the **Persona-Context-Task-Format** framework:
- **Persona**: Who is the AI? (e.g., "You are a senior tax accountant.")
- **Context**: What background data does it have? (Inject only relevant chunks, not the entire DB.)
- **Task**: What must it do? (e.g., "Classify the invoice into one of 5 categories.")
- **Format**: What is the exact output shape? (e.g., "Return JSON matching this Zod schema: `{ category: string, confidence: number }`")

Add explicit negative constraints: `"Do NOT output markdown code fences. Return raw JSON only."`

Store prompts in versioned config files (`prompts/classify-invoice-v2.txt`), never inline in application code.

### Step 2 — Structured Output Enforcement

Never trust raw LLM text output. Always enforce schema validation:
```typescript
// Good: Validate with Zod before using
const result = ClassifySchema.safeParse(JSON.parse(llmResponse));
if (!result.success) {
  logger.warn('LLM output failed schema validation', { errors: result.error });
  return fallbackClassification(invoice);
}
```

Use the model's native structured output mode if available (OpenAI `response_format: { type: "json_schema" }`, Gemini `responseMimeType: "application/json"`).

### Step 3 — Context Window Management

- **Token Budget**: Calculate input + output tokens before sending. If the prompt exceeds 80% of the model's context window, truncate or summarize the input data.
- **Chunking**: For large documents, split into semantic chunks and process in parallel, then merge results.
- **Caching**: Cache identical prompt+input combinations to avoid redundant API calls (Redis with TTL).

### Step 4 — Retry, Fallback & Cost Control

Implement a 3-tier resilience chain:
1. **Primary Model**: GPT-4o / Gemini 2.5 Pro (high quality).
2. **Fallback Model**: GPT-4o-mini / Gemini 2.5 Flash (cheaper, faster, slightly lower quality).
3. **Static Fallback**: Rule-based logic or cached last-known-good response.

Apply exponential backoff for rate limits (429) and transient errors (500, 503):
```
Retry 1: wait 1s → Retry 2: wait 2s → Retry 3: wait 4s → Fallback model → Static fallback
```

Track cost per feature: `cost = (input_tokens × input_price + output_tokens × output_price)`.

### Step 5 — Safety & Prompt Injection Defense

- **Input Sanitization**: Strip or escape user inputs that could manipulate the system prompt (e.g., "Ignore all previous instructions and...").
- **Output Filtering**: Scan LLM responses for PII leakage, profanity, or off-topic content before displaying to the user.
- **Audit Logging**: Log every LLM call (prompt hash, model, token count, latency, cost) for debugging and compliance.

> **⏸️ Checkpoint**:
> "Luồng gọi LLM đã được implement kèm Retry mechanism + Schema validation + Fallback chain. Bạn có muốn tôi chạy thử integration test với mock responses không? (Y/N)"

---

## 🛠️ Tooling & Execution

- **Code**: Use `view_file` to audit existing AI service code before modifying.
- **Build**: Use `run_command` to execute integration scripts and verify LLM response parsing.
- **Database**: Use `call_mcp_tool` for `redis` to verify caching behavior (`mcp_redis_get`, `mcp_redis_set`).
- **Testing**: Use `run_command` to run unit tests with mocked LLM responses.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| API Rate Limit | LLM API returns 429 Too Many Requests | Apply exponential backoff (1s, 2s, 4s). After 3 retries, switch to fallback model. If fallback also fails, return cached or rule-based response. |
| Token Overflow | Input exceeds model's context window limit | Truncate input by priority (keep most recent/relevant chunks). Log the truncation event. Never silently drop context without alerting. |
| Model Unavailable | OpenAI/Gemini API is down (503) | Automatically route to the pre-configured fallback model provider. If all providers are down, degrade gracefully with a user-facing message: "AI features temporarily unavailable." |
| Malformed Output | LLM returns invalid JSON or fails schema validation | Retry once with an explicit re-prompt ("Your previous response was invalid JSON. Return ONLY valid JSON matching this schema: ..."). If retry also fails, use static fallback. |

---

## ✅ Done Criteria / Verification

AI integration is production-ready when:

- [ ] The output format is explicitly defined via a schema validator (Zod/Pydantic), not just string parsing.
- [ ] There is retry logic for API rate limits (429) and transient errors, with exponential backoff.
- [ ] A fallback model chain is configured (Primary → Budget → Static).
- [ ] Prompts are stored in versioned config files, not hardcoded in application code.
- [ ] Token cost is tracked and budgeted per feature.
- [ ] User inputs are sanitized against prompt injection before being sent to the LLM.

---

## 📚 Cross-References

- `roles/dev/security-basics/SKILL.md` — Prompt injection is a security concern.
- `roles/dev/performance-guardrails/SKILL.md` — Token cost optimization parallels performance budgeting.
- `roles/dev/unit-test-best-practices/SKILL.md` — Mock LLM responses for deterministic testing.
