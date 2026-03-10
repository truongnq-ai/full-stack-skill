import fs from 'fs-extra';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Agent } from '../../constants';
import { AgentBridgeService } from '../AgentBridgeService';

vi.mock('fs-extra');

describe('AgentBridgeService', () => {
  let service: AgentBridgeService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AgentBridgeService();
    (fs.ensureDir as any).mockResolvedValue(undefined);
  });

  describe('bridge', () => {
    it('should ensure rule directories exist for detected agents', async () => {
      const rootDir = '/root';
      const agents = [Agent.Cursor, Agent.Antigravity];

      // Mock pathExists to return TRUE to simulate detected agents
      (fs.pathExists as any).mockResolvedValue(true);

      await service.bridge(rootDir, agents);

      // Should ensure directories exist for detected agents
      expect(fs.ensureDir).toHaveBeenCalled();

      // Should NOT write any hardcoded rule content — that is now done by SyncService.writeRules()
      expect(fs.outputFile).not.toHaveBeenCalled();
    });

    it('should SKIP agents if their detection files do not exist', async () => {
      const rootDir = '/root';
      const agents = [Agent.Cursor, Agent.Roo];

      // Mock pathExists to return FALSE
      (fs.pathExists as any).mockResolvedValue(false);

      await service.bridge(rootDir, agents);

      expect(fs.ensureDir).not.toHaveBeenCalled();
      expect(fs.outputFile).not.toHaveBeenCalled();
    });

    it('should ensure rule directory for detected Cursor agent', async () => {
      const rootDir = '/root';
      const agents = [Agent.Cursor];

      (fs.pathExists as any).mockImplementation(async (p: string) => {
        if (p.endsWith('.cursor') || p.endsWith('.cursorrules')) return true;
        return false;
      });

      await service.bridge(rootDir, agents);

      expect(fs.ensureDir).toHaveBeenCalledWith(
        expect.stringMatching(/\.cursor[/\\]rules/),
      );
      // No hardcoded file content written
      expect(fs.outputFile).not.toHaveBeenCalled();
    });

    it('should skip unknown agents gracefully', async () => {
      const rootDir = '/root';
      await service.bridge(rootDir, ['unknown-agent' as Agent]);
      expect(fs.ensureDir).not.toHaveBeenCalled();
      expect(fs.outputFile).not.toHaveBeenCalled();
    });
  });
});
