import fs from 'fs-extra';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Agent, Language } from '../../constants';
import { InitAnswers, InitService } from '../InitService';

vi.mock('fs-extra');

vi.mock('../DetectionService', () => {
  const Mock = vi.fn().mockImplementation(function (this: any) {
    this.detectFrameworks = vi.fn().mockResolvedValue({ flutter: true });
    this.detectAgents = vi.fn().mockResolvedValue({ cursor: true });
    this.detectLanguages = vi.fn().mockResolvedValue(['dart']);
    this.getProjectDeps = vi.fn().mockResolvedValue(new Set());
  });
  return { DetectionService: Mock };
});

vi.mock('../ConfigService', () => {
  const Mock = vi.fn().mockImplementation(function (this: any) {
    this.buildInitialConfig = vi
      .fn()
      .mockReturnValue({ registry: 'url', skills: {} });
    this.applyDependencyExclusions = vi.fn();
    this.reconcileDependencies = vi.fn();
  });
  return { ConfigService: Mock };
});

describe('InitService', () => {
  let initService: InitService;
  let mockDetectionService: any;
  let mockConfigService: any;

  beforeEach(() => {
    vi.clearAllMocks();
    initService = new InitService();
    mockDetectionService = (initService as any).detectionService;
    mockConfigService = (initService as any).configService;
  });

  describe('getInitializationContext', () => {
    it('should gather framework, agent, and language detection data', async () => {
      // Mock fs.pathExists for language detection
      vi.mocked(fs.pathExists).mockResolvedValue(false as never);
      const context = await initService.getInitializationContext();
      expect(context.frameworkDetection).toEqual({ flutter: true });
      expect(context.agentDetection).toEqual({ cursor: true });
      expect(context.languageDetection).toBeDefined();
    });
  });

  describe('getLanguageChoices', () => {
    it('should return language choices with checked state', () => {
      const context = {
        frameworkDetection: {},
        agentDetection: {},
        languageDetection: { [Language.Dart]: true, [Language.Python]: false },
      };

      const choices = initService.getLanguageChoices(context);

      const dartChoice = choices.find((c) => c.value === Language.Dart);
      const pythonChoice = choices.find((c) => c.value === Language.Python);

      expect(dartChoice?.checked).toBe(true);
      expect(pythonChoice?.checked).toBe(false);

      // All supported languages should be present
      expect(choices.length).toBeGreaterThanOrEqual(7);
    });

    it('should show framework names in language label', () => {
      const context = {
        frameworkDetection: {},
        agentDetection: {},
        languageDetection: {},
      };

      const choices = initService.getLanguageChoices(context);

      const tsChoice = choices.find(
        (c) => c.value === Language.TypeScriptJavaScript,
      );
      expect(tsChoice?.name).toContain('NestJS');
      expect(tsChoice?.name).toContain('React');
    });

    it('should show plain name for language without frameworks', () => {
      const context = {
        frameworkDetection: {},
        agentDetection: {},
        languageDetection: {},
      };

      const choices = initService.getLanguageChoices(context);

      const pythonChoice = choices.find((c) => c.value === Language.Python);
      expect(pythonChoice?.name).toBe('Python');
    });
  });

  describe('getFrameworkChoices', () => {
    it('should return filtered frameworks for selected languages', () => {
      const context = {
        frameworkDetection: { nestjs: true },
        agentDetection: {},
        languageDetection: {},
      };

      const choices = initService.getFrameworkChoices(
        [Language.TypeScriptJavaScript],
        context,
        ['nestjs', 'nextjs', 'react', 'angular'],
      );

      // Filter out separators
      const items = choices.filter((c: any) => c.value !== undefined);
      expect(items.length).toBeGreaterThan(0);

      const nestjsChoice = items.find((c: any) => c.value === 'nestjs');
      expect(nestjsChoice).toBeDefined();
      expect((nestjsChoice as any).checked).toBe(true);
    });

    it('should return empty for language with no frameworks (Python)', () => {
      const context = {
        frameworkDetection: {},
        agentDetection: {},
        languageDetection: {},
      };

      const choices = initService.getFrameworkChoices(
        [Language.Python],
        context,
        [],
      );
      expect(choices).toEqual([]);
    });

    it('should combine frameworks from multiple selected languages', () => {
      const context = {
        frameworkDetection: {},
        agentDetection: {},
        languageDetection: {},
      };

      const choices = initService.getFrameworkChoices(
        [Language.Dart, Language.JavaKotlin],
        context,
        ['flutter', 'spring-boot', 'android'],
      );

      const items = choices.filter((c: any) => c.value !== undefined);
      const values = items.map((c: any) => c.value);
      expect(values).toContain('flutter');
      expect(values).toContain('spring-boot');
      expect(values).toContain('android');
    });
  });

  describe('getAgentChoices', () => {
    it('should return agent choices with checked state', () => {
      const context = {
        frameworkDetection: {},
        agentDetection: { cursor: true, copilot: false },
        languageDetection: {},
      };

      const choices = initService.getAgentChoices(context);

      const cursorChoice = choices.find((a) => a.value === 'cursor');
      const copilotChoice = choices.find((a) => a.value === 'copilot');

      expect(cursorChoice?.checked).toBe(true);
      expect(copilotChoice?.checked).toBe(false);
    });
  });

  describe('buildAndSaveConfig', () => {
    it('should build config with language + framework', async () => {
      const answers: InitAnswers = {
        languages: [Language.Dart],
        frameworks: ['flutter'],
        agents: [Agent.Cursor],
        registry: 'https://github.com/owner/repo',
      };
      const metadata = { categories: { flutter: { version: '1.0.0' } } };

      await initService.buildAndSaveConfig(answers, metadata, '/tmp');

      expect(mockConfigService.buildInitialConfig).toHaveBeenCalled();
      expect(mockConfigService.applyDependencyExclusions).toHaveBeenCalled();
      expect(fs.outputFile).toHaveBeenCalledWith(
        expect.stringContaining('.skillsrc'),
        expect.stringContaining('Auto-detected configuration'),
      );
    });

    it('should handle language-only config (Python)', async () => {
      const answers: InitAnswers = {
        languages: [Language.Python],
        frameworks: [],
        agents: [Agent.Cursor],
        registry: 'url',
      };
      await initService.buildAndSaveConfig(answers, {}, '/tmp');
      // detectLanguages should NOT be called since no frameworks selected
      expect(mockDetectionService.detectLanguages).not.toHaveBeenCalled();
      // buildInitialConfig should receive python in languages
      expect(mockConfigService.buildInitialConfig).toHaveBeenCalledWith(
        [], // No frameworks
        expect.any(Array),
        expect.any(String),
        expect.any(Object),
        expect.arrayContaining(['python']),
        expect.any(Array),
      );
    });

    it('should include workflows if Antigravity agent is selected', async () => {
      const answers: InitAnswers = {
        languages: [Language.Dart],
        frameworks: ['flutter'],
        agents: [Agent.Antigravity],
        registry: 'url',
      };
      await initService.buildAndSaveConfig(answers, {}, '/tmp');
      expect(mockConfigService.buildInitialConfig).toHaveBeenCalledWith(
        expect.any(Array),
        expect.any(Array),
        expect.any(String),
        expect.any(Object),
        expect.any(Array),
        expect.arrayContaining(['code-review']),
      );
    });

    it('should merge language skill categories with detected languages from frameworks', async () => {
      const answers: InitAnswers = {
        languages: [Language.TypeScriptJavaScript],
        frameworks: ['nestjs'],
        agents: [Agent.Cursor],
        registry: 'url',
      };

      // detectLanguages for nestjs will return ['dart'] from mock
      // but language skill categories will include ['typescript', 'javascript']
      await initService.buildAndSaveConfig(answers, {}, '/tmp');

      const languagesArg =
        mockConfigService.buildInitialConfig.mock.calls[0][4];
      expect(languagesArg).toContain('typescript');
      expect(languagesArg).toContain('javascript');
      // Plus the framework-detected languages
      expect(languagesArg).toContain('dart');
    });
  });
});
