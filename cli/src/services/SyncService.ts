import fs from 'fs-extra';
import path from 'path';
import pc from 'picocolors';
import { Agent, SUPPORTED_AGENTS } from '../constants';
import { SkillConfig, SkillEntry } from '../models/config';
import {
  CollectedSkill,
  GitHubTreeItem,
  RegistryMetadata,
} from '../models/types';
import { AgentBridgeService } from './AgentBridgeService';
import { ConfigService } from './ConfigService';
import { DetectionService } from './DetectionService';
import { GithubService } from './GithubService';
import { IndexGeneratorService } from './IndexGeneratorService';
import { MarkdownUtils } from './utils/MarkdownUtils';

/**
 * Service responsible for synchronizing agent skills and workflows from a remote registry
 * to the local workspace. It handles dependency reconciliation, folder identification,
 * and writing files to appropriate agent search paths.
 */
export class SyncService {
  private configService = new ConfigService();
  private detectionService = new DetectionService();
  private githubService = new GithubService(process.env.GITHUB_TOKEN);

  /**
   * Reconciles configuration based on detected project dependencies.
   * Returns true if the configuration was changed and saved.
   */
  async reconcileConfig(
    config: SkillConfig,
    projectDeps: Set<string>,
  ): Promise<boolean> {
    const reenabled = this.configService.reconcileDependencies(
      config,
      projectDeps,
    );
    const configChanged = reenabled.length > 0;

    if (configChanged) {
      console.log(
        pc.yellow(
          `✨ Dynamic Re-detection: Re-enabling [${reenabled.join(', ')}].`,
        ),
      );
    }

    return configChanged;
  }

  /**
   * Reconciles workflows by discovering new ones in the registry and adding them to the config.
   */
  async reconcileWorkflows(config: SkillConfig): Promise<boolean> {
    if (config.workflows === false) return false;

    // Only reconcile workflows if Antigravity or OpenClaw agent is enabled
    const agents = await this.resolveTargetAgents(config);
    if (!agents.includes(Agent.Antigravity) && !agents.includes(Agent.OpenClaw)) {
      return false;
    }

    const githubMatch = GithubService.parseGitHubUrl(config.registry);
    if (!githubMatch) return false;

    const { owner, repo } = githubMatch;
    const ref =
      (await this.githubService.getRepoInfo(owner, repo))?.default_branch ||
      'main';

    const treeData = await this.githubService.getRepoTree(owner, repo, ref);
    if (!treeData) return false;

    const availableWorkflows = treeData.tree
      .filter(
        (f) => f.path.startsWith('.agent/workflows/') && f.path.endsWith('.md'),
      )
      .map((f) => path.basename(f.path, '.md'));

    if (availableWorkflows.length === 0) return false;

    let changed = false;

    if (Array.isArray(config.workflows)) {
      // If workflows is an array, auto-add ALL newly discovered workflows from the registry.
      const currentWorkflows = config.workflows as string[];
      const newWorkflows = availableWorkflows.filter(
        (wf) => !currentWorkflows.includes(wf),
      );

      if (newWorkflows.length > 0) {
        config.workflows = [...currentWorkflows, ...newWorkflows];
        console.log(
          pc.yellow(
            `✨ Workflows Discovered: Adding [${newWorkflows.join(', ')}] to .skillsrc.`,
          ),
        );
        changed = true;
      }
    } else if (config.workflows === undefined || config.workflows === true) {
      // First-time init: sync ALL available workflows from the registry.
      config.workflows = availableWorkflows;
      console.log(
        pc.yellow(
          `✨ Workflows Initialized: Adding [${availableWorkflows.join(', ')}] to .skillsrc.`,
        ),
      );
      changed = true;
    }

    return changed;
  }

  /**
   * Assembles skills from the remote registry based on provided categories and configuration.
   */
  async assembleSkills(
    categories: string[],
    config: SkillConfig,
  ): Promise<CollectedSkill[]> {
    const collected: CollectedSkill[] = [];
    const githubMatch = GithubService.parseGitHubUrl(config.registry);

    if (!githubMatch) {
      console.log(pc.red('Error: Only GitHub registries supported.'));
      return [];
    }

    const { owner, repo } = githubMatch;

    for (const category of categories) {
      const catConfig = config.skills[category];
      const ref = catConfig.ref || 'main';

      console.log(pc.gray(`  - Discovering ${category} (${ref})...`));

      const treeData = await this.githubService.getRepoTree(owner, repo, ref);
      if (!treeData) {
        console.log(pc.red(`    ❌ Failed to fetch ${category}@${ref}.`));
        continue;
      }

      const foldersToSync = this.identifyFoldersToSync(
        category,
        catConfig,
        treeData.tree,
      );

      for (const absOrRelSkill of foldersToSync) {
        const skill = await this.fetchSkill(
          owner,
          repo,
          ref,
          category,
          absOrRelSkill,
          treeData.tree,
        );
        if (skill) collected.push(skill);
      }
    }

    return collected;
  }

