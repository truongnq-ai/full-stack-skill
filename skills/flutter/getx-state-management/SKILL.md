---
name: Flutter GetX State Management
description: Simple and powerful reactive state management using GetX.
metadata:
  labels:
    - flutter
    - state-management
    - getx
    - controller
    - reactive
    - getx-state-management
  triggers:
    priority: medium
    confidence: 0.7
    files:
      - '**_controller.dart'
      - '**/bindings/*.dart'
    keywords:
      - GetxController
      - Obx
      - GetBuilder
      - .obs
      - Get.put
      - Get.find
      - Get.lazyPut
workflow_ref: ui-ux-pro-max
---

# GetX State Management

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

## Structure

```text
lib/app/modules/home/
├── controllers/
│   └── home_controller.dart
├── bindings/
│   └── home_binding.dart
└── views/
    └── home_view.dart
```

- **Controllers**: Extend `GetxController`. Store logic and state variables here.
- **Reactivity**:
  - Use `.obs` for observable variables (e.g., `final count = 0.obs;`).
  - Wrap UI in `Obx(() => ...)` to listen for changes.
  - For simple state, use `update()` in controller and `GetBuilder` in UI.
- **Dependency Injection**:
  - **Bindings**: Use `Bindings` class to decouple DI from UI.
  - **Lazy Load**: Prefer `Get.lazyPut(() => Controller())` in Bindings.
  - **Lifecycle**: Let GetX handle disposal. Avoid `permanent: true`.
- **Hooks**: Use `onInit()`, `onReady()`, `onClose()` instead of `initState`/`dispose`.
- **Architecture**: Use `get_cli` for modular MVVM (data, models, modules).

## Anti-Patterns

- **Ctx in Logic**: Pass no `BuildContext` to controllers.
- **Inline DI**: Avoid `Get.put()` in widgets; use Bindings + `Get.find`.
- **Fat Views**: Keep views pure UI; delegate all logic to controller.

## Code Example

```dart
class UserController extends GetxController {
  final name = "User".obs;
  void updateName(String val) => name.value = val;
}

class UserView extends GetView<UserController> {
  @override
  Widget build(ctx) => Scaffold(
    body: Obx(() => Text(controller.name.value)),
    floatingActionButton: FloatingActionButton(
      onPressed: () => controller.updateName("New"),
    ),
  );
}
```

## Related Topics
## References
- [Examples (Input/Output)](references/examples.md)
- [Notes](references/notes.md)
