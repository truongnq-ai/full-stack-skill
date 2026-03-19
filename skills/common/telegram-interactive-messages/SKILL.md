---
description: Standard for Dynamic Telegram Inline Buttons Interaction
---

# Telegram Interactive Messages Standard (Dynamic Buttons)

## Context & Purpose
When Openclaw (Rose) interacts with the user via Telegram, it is highly recommended to use inline buttons to make confirmations, selections, and choices faster and more intuitive. Instead of always defaulting to a simple "Yes/No", Openclaw must proactively analyze the context of the conversation and provide custom, contextual buttons according to the user's options.

## 1. Rule / Standard for Emitting Buttons
Whenever the assistant requires the user to make a decision, choose an option, or confirm an action, the agent should formulate the responses using the `message` tool with `channel: "telegram"` and inject a `buttons` array.

- **DO NOT** limit choices to "Yes" / "No" unless the question is strictly binary (e.g., "Do you want to proceed?").
- **DO** generate dynamic options based on what is being discussed (e.g., "Approve PR", "Reject PR", "Run Tests", "Deploy to Staging").
- **DO** keep button `text` short and concise (1-3 words).
- **DO** assign a clear and distinct `callback_data` for each action so the system knows exactly how to handle the callback.

## 2. Dynamic Payload Template
Use the following format when invoking the `message` tool (action: `send`):

```json
{
  "action": "send",
  "channel": "telegram",
  "target": "<chat_id>",
  "message": "Nội dung câu hỏi hoặc yêu cầu sự lựa chọn từ user:",
  "buttons": [
    [
      {"text": "<Option 1>", "callback_data": "<action_1>"},
      {"text": "<Option 2>", "callback_data": "<action_2>"}
    ],
    [
      {"text": "<Option 3 (Full wide)>", "callback_data": "<action_3>"}
    ]
  ]
}
```

*Note: The `buttons` array is an array of arrays. Each inner array represents a horizontal row of buttons on the Telegram UI. Group related options on the same row, and destructive/major actions on their own row.*

## 3. Contextual Examples

### Scenario A: Deployment Approval
If asking to deploy a new version to a specific environment:
```json
"buttons": [
  [
    {"text": "Deploy Staging", "callback_data": "deploy_stg"},
    {"text": "Deploy Prod", "callback_data": "deploy_prod"}
  ],
  [
    {"text": "Cancel", "callback_data": "cancel_deploy"}
  ]
]
```

### Scenario B: Report Generation
If asking what timeframe to generate a sales report for:
```json
"buttons": [
  [
    {"text": "Today", "callback_data": "report_today"},
    {"text": "This Week", "callback_data": "report_week"},
    {"text": "This Month", "callback_data": "report_month"}
  ]
]
```

## 4. Response Handling
When the user clicks a button, a callback is triggered with the specified `callback_data`. Openclaw should listen for these callbacks in the event loop and trigger the corresponding workflows or subsequent LLM interactions without requiring the user to type text.
