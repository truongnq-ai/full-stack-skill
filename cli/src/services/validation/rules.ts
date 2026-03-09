import fs from 'fs-extra';
import path from 'path';
import yaml from 'js-yaml';
import { RuleResult, ValidationRule } from './types';

/**
 * Enforces a maximum line count for skill files to ensure token efficiency.
 */
export class SizeRule implements ValidationRule {
  name = 'Size Limit';
  constructor(private maxLines: number = 100) {}

  async validate(content: string): Promise<RuleResult> {
    const lines = content.split('\n');
    if (lines.length > this.maxLines) {
      return {
        passed: false,
        errors: [
          `SKILL.md too large (${lines.length} lines > ${this.maxLines} limit)`,
        ],
        warnings: [],
      };
    }
    return { passed: true, errors: [], warnings: [] };
  }
}

/**
 * Validates frontmatter presence and required fields.
 */
export class FrontmatterRule implements ValidationRule {
  name = 'Frontmatter';

  async validate(content: string, filePath?: string): Promise<RuleResult> {
    const result: RuleResult = { passed: true, errors: [], warnings: [] };
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

    if (!frontmatterMatch) {
      return {
        passed: false,
        errors: ['Missing or invalid frontmatter'],
        warnings: [],
      };
    }

    const frontmatterRaw = frontmatterMatch[1];
    let frontmatter: any = null;

    try {
      frontmatter = yaml.load(frontmatterRaw);
    } catch (error) {
      return {
        passed: false,
        errors: [
          `Invalid frontmatter YAML: ${error instanceof Error ? error.message : error}`,
        ],
        warnings: [],
      };
    }

    if (!frontmatter || typeof frontmatter !== 'object') {
      return {
        passed: false,
        errors: ['Frontmatter must be a valid YAML object'],
        warnings: [],
      };
    }

    if (typeof frontmatter.name !== 'string' || frontmatter.name.trim() === '') {
      result.errors.push('Missing "name" field in frontmatter');
      result.passed = false;
    }

    if (
      typeof frontmatter.description !== 'string' ||
      frontmatter.description.trim() === ''
    ) {
      result.errors.push('Missing "description" field in frontmatter');
      result.passed = false;
    } else if (frontmatter.description.length > 200) {
      result.errors.push(
        `Description too long (${frontmatter.description.length} chars > 200 limit)`,
      );
      result.passed = false;
    }

    const metadata = frontmatter.metadata;
    if (!metadata || typeof metadata !== 'object') {
      result.errors.push('Missing "metadata" block in frontmatter');
      result.passed = false;
    } else {
      const labels = metadata.labels;
      if (!Array.isArray(labels) || labels.length === 0) {
        result.errors.push('Missing "metadata.labels" array in frontmatter');
        result.passed = false;
      } else if (labels.some((label: unknown) => typeof label !== 'string')) {
        result.errors.push('All "metadata.labels" values must be strings');
        result.passed = false;
      }

      const triggers = metadata.triggers;
      if (!triggers || typeof triggers !== 'object') {
        result.errors.push('Missing "metadata.triggers" block in frontmatter');
        result.passed = false;
      } else {
        const keywords = (triggers as any).keywords;
        const files = (triggers as any).files;
        const taskTypes = (triggers as any).task_types;
        const priority = (triggers as any).priority;
        const confidence = (triggers as any).confidence;

        const hasKeywords = Array.isArray(keywords) && keywords.length > 0;
        const hasFiles = Array.isArray(files) && files.length > 0;
        const hasTaskTypes = Array.isArray(taskTypes) && taskTypes.length > 0;

        if (!hasKeywords && !hasFiles && !hasTaskTypes) {
          result.errors.push(
            'metadata.triggers must include at least one of: keywords, files, task_types',
          );
          result.passed = false;
        }

        if (Array.isArray(keywords) && keywords.some((k) => typeof k !== 'string')) {
          result.errors.push('All "metadata.triggers.keywords" values must be strings');
          result.passed = false;
        }

        if (Array.isArray(files) && files.some((f) => typeof f !== 'string')) {
          result.errors.push('All "metadata.triggers.files" values must be strings');
          result.passed = false;
        }

        if (Array.isArray(taskTypes) && taskTypes.some((t) => typeof t !== 'string')) {
          result.errors.push('All "metadata.triggers.task_types" values must be strings');
          result.passed = false;
        }

        if (!priority || !['high', 'medium', 'low'].includes(priority)) {
          result.errors.push('metadata.triggers.priority must be one of: high, medium, low');
          result.passed = false;
        }

        if (typeof confidence !== 'number' || confidence < 0 || confidence > 1) {
          result.errors.push('metadata.triggers.confidence must be a number between 0 and 1');
          result.passed = false;
        }
      }
    }

    if (!frontmatter.workflow_ref) {
      result.errors.push('Missing "workflow_ref" in frontmatter');
      result.passed = false;
    } else if (typeof frontmatter.workflow_ref !== 'string') {
      result.errors.push('"workflow_ref" must be a string');
      result.passed = false;
    }

    // Enforce static workflow mapping if present
    try {
      if (filePath) {
        const rel = filePath.replace(/.*\/skills\//, '').replace(/\/SKILL\.md$/, '');
        const mapPath = path.join(process.cwd(), 'skills', 'workflow-map.json');
        if (fs.existsSync(mapPath)) {
          const map = JSON.parse(fs.readFileSync(mapPath, 'utf8')) as Record<string, string>;
          if (map[rel] && frontmatter.workflow_ref !== map[rel]) {
            result.errors.push(`workflow_ref mismatch: expected "${map[rel]}"`);
            result.passed = false;
          }
        }
      }
    } catch (err) {
      result.warnings.push(`workflow-map check skipped: ${err}`);
    }

    return result;
  }
}

/**
 * Recommends imperative mood over conversational style.
 */
export class InstructionsStyleRule implements ValidationRule {
  name = 'Instruction Style';

