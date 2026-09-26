import fs from 'fs-extra';
import os from 'os';
import path from 'path';
import { GitHubTreeItem } from '../models/types';

/**
 * Cache entry for a single repository ref (branch or tag).
 */
export interface CacheEntry {
  /** SHA of the entire tree response from GitHub */
  treeSha: string;
  /** ISO timestamp of the last successful sync */
  syncedAt: string;
  /** Map of file paths to their git SHA hashes */
  fileShas: Record<string, string>;
}

/**
 * Persistent sync manifest stored on disk.
 * Tracks tree SHAs and file SHAs per workspace+repo+ref combination.
 */
export interface SyncManifest {
  version: 1;
  entries: Record<string, CacheEntry>;
}

/**
 * Service for managing the sync cache manifest.
 *
 * Uses a disk-based JSON manifest stored in ~/.cache/fss/ to track
 * what was synced previously. Enables incremental sync by comparing
 * tree SHAs and individual file SHAs to avoid re-downloading unchanged files.
 *
 * Cache keys include the workspace path to prevent cross-workspace skipping.
 */
export class SyncCacheService {
  private manifestPath: string;
  private manifest: SyncManifest | null = null;

  constructor(cacheDir?: string) {
    const dir = cacheDir || path.join(os.homedir(), '.cache', 'fss');
    this.manifestPath = path.join(dir, 'sync-manifest.json');
  }

  /**
   * Loads the manifest from disk. Returns fresh manifest if file doesn't exist or is corrupt.
   */
  async load(): Promise<SyncManifest> {
    if (this.manifest) return this.manifest;

    try {
      if (await fs.pathExists(this.manifestPath)) {
        const content = await fs.readFile(this.manifestPath, 'utf8');
        const parsed = JSON.parse(content) as SyncManifest;
        if (parsed && parsed.version === 1 && parsed.entries) {
          this.manifest = parsed;
          return this.manifest;
        }
      }
    } catch {
      // Corrupt cache file → delete and start fresh
      try {
        await fs.remove(this.manifestPath);
      } catch {
        // Ignore delete failure
      }
    }

    this.manifest = { version: 1, entries: {} };
    return this.manifest;
  }

  /**
   * Persists the manifest to disk using atomic write (temp file + rename).
   */
  async save(): Promise<void> {
    if (!this.manifest) return;

    const tmpPath = `${this.manifestPath}.tmp`;
    await fs.outputFile(tmpPath, JSON.stringify(this.manifest, null, 2));
    await fs.rename(tmpPath, this.manifestPath);
  }

  /**
   * Generates a cache key that includes the workspace path to prevent cross-workspace interference.
   */
  getCacheKey(workspace: string, owner: string, repo: string, ref: string): string {
    const normalizedWorkspace = workspace.replace(/\\/g, '/');
    return `${normalizedWorkspace}::${owner}/${repo}@${ref}`;
  }

  /**
   * Retrieves a cache entry by key.
   */
  getEntry(key: string): CacheEntry | null {
    return this.manifest?.entries[key] ?? null;
  }

  /**
   * Updates a cache entry in memory (call save() to persist).
   */
  setEntry(key: string, entry: CacheEntry): void {
    if (!this.manifest) return;
    this.manifest.entries[key] = entry;
  }

  /**
   * Checks if the tree SHA is unchanged from the cached version.
   * Returns true if the tree hasn't changed (skip downloads).
   */
  isTreeUnchanged(key: string, newTreeSha: string): boolean {
    const entry = this.getEntry(key);
    if (!entry) return false;
    return entry.treeSha === newTreeSha;
  }

  /**
   * Compares file SHAs from the new tree against the cached manifest.
   * Returns only the files that are new or have changed SHAs.
   */
  getChangedFiles(key: string, newTree: GitHubTreeItem[]): GitHubTreeItem[] {
    // Always filter out directories — only blobs (files) are relevant
    const blobs = newTree.filter((item) => item.type === 'blob');

    const entry = this.getEntry(key);
    if (!entry) return blobs; // No cache → all files are "changed"

    const cachedShas = entry.fileShas;
    return blobs.filter((item) => {
      // Include file if it's new or its SHA differs
      return cachedShas[item.path] !== item.sha;
    });
  }

  /**
   * Builds a fileShas map from a GitHub tree response.
   */
  static buildFileShaMap(tree: GitHubTreeItem[]): Record<string, string> {
    const map: Record<string, string> = {};
    for (const item of tree) {
      if (item.type === 'blob') {
        map[item.path] = item.sha;
      }
    }
    return map;
  }
}
