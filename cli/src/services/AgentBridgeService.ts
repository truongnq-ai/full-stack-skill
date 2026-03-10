import fs from 'fs-extra';
import path from 'path';
import { Agent, getAgentDefinition } from '../constants';

/**
 * Service responsible for bridging native AI agent rule files to AGENTS.md.
 * Ensures agent-specific rule directories exist for detected agents.
 *
 * Note: Rule file content is now downloaded from the registry via SyncService.writeRules().
 */
export class AgentBridgeService {
  /**
   * Ensures agent rule directories exist for all detected agents.
   * Rule files are synced from the registry by SyncService — not generated here.
   * @param rootDir Project root directory
   * @param agents List of agents to generate rules for
   */
  async bridge(rootDir: string, agents: Agent[]): Promise<void> {
    for (const agentId of agents) {
      const config = getAgentDefinition(agentId);
      if (!config) continue;

      // SAFETY: Only proceed if the agent is detected in the project
      let detected = false;
      for (const file of config.detectionFiles) {
        if (await fs.pathExists(path.join(rootDir, file))) {
          detected = true;
          break;
        }
      }

      if (!detected) continue;

      // Ensure the rules directory exists so subsequent file writes succeed
      const ruleDir = path.join(rootDir, config.ruleFile);
      await fs.ensureDir(ruleDir);
    }
  }
}