  /**
   * Writes collected skills to target agent paths.
   */
  async writeSkills(skills: CollectedSkill[], config: SkillConfig, dryRun?: boolean) {
    const agents = await this.resolveTargetAgents(config);
    const overrides = config.custom_overrides || [];

    for (const agentId of agents) {
      const agentDef = SUPPORTED_AGENTS.find((a) => a.id === agentId);
      if (!agentDef || !agentDef.path) continue;

      const basePath = agentDef.path;
      if (!dryRun) await fs.ensureDir(basePath);

      for (const skill of skills) {
        await this.writeSkillForAgent(agentId, skill, overrides, basePath, dryRun);
      }
      console.log(pc.gray(`  - ${dryRun ? '[DRY] Would update' : 'Updated'} ${basePath}/ (${agentDef.name})`));
    }
  }

  private async resolveTargetAgents(config: SkillConfig): Promise<Agent[]> {
    if (config.agents !== undefined) {
      return config.agents;
    }

    // Fallback to content-based detection
    const agentMap = await this.detectionService.detectAgents();
    const detectedAgents = Object.entries(agentMap)
      .filter(([, detected]) => detected)
      .map(([id]) => id as Agent);

    // If detection failed and config is empty, default to all supported agents
    return detectedAgents.length > 0
      ? detectedAgents
      : SUPPORTED_AGENTS.map((a) => a.id as Agent);
  }

  private async writeSkillForAgent(
    agentId: string,
    skill: CollectedSkill,
    overrides: string[],
    basePath: string,
    dryRun?: boolean,
  ) {
    const isKiro = agentId === Agent.Kiro;
    const kiroFolder = `${skill.category}-${skill.skill}`;
    const skillPath = isKiro
      ? path.join(basePath, kiroFolder)
      : path.join(basePath, skill.category, skill.skill);

    if (!dryRun) await fs.ensureDir(skillPath);

    for (const fileItem of skill.files) {
      const targetFilePath = path.join(skillPath, fileItem.name);

      if (this.isOverridden(targetFilePath, overrides)) {
        console.log(
          pc.yellow(
            `    ⚠️  Skipping overridden: ${this.normalizePath(targetFilePath)}`,
          ),
        );
        continue;
      }

      if (!this.isPathSafe(targetFilePath, skillPath)) {
        console.log(
          pc.red(`    ❌ Security Error: Invalid path ${fileItem.name}`),
        );
        continue;
      }

      let content = fileItem.content;
      if (isKiro && fileItem.name === 'SKILL.md') {
        content = this.transformSkillForKiro(content, skill.category);
      }

      // P2: Incremental sync — skip unchanged files
      if (!dryRun && (await fs.pathExists(targetFilePath))) {
        const existing = await fs.readFile(targetFilePath, 'utf8');
        if (existing === content) continue; // Skip unchanged
      }

      if (dryRun) {
        console.log(pc.gray(`    [DRY] Would write: ${this.normalizePath(targetFilePath)}`));
      } else {
        await fs.outputFile(targetFilePath, content);
      }

      // Enforce global guardrails at agent root
      if (fileItem.name === 'GLOBAL_GUARDRAILS.md') {
        const guardrailsPath = path.join(basePath, 'GLOBAL_GUARDRAILS.md');
        if (!this.isOverridden(guardrailsPath, overrides)) {
          if (dryRun) {
            console.log(pc.gray(`    [DRY] Would write: ${this.normalizePath(guardrailsPath)}`));
          } else {
            await fs.outputFile(guardrailsPath, content);
          }
        }
      }
    }
  }

