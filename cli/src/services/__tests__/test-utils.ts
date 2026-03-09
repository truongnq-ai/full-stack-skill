/**
 * Cross-platform test utilities.
 * Use these helpers in all test files to avoid path separator issues.
 */

/**
 * Normalize path separators to forward slashes for cross-platform comparison.
 * Use this when asserting paths in tests to handle Windows vs Unix differences.
 *
 * @example
 * expect(normPath(result)).toBe('some/path/file.ts');
 * expect(results.some(r => normPath(r).endsWith('skills/nestjs'))).toBe(true);
 */
export function normPath(p: string): string {
    return p.replace(/\\/g, '/');
}

/**
 * Create a regex that matches the given path with either `/` or `\` separators.
 *
 * @example
 * expect(result).toMatch(pathMatcher('some/path/file.ts'));
 */
export function pathMatcher(p: string): RegExp {
    const escaped = p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(escaped.replace(/\//g, '[\\\\/]'));
}
