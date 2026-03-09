import fs from 'fs-extra';
import path from 'path';
import pc from 'picocolors';
import pkg from '../../package.json';
import { SUPPORTED_AGENTS } from '../constants';
import { ConfigService } from '../services/ConfigService';
import { GithubService } from '../services/GithubService';

/**
 * Command for diagnosing the health of the full-stack-skill setup.
 * Checks config validity, agent detection, registry reachability, and versions.
 */
export class DoctorCommand {
    private configService = new ConfigService();

    async run() {
        console.log(pc.cyan('🩺 Running health checks...\n'));

        let passed = 0;
        let failed = 0;

        // 1. Check .skillsrc exists
        const configPath = path.join(process.cwd(), '.skillsrc');
        if (await fs.pathExists(configPath)) {
            console.log(pc.green('  ✓ .skillsrc found'));
            passed++;
        } else {
            console.log(pc.red('  ✗ .skillsrc not found'));
            console.log(pc.gray('    → Run `fss init` to create one.'));
            failed++;
            console.log(pc.yellow(`\n📊 ${passed} passed, ${failed} failed`));
            return;
        }

        // 2. Check .skillsrc is valid
        try {
            const config = await this.configService.loadConfig();
            if (config) {
                console.log(pc.green('  ✓ .skillsrc is valid'));
                passed++;

                // 3. Check agents detected
                const configuredAgents = config.agents || [];
                const detectedAgents: string[] = [];
                for (const agent of SUPPORTED_AGENTS) {
                    if (!configuredAgents.includes(agent.id as any)) continue;
                    for (const file of agent.detectionFiles || []) {
                        if (await fs.pathExists(path.join(process.cwd(), file))) {
                            detectedAgents.push(agent.id);
                            break;
                        }
                    }
                }
                if (detectedAgents.length > 0) {
                    console.log(pc.green(`  ✓ ${detectedAgents.length} agent(s) detected: ${detectedAgents.join(', ')}`));
                    passed++;
                } else {
                    console.log(pc.yellow('  △ No configured agents detected in project'));
                    console.log(pc.gray('    → Agent directories will be created during sync.'));
                }

                // 4. Check skill files present
                let skillFilesFound = 0;
                for (const agent of SUPPORTED_AGENTS) {
                    if (!configuredAgents.includes(agent.id as any)) continue;
                    if (agent.path && await fs.pathExists(agent.path)) {
                        const files = await fs.readdir(agent.path).catch(() => []);
                        skillFilesFound += files.length;
                    }
                }
                if (skillFilesFound > 0) {
                    console.log(pc.green(`  ✓ ${skillFilesFound} skill directory/files found`));
                    passed++;
                } else {
                    console.log(pc.yellow('  △ No skill files found'));
                    console.log(pc.gray('    → Run `fss sync` to download skills.'));
                }

                // 5. Check categories configured
                const categories = Object.keys(config.skills || {});
                console.log(pc.green(`  ✓ ${categories.length} skill categories configured: ${categories.join(', ')}`));
                passed++;

                // 6. Check registry reachable
                const parsed = GithubService.parseGitHubUrl(config.registry);
                if (parsed) {
                    try {
                        const gh = new GithubService(process.env.GITHUB_TOKEN);
                        const info = await gh.getRepoInfo(parsed.owner, parsed.repo);
                        if (info) {
                            console.log(pc.green(`  ✓ Registry reachable (${parsed.owner}/${parsed.repo})`));
                            passed++;
                        } else {
                            console.log(pc.red(`  ✗ Registry not accessible`));
                            console.log(pc.gray('    → Check GITHUB_TOKEN or registry URL.'));
                            failed++;
                        }
                    } catch {
                        console.log(pc.red('  ✗ Failed to reach registry'));
                        console.log(pc.gray('    → Check your internet connection.'));
                        failed++;
                    }
                } else {
                    console.log(pc.red('  ✗ Invalid registry URL'));
                    failed++;
                }

                // 7. Check AGENTS.md
                const agentsMdPath = path.join(process.cwd(), 'AGENTS.md');
                if (await fs.pathExists(agentsMdPath)) {
                    const content = await fs.readFile(agentsMdPath, 'utf8');
                    if (content.includes('SKILLS_INDEX_START')) {
                        console.log(pc.green('  ✓ AGENTS.md contains skill index'));
                        passed++;
                    } else {
                        console.log(pc.yellow('  △ AGENTS.md exists but missing skill index'));
                        console.log(pc.gray('    → Run `fss sync` to inject index.'));
                    }

                    // 7b. Stale check — warn if last sync was 7+ days ago
                    const agentsStat = await fs.stat(agentsMdPath);
                    const daysSinceSync = Math.floor((Date.now() - agentsStat.mtime.getTime()) / (1000 * 60 * 60 * 24));
                    if (daysSinceSync >= 7) {
                        console.log(pc.yellow(`  △ Last sync was ${daysSinceSync} days ago`));
                        console.log(pc.gray('    → Run `fss sync` to get latest skills.'));
                    } else if (daysSinceSync >= 1) {
                        console.log(pc.green(`  ✓ Last sync: ${daysSinceSync} day${daysSinceSync > 1 ? 's' : ''} ago`));
                        passed++;
                    } else {
                        console.log(pc.green('  ✓ Last sync: today'));
                        passed++;
                    }
                } else {
                    console.log(pc.yellow('  △ AGENTS.md not found'));
                    console.log(pc.gray('    → Will be created during `fss sync`.'));
                }
            } else {
                console.log(pc.red('  ✗ .skillsrc is invalid or empty'));
                console.log(pc.gray('    → Run `fss init` to regenerate.'));
                failed++;
            }
        } catch (error) {
            console.log(pc.red(`  ✗ .skillsrc parse error: ${(error as Error).message}`));
            console.log(pc.gray('    → Run `fss init` to regenerate.'));
            failed++;
        }

        // 8. Version info
        console.log(pc.gray(`\n  ℹ CLI version: ${pkg.version}`));

        // Summary
        const emoji = failed === 0 ? '🎉' : '⚠️';
        const color = failed === 0 ? pc.green : pc.yellow;
        console.log(color(`\n${emoji} ${passed} passed, ${failed} failed`));
    }
}
