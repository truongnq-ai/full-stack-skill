---
name: React Native Testing
description: Jest and React Native Testing Library for component and integration tests.
metadata:
  labels: [react-native, testing, jest, testing-library]
  triggers:
    priority: medium
    confidence: 0.7
    files: ['**/*.test.tsx', '**/*.spec.tsx', '__tests__/**']
    keywords: [test, testing, jest, render, fireEvent, waitFor]
workflow_ref: battle-test
---

# React Native Testing

## **Priority: P1 (OPERATIONAL)**

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

## Setup

- **Jest**: Pre-configured in React Native.
- **Testing Library**: Use `@testing-library/react-native` for user-centric tests.
- **Mocking**: Use `jest.mock()` for native modules.

## Component Testing

```tsx
import { render, fireEvent, waitFor } from '@testing-library/react-native';

test('increments counter on button press', () => {
  const { getByText, getByRole } = render(<Counter />);
  const button = getByRole('button', { name: /increment/i });

  fireEvent.press(button);

  expect(getByText('Count: 1')).toBeTruthy();
});
```

## Async Testing

```tsx
test('fetches and displays data', async () => {
  const { findByText } = render(<DataComponent />);
  const element = await findByText(/loaded data/i);
  expect(element).toBeTruthy();
});
```

## Best Practices

- **User-Centric**: Use `getByRole`, `getByText` over `testID` when possible.
- **Integration > Unit**: Test features, not implementation.
- **Avoid Snapshots**: Use sparingly. Brittle and hard to review.
- **Coverage**: Aim for 70%+. Focus on critical paths.

## Anti-Patterns

- **No Testing Implementation**: Test behavior, not internals.
- **No testID Overuse**: Prefer accessible queries.

## Reference & Examples

See [references/testing-library.md](references/testing-library.md) for RNTL Setup, Mocking Providers, and Integration Flow examples.

## Related Topics

common/quality-assurance | react/testing


## References

- [Examples (Input/Output)](references/examples.md)
