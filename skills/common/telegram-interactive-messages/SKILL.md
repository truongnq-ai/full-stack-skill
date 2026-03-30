---
name: Telegram Interactive Messages
description: Sends robust, interactive Telegram messages using bot API — handles formatting, keyboards, rate limits, and failure retries.
category: common
metadata:
  labels: [telegram, bot, messaging, integration]
  triggers:
    priority: medium
    confidence: 0.8
    keywords: [telegram, alert, message, notify, bot]
---

# 📱 Telegram Interactive Messages

> **Use this skill when**: the agent needs to send mission-critical alerts, reports, or interactive messages with inline button keyboards to a Telegram chat, group, or channel. Trigger: `/core-telegram-message` or when tasked to "Notify the team via Telegram".
>
> **Out of scope**: This skill does NOT handle receiving messages, webhook processing, or Long Polling. It does NOT provision the Telegram bot itself via BotFather (user must provide the token).

---

## 🚫 Anti-Patterns

- **Hardcoded Secrets**: Never hardcode the `TELEGRAM_BOT_TOKEN` in scripts or workflow definitions. Always read from `.env` or secure vault.
- **Unescaped Characters**: Sending raw Markdown or MarkdownV2 without escaping reserved special characters, leading to API `HTTP 400 Bad Request`.
- **Ignoring Rate Limits**: Sending tight loops of messages and ignoring Telegram's `429 Too Many Requests` responses.
- **Micro-spamming**: Sending 5 separate messages for an incident instead of 1 batched summary message.

---

## 🛠 Prerequisites & Tooling

1. `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` must be configured in your application environment (e.g. `.env` file).
2. Appropriate network egress rules allowing traffic to `https://api.telegram.org`.
3. Load reference templates for specific message layouts:
```bash
view_file skills/common/telegram-interactive-messages/references/examples.md
```

---

## 🔄 Execution Workflow

### Step 1 — Validate Environment
Before attempting any network calls, verify the environment:
```bash
grep -E "TELEGRAM_BOT_TOKEN|TELEGRAM_CHAT_ID" .env
```
Ensure credentials exist and are not empty placeholders. If missing, Abort and explicitly request the user to provide them.

### Step 2 — Format Message Payload
Choose format mode (`MarkdownV2` or `HTML`). 
*Best practice*: Use `HTML` mode for safer formatting, as MarkdownV2 has exceedingly strict escape character rules (`_ * [ ] ( ) ~ \ > # + - = | { } . !`).

Format structure:
```json
{
  "chat_id": "{{TELEGRAM_CHAT_ID}}",
  "text": "<b>🚨 Critical Alert</b>\nDescription: High CPU utilization detected.\n<i>Action required immediately.</i>",
  "parse_mode": "HTML",
  "disable_web_page_preview": true
}
```

### Step 3 — Add Interactive Keyboards (Optional)
If user action or approval is needed, append a `reply_markup` inline keyboard object:
```json
"reply_markup": {
  "inline_keyboard": [
    [
      {"text": "Approve Deploy ✅", "callback_data": "action_deploy_approve"},
      {"text": "Reject Deploy ❌", "callback_data": "action_deploy_reject"}
    ],
    [
      {"text": "View Logs 📜", "url": "https://dashboard.example.com/logs/123"}
    ]
  ]
}
```

### Step 4 — Send Request (with Rate Limit Handling)
Execute the payload using `curl` or native HTTP framework. 
```bash
curl -s -X POST https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage \
  -H 'Content-Type: application/json' \
  -d '{ "chat_id": "'"$TELEGRAM_CHAT_ID"'", "text": "Test Integration Message", "parse_mode": "HTML" }' \
  -w "\nHTTP_CODE: %{http_code}"
```

---

## ⚠️ Error Handling (Fallback)

When evaluating the response HTTP status code, implement the following fail-safes:

| HTTP Code | Telegram Error | Primary Cause & Fallback Action |
|-----------|----------------|--------------------------------|
| **400** | Bad Request (Parse error) | Usually unescaped special characters in Markdown/HTML. <br>→ *Fallback*: Strip all formatting tags and retry as plain text. |
| **400** | Chat not found | Bot is not added to the target group, or `chat_id` is malformed. <br>→ *Fallback*: Log locally and suspend Telegram notifications. |
| **401** | Unauthorized | The `BOT_TOKEN` is revoked or incorrect. <br>→ *Fallback*: Halt execution and prompt user to refresh credentials. |
| **429** | Too Many Requests | Rate limit exceeded. <br>→ *Fallback*: Parse the `retry_after` JSON parameter. Sleep for that many seconds + 1, then retry execution. |

---

## ✅ Done Criteria / Verification

To verify that the Telegram integration was successful, check the following conditions:

- [ ] Network call completes and returns `HTTP 200 OK`.
- [ ] Response payload is valid JSON and contains `"ok": true`.
- [ ] The `message_id` property is successfully extracted from the response object (`.result.message_id`).
- [ ] (If applicable) Expected buttons render correctly without breaking the message text layout.

> **Verification Check**: Do not assume a `curl` completion means success. Always `grep` the output literal for `"ok":true`.
