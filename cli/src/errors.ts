/**
 * Base error class for the full-stack-skill CLI.
 * All custom errors extend this class.
 */
export class CliError extends Error {
    constructor(
        message: string,
        public readonly code: string,
        public readonly suggestion?: string,
    ) {
        super(message);
        this.name = 'CliError';
    }
}

/**
 * Error thrown when the `.skillsrc` configuration is invalid, missing, or malformed.
 */
export class ConfigError extends CliError {
    constructor(message: string, suggestion?: string) {
        super(message, 'CONFIG_ERROR', suggestion);
        this.name = 'ConfigError';
    }
}

/**
 * Error thrown when a network request fails (e.g., GitHub API, registry fetch).
 */
export class NetworkError extends CliError {
    constructor(message: string, suggestion?: string) {
        super(
            message,
            'NETWORK_ERROR',
            suggestion || 'Check your internet connection and try again.',
        );
        this.name = 'NetworkError';
    }
}

/**
 * Error thrown when the skill registry returns unexpected or invalid data.
 */
export class RegistryError extends CliError {
    constructor(message: string, suggestion?: string) {
        super(
            message,
            'REGISTRY_ERROR',
            suggestion || 'Verify your registry URL in .skillsrc is correct.',
        );
        this.name = 'RegistryError';
    }
}

/**
 * Error thrown when file system operations fail during sync.
 */
export class SyncError extends CliError {
    constructor(message: string, suggestion?: string) {
        super(
            message,
            'SYNC_ERROR',
            suggestion || 'Check file permissions and try again.',
        );
        this.name = 'SyncError';
    }
}

/**
 * Error thrown when the GitHub API rate limit is exceeded.
 * Contains the reset timestamp and limit so the CLI can display actionable guidance.
 */
export class RateLimitError extends CliError {
    constructor(
        public readonly resetAt: Date,
        public readonly limit: number,
    ) {
        const resetStr = resetAt.toLocaleTimeString();
        super(
            `GitHub API rate limit exceeded (${limit}/hour). Resets at ${resetStr}.`,
            'RATE_LIMIT_ERROR',
            'Set GITHUB_TOKEN env var to increase limit from 60 to 5,000/hour.\n' +
            '  → Create a token at https://github.com/settings/tokens (scope: public_repo)',
        );
        this.name = 'RateLimitError';
    }
}
