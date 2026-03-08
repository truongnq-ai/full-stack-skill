# Project Context for AI Agents

> [!IMPORTANT]
> **To all AI Agents working ON this repository:**
> This repository is the source code for `@truongnq-ai/full-stack-skill`.
>
> 1. **Architecture**: Understanding the Registry -> CLI -> Project flow is critical. See `ARCHITECTURE.md`.
> 2. **Token Economy**: All changes to `skills/` must be optimized for token usage.
> 3. **Documentation**: Keep `ARCHITECTURE.md` and `CHANGELOG.md` up to date.
>
> ---

<!-- SKILLS_INDEX_START -->

# Agent Skills Index

> [!NOTE]
> This index shows **universal skills** (common + typescript) that apply to all projects.
> **Framework-specific skills** (React, NestJS, Flutter, etc.) are injected dynamically
> after running `full-stack-skill sync` based on your `.skillsrc` configuration.
> Before writing any code, you MUST CHECK if a relevant skill exists in the index below.
> If a skill matches your task, READ the file using `view_file`.

## **Rule Zero: Zero-Trust Engineering**

- **Skill Authority:** Loaded skills always override existing code patterns.
- **Audit Before Write:** Audit every file write against the `common/feedback-reporter` skill.

- **[common/architecture-audit]**: Protocol for auditing structural debt, logic leakage, and fragmentation across Web, Mobile, and Backend. (triggers: package.json, pubspec.yaml, go.mod, pom.xml, nest-cli.json, architecture audit, code review, tech debt, logic leakage, refactor)
- **[common/architecture-diagramming]**: Standards for creating clear, effective, and formalized software architecture diagrams (C4, UML). (triggers: ARCHITECTURE.md, **/\*.mermaid, **/\*.drawio, diagram, architecture, c4, system design, mermaid)
- **[common/best-practices]**: 🚨 Universal principles for clean, maintainable, and robust code across all environments. (triggers: solid, kiss, dry, yagni, naming, conventions)
- **[common/code-review]**: Standards for high-quality, persona-driven code reviews. (triggers: review, pr, critique, analyze code)
- **[common/context-optimization]**: Techniques to maximize context window efficiency, reduce latency, and prevent 'lost in middle' issues. (triggers: \*.log, reduce tokens, optimize context, summarize history)
- **[common/debugging]**: Systematic troubleshooting using the Scientific Method. (triggers: debug, fix bug, crash, error, exception, troubleshooting)
- **[common/documentation]**: Essential rules for code comments, READMEs, and technical documentation. (triggers: comment, docstring, readme, documentation)
- **[common/feedback-reporter]**: 🚨 CRITICAL - Before ANY file write, audit loaded skills for violations. Auto-report via feedback command. (triggers: \*_/_, write, edit, create, generate, skill, violation)
- **[common/git-collaboration]**: 🚨 Universal standards for version control, branching, and team collaboration. (triggers: commit, branch, merge, pull-request, git)
- **[common/mobile-animation]**: Motion design principles for mobile apps. (triggers: Animation, AnimationController, Animated, MotionLayout, transition, gesture)
- **[common/mobile-ux-core]**: 🚨 Universal mobile UX principles for touch-first interfaces. (triggers: mobile, responsive, SafeArea, touch, gesture, viewport)
- **[common/performance-engineering]**: Universal standards for high-performance software development. (triggers: performance, optimize, profile, scalability)
- **[common/product-requirements]**: 🚨 Expert process for gathering requirements and drafting PRDs. (triggers: PRD.md, create prd, draft requirements, new feature spec)
- **[common/security-audit]**: 🚨 Adversarial security probing and vulnerability assessments. (triggers: security audit, vulnerability scan, secrets detection, injection probe)
- **[common/security-standards]**: 🚨 Universal security protocols for building safe software. (triggers: security, encrypt, authenticate, authorize)
- **[common/system-design]**: 🚨 Universal architectural standards for robust, scalable systems. (triggers: architecture, design, system, scalability)
- **[common/tdd]**: Enforces Test-Driven Development (Red-Green-Refactor).
- **[common/workflow-writing]**: 🚨 Rules for writing concise, token-efficient workflow and skill files. (triggers: SKILL.md, create workflow, new skill)
- **[typescript/best-practices]**: Idiomatic TypeScript patterns. (triggers: **/\*.ts, **/\*.tsx, class, function, module, async, promise)
- **[typescript/language]**: 🚨 Modern TypeScript standards for type safety. (triggers: \*_/_.ts, tsconfig.json, type, interface, generic, enum)
- **[typescript/security]**: 🚨 Secure coding practices for TypeScript. (triggers: \*_/_.ts, validate, sanitize, xss, injection, auth)
- **[typescript/tooling]**: Dev tools, linting, and build configuration. (triggers: tsconfig.json, eslint, prettier, jest, vitest)

### Business Analysis Skills (IT)
- **[it/ba/requirements-elicitation]**: 🚨 Expert process for BAs to gather, clarify, and formulate robust business and technical requirements from stakeholders. (triggers: PRD.md, requirements.md, gather requirements, interview, clarify scope, ba, business analyst)
- **[it/ba/story-splitting]**: Rules for translating high-level PRDs into actionable, development-ready User Stories using the INVEST principle and BDD acceptance criteria. (triggers: user-stories.md, backlog.md, user story, break down, acceptance criteria, bdd, scrum, agile)
- **[it/ba/system-modeling]**: Standards for Business Analysts to create visual diagrams (Data Flow, State, Use Case) using Mermaid.js syntax to clarify system behavior for developers. (triggers: system-model.md, architecture.md, *.mermaid, data flow, system model, use case diagram, mermaid, state machine, sequence diagram)

<!-- SKILLS_INDEX_END -->
