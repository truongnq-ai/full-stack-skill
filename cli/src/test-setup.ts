import { vi } from 'vitest';

/**
 * Global test setup: mock native modules that may not be available in the test environment.
 * fast-glob uses native binaries that can fail in certain environments.
 */
vi.mock('fast-glob', () => ({
    default: vi.fn().mockResolvedValue([]),
}));
