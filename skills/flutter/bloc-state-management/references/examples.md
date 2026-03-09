# Examples — Flutter BLoC

## Example 1 — Failure State

**Input**
```dart
on<LoadUser>((event, emit) async {
  final user = await repo.getUser();
  emit(UserLoaded(user));
});
```

**Output**
```dart
on<LoadUser>((event, emit) async {
  try {
    final user = await repo.getUser();
    emit(UserLoaded(user));
  } catch (_) {
    emit(UserFailure());
  }
});
```

**Why**
- Emits failure instead of throwing.

---

## Example 2 — Listener for Side Effects

**Input**
```dart
BlocBuilder<UserBloc, UserState>(builder: ...)
```

**Output**
```dart
BlocListener<UserBloc, UserState>(listener: ...)
```

**Why**
- Side effects belong in listener, not builder.
