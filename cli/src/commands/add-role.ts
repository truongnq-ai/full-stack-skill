import fs from 'fs-extra';
import inquirer from 'inquirer';
import path from 'path';
import pc from 'picocolors';
import yaml from 'js-yaml';
import { ConfigService } from '../services/ConfigService';
import { RegistryService } from '../services/RegistryService';
import { SyncCommand } from './sync';

/**
 * Command for adding role presets to an existing .skillsrc configuration.
 * Usage: fss add-role [role]
 * If no role is specified, lists available roles for selection.
 */
export class AddRoleCommand {
    private configService = new ConfigService();
    private registryService: RegistryService;

    constructor(registryService?: RegistryService) {
        this.registryService = registryService || new RegistryService();
    }

    async run(roleName?: string) {
        const configPath = path.join(process.cwd(), '.skillsrc');

        // 1. Check .skillsrc exists
        if (!(await fs.pathExists(configPath))) {
            console.log(pc.red('❌ No .skillsrc found. Run `fss init` first.'));
            return;
        }

        // 2. Load current config
        const config = await this.configService.loadConfig();
        if (!config) {
            console.log(pc.red('❌ Invalid .skillsrc. Run `fss init` to recreate.'));
            return;
        }

        // 3. Fetch available presets from registry
        const { presets } = await this.registryService.discoverRegistry(config.registry);
        const availableRoles = Object.keys(presets).filter((k) => k.startsWith('role:'));

        if (availableRoles.length === 0) {
            console.log(pc.yellow('⚠️  No role presets available in registry.'));
            return;
        }

        // 4. Select or validate role
        let selectedRole: string;

        if (roleName) {
            // Direct argument: validate
            const fullKey = roleName.startsWith('role:') ? roleName : `role:${roleName}`;
            if (!availableRoles.includes(fullKey)) {
                console.log(pc.red(`❌ Unknown role: "${roleName}"`));
                console.log(pc.gray(`   Available: ${availableRoles.map((r) => r.replace('role:', '')).join(', ')}`));
                return;
            }
            selectedRole = fullKey;
        } else {
            // Interactive: show list
            const roleChoices = availableRoles.map((k) => ({
                name: `${k.replace('role:', '').toUpperCase()} — ${(presets[k] || []).join(', ')}`,
                value: k,
            }));

            const { role } = await inquirer.prompt<{ role: string }>([
                {
                    type: 'list',
                    name: 'role',
                    message: 'Select a role preset to add:',
                    choices: roleChoices,
                    pageSize: 10,
                },
            ]);
            selectedRole = role;
        }

        // 5. Check if already added
        const existingPresets = config.presets || [];
        if (existingPresets.includes(selectedRole)) {
            console.log(pc.yellow(`⚠️  Role "${selectedRole.replace('role:', '')}" is already configured.`));
            return;
        }

        // 6. Add to config and save
        const rawContent = await fs.readFile(configPath, 'utf8');
        const configData = yaml.load(rawContent) as Record<string, any>;

        if (!configData.presets) configData.presets = [];
        configData.presets.push(selectedRole);

        // Update presets_data with fresh data
        if (!configData.presets_data) configData.presets_data = {};
        configData.presets_data[selectedRole] = presets[selectedRole];

        await fs.writeFile(configPath, yaml.dump(configData, { lineWidth: 120 }));

        const roleName2 = selectedRole.replace('role:', '').toUpperCase();
        const skills = presets[selectedRole] || [];
        console.log(pc.green(`\n✅ Added role "${roleName2}" to .skillsrc`));
        console.log(pc.gray(`   Skills: ${skills.join(', ')}`));

        // 7. Offer to sync
        const { sync } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'sync',
                message: 'Run sync now to download role skills?',
                default: true,
            },
        ]);

        if (sync) {
            console.log('');
            const syncCmd = new SyncCommand();
            await syncCmd.run({ yes: true });
        }
    }
}
