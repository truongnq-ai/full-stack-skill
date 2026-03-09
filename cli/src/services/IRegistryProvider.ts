import { GitHubTreeResponse } from '../models/types';

/**
 * Abstraction layer for skill registry providers.
 *
 * This interface decouples the CLI from a specific hosting platform (GitHub).
 * Future implementations can support GitLab, BitBucket, S3, local filesystem, etc.
 */
export interface IRegistryProvider {
    /**
     * Fetches the recursive file tree for a repository/project.
     * @param owner Repository/project owner
     * @param repo Repository/project name
     * @param ref Git reference (branch, tag, or commit SHA)
     * @returns The tree data or null if not found
     */
    getTree(
        owner: string,
        repo: string,
        ref: string,
    ): Promise<GitHubTreeResponse | null>;

    /**
     * Fetches the raw content of a single file.
     * @param owner Repository/project owner
     * @param repo Repository/project name
     * @param ref Git reference
     * @param path Path to the file within the repository
     * @returns File content as string or null if not found
     */
    getRawFile(
        owner: string,
        repo: string,
        ref: string,
        path: string,
    ): Promise<string | null>;

    /**
     * Retrieves basic repository/project information.
     * @param owner Repository/project owner
     * @param repo Repository/project name
     */
    getRepoInfo(
        owner: string,
        repo: string,
    ): Promise<{ default_branch: string } | null>;

    /**
     * Downloads multiple files concurrently.
     * @param tasks Array of file download tasks
     * @param concurrency Maximum concurrent downloads
     * @returns Array of downloaded file paths and contents
     */
    downloadFiles(
        tasks: { owner: string; repo: string; ref: string; path: string }[],
        concurrency?: number,
    ): Promise<{ path: string; content: string }[]>;

    /**
     * Parses a registry URL into owner and repository name.
     * @param url The registry URL to parse
     * @returns Object containing owner and repo, or null if invalid
     */
    parseUrl(url: string): { owner: string; repo: string } | null;
}
