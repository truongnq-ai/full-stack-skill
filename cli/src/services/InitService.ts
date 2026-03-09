import fs from 'fs-extra';
import inquirer from 'inquirer';
import yaml from 'js-yaml';
import path from 'path';
import {
  Agent,
  DEFAULT_WORKFLOWS,
  Framework,
  Language,
  SUPPORTED_AGENTS,
  SUPPORTED_FRAMEWORKS,
  SUPPORTED_LANGUAGES,
} from '../constants';
import { RegistryMetadata } from '../models/types';
import { ConfigService } from './ConfigService';
import { DetectionService } from './DetectionService';

/**
 * Contextual data gathered during project discovery to inform the initialization prompt.
 */
export interface InitContext {
  /** Map of framework IDs and whether they were detected in the workspace */
  frameworkDetection: Record<string, boolean>;
  /** Map of agent IDs and whether they were detected in the workspace */
  agentDetection: Record<string, boolean>;
  /** Map of language IDs and whether they were detected in the workspace */
  languageDetection: Record<string, boolean>;
}
/**
 * User responses gathered from the initialization prompt.
 */
export interface InitAnswers {
  /** List of language group IDs chosen by the user */
  languages: string[];
  /** List of framework IDs chosen by the user */
  frameworks: string[];
  /** List of role presets chosen by the user */
  roles: string[];
  /** List of AI agents to enable for the project */
  agents: Agent[];
  /** The URL of the skill registry to use */
  registry: string;
}

/**
 * Service for orchestrating the project initialization process.
 * Handles environment discovery, prompt choice generation, and initial config creation.
 */
export class InitService {
  public detectionService = new DetectionService();
  private configService = new ConfigService();

  /**
   * Performs environmental discovery to identify existing frameworks, agents, and languages.
   * @returns An InitContext containing detection results
   */
  async getInitializationContext(): Promise<InitContext> {
    const [frameworkDetection, agentDetection] = await Promise.all([
      this.detectionService.detectFrameworks(),
      this.detectionService.detectAgents(),
    ]);

    // Detect languages by checking detection files
    const languageDetection: Record<string, boolean> = {};
    for (const lang of SUPPORTED_LANGUAGES) {
      const fileChecks = lang.detectionFiles.map((file) =>
        fs.pathExists(path.join(process.cwd(), file)),
      );
      const results = await Promise.all(fileChecks);
      languageDetection[lang.id] = results.some((exists) => exists);
    }

    return { frameworkDetection, agentDetection, languageDetection };
  }

  /**
   * Generates language choices for the first prompt step.
   */
  getLanguageChoices(context: InitContext) {
    const languageChoices = SUPPORTED_LANGUAGES.map((lang) => ({
      name:
        lang.frameworks.length > 0
          ? `${lang.name} (${lang.frameworks.map((f) => {
            const fw = SUPPORTED_FRAMEWORKS.find((sf) => sf.id === f);
            return fw?.name || f;
          }).join(', ')})`
          : lang.name,
      value: lang.id,
      checked: context.languageDetection[lang.id] ?? false,
    }));

    return languageChoices;
  }

  /**
   * Generates framework choices filtered by selected languages.
   * Only returns frameworks that belong to the selected language groups.
   */
  getFrameworkChoices(
    selectedLanguages: string[],
    context: InitContext,
    supportedCategories: string[],
  ) {
    // Gather all frameworks from selected languages
    const availableFrameworks = new Set<Framework>();
    for (const langId of selectedLanguages) {
      const langDef = SUPPORTED_LANGUAGES.find((l) => l.id === langId);
      if (langDef) {
        langDef.frameworks.forEach((f) => availableFrameworks.add(f));
      }
    }

    if (availableFrameworks.size === 0) return [];

    // Build choices grouped by language
    const choices: (
      | { name: string; value: string; checked: boolean }
      | inquirer.Separator
    )[] = [];

    for (const langId of selectedLanguages) {
      const langDef = SUPPORTED_LANGUAGES.find((l) => l.id === langId);
      if (!langDef || langDef.frameworks.length === 0) continue;

      choices.push(new inquirer.Separator(`── ${langDef.name} ──`));

      for (const fwId of langDef.frameworks) {
        const fwDef = SUPPORTED_FRAMEWORKS.find((f) => f.id === fwId);
        if (!fwDef) continue;

        choices.push({
          name: supportedCategories.includes(fwDef.id)
            ? fwDef.name
            : `${fwDef.name} (Coming Soon)`,
          value: fwDef.id,
          checked: context.frameworkDetection[fwDef.id] ?? false,
        });
      }
    }

    return choices;
  }

