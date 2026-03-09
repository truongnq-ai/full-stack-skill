#!/usr/bin/env node
import { Command } from 'commander';
import dotenv from 'dotenv';
import pc from 'picocolors';
import { AddRoleCommand } from './commands/add-role';
import { DoctorCommand } from './commands/doctor';
import { FeedbackCommand } from './commands/feedback';
import { InitCommand } from './commands/init';
import { ListSkillsCommand } from './commands/list-skills';
import { RemoveRoleCommand } from './commands/remove-role';
import { StatusCommand } from './commands/status';
import { SyncCommand } from './commands/sync';
import { UpgradeCommand } from './commands/upgrade';
import { ValidateCommand } from './commands/validate-skills';
import { SUPPORTED_LANGUAGES, SUPPORTED_FRAMEWORKS, SUPPORTED_AGENTS } from './constants';

// Suppress dotenv console output before loading
const originalLog = console.log;
const dotenvSilencer = (...args: any[]) => {
  if (typeof args[0] === 'string' && args[0].includes('[dotenv')) return;
  originalLog(...args);
};
console.log = dotenvSilencer;
dotenv.config();
console.log = originalLog;

// ── Dynamic listings from constants ─────────────────────────────────────
const langList = SUPPORTED_LANGUAGES.map((l) => l.name).join(', ');
const fwList = SUPPORTED_FRAMEWORKS.map((f) => f.name).join(', ');
const agentPopular = SUPPORTED_AGENTS.filter((a) => a.group === 'popular').map((a) => a.name).join(', ');
const agentEditor = SUPPORTED_AGENTS.filter((a) => a.group === 'editor').map((a) => a.name).join(', ');
const agentPlatform = SUPPORTED_AGENTS.filter((a) => a.group === 'platform').map((a) => a.name).join(', ');

const program = new Command();

program
  .name('fss')
  .description(
    'Full-Stack Skill — AI agent coding standards for your entire team.\n' +
    'Distributes high-density skills to Cursor, Claude Code, Copilot, Antigravity, and more.',
  )
  .version('2026.03.09');

// ── Global help: show supported stacks + quick start ────────────────────
program.addHelpText('after', `
${pc.cyan('Quick Start:')}
  $ fss init                        Auto-detect tech stack, pick agents, sync skills
  $ fss sync                        Re-sync skills with latest versions
  $ fss status                      Show current setup at a glance
  $ fss add-role qa                 Add QA role preset to your setup
  $ fss doctor                      Check your setup for issues

${pc.cyan('Supported Languages:')}
  ${langList}

${pc.cyan('Supported Frameworks:')}
  ${fwList}

${pc.cyan('Supported AI Agents:')}
  Popular:  ${agentPopular}
  Editors:  ${agentEditor}
  Platform: ${agentPlatform}

${pc.cyan('Available Roles:')}
  ba, qa, devops, writer, reviewer

${pc.gray('Tip: use "fss" as shorthand for "full-stack-skill".')}
${pc.gray('Run "fss <command> --help" for detailed usage of each command.')}
`);

// ── init ────────────────────────────────────────────────────────────────
const initCmd = program
  .command('init')
  .description('Initialize a .skillsrc configuration in your project')
  .option(
    '--non-interactive',
    'Skip all prompts and use auto-detected values (for CI/CD)',
  )
  .option(
    '--advanced',
    'Show advanced options (e.g. custom registry URL)',
  )
  .action(async (options) => {
    const init = new InitCommand();
    await init.run(options);
  });

initCmd.addHelpText('after', `
${pc.cyan('How it works:')}
  1. Detects languages and frameworks from your source code
  2. You pick AI agents to sync skills to (grouped by popularity)
  3. Review a summary → confirm → skills are downloaded

${pc.cyan('Examples:')}
  $ fss init                        Interactive wizard (3 steps)
  $ fss init --non-interactive      CI/CD mode — auto-detect everything, no prompts
  $ fss init --advanced             Also ask for custom registry URL

${pc.cyan('Supported Languages:')}
  ${langList}

${pc.cyan('Supported Frameworks:')}
  ${fwList}
`);

// ── add-role ────────────────────────────────────────────────────────────
const addRoleCmd = program
  .command('add-role [role]')
  .description('Add a role preset to your .skillsrc')
  .action(async (role) => {
    const cmd = new AddRoleCommand();
    await cmd.run(role);
  });

addRoleCmd.addHelpText('after', `
${pc.cyan('How it works:')}
  Roles add specialized AI knowledge beyond your tech stack.
  Run without arguments to pick from a list interactively.

${pc.cyan('Available Roles:')}
  ba         Business Analyst — requirements, story splitting, system modeling
  qa         Quality Assurance — test strategy, automation, reporting
  devops     DevOps — CI/CD, infrastructure, monitoring
  writer     Technical Writer — documentation standards
  reviewer   Code Reviewer — PR conventions, review checklists

${pc.cyan('Examples:')}
  $ fss add-role qa                 Add the QA role directly
  $ fss add-role devops             Add the DevOps role directly
  $ fss add-role                    Pick from a list interactively
`);

