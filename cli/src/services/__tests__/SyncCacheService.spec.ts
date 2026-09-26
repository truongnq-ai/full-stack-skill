import fs from 'fs-extra';
import os from 'os';
import path from 'path';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SyncCacheService } from '../SyncCacheService';

vi.mock('fs-extra');
vi.mock('os', () => ({
  default: { homedir: () => '/home/test' },
  homedir: () => '/home/test',
}));

describe('SyncCacheService', () => {
  let service: SyncCacheService;
  const testCacheDir = '/test/cache';

  beforeEach(() => {
    vi.clearAllMocks();
    service = new SyncCacheService(testCacheDir);
  });

  describe('load()', () => {
    it('should return fresh manifest when file does not exist', async () => {
      vi.mocked(fs.pathExists).mockResolvedValue(false as never);

      const manifest = await service.load();
      expect(manifest).toEqual({ version: 1, entries: {} });
    });

    it('should load existing manifest from disk', async () => {
      const existingManifest = {
        version: 1,
        entries: {
          'workspace::owner/repo@ref': {
            treeSha: 'abc123',
            syncedAt: '2026-01-01T00:00:00Z',
            fileShas: { 'file.md': 'sha1' },
          },
        },
      };
      vi.mocked(fs.pathExists).mockResolvedValue(true as never);
      vi.mocked(fs.readFile).mockResolvedValue(
        JSON.stringify(existingManifest) as never,
      );

      const manifest = await service.load();
      expect(manifest).toEqual(existingManifest);
    });

    it('should return fresh manifest when file is corrupt JSON', async () => {
      vi.mocked(fs.pathExists).mockResolvedValue(true as never);
      vi.mocked(fs.readFile).mockResolvedValue('not valid json' as never);
      vi.mocked(fs.remove).mockResolvedValue(undefined as never);

      const manifest = await service.load();
      expect(manifest).toEqual({ version: 1, entries: {} });
      expect(fs.remove).toHaveBeenCalled();
    });

    it('should return cached manifest on subsequent calls', async () => {
      vi.mocked(fs.pathExists).mockResolvedValue(false as never);

      const manifest1 = await service.load();
      const manifest2 = await service.load();
      expect(manifest1).toBe(manifest2);
      // pathExists should only be called once
      expect(fs.pathExists).toHaveBeenCalledTimes(1);
    });
  });

  describe('save()', () => {
    it('should write manifest atomically (temp + rename)', async () => {
      vi.mocked(fs.pathExists).mockResolvedValue(false as never);
      vi.mocked(fs.outputFile).mockResolvedValue(undefined as never);
      vi.mocked(fs.rename).mockResolvedValue(undefined as never);

      await service.load();
      service.setEntry('key', {
        treeSha: 'sha',
        syncedAt: '2026-01-01T00:00:00Z',
        fileShas: {},
      });
      await service.save();

      const manifestPath = path.join(testCacheDir, 'sync-manifest.json');
      expect(fs.outputFile).toHaveBeenCalledWith(
        `${manifestPath}.tmp`,
        expect.any(String),
      );
      expect(fs.rename).toHaveBeenCalledWith(
        `${manifestPath}.tmp`,
        manifestPath,
      );
    });

    it('should not write if manifest was never loaded', async () => {
      await service.save();
      expect(fs.outputFile).not.toHaveBeenCalled();
    });
  });

  describe('getCacheKey()', () => {
    it('should include workspace path, owner, repo, and ref', () => {
      const key = service.getCacheKey('D:\\project', 'owner', 'repo', 'v1.0.0');
      expect(key).toBe('D:/project::owner/repo@v1.0.0');
    });

    it('should normalize backslashes to forward slashes', () => {
      const key = service.getCacheKey(
        'C:\\Users\\user\\project',
        'org',
        'skills',
        'main',
      );
      expect(key).toBe('C:/Users/user/project::org/skills@main');
    });
  });

  describe('isTreeUnchanged()', () => {
    it('should return false when no cache entry exists', async () => {
      vi.mocked(fs.pathExists).mockResolvedValue(false as never);
      await service.load();

      expect(service.isTreeUnchanged('missing-key', 'sha')).toBe(false);
    });

    it('should return true when tree SHA matches', async () => {
      vi.mocked(fs.pathExists).mockResolvedValue(false as never);
      await service.load();

      service.setEntry('key', {
        treeSha: 'same-sha',
        syncedAt: '2026-01-01T00:00:00Z',
        fileShas: {},
      });

      expect(service.isTreeUnchanged('key', 'same-sha')).toBe(true);
    });

    it('should return false when tree SHA differs', async () => {
      vi.mocked(fs.pathExists).mockResolvedValue(false as never);
      await service.load();

      service.setEntry('key', {
        treeSha: 'old-sha',
        syncedAt: '2026-01-01T00:00:00Z',
        fileShas: {},
      });

      expect(service.isTreeUnchanged('key', 'new-sha')).toBe(false);
    });
  });

  describe('getChangedFiles()', () => {
    it('should return all files when no cache entry exists', async () => {
      vi.mocked(fs.pathExists).mockResolvedValue(false as never);
      await service.load();

      const tree = [
        { path: 'a.md', type: 'blob' as const, sha: 'sha1', url: '' },
        { path: 'b.md', type: 'blob' as const, sha: 'sha2', url: '' },
      ];

      const changed = service.getChangedFiles('missing', tree);
      expect(changed).toHaveLength(2);
    });

    it('should only return new and changed files', async () => {
      vi.mocked(fs.pathExists).mockResolvedValue(false as never);
      await service.load();

      service.setEntry('key', {
        treeSha: 'tree-sha',
        syncedAt: '2026-01-01T00:00:00Z',
        fileShas: {
          'unchanged.md': 'same-sha',
          'changed.md': 'old-sha',
          'deleted.md': 'deleted-sha',
        },
      });

      const newTree = [
        {
          path: 'unchanged.md',
          type: 'blob' as const,
          sha: 'same-sha',
          url: '',
        },
        {
          path: 'changed.md',
          type: 'blob' as const,
          sha: 'new-sha',
          url: '',
        },
        {
          path: 'brand-new.md',
          type: 'blob' as const,
          sha: 'brand-sha',
          url: '',
        },
        { path: 'dir', type: 'tree' as const, sha: 'dir-sha', url: '' },
      ];

      const changed = service.getChangedFiles('key', newTree);
      expect(changed).toHaveLength(2);
      expect(changed.map((f) => f.path)).toEqual([
        'changed.md',
        'brand-new.md',
      ]);
    });

    it('should exclude tree items (directories)', async () => {
      vi.mocked(fs.pathExists).mockResolvedValue(false as never);
      await service.load();

      const tree = [
        { path: 'dir', type: 'tree' as const, sha: 'sha1', url: '' },
      ];

      const changed = service.getChangedFiles('key', tree);
      expect(changed).toHaveLength(0);
    });
  });

  describe('buildFileShaMap()', () => {
    it('should build a map of blob paths to SHAs', () => {
      const tree = [
        { path: 'a.md', type: 'blob' as const, sha: 'sha1', url: '' },
        { path: 'b.md', type: 'blob' as const, sha: 'sha2', url: '' },
        { path: 'dir', type: 'tree' as const, sha: 'sha3', url: '' },
      ];

      const map = SyncCacheService.buildFileShaMap(tree);
      expect(map).toEqual({ 'a.md': 'sha1', 'b.md': 'sha2' });
    });
  });
});
