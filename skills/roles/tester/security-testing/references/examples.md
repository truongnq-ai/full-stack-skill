# Examples — Security Testing

## Example 1: Testing IDOR (Insecure Direct Object Reference)
**Action**: Log in as User A (ID: 100). Fetch their receipt `GET /api/receipts/100`. Then try to fetch User B's receipt: `GET /api/receipts/101`.
**Result**: The server returns User B's data (200 OK).
**Action**: IMMEDIATELY log a Critical S1 Bug. This is a severe data breach vulnerability.

## Example 2: XSS Injection
**Action**: Type `<script>alert(1)</script>` into the "Bio" text field and save.
**Result**: The page reloads and an alert box pops up.
**Action**: Log a Critical S1 Bug for Stored XSS.