  async validate(content: string): Promise<RuleResult> {
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    const body = frontmatterMatch ? frontmatterMatch[2] : content;
    const bodyLines = body.split('\n');
    let isInCodeBlock = false;
    let hasConversationalStyle = false;

    const conversationalPatterns =
      /^(?:\s*[-*+]\s*|\s*\d+\.\s*)(?:you should|please|let's|we can|I recommend)/i;

    for (const line of bodyLines) {
      if (line.trim().startsWith('```')) {
        isInCodeBlock = !isInCodeBlock;
        continue;
      }
      if (isInCodeBlock) continue;

      if (conversationalPatterns.test(line)) {
        hasConversationalStyle = true;
        break;
      }
    }

    if (hasConversationalStyle) {
      return {
        passed: true,
        errors: [],
        warnings: [
          'Consider using imperative mood instead of conversational style in instructions',
        ],
      };
    }

    return { passed: true, errors: [], warnings: [] };
  }
}

/**
 * Ensures the mandatory priority section is present.
 */
export class PriorityRule implements ValidationRule {
  name = 'Priority Section';

  async validate(content: string): Promise<RuleResult> {
    if (!content.includes('## **Priority:')) {
      return {
        passed: false,
        errors: ['Missing priority section'],
        warnings: [],
      };
    }
    return { passed: true, errors: [], warnings: [] };
  }
}

/**
 * Validates the directory structure surrounding the skill file.
 */
export class DirectoryStructureRule implements ValidationRule {
  name = 'Directory Structure';

  async validate(_content: string, filePath: string): Promise<RuleResult> {
    const result: RuleResult = { passed: true, errors: [], warnings: [] };
    const skillDir = path.dirname(filePath);

    // Check scripts
    const scriptsDir = path.join(skillDir, 'scripts');
    if (await fs.pathExists(scriptsDir)) {
      const scriptFiles = await fs.readdir(scriptsDir);
      for (const file of scriptFiles) {
        if (!['.py', '.js', '.ts', '.sh'].includes(path.extname(file))) {
          result.warnings.push(`Script without standard extension: ${file}`);
        }
      }
    }

    // Check references
    const refsDir = path.join(skillDir, 'references');
    if (await fs.pathExists(refsDir)) {
      const refFiles = await fs.readdir(refsDir);
      if (refFiles.filter((f) => f.endsWith('.md')).length === 0) {
        result.warnings.push(
          'References directory exists but contains no .md files',
        );
      }
    }

    return result;
  }
}
