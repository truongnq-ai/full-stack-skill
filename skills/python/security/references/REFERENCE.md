# Python Security — Reference

## OWASP Top 10 — Python Checklist

| Risk                          | Prevention in Python                              |
| ----------------------------- | ------------------------------------------------- |
| A01 Broken Access Control     | FastAPI `Depends` guards, Django permissions      |
| A02 Cryptographic Failures    | bcrypt/argon2, TLS, encrypted secrets             |
| A03 Injection                 | Pydantic validation, parameterized SQL, no `eval` |
| A04 Insecure Design           | Threat modeling, least privilege                  |
| A05 Security Misconfiguration | `pydantic-settings`, no debug in prod             |
| A07 Auth Failures             | JWT expiry, rate limiting, bcrypt                 |
| A08 Software Integrity        | `uv.lock`, hash verification                      |
| A09 Logging Failures          | Structured logging, no sensitive data in logs     |

## FastAPI Security Patterns

```python
# core/security.py
from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
from passlib.context import CryptContext
from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

SECRET_KEY = os.environ["SECRET_KEY"]  # never hardcode
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 15

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
bearer = HTTPBearer()

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

def create_access_token(user_id: int) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    return jwt.encode({"sub": str(user_id), "exp": expire}, SECRET_KEY, ALGORITHM)

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer)
) -> int:
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, [ALGORITHM])
        user_id = int(payload["sub"])
    except (JWTError, KeyError, ValueError):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    return user_id
```

## Input Validation — Advanced Pydantic

```python
from pydantic import BaseModel, field_validator, model_validator
from pydantic import ConfigDict, Field
import re

SAFE_STRING_RE = re.compile(r"^[\w\s\-\.@]+$")

class SearchQuery(BaseModel):
    model_config = ConfigDict(extra="forbid")
    q: str = Field(min_length=1, max_length=100)
    page: int = Field(ge=1, le=1000, default=1)
    limit: int = Field(ge=1, le=100, default=20)

    @field_validator("q")
    @classmethod
    def sanitize_query(cls, v: str) -> str:
        if not SAFE_STRING_RE.match(v):
            raise ValueError("query contains invalid characters")
        return v.strip()
```

## Secrets with pydantic-settings

```python
# core/config.py
from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )
    # Required — will raise if missing
    database_url: str
    secret_key: str
    # Optional with defaults
    debug: bool = False
    allowed_origins: list[str] = ["http://localhost:3000"]

@lru_cache
def get_settings() -> Settings:
    return Settings()
```

## Secure subprocess

```python
import subprocess
import shlex

# ❌ NEVER
subprocess.run(f"ls {user_input}", shell=True)

# ✅ ALWAYS — pass as list
def run_safe(command: str, *args: str) -> str:
    result = subprocess.run(
        [command, *args],
        capture_output=True,
        text=True,
        timeout=30,
        check=True,
    )
    return result.stdout

# ✅ If string is unavoidable
cmd_parts = shlex.split(trusted_command_string)
subprocess.run(cmd_parts, shell=False)
```

## Rate Limiting (FastAPI)

```python
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

@router.post("/auth/login")
@limiter.limit("5/minute")
async def login(request: Request, credentials: LoginRequest): ...
```
