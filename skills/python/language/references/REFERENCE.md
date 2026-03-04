# Python Language — Reference

## Advanced Type Patterns

```python
from typing import TypeVar, Generic, Protocol, overload, runtime_checkable

T = TypeVar("T")

# Generic class
class Repository(Generic[T]):
    def get(self, id: int) -> T | None: ...
    def save(self, entity: T) -> T: ...

# Protocol — structural typing (duck typing with types)
@runtime_checkable
class Serializable(Protocol):
    def to_dict(self) -> dict: ...

def serialize(obj: Serializable) -> dict:
    return obj.to_dict()

# TypeAlias (Python 3.12)
type Vector = list[float]
type Matrix = list[Vector]

# ParamSpec — preserve function signatures
from typing import ParamSpec, Callable
P = ParamSpec("P")

def retry(fn: Callable[P, T]) -> Callable[P, T]:
    def wrapper(*args: P.args, **kwargs: P.kwargs) -> T:
        return fn(*args, **kwargs)
    return wrapper
```

## Async Patterns

```python
import asyncio
from contextlib import asynccontextmanager

# TaskGroup — structured concurrency (Python 3.11+)
async def fetch_users(ids: list[int]) -> list[dict]:
    async with asyncio.TaskGroup() as tg:
        tasks = [tg.create_task(fetch_user(id)) for id in ids]
    return [t.result() for t in tasks]

# Async context manager
@asynccontextmanager
async def managed_session():
    session = await create_session()
    try:
        yield session
    finally:
        await session.close()

# run_in_executor — blocking code in async context
import asyncio
from concurrent.futures import ThreadPoolExecutor

async def run_blocking(fn, *args):
    loop = asyncio.get_running_loop()
    with ThreadPoolExecutor() as pool:
        return await loop.run_in_executor(pool, fn, *args)
```

## Pydantic v2 Advanced

```python
from pydantic import BaseModel, field_validator, model_validator, ConfigDict
from pydantic import Field
from typing import Annotated

# Annotated types for reuse
PositiveInt = Annotated[int, Field(gt=0)]
EmailStr = Annotated[str, Field(pattern=r"^[^@]+@[^@]+\.[^@]+$")]

class OrderCreate(BaseModel):
    model_config = ConfigDict(frozen=True, extra="forbid")
    quantity: PositiveInt
    price: float = Field(gt=0, decimal_places=2)
    discount: float = Field(ge=0, le=1, default=0)

    @model_validator(mode="after")
    def total_must_be_positive(self) -> "OrderCreate":
        if self.price * self.quantity * (1 - self.discount) <= 0:
            raise ValueError("total must be positive")
        return self

# Discriminated union
from typing import Literal, Union

class Cat(BaseModel):
    type: Literal["cat"]
    indoor: bool

class Dog(BaseModel):
    type: Literal["dog"]
    breed: str

Pet = Annotated[Union[Cat, Dog], Field(discriminator="type")]
```

## Pattern Matching

```python
# Structural pattern matching
def process_event(event: dict) -> str:
    match event:
        case {"type": "user_created", "id": int(id), "name": str(name)}:
            return f"Created user {name} with id {id}"
        case {"type": "user_deleted", "id": int(id)}:
            return f"Deleted user {id}"
        case {"type": str(t)}:
            return f"Unknown event type: {t}"
        case _:
            raise ValueError("Invalid event structure")
```

## Generator Patterns

```python
from typing import Generator, Iterator

# Memory-efficient data pipeline
def read_large_file(path: str) -> Generator[str, None, None]:
    with open(path) as f:
        for line in f:
            yield line.strip()

def parse_lines(lines: Iterator[str]) -> Generator[dict, None, None]:
    for line in lines:
        if line:
            yield {"content": line, "length": len(line)}

# Composable pipeline
def pipeline(path: str) -> Iterator[dict]:
    return parse_lines(read_large_file(path))
```