  /**
   * Assembles workflows from the remote registry.
   */
  async assembleWorkflows(config: SkillConfig): Promise<CollectedSkill[]> {
    if (!config.workflows) return [];

    // Only sync workflows if Antigravity or OpenClaw agent is enabled
    const agents = await this.resolveTargetAgents(config);
    if (!agents.includes(Agent.Antigravity) && !agents.includes(Agent.OpenClaw)) {
      return [];
    }

    const githubMatch = GithubService.parseGitHubUrl(config.registry);
    if (!githubMatch) return [];

    const { owner, repo } = githubMatch;
    const ref =
      (await this.githubService.getRepoInfo(owner, repo))?.default_branch ||
      'main';

    console.log(pc.gray(`  - Discovering workflows (${ref})...`));

    const treeData = await this.githubService.getRepoTree(owner, repo, ref);
    if (!treeData) {
      console.log(pc.red(`    ❌ Failed to fetch workflows@${ref}.`));
      return [];
    }

    const workflowFiles = treeData.tree.filter((f) => {
      if (!f.path.startsWith('.agent/workflows/') || !f.path.endsWith('.md'))
        return false;

      if (typeof config.workflows === 'boolean') return config.workflows;
      if (Array.isArray(config.workflows)) {
        return config.workflows.includes(path.basename(f.path, '.md'));
      }
      return false;
    });

    const files = await this.githubService.downloadFilesConcurrent(
      workflowFiles.map((f) => ({ owner, repo, ref, path: f.path })),
    );

    if (files.length > 0) {
      console.log(pc.gray(`    + Fetched ${files.length} workflows`));
      return [
        {
          category: '.agent',
          skill: 'workflows',
          files: files.map((f) => ({
            name: path.basename(f.path),
            content: f.content,
          })),
        },
      ];
    }

    return [];
  }

  /**
   * Writes collected workflows to the .agent/workflows directory.
   */
  async writeWorkflows(workflows: CollectedSkill[], config: SkillConfig, dryRun?: boolean) {
    if (workflows.length === 0) return;

    // Only write workflows if Antigravity or OpenClaw agent is enabled
    const agents = await this.resolveTargetAgents(config);
    if (!agents.includes(Agent.Antigravity) && !agents.includes(Agent.OpenClaw)) {
      return;
    }

    const workflowPath = path.join(process.cwd(), '.agent', 'workflows');
    const overrides = config.custom_overrides || [];
    if (!dryRun) await fs.ensureDir(workflowPath);

    for (const wf of workflows) {
      if (wf.skill !== 'workflows') continue;

      for (const fileItem of wf.files) {
        const targetFilePath = path.join(workflowPath, fileItem.name);

        if (this.isOverridden(targetFilePath, overrides)) {
          console.log(
            pc.yellow(
              `    ⚠️  Skipping overridden: ${this.normalizePath(targetFilePath)}`,
            ),
          );
          continue;
        }

        if (dryRun) {
          console.log(pc.gray(`    [DRY] Would write: ${this.normalizePath(targetFilePath)}`));
        } else {
          // Incremental: skip if unchanged
          if (await fs.pathExists(targetFilePath)) {
            const existing = await fs.readFile(targetFilePath, 'utf8');
            if (existing === fileItem.content) continue;
          }
          await fs.outputFile(targetFilePath, fileItem.content);
          console.log(pc.gray(`    + Wrote ${fileItem.name}`));
        }
      }
    }
    console.log(pc.green(`  ✅ Workflows ${dryRun ? 'preview' : 'synced'} to .agent/workflows/`));
  }

  /**
   * Assembles rules from the remote registry (.agent/rules/*.md).
   */
  async assembleRules(config: SkillConfig): Promise<CollectedSkill[]> {
    if (config.rules === false || config.rules === undefined) return [];

    // Only sync rules if Antigravity or OpenClaw agent is enabled
    const agents = await this.resolveTargetAgents(config);
    if (!agents.includes(Agent.Antigravity) && !agents.includes(Agent.OpenClaw)) {
      return [];
    }

    const githubMatch = GithubService.parseGitHubUrl(config.registry);
    if (!githubMatch) return [];

    const { owner, repo } = githubMatch;
    const ref =
      (await this.githubService.getRepoInfo(owner, repo))?.default_branch ||
      'main';

    console.log(pc.gray(`  - Discovering rules (${ref})...`));

    const treeData = await this.githubService.getRepoTree(owner, repo, ref);
    if (!treeData) {
      console.log(pc.red(`    ❌ Failed to fetch rules@${ref}.`));
      return [];
    }

    const ruleFiles = treeData.tree.filter(
      (f) =>
        f.path.startsWith('.agent/rules/') && f.path.endsWith('.md'),
    );

    const files = await this.githubService.downloadFilesConcurrent(
      ruleFiles.map((f) => ({ owner, repo, ref, path: f.path })),
    );

    if (files.length > 0) {
      console.log(pc.gray(`    + Fetched ${files.length} rules`));
      return [
        {
          category: '.agent',
          skill: 'rules',
          files: files.map((f) => ({
            name: path.basename(f.path),
            content: f.content,
          })),
        },
      ];
    }

    return [];
  }

