---
name: mcp-first-execution-rule
description: Core system rule enforcing the use of MCP servers for external service interactions (Database, Remote SSH, GitHub) over raw shell scripts.
metadata:
  labels: [rule, mcp, security, execution, database, ssh]
  triggers:
    keywords: [query database, ssh into server, read log, pull request, execute query]
    context: ["agent needs to interact with an external service", "agent needs to query data"]
---

# 🛡️ Core Rule: MCP-First Execution Policy

> **Mandatory Policy**: All Agents MUST prioritize MCP (Model Context Protocol) Server tools over raw shell scripts when interacting with external systems.

## 1. The Policy
When asked to perform a Day-2 Operation (e.g., querying a database, reading remote logs, checking GitHub PRs), you must follow this strict hierarchy of execution:

1. **First Choice (MCP)**: Use the native MCP server tool provided by the IDE.
   - Example: `call_mcp_tool` for `mysql_query`, `postgres_query`, `redis_get`, `ssh_exec`, `github_search_issues`.
2. **Second Choice (Fallback & Ask)**: If the required MCP server is not available (e.g., MongoDB, Google Drive, Jira), you MUST `STOP` and ask the user.
   - 💬 *Example*: "Tác vụ này yêu cầu truy cập MongoDB nhưng hệ thống chưa có MongoDB MCP. Anh có muốn cài đặt MCP này không, hay tôi có thể viết script nodejs để query tạm?"
3. **Last Resort (Raw Scripts)**: Only if the user explicitly approves, you may write and execute raw bash/python scripts (e.g., `mysql -u...`).

## 2. Specific Mappings
- **Database (MySQL/Postgres)**: NEVER use bash `mysql` or `psql` if `mcp_mysql` or `mcp_postgres` is available. MCP returns structured JSON which is immune to terminal hanging and safer.
- **Remote Servers (Logs/Services)**: Use `mcp_ssh_exec` or `mcp_ssh_read` instead of creating an interactive SSH session via bash.
- **Code Reviews/PRs**: Use `mcp_github_get_pull_request_files` to read diffs. Do not clone the entire repository just to read a PR.

## 3. Safety & Transactions
When performing mutating operations (`UPDATE`, `DELETE`, `INSERT`) via an MCP Database tool:
- You **MUST** run the query inside a transaction with a `ROLLBACK` first to dry-run and verify the affected row count.
- Example: `START TRANSACTION; UPDATE users SET status=1 WHERE id=5; SELECT ROW_COUNT(); ROLLBACK;`
- Only execute the real `COMMIT` after verifying the dry-run results or getting user approval.

## 🚫 Violations (Anti-Patterns)
- ❌ Opening an interactive shell like `bash` and typing `mysql -u root -p`. (The AI will get stuck at the password prompt).
- ❌ Trying to `cat` a 5GB production log file over SSH. Use MCP `tail` equivalents or grep with strict limits.
