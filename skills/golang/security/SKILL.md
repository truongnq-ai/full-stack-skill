---
name: Golang Security
description: Security standards for Go backend services (Input Validation, Crypto, SQL Injection Prevention).
metadata:
  labels: [golang, security, validation, crypto]
  triggers:
    priority: medium
    confidence: 0.7
    files: ['**/*.go']
    keywords: [crypto/rand, sql, sanitize, jwt, bcrypt, validation]
workflow_ref: deep-security-audit
---

# Golang Security Standards

## **Priority: P0 (CRITICAL)**

## Output Template

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

- **Summary**: <what changed / what was done>
- **Risks**: <known risks or "none">
- **Next Checks**: <tests/verification steps>

## Implementation Guidelines

### Input Validation

- **Validation**: Use `go-playground/validator` or `google/go-cmp` for struct validation.
- **Sanitization**: Sanitize user input before processing. Use `bluemonday` for HTML sanitization.

### Cryptography

- **Random**: ALWAYS use `crypto/rand`, NEVER `math/rand` for security-sensitive operations (tokens, keys, IVs).
- **Hashing**: Use `bcrypt` or `argon2` for password hashing. Avoid MD5/SHA1.
- **Encryption**: Use `crypto/aes` with GCM mode for authenticated encryption.

### SQL Injection Prevention

- **Parameterized Queries**: ALWAYS use `$1, $2` placeholders with `database/sql` or ORM (GORM, sqlx).
- **No String Concatenation**: Never build queries with `fmt.Sprintf()`.

### Authentication

- **JWT**: Use `golang-jwt/jwt` v5+. Validate `alg`, `iss`, `aud`, `exp` claims.
- **Sessions**: Use secure, httpOnly cookies with `gorilla/sessions`.

### Secret Management

- **Environment Variables**: Load secrets via `godotenv` or Kubernetes secrets.
- **No Hardcoding**: Never commit API keys, passwords, or tokens to Git.

## Anti-Patterns

- **No `math/rand` for Security**: RNG is predictable. Use `crypto/rand`.
- **No `fmt.Sprintf()` for SQL**: Causes SQL injection. Use placeholders.
- **No MD5 for Passwords**: Use `bcrypt` or `argon2id`.
- **No Exposed Error Details**: Don't leak stack traces to clients in production.

## References

- [Implementation Examples](references/implementation.md)


## References

- [Examples (Input/Output)](references/examples.md)