  /**
   * Writes collected rules to the .agent/rules directory.
   */
  async writeRules(rules: CollectedSkill[], config: SkillConfig, dryRun?: boolean) {
    if (rules.length === 0) return;

    // Only write rules if Antigravity or OpenClaw agent is enabled
    const agents = await this.resolveTargetAgents(config);
    if (!agents.includes(Agent.Antigravity) && !agents.includes(Agent.OpenClaw)) {
      return;
    }

    const rulesPath = path.join(process.cwd(), '.agent', 'rules');
    const overrides = config.custom_overrides || [];
    if (!dryRun) await fs.ensureDir(rulesPath);

    for (const ruleSet of rules) {
      if (ruleSet.skill !== 'rules') continue;

      for (const fileItem of ruleSet.files) {
        const targetFilePath = path.join(rulesPath, fileItem.name);

        if (this.isOverridden(targetFilePath, overrides)) {
          console.log(
            pc.yellow(
              `    ⚠️  Skipping overridden: ${this.normalizePath(targetFilePath)}`,
            ),
          );
          continue;
        }

        if (dryRun) {
          console.log(pc.gray(`    [DRY] Would write: ${this.normalizePath(targetFilePath)}`));
        } else {
          // Incremental: skip if unchanged
          if (await fs.pathExists(targetFilePath)) {
            const existing = await fs.readFile(targetFilePath, 'utf8');
            if (existing === fileItem.content) continue;
          }
          await fs.outputFile(targetFilePath, fileItem.content);
          console.log(pc.gray(`    + Wrote ${fileItem.name}`));
        }
      }
    }
    console.log(pc.green(`  ✅ Rules ${dryRun ? 'preview' : 'synced'} to .agent/rules/`));
  }


  /**
   * Automatically applies framework-specific indices to AGENTS.md.
   */
  async applyIndices(config: SkillConfig, agentsOverride?: Agent[]) {
    const agents = await this.resolveTargetAgents({
      ...config,
      agents: agentsOverride ?? config.agents,
    });
    if (agents.length === 0) return;

    console.log(pc.cyan('🔍 Updating Agent Skills index...'));

    const agentDef = SUPPORTED_AGENTS.find((a) => a.id === agents[0]);
    if (!agentDef) {
      console.log(
        pc.yellow(`  ⚠️  Agent definition not found for ${agents[0]}.`),
      );
      return;
    }

    try {
      const generator = new IndexGeneratorService();
      const indexContent = await generator.generate(
        path.join(process.cwd(), agentDef.path),
        Object.keys(config.skills),
      );

      await MarkdownUtils.injectIndex(
        process.cwd(),
        ['AGENTS.md'],
        indexContent,
      );

      const bridgeService = new AgentBridgeService();
      await bridgeService.bridge(process.cwd(), agents);

      console.log(pc.green(`  ✅ AGENTS.md index updated.`));
    } catch (error) {
      console.log(pc.yellow(`  ⚠️  Failed to update index: ${error}`));
    }
  }

  /**
   * Checks for newer versions of skills in the remote registry.
   */
  async checkForUpdates(
    config: SkillConfig,
  ): Promise<Record<string, string> | null> {
    const githubMatch = GithubService.parseGitHubUrl(config.registry);
    if (!githubMatch) return null;

    const { owner, repo } = githubMatch;

    try {
      const branch =
        (await this.githubService.getRepoInfo(owner, repo))?.default_branch ||
        'main';
      const metaContent = await this.githubService.getRawFile(
        owner,
        repo,
        branch,
        'skills/metadata.json',
      );

      if (!metaContent) return null;

      const metadata = JSON.parse(metaContent) as RegistryMetadata;
      const updates: Record<string, string> = {};

      for (const [category, catConfig] of Object.entries(config.skills)) {
        const remoteMeta = metadata.categories[category];
        if (!remoteMeta?.version) continue;

        const latestRef = `${remoteMeta.tag_prefix || ''}${remoteMeta.version}`;
        if (catConfig.ref !== latestRef) {
          updates[category] = latestRef;
        }
      }

      return Object.keys(updates).length > 0 ? updates : null;
    } catch (error) {
      if (process.env.DEBUG)
        console.warn(`[SyncService] Update check failed: ${error}`);
      return null;
    }
  }

