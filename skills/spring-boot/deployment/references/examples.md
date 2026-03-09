# Examples — Spring Boot Deployment (Refined)

## Example 1 — Health Probes

**Input**
```yaml
# no readiness/liveness
```

**Output**
```yaml
/readiness /liveness endpoints
```

**Why**
- Required for orchestration.

---

## Example 2 — Config via Env

**Input**
```properties
spring.datasource.url=...
```

**Output**
```properties
spring.datasource.url=${DB_URL}
```

**Why**
- Externalized config.
