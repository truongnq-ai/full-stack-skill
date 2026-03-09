# Examples — Spring Boot Security (Refined)

## Example 1 — SecurityFilterChain

**Input**
```java
extends WebSecurityConfigurerAdapter
```

**Output**
```java
@Bean SecurityFilterChain securityFilterChain(HttpSecurity http)
```

**Why**
- Modern Spring Security 6+ approach.

---

## Example 2 — CORS DSL

**Input**
```java
http.cors().and()
```

**Output**
```java
http.cors(c -> c.configurationSource(source))
```

**Why**
- Lambda DSL consistency.