  // --- Helper Methods ---

  private identifyFoldersToSync(
    category: string,
    catConfig: SkillEntry,
    tree: GitHubTreeItem[],
  ): string[] {
    const skillFolders = new Set(
      tree
        .filter((f) => f.path.startsWith(`skills/${category}/`))
        .map((f) => f.path.split('/')[2])
        .filter(Boolean),
    );

    const folders = Array.from(skillFolders).filter((folder) => {
      if (catConfig.include && !catConfig.include.includes(folder))
        return false;
      if (catConfig.exclude && catConfig.exclude.includes(folder)) return false;
      return true;
    });

    if (catConfig.include) {
      catConfig.include
        .filter((i) => i.includes('/'))
        .forEach((absSkill) =>
          this.expandAbsoluteInclude(absSkill, folders, tree),
        );
    }

    return folders;
  }

  private expandAbsoluteInclude(
    absSkill: string,
    folders: string[],
    tree: GitHubTreeItem[],
  ) {
    const [targetCat, targetSkill] = absSkill.split('/');
    if (!targetCat || !targetSkill) return;

    if (targetSkill === '*') {
      const catSkills = new Set(
        tree
          .filter((f) => f.path.startsWith(`skills/${targetCat}/`))
          .map((f) => f.path.split('/')[2])
          .filter(Boolean),
      );

      catSkills.forEach((s) => {
        const fullPath = `${targetCat}/${s}`;
        if (!folders.includes(fullPath)) folders.push(fullPath);
      });
    } else if (!folders.includes(absSkill)) {
      if (
        tree.some((f) =>
          f.path.startsWith(`skills/${targetCat}/${targetSkill}/`),
        )
      ) {
        folders.push(absSkill);
      } else {
        console.log(
          pc.yellow(
            `    ⚠️  Absolute include ${absSkill} not found in repository.`,
          ),
        );
      }
    }
  }

  private async fetchSkill(
    owner: string,
    repo: string,
    ref: string,
    category: string,
    absOrRelSkill: string,
    tree: GitHubTreeItem[],
  ): Promise<CollectedSkill | null> {
    const [sourceCat, skillName] = absOrRelSkill.includes('/')
      ? absOrRelSkill.split('/')
      : [category, absOrRelSkill];

    const prefix = `skills/${sourceCat}/${skillName}/`;
    const skillSourceFiles = tree.filter(
      (f) => f.path.startsWith(prefix) && f.type === 'blob',
    );

    const downloadTasks = skillSourceFiles
      .filter((f) => {
        const rel = f.path.replace(prefix, '');
        return rel === 'SKILL.md' || /^(references|scripts|assets)\//.test(rel);
      })
      .map((f) => ({ owner, repo, ref, path: f.path }));

    const files =
      await this.githubService.downloadFilesConcurrent(downloadTasks);
    if (files.length === 0) return null;

    console.log(
      pc.gray(
        `    + Fetched ${sourceCat}/${skillName} (${files.length} files)`,
      ),
    );

    return {
      category: sourceCat,
      skill: skillName,
      files: files.map((f) => ({
        name: f.path.replace(prefix, ''),
        content: f.content,
      })),
    };
  }

  private transformSkillForKiro(content: string, category: string): string {
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) return content;

    const [fullMatch, frontmatter] = frontmatterMatch;
    const body = content.slice(fullMatch.length);

    const name = frontmatter.match(/^name:\s*(.+)$/m)?.[1].trim() || '';
    const description =
      frontmatter.match(/^description:\s*(.+)$/m)?.[1].trim() || '';
    const displayName = `${category.charAt(0).toUpperCase() + category.slice(1)} - ${name}`;

    return `---\nname: ${displayName}\ndescription: ${description}\n---` + body;
  }

  private isOverridden(targetPath: string, overrides: string[]): boolean {
    const rel = this.normalizePath(targetPath);
    return overrides.some((o) => {
      const op = o.replace(/\\/g, '/');
      return rel === op || rel.startsWith(`${op.replace(/\/$/, '/')}/`);
    });
  }

  private isPathSafe(targetPath: string, skillPath: string): boolean {
    return path.resolve(targetPath).startsWith(path.resolve(skillPath));
  }

  private normalizePath(p: string): string {
    return path.relative(process.cwd(), p).replace(/\\/g, '/');
  }
}
