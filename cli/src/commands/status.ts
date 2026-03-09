import fs from 'fs-extra';
import path from 'path';
import pc from 'picocolors';
import { SUPPORTED_AGENTS, SUPPORTED_LANGUAGES, SUPPORTED_FRAMEWORKS } from '../constants';
import { ConfigService } from '../services/ConfigService';

/**
 * Command to display the current skill setup status.
 * Shows config, agents, categories, roles, and sync info at a glance.
 */
export class StatusCommand {
    private configService = new ConfigService();

    async run() {
        const configPath = path.join(process.cwd(), '.skillsrc');

        // 1. Check .skillsrc exists
        if (!(await fs.pathExists(configPath))) {
            console.log(pc.yellow('⚠️  No .skillsrc found. Run `fss init` to get started.'));
            return;
        }

        const config = await this.configService.loadConfig();
        if (!config) {
            console.log(pc.red('❌ Invalid .skillsrc. Run `fss init` to recreate.'));
            return;
        }

        console.log(pc.cyan('📋 Full-Stack Skill Status\n'));

        // 2. Config file
        const stat = await fs.stat(configPath);
        console.log(pc.green('  ✓ Config:     ') + pc.white('.skillsrc'));

        // 3. Languages — resolve names from IDs
        const categories = Object.keys(config.skills || {});
        const langIds = categories.filter((c) =>
            SUPPORTED_LANGUAGES.some((l) => l.skillCategories.includes(c)),
        );
        const langNames = langIds
            .map((id) => {
                const lang = SUPPORTED_LANGUAGES.find((l) => l.skillCategories.includes(id));
                return lang?.name || id;
            })
            .filter((v, i, a) => a.indexOf(v) === i); // dedupe

        if (langNames.length > 0) {
            console.log(pc.green('  ✓ Languages:  ') + pc.white(langNames.join(', ')));
        }

        // 4. Frameworks
        const fwIds = categories.filter((c) =>
            SUPPORTED_FRAMEWORKS.some((f) => f.id === c),
        );
        const fwNames = fwIds.map((id) => {
            const fw = SUPPORTED_FRAMEWORKS.find((f) => f.id === id);
            return fw?.name || id;
        });
        if (fwNames.length > 0) {
            console.log(pc.green('  ✓ Frameworks: ') + pc.white(fwNames.join(', ')));
        }

        // 5. Agents
        const agentIds = config.agents || [];
        const agentNames = agentIds.map((id: string) => {
            const agent = SUPPORTED_AGENTS.find((a) => a.id === id);
            return agent?.name || id;
        });
        if (agentNames.length > 0) {
            console.log(pc.green('  ✓ Agents:     ') + pc.white(agentNames.join(', ')));
        } else {
            console.log(pc.yellow('  △ Agents:     (none configured)'));
        }

        // 6. Roles
        const presets = config.presets || [];
        const roles = presets.filter((p: string) => p.startsWith('role:'));
        if (roles.length > 0) {
            const roleNames = roles.map((r: string) => r.replace('role:', '').toUpperCase());
            console.log(pc.green('  ✓ Roles:      ') + pc.white(roleNames.join(', ')));
        }

        // 7. Categories count
        console.log(pc.green(`  ✓ Categories: `) + pc.white(`${categories.length} (${categories.join(', ')})`));

        // 8. Skill files count
        let totalFiles = 0;
        for (const agent of SUPPORTED_AGENTS) {
            if (!agentIds.includes(agent.id as any)) continue;
            const skillDir = path.join(process.cwd(), agent.path);
            if (await fs.pathExists(skillDir)) {
                totalFiles += await countFiles(skillDir);
            }
        }
        console.log(pc.green(`  ✓ Files:      `) + pc.white(`${totalFiles} skill files synced`));

        // 9. Last sync time (from AGENTS.md modified time)
        const agentsMd = path.join(process.cwd(), 'AGENTS.md');
        if (await fs.pathExists(agentsMd)) {
            const agentsStat = await fs.stat(agentsMd);
            const ago = timeAgo(agentsStat.mtime);
            console.log(pc.green(`  ✓ Last sync:  `) + pc.white(ago));
        } else {
            console.log(pc.yellow(`  △ Last sync:  never (run \`fss sync\`)`));
        }

        // 10. Registry
        console.log(pc.gray(`\n  ℹ Registry:   ${config.registry}`));
    }
}

/** Recursively count files in a directory */
async function countFiles(dir: string): Promise<number> {
    let count = 0;
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
        if (entry.isFile()) {
            count++;
        } else if (entry.isDirectory()) {
            count += await countFiles(path.join(dir, entry.name));
        }
    }
    return count;
}

/** Format a date as "X ago" */
function timeAgo(date: Date): string {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
}
