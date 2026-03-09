import fs from 'fs-extra';
import inquirer from 'inquirer';
import path from 'path';
import pc from 'picocolors';
import { DEFAULT_REGISTER } from '../constants';
import { InitAnswers, InitService } from '../services/InitService';
import { RegistryService } from '../services/RegistryService';

/**
 * Command for initializing the full-stack-skill configuration in a project.
 * It guides the user through environment detection and creates the `.skillsrc` file.
 */
export class InitCommand {
  private initService: InitService;
  private registryService: RegistryService;

  constructor(initService?: InitService, registryService?: RegistryService) {
    this.initService = initService || new InitService();
    this.registryService = registryService || new RegistryService();
  }


  async run() {
    const configPath = path.join(process.cwd(), '.skillsrc');

    // 1. Check for existing config
    if (await fs.pathExists(configPath)) {
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

    // 2. Gather context data
    const context = await this.initService.getInitializationContext();
    const { categories, metadata, presets } =
      await this.registryService.discoverRegistry(DEFAULT_REGISTER);

    // 3. Step 1 — Select Languages
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

    // 4. Step 2 — Select Frameworks (filtered by selected languages)
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

    // 5. Step 3 — Select Role & Stack Presets (optional)
    const suggestedPresets: string[] = [];
    if (frameworks.some((f) => ['nextjs', 'react', 'angular', 'nestjs'].includes(f))) suggestedPresets.push('stack:web');
    if (frameworks.some((f) => ['android', 'ios', 'flutter', 'react-native'].includes(f))) suggestedPresets.push('stack:mobile');
    if (frameworks.some((f) => ['nestjs', 'spring-boot', 'golang', 'laravel', 'java'].includes(f))) suggestedPresets.push('stack:backend');
    if (languages.some((l) => ['python', 'javascript', 'typescript'].includes(l))) suggestedPresets.push('stack:frontend');

    const roleChoices = this.initService.getRoleChoices(presets);
    const stackChoices = this.initService.getStackChoices(presets);
    const { roles, stacks } = await inquirer.prompt<{ roles: string[]; stacks: string[] }>([
      {
        type: 'checkbox',
        name: 'roles',
        message: 'Select role presets (optional):',
        choices: roleChoices,
        default: suggestedPresets.filter(p => p.startsWith("role:")),
        pageSize: 10,
      },
      {
        type: 'checkbox',
        name: 'stacks',
        message: 'Select stack presets (optional):',
        choices: stackChoices,
        default: suggestedPresets.filter(p => p.startsWith("stack:")),
        pageSize: 10,
      },
    ]);

    // 6. Step 4 — Select Agents
    const agentChoices = this.initService.getAgentChoices(context);

    const { agents, registry } = await inquirer.prompt<{
      agents: string[];
      registry: string;
    }>([
      {
        type: 'checkbox',
        name: 'agents',
        message: 'Select AI Agents you use:',
        choices: agentChoices,
        pageSize: 15,
      },
      {
        type: 'input',
        name: 'registry',
        message: 'Skills Registry URL:',
        default: DEFAULT_REGISTER,
      },
    ]);

    // 7. Build answers and save
    const answers: InitAnswers = {
      languages,
      frameworks,
      roles: [...roles, ...stacks],
      agents: agents as any[],
      registry,
    };

    await this.initService.buildAndSaveConfig(answers, metadata, presets);

    console.log(pc.green('\n✅ Initialized .skillsrc with your preferences!'));
    if (languages.length > 0) {
      console.log(pc.gray(`   Languages: ${languages.join(', ')}`));
    }
    if (frameworks.length > 0) {
      console.log(pc.gray(`   Frameworks: ${frameworks.join(', ')}`));
    }
    console.log(
      pc.cyan(
        '\nNext step: Run `full-stack-skill sync` to generate rule files.',
      ),
    );
  }
}
