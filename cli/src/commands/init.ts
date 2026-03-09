import fs from 'fs-extra';
import inquirer from 'inquirer';
import path from 'path';
import pc from 'picocolors';
import { DEFAULT_REGISTER, SUPPORTED_LANGUAGES, SUPPORTED_FRAMEWORKS } from '../constants';
import { InitAnswers, InitService } from '../services/InitService';
import { RegistryService } from '../services/RegistryService';
import { SyncCommand } from './sync';

/**
 * Command for initializing the full-stack-skill configuration in a project.
 * Streamlined wizard: Languages → Frameworks → Agents → Confirm → Save
 */
export class InitCommand {
  private initService: InitService;
  private registryService: RegistryService;

  constructor(initService?: InitService, registryService?: RegistryService) {
    this.initService = initService || new InitService();
    this.registryService = registryService || new RegistryService();
  }

  async run(options: { nonInteractive?: boolean; advanced?: boolean } = {}) {
    const configPath = path.join(process.cwd(), '.skillsrc');

    // 1. Check for existing config
    if (await fs.pathExists(configPath)) {
      if (options.nonInteractive) {
        console.log(pc.yellow('⚠️  .skillsrc already exists. Overwriting in non-interactive mode.'));
      } else {
        const { overwrite } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'overwrite',
            message: '.skillsrc already exists. Do you want to overwrite it?',
            default: false,
          },
        ]);
        if (!overwrite) {
          console.log(pc.yellow('Aborted.'));
          return;
        }
      }
    }

    // 2. Gather context data
    const context = await this.initService.getInitializationContext();
    const { categories, metadata, presets } =
      await this.registryService.discoverRegistry(DEFAULT_REGISTER);

    let answers: InitAnswers;

    if (options.nonInteractive) {
      // Non-interactive: use all auto-detected values
      const detectedLanguages = Object.entries(context.languageDetection)
        .filter(([, detected]) => detected)
        .map(([id]) => id);
      const detectedFrameworks = Object.entries(context.frameworkDetection)
        .filter(([, detected]) => detected)
        .map(([id]) => id);
      const detectedAgents = Object.entries(context.agentDetection)
        .filter(([, detected]) => detected)
        .map(([id]) => id);

      if (detectedLanguages.length === 0) {
        console.log(pc.yellow('⚠️  No languages detected. Please run interactively for manual selection.'));
      }

      answers = {
        languages: detectedLanguages,
        frameworks: detectedFrameworks,
        roles: [],
        agents: detectedAgents as any[],
        registry: DEFAULT_REGISTER,
      };

      console.log(pc.gray(`   Auto-detected languages: ${detectedLanguages.join(', ') || '(none)'}`));
      console.log(pc.gray(`   Auto-detected frameworks: ${detectedFrameworks.join(', ') || '(none)'}`));
      console.log(pc.gray(`   Auto-detected agents: ${detectedAgents.join(', ') || '(none)'}`));
    } else {
      // ── Interactive wizard (3 steps) ──────────────────────────────────

      // Step 1 — Select Languages
      const languageChoices = this.initService.getLanguageChoices(context);
      const { languages } = await inquirer.prompt<{ languages: string[] }>([
        {
          type: 'checkbox',
          name: 'languages',
          message: 'Select your programming languages:',
          choices: languageChoices,
          pageSize: 10,
          validate: (ans: string[]) =>
            ans.length > 0 || 'Please select at least one language.',
        },
      ]);

      // Step 2 — Select Frameworks (filtered by selected languages)
      const frameworkChoices = this.initService.getFrameworkChoices(
        languages,
        context,
        categories,
      );

      let frameworks: string[] = [];
      if (frameworkChoices.length > 0) {
        const fwAnswers = await inquirer.prompt<{ frameworks: string[] }>([
          {
            type: 'checkbox',
            name: 'frameworks',
            message: 'Select frameworks:',
            choices: frameworkChoices,
            pageSize: 20,
          },
        ]);
        frameworks = fwAnswers.frameworks;
      }

      // Step 3 — Select Agents (grouped by popularity)
      const agentChoices = this.initService.getAgentChoices(context);

      const { agents } = await inquirer.prompt<{ agents: string[] }>([
        {
          type: 'checkbox',
          name: 'agents',
          message: 'Select AI Agents you use:',
          choices: agentChoices,
          pageSize: 15,
        },
      ]);

      // Advanced: Registry URL (only shown with --advanced flag)
      let registry = DEFAULT_REGISTER;
      if (options.advanced) {
        const regAnswer = await inquirer.prompt<{ registry: string }>([
          {
            type: 'input',
            name: 'registry',
            message: 'Skills Registry URL:',
            default: DEFAULT_REGISTER,
          },
        ]);
        registry = regAnswer.registry;
      }

      answers = {
        languages,
        frameworks,
        roles: [],
        agents: agents as any[],
        registry,
      };

      // ── Confirmation Summary ──────────────────────────────────────────
      const langNames = languages
        .map((id) => SUPPORTED_LANGUAGES.find((l) => l.id === id)?.name || id)
        .join(', ');
      const fwNames = frameworks
        .map((id) => SUPPORTED_FRAMEWORKS.find((f) => f.id === id)?.name || id)
        .join(', ');
      const agentNames = agents.join(', ');

      console.log('');
      console.log(pc.cyan('📋 Configuration Summary:'));
      console.log(pc.gray('─────────────────────────────────────────'));
      console.log(pc.gray(`   Languages:  ${langNames || '(none)'}`));
      if (fwNames) console.log(pc.gray(`   Frameworks: ${fwNames}`));
      console.log(pc.gray(`   Agents:     ${agentNames || '(none)'}`));
      console.log(pc.gray(`   Registry:   ${registry}`));
      console.log(pc.gray('─────────────────────────────────────────'));

      const { confirmed } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirmed',
          message: 'Save and continue?',
          default: true,
        },
      ]);

      if (!confirmed) {
        console.log(pc.yellow('Aborted.'));
        return;
      }
    }

    // 4. Build answers and save
    await this.initService.buildAndSaveConfig(answers, metadata, presets);

    console.log(pc.green('\n✅ Initialized .skillsrc with your preferences!'));
    if (answers.languages.length > 0) {
      console.log(pc.gray(`   Languages: ${answers.languages.join(', ')}`));
    }
    if (answers.frameworks.length > 0) {
      console.log(pc.gray(`   Frameworks: ${answers.frameworks.join(', ')}`));
    }

    // 5. Auto-sync prompt
    let shouldSync = options.nonInteractive;
    if (!options.nonInteractive) {
      const { sync } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'sync',
          message: 'Run sync now to download skills?',
          default: true,
        },
      ]);
      shouldSync = sync;
    }

    if (shouldSync) {
      console.log('');
      const syncCmd = new SyncCommand();
      await syncCmd.run({ yes: true });
    } else {
      console.log(
        pc.cyan(
          '\nNext step: Run `full-stack-skill sync` to generate rule files.',
        ),
      );
    }
  }
}
