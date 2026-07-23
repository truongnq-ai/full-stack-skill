# Examples — UAT Process

## Example 1: Business-Friendly UAT Scenarios
**Bad (Too Technical)**: "Send POST request to `/api/users` and verify `201 Created`."
**Good (UAT Friendly)**: 
**Scenario: HR Onboards a New Employee**
1. Log in as HR Manager (`hr@company.com`).
2. Click "Add Employee", fill in the details, and submit.
3. Verify the new employee appears in the active roster list.
**Why**: UAT is executed by non-technical stakeholders (Business Analysts, Clients). They need real-world workflows, not technical assertions.