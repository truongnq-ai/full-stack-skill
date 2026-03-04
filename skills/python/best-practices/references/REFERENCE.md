# Python Best Practices — Reference

## FastAPI Project Template

```
fastapi-app/
├── src/
│   └── app/
│       ├── main.py              # App factory + lifespan
│       ├── api/
│       │   ├── v1/
│       │   │   ├── users.py     # APIRouter per feature
│       │   │   └── products.py
│       │   └── deps.py          # Shared dependencies
│       ├── services/            # Business logic
│       │   └── user_service.py
│       ├── models/              # SQLAlchemy ORM
│       │   └── user.py
│       ├── schemas/             # Pydantic DTOs
│       │   └── user.py
│       └── core/
│           ├── config.py        # pydantic-settings
│           ├── database.py      # Async engine + session
│           └── security.py      # JWT, password hashing
├── tests/
│   ├── conftest.py              # Fixtures
│   └── api/
│       └── test_users.py
└── pyproject.toml
```

## FastAPI App Factory Pattern

```python
# app/main.py
from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.api.v1 import users, products
from app.core.database import engine

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await engine.connect()
    yield
    # Shutdown
    await engine.dispose()

def create_app() -> FastAPI:
    app = FastAPI(lifespan=lifespan)
    app.include_router(users.router, prefix="/api/v1/users")
    app.include_router(products.router, prefix="/api/v1/products")
    return app

app = create_app()
```

## Dependency Injection Pattern

```python
# app/api/deps.py
from typing import Annotated
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_session

SessionDep = Annotated[AsyncSession, Depends(get_session)]

# Usage in router
@router.get("/{id}")
async def get_user(id: int, session: SessionDep) -> UserResponse:
    return await user_service.get(session, id)
```

## Django Clean Architecture

```
django-app/
├── apps/
│   └── users/
│       ├── models.py        # Fat models
│       ├── managers.py      # Custom QuerySets
│       ├── services.py      # Business logic
│       ├── views.py         # Thin views / ViewSets
│       ├── serializers.py   # DRF or Pydantic schemas
│       └── urls.py
├── config/
│   ├── settings/
│   │   ├── base.py
│   │   ├── local.py
│   │   └── production.py
│   └── urls.py
└── manage.py
```

## Django Service Layer Pattern

```python
# apps/users/services.py
from django.db import transaction
from .models import User

class UserService:
    @staticmethod
    @transaction.atomic
    def create_user(email: str, password: str) -> User:
        user = User(email=email)
        user.set_password(password)
        user.full_clean()  # model-level validation
        user.save()
        return user

# apps/users/views.py — thin
class UserViewSet(ModelViewSet):
    def create(self, request):
        data = UserCreateSerializer(data=request.data)
        data.is_valid(raise_exception=True)
        user = UserService.create_user(**data.validated_data)
        return Response(UserSerializer(user).data)
```

## SOLID in Practice

```python
# Dependency Inversion with Protocol
from typing import Protocol

class UserRepository(Protocol):
    async def find_by_email(self, email: str) -> User | None: ...
    async def save(self, user: User) -> User: ...

class UserService:
    def __init__(self, repo: UserRepository) -> None:
        self._repo = repo  # depends on abstraction, not DB

# Open/Closed — extend via inheritance, not modification
class BaseHandler:
    async def handle(self, event: Event) -> None: ...

class EmailNotificationHandler(BaseHandler):
    async def handle(self, event: Event) -> None:
        await send_email(event.user_email)
```