// ── sync ────────────────────────────────────────────────────────────────
const syncCmd = program
  .command('sync')
  .description('Sync skills from registry to AI agent directories')
  .option(
    '-y, --yes',
    'Automatically confirm interactive prompts (e.g. update versions)',
  )
  .option(
    '--dry-run',
    'Preview changes without writing any files',
  )
  .action(async (options) => {
    const sync = new SyncCommand();
    await sync.run(options);
  });

syncCmd.addHelpText('after', `
${pc.cyan('How it works:')}
  1. Reads .skillsrc to know your tech stack and agents
  2. Downloads skill files from the registry (versioned)
  3. Writes to agent directories (.cursor/skills/, .agent/skills/...)
  4. Generates AGENTS.md as a skill index for your AI

${pc.cyan('Examples:')}
  $ fss sync                        Download and apply all skills
  $ fss sync --dry-run              Preview what would change (no writes)
  $ fss sync -y                     Auto-confirm version updates
`);

// ── doctor ──────────────────────────────────────────────────────────────
const doctorCmd = program
  .command('doctor')
  .description('Run health checks on your skill setup')
  .action(async () => {
    const cmd = new DoctorCommand();
    await cmd.run();
  });

doctorCmd.addHelpText('after', `
${pc.cyan('Checks performed:')}
  1. .skillsrc exists and is valid
  2. AI agent directories detected
  3. Skill files present in agent directories
  4. AGENTS.md index exists
  5. Registry is reachable
  6. Skill categories are configured
  7. CLI version info
  8. Overall health score

${pc.cyan('Example:')}
  $ fss doctor
`);

// ── status ──────────────────────────────────────────────────────────────
const statusCmd = program
  .command('status')
  .description('Show your current skill setup at a glance')
  .action(async () => {
    const cmd = new StatusCommand();
    await cmd.run();
  });

statusCmd.addHelpText('after', `
${pc.cyan('What it shows:')}
  - Configured languages, frameworks, agents, and roles
  - Total skill files synced
  - Last sync time
  - Registry URL

${pc.cyan('Example:')}
  $ fss status
`);

// ── remove-role ─────────────────────────────────────────────────────────
const removeRoleCmd = program
  .command('remove-role [role]')
  .description('Remove a role preset from your .skillsrc')
  .action(async (role) => {
    const cmd = new RemoveRoleCommand();
    await cmd.run(role);
  });

removeRoleCmd.addHelpText('after', `
${pc.cyan('Examples:')}
  $ fss remove-role qa              Remove the QA role directly
  $ fss remove-role                 Pick from configured roles interactively
`);

// ── list-skills ─────────────────────────────────────────────────────────
const listCmd = program
  .command('list-skills')
  .description('List available framework skills and detection status')
  .option('-f, --framework <framework>', 'Filter by framework')
  .action(async (options) => {
    const cmd = new ListSkillsCommand();
    await cmd.run(options);
  });

listCmd.addHelpText('after', `
${pc.cyan('Examples:')}
  $ fss list-skills                 List all skills across frameworks
  $ fss list-skills -f flutter      List Flutter-specific skills only
  $ fss list-skills -f nestjs       List NestJS-specific skills only
`);

// ── validate ────────────────────────────────────────────────────────────
program
  .command('validate')
  .description('Validate skill format and token efficiency standards')
  .option('--all', 'Validate all skills instead of only changed ones')
  .action(async (options) => {
    const cmd = new ValidateCommand();
    await cmd.run(options);
  });

// ── feedback ────────────────────────────────────────────────────────────
program
  .command('feedback')
  .description('Report skill improvements or AI agent mistakes')
  .option(
    '--skill <skill>',
    'The skill ID (e.g., flutter/bloc-state-management)',
  )
  .option('--issue <issue>', 'Brief description of the issue')
  .option('--model <model>', 'AI agent model (e.g., Claude 3.5 Sonnet)')
  .option('--context <context>', 'Additional context (e.g., framework version)')
  .option('--suggestion <suggestion>', 'Suggested improvement')
  .option(
    '--skill-instruction <instruction>',
    'Exact quote from skill that was violated (AI auto-report)',
  )
  .option(
    '--actual-action <action>',
    'What you actually did instead of following skill (AI auto-report)',
  )
  .option(
    '--decision-reason <reason>',
    'Why you chose this approach instead (AI auto-report)',
  )
  .option(
    '--loaded-skills <skills>',
    'Comma-separated list of currently loaded skills (platform-provided)',
  )
  .action(async (options: Record<string, string>) => {
    const cmd = new FeedbackCommand();
    await cmd.run(options);
  });

// ── upgrade ─────────────────────────────────────────────────────────────
program
  .command('upgrade')
  .description('Upgrade CLI to the latest version')
  .option('--dry-run', 'Check for updates without installing')
  .action(async (options) => {
    const cmd = new UpgradeCommand();
    await cmd.run(options);
  });

program.parse();
