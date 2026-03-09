import { Agent } from '../constants';

/**
 * Represents a single skill entry in the configuration.
 */
export interface SkillEntry {
  /** Optional reference (branch/tag/sha) for this skill/category */
  ref?: string;
  /** List of sub-skill IDs to exclude during sync */
  exclude?: string[];
  /** List of sub-skill IDs to explicitly include (overrides detection) */
  include?: string[];
}

/**
 * Alias for SkillEntry used within the ConfigService for consistency.
 */
export type CategoryConfig = SkillEntry;

/**
 * The main configuration structure for full-stack-skill (usually .skillsrc).
 */
export interface SkillConfig {
  /** Registry URL to sync from */
  registry: string;
  /** List of AI agents currently managed in this project */
  agents: Agent[];
  /** Map of categories and their associated skill configurations */
  skills: {
    [key: string]: SkillEntry;
  };
  /** Whether to sync workflows, or a specific list of workflow names */
  workflows?: boolean | string[];
  /** List of preset IDs (e.g., 'role:qa', 'stack:backend') */
  presets?: string[];
  /** Cached presets mapping from the registry (preset ID → category array) */
  presets_data?: Record<string, string[]>;
  /** List of file paths to PROTECT from being overwritten by sync */
  custom_overrides?: string[];
}
