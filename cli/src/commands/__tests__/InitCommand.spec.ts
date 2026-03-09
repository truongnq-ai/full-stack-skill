import fs from 'fs-extra';
import inquirer from 'inquirer';
import { beforeEach, describe, expect, it, Mocked, vi } from 'vitest';
import { InitService } from '../../services/InitService';
import { RegistryService } from '../../services/RegistryService';
import { InitCommand } from '../init';

vi.mock('fs-extra');
vi.mock('inquirer');
vi.mock('picocolors', () => ({
  default: {
    green: vi.fn((t) => t),
    cyan: vi.fn((t) => t),
    gray: vi.fn((t) => t),
    bold: vi.fn((t) => t),
    yellow: vi.fn((t) => t),
    blue: vi.fn((t) => t),
  },
}));

describe('InitCommand', () => {
  let command: InitCommand;
  let mockInitService: Mocked<InitService>;
  let mockRegistryService: Mocked<RegistryService>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockInitService = {
      initializeProject: vi.fn().mockResolvedValue(true),
      getInitializationContext: vi.fn().mockResolvedValue({
        frameworkDetection: {},
        agentDetection: {},
        languageDetection: {},
      }),
      getLanguageChoices: vi.fn().mockReturnValue([]),
      getFrameworkChoices: vi.fn().mockReturnValue([]),
      getAgentChoices: vi.fn().mockReturnValue([]),
      getRoleChoices: vi.fn().mockReturnValue([]),
      getStackChoices: vi.fn().mockReturnValue([]),
      detectionService: {
        detectFiles: vi.fn().mockResolvedValue(false),
      } as any,
      buildAndSaveConfig: vi.fn().mockResolvedValue(undefined),
    } as unknown as Mocked<InitService>;
    mockRegistryService = {
      discoverRegistry: vi
        .fn()
        .mockResolvedValue({ categories: [], metadata: {}, presets: {} }),
    } as unknown as Mocked<RegistryService>;

    // Explicitly pass undefined to cover constructor
    command = new InitCommand(undefined, undefined);

    // Patch the instances after constructor runs to use our mocks
    // @ts-expect-error - testing private instance patching
    command.initService = mockInitService;
    // @ts-expect-error - testing private instance patching
    command.registryService = mockRegistryService;

    vi.spyOn(console, 'log').mockImplementation(() => { });

    vi.spyOn(fs, 'pathExists').mockImplementation(async (p: any) => {
      if (String(p).endsWith('.skillsrc')) return false;
      return false;
    });
    vi.spyOn(fs, 'readFile').mockResolvedValue('{}' as never);
    // Mock prompts: languages, frameworks, roles/stacks, agents+registry
    vi.mocked(inquirer.prompt)
      .mockResolvedValueOnce({ languages: ['ts-js'] })
      .mockResolvedValueOnce({ frameworks: ['react'] })
      .mockResolvedValueOnce({ roles: [], stacks: [] })
      .mockResolvedValueOnce({ agents: ['cursor'], registry: 'reg' });
  });

  it('should initialize project from scratch', async () => {
    // getFrameworkChoices returns some choices so step 2 will be prompted
    mockInitService.getFrameworkChoices.mockReturnValue([
      { name: 'React', value: 'react', checked: false },
    ]);

    await command.run();
    expect(mockInitService.buildAndSaveConfig).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining('Initialized .skillsrc'),
    );
  });

  it('should handle existing config and abort if requested', async () => {
    vi.spyOn(fs, 'pathExists').mockImplementation(async (p: any) => {
      if (String(p).endsWith('.skillsrc')) return true;
      return false;
    });
    vi.spyOn(fs, 'readFile').mockResolvedValue('{}' as never);
    vi.mocked(inquirer.prompt).mockReset();
    vi.mocked(inquirer.prompt).mockResolvedValue({ overwrite: false });

    await command.run();
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining('Aborted'),
    );
    expect(mockInitService.buildAndSaveConfig).not.toHaveBeenCalled();
  });

  it('should handle existing config and overwrite if requested', async () => {
    vi.spyOn(fs, 'pathExists').mockImplementation(async (p: any) => {
      if (String(p).endsWith('.skillsrc')) return true;
      return false;
    });
    vi.spyOn(fs, 'readFile').mockResolvedValue('{}' as never);
    // getFrameworkChoices returns some choices so step 2 will be prompted
    mockInitService.getFrameworkChoices.mockReturnValue([
      { name: 'React', value: 'react', checked: false },
    ]);
    vi.mocked(inquirer.prompt).mockReset();
    // Sequence: overwrite, languages, frameworks, roles/stacks, agents+registry
    vi.mocked(inquirer.prompt)
      .mockResolvedValueOnce({ overwrite: true })
      .mockResolvedValueOnce({ languages: ['ts-js'] })
      .mockResolvedValueOnce({ frameworks: ['react'] })
      .mockResolvedValueOnce({ roles: [], stacks: [] })
      .mockResolvedValueOnce({ agents: ['cursor'], registry: 'reg' });

    await command.run();
    expect(mockInitService.buildAndSaveConfig).toHaveBeenCalled();
  });

  it('should skip framework prompt when no frameworks available for selected languages', async () => {
    // Python has no frameworks
    mockInitService.getFrameworkChoices.mockReturnValue([]);
    vi.spyOn(fs, 'pathExists').mockImplementation(async (p: any) => {
      if (String(p).endsWith('.skillsrc')) return false;
      return false;
    });
    vi.spyOn(fs, 'readFile').mockResolvedValue('{}' as never);
    vi.mocked(inquirer.prompt).mockReset();
    vi.mocked(inquirer.prompt)
      .mockResolvedValueOnce({ languages: ['python'] })
      .mockResolvedValueOnce({ roles: [], stacks: [] })
      .mockResolvedValueOnce({ agents: ['cursor'], registry: 'reg' });

    await command.run();
    expect(mockInitService.buildAndSaveConfig).toHaveBeenCalled();
    // Prompts: languages + roles/stacks + agents/registry (no frameworks prompt)
    expect(inquirer.prompt).toHaveBeenCalledTimes(3);
  });
});
