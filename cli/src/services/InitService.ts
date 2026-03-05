import fs from 'fs-extra';
import inquirer from 'inquirer';
import yaml from 'js-yaml';
import path from 'path';
import {
  Agent,
  DEFAULT_WORKFLOWS,
  Framework,
  SUPPORTED_AGENTS,
  SUPPORTED_FRAMEWORKS,
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
}
/**
 * User responses gathered from the initialization prompt.
 */
export interface InitAnswers {
  /** List of framework IDs chosen by the user */
  frameworks: string[];
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
  private detectionService = new DetectionService();
  private configService = new ConfigService();

  /**
   * Performs environmental discovery to identify existing frameworks and agents.
   * @returns An InitContext containing detection results
   */
  async getInitializationContext(): Promise<InitContext> {
    const [frameworkDetection, agentDetection] = await Promise.all([
      this.detectionService.detectFrameworks(),
      this.detectionService.detectAgents(),
    ]);

    return { frameworkDetection, agentDetection };
  }

  /**
   * Transforms the initialization context and registry metadata into choices for the interactive prompt.
   * @param context The discovered initialization context
   * @param supportedCategories List of categories currently supported by the registry
   * @returns Formatted choices grouped by category and the default frameworks
   */
  getPromptChoices(context: InitContext, supportedCategories: string[]) {
    const MOBILE_FRAMEWORKS = [
      Framework.Flutter,
      Framework.ReactNative,
      Framework.Android,
      Framework.iOS,
    ];
    const BACKEND_FRAMEWORKS = [
      Framework.NestJS,
      Framework.SpringBoot,
      Framework.Golang,
      Framework.Laravel,
    ];
    const FRONTEND_FRAMEWORKS = [
      Framework.NextJS,
      Framework.React,
      Framework.Angular,
    ];

    const makeChoice = (f: (typeof SUPPORTED_FRAMEWORKS)[number]) => ({
      name: supportedCategories.includes(f.id)
        ? f.name
        : `${f.name} (Coming Soon)`,
      value: f.id,
      checked: context.frameworkDetection[f.id] ?? false,
    });

    const getGroup = (ids: Framework[]) =>
      SUPPORTED_FRAMEWORKS.filter((f) =>
        ids.includes(f.id as Framework),
      ).map(makeChoice);

    const frameworkChoices: (ReturnType<typeof makeChoice> | inquirer.Separator)[] = [
      new inquirer.Separator('── 📱 Mobile ──'),
      ...getGroup(MOBILE_FRAMEWORKS),
      new inquirer.Separator('── 🖥️  Backend ──'),
      ...getGroup(BACKEND_FRAMEWORKS),
      new inquirer.Separator('── 🌐 Frontend ──'),
      ...getGroup(FRONTEND_FRAMEWORKS),
    ];

    const agentChoices = SUPPORTED_AGENTS.map((a) => ({
      name: `${a.name} (${a.path}/)`,
      value: a.id,
      checked: context.agentDetection[a.id] ?? false,
    }));

    const defaultFrameworks = SUPPORTED_FRAMEWORKS
      .filter((f) => context.frameworkDetection[f.id])
      .map((f) => f.id);

    return {
      frameworkChoices,
      agentChoices,
      defaultFrameworks,
    };
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
    cwd: string = process.cwd(),
  ) {
    const frameworkIds = answers.frameworks;

    // Detect languages from all selected frameworks and merge unique
    const allLanguages = new Set<string>();
    for (const fwId of frameworkIds) {
      const frameworkDef = SUPPORTED_FRAMEWORKS.find((f) => f.id === fwId);
      if (frameworkDef) {
        const langs = await this.detectionService.detectLanguages(frameworkDef);
        langs.forEach((l) => allLanguages.add(l));
      }
    }

    const includeWorkflows = answers.agents.includes(Agent.Antigravity);

    const config = this.configService.buildInitialConfig(
      frameworkIds,
      answers.agents,
      answers.registry,
      metadata,
      Array.from(allLanguages),
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
# TIP: For Jira/Zephyr automation and requirement analysis, manually add:
# skills:
#   quality-engineering: { ref: quality-engineering-v1.0.0 }
#
`;
    const configPath = path.join(cwd, '.skillsrc');
    await fs.outputFile(configPath, commentHeader + yaml.dump(config));
  }
}
