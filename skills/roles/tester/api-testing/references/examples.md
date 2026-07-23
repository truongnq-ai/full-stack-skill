# Examples — API Testing

## Example 1: Boundary & Type Validation
**Input**: Testing a `POST /api/v1/checkout` endpoint.
**Action**: Send a payload with `price: -100` and `quantity: "five"`.
**Output (Expected)**: `400 Bad Request` with structured JSON error indicating invalid data types.
**Why**: Validates that the backend explicitly rejects malformed data instead of crashing or inserting corrupt data into the DB.

## Example 2: Auth Bypass
**Input**: Testing `DELETE /api/v1/users/5`.
**Action**: Send the request without an `Authorization` header, and then with a revoked token.
**Output (Expected)**: `401 Unauthorized` in both cases.
**Why**: Ensures critical destructive endpoints are protected by middleware.