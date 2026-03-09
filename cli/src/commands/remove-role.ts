import fs from 'fs-extra';
import inquirer from 'inquirer';
import path from 'path';
import pc from 'picocolors';
import yaml from 'js-yaml';
import { ConfigService } from '../services/ConfigService';

/**
 * Command for removing role presets from .skillsrc.
 * Usage: fss remove-role [role]
 */
export class RemoveRoleCommand {
    private configService = new ConfigService();

    async run(roleName?: string) {
        const configPath = path.join(process.cwd(), '.skillsrc');

        if (!(await fs.pathExists(configPath))) {
            console.log(pc.red('❌ No .skillsrc found. Run `fss init` first.'));
            return;
        }

        const config = await this.configService.loadConfig();
        if (!config) {
            console.log(pc.red('❌ Invalid .skillsrc. Run `fss init` to recreate.'));
            return;
        }

        const existingRoles = (config.presets || []).filter((p: string) => p.startsWith('role:'));

        if (existingRoles.length === 0) {
            console.log(pc.yellow('⚠️  No roles configured. Use `fss add-role` to add one.'));
            return;
        }

        let selectedRole: string;

        if (roleName) {
            const fullKey = roleName.startsWith('role:') ? roleName : `role:${roleName}`;
            if (!existingRoles.includes(fullKey)) {
                console.log(pc.red(`❌ Role "${roleName}" is not configured.`));
                console.log(pc.gray(`   Current roles: ${existingRoles.map((r: string) => r.replace('role:', '')).join(', ')}`));
                return;
            }
            selectedRole = fullKey;
        } else {
            const { role } = await inquirer.prompt<{ role: string }>([
                {
                    type: 'list',
                    name: 'role',
                    message: 'Select a role to remove:',
                    choices: existingRoles.map((r: string) => ({
                        name: r.replace('role:', '').toUpperCase(),
                        value: r,
                    })),
                },
            ]);
            selectedRole = role;
        }

        // Remove from config
        const rawContent = await fs.readFile(configPath, 'utf8');
        const configData = yaml.load(rawContent) as Record<string, any>;

        configData.presets = (configData.presets || []).filter((p: string) => p !== selectedRole);

        // Remove from presets_data
        if (configData.presets_data && configData.presets_data[selectedRole]) {
            delete configData.presets_data[selectedRole];
        }

        await fs.writeFile(configPath, yaml.dump(configData, { lineWidth: 120 }));

        const name = selectedRole.replace('role:', '').toUpperCase();
        console.log(pc.green(`\n✅ Removed role "${name}" from .skillsrc`));
        console.log(pc.gray('   Run `fss sync` to update skill files.'));
    }
}