  /**
   * Generates agent choices for the prompt.
   */
  getRoleChoices(presets: Record<string, string[]>) {
    return Object.keys(presets)
      .filter((k) => k.startsWith('role:'))
      .map((k) => ({ name: k.replace('role:', '').toUpperCase(), value: k }));
  }

  getStackChoices(presets: Record<string, string[]>) {
    return Object.keys(presets)
      .filter((k) => k.startsWith('stack:'))
      .map((k) => ({ name: k.replace('stack:', '').toUpperCase(), value: k }));
  }

  getAgentChoices(context: InitContext) {
    return SUPPORTED_AGENTS.map((a) => ({
      name: `${a.name} (${a.path}/)`,
      value: a.id,
      checked: context.agentDetection[a.id] ?? false,
    }));
  }

  /**
   * Orchestrates the construction, validation, and saving of the initial `.skillsrc` configuration.
   * @param answers The user's prompt responses
   * @param metadata Registry metadata for versioning
   * @param cwd Current working directory
   */
  async buildAndSaveConfig(
    answers: InitAnswers,
    metadata: Partial<RegistryMetadata>,
    presets: Record<string, string[]> = {},
    cwd: string = process.cwd(),
  ) {

    const roleCategories = new Set<string>();
    for (const role of answers.roles || []) {
      (presets[role] || []).forEach((cat) => roleCategories.add(cat));
    }

    // Collect language skill categories from selected languages
    const languageSkillCategories = new Set<string>();
    for (const langId of answers.languages) {
      const langDef = SUPPORTED_LANGUAGES.find((l) => l.id === langId);
      if (langDef) {
        langDef.skillCategories.forEach((cat) =>
          languageSkillCategories.add(cat),
        );
      }
    }

    // Detect detailed languages from selected frameworks (for TS vs JS, Java vs Kotlin)
    const detectedLanguages = new Set<string>();
    for (const fwId of answers.frameworks) {
      const frameworkDef = SUPPORTED_FRAMEWORKS.find((f) => f.id === fwId);
      if (frameworkDef) {
        const langs = await this.detectionService.detectLanguages(frameworkDef);
        langs.forEach((l) => detectedLanguages.add(l));
      }
    }

    // Merge: language skill categories + detected languages
    const allLanguages = new Set([
      ...languageSkillCategories,
      ...detectedLanguages,
    ]);

    const includeWorkflows = answers.agents.includes(Agent.Antigravity);

    const config = this.configService.buildInitialConfig(
      answers.frameworks,
      answers.agents,
      answers.registry,
      metadata,
      Array.from(new Set([...allLanguages, ...roleCategories])),
      includeWorkflows ? DEFAULT_WORKFLOWS : [],
    );

    const projectDeps = await this.detectionService.getProjectDeps();
    this.configService.applyDependencyExclusions(config, projectDeps);
    this.configService.reconcileDependencies(config, projectDeps);

    const commentHeader = `# Auto-detected configuration generated by full-stack-skill init\r
#\r
# Presence in 'skills' list = Active. To disable a skill, remove it from the list.\r
# 'exclude': IDs of sub-skills to skip during sync (auto-populated with undetected skills).\r
# 'custom_overrides': IDs of skills to PROTECT. Use this if you have modified a standard \r
# skill locally and don't want the CLI to overwrite it.\r
#\r
# Run 'fss list-skills' to view all available skills.\r
#
# TIP: For BA/QA role presets, select roles during init, or manually add:
# skills:
#   roles: { ref: roles-v1.0.0, include: [ba, qa] }
#
`;
    const configPath = path.join(cwd, '.skillsrc');
    await fs.outputFile(configPath, commentHeader + yaml.dump(config));
  }
}
