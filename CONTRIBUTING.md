# Contributing to Design Harness

First off, thank you for considering contributing to Design Harness! It's people like you that make this tool better for the entire design community.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Getting Started](#getting-started)
- [Contribution Workflow](#contribution-workflow)
- [Skill Development](#skill-development)
- [Documentation](#documentation)
- [Style Guidelines](#style-guidelines)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### 1. Build Skills

The most impactful way to contribute is by building new skills for the harness.

**What makes a good skill:**
- Solves a real, repeated design workflow problem
- Has clear trigger phrases for the orchestrator
- Follows the skill template structure
- Includes examples and references
- Documents its own limitations

**See:** [`documentation/maintainers/build-a-skill.md`](documentation/maintainers/build-a-skill.md)

### 2. Improve Existing Skills

Found a skill that could be better? Submit improvements:
- Add self-improvement loops
- Expand references
- Fix bugs or edge cases
- Improve trigger phrase matching
- Add examples

### 3. Enhance the Orchestrator

Help improve automatic routing:
- Add new routing patterns
- Improve intent signal matching
- Add new skill chains
- Improve the plan gate logic

### 4. Expand Platform Support

Currently supports Cursor, Codex, Claude Code. Help add:
- Gemini CLI
- OpenCode
- Other AI coding tools

### 5. Improve Documentation

- Fix typos or unclear instructions
- Add examples and screenshots
- Write tutorials or guides
- Translate documentation

### 6. Report Bugs

Found a bug? [Open an issue](https://github.com/marcopslopes/thedesignharness/issues/new) with:
- Clear title
- Steps to reproduce
- Expected vs actual behavior
- Your environment (OS, tool, version)
- Screenshots if applicable

### 7. Request Features

Have an idea? [Open an issue](https://github.com/marcopslopes/thedesignharness/issues/new) describing:
- The problem you're trying to solve
- Your proposed solution
- Why this would be valuable
- Any alternatives you considered

## Getting Started

### Prerequisites

- Node.js 22 (pinned in `.nvmrc`) and npm
- Git
- Cursor, Codex, or Claude Code
- Basic understanding of the orchestrator pattern (read [`harness/ORCHESTRATOR.md`](harness/ORCHESTRATOR.md))

### Setup

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/design-harness.git
   cd design-harness
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

5. **Make your changes**
   - Edit files
   - Test thoroughly
   - Follow style guidelines below

6. **Test locally**
   ```bash
   # Test skills
   npm run dev

   # Test in your AI tool
   # Install as plugin and verify changes work
   ```

## Contribution Workflow

### Before You Start

1. **Check existing issues** - Someone might already be working on it
2. **Open an issue first** for major changes - Discuss the approach
3. **Keep changes focused** - One feature/fix per PR

### Commit Messages

Use clear, descriptive commit messages:

```
Add motion-choreography skill

- Adds spec/review/opportunities/audit modes
- Includes frequency gate and reduced-motion
- Documents in ORCHESTRATOR.md routing table
- Adds self-improvement loop
```

**Format:**
- First line: Short summary (50 chars or less)
- Blank line
- Detailed explanation (wrap at 72 chars)
- Reference issues: `Fixes #123` or `Relates to #456`

### Pull Request Process

1. **Update documentation**
   - Add/update skill in [`harness/logs/routing-standards.md`](harness/logs/routing-standards.md)
   - Update [`harness/ORCHESTRATOR.md`](harness/ORCHESTRATOR.md) routing table if needed
   - Add or update the skill's designer guide at `harness/skills/<name>/GUIDE.md`

2. **Test thoroughly**
   - Test in at least one AI tool (Cursor/Codex/Claude Code)
   - Verify routing works correctly
   - Run `npm run format`, `npm run lint`, `npm test`, and `npm run build`
   - Test skill chains if applicable

3. **Create PR**
   - Use a clear, descriptive title
   - Explain what changed and why
   - Link related issues
   - Add screenshots/demos if UI changes

4. **Respond to feedback**
   - Address review comments promptly
   - Make requested changes
   - Re-request review when ready

5. **Merge**
   - Maintainer will merge once approved
   - Delete your branch after merge

### Releasing (maintainers)

1. Set the new version: `npm version 0.2.0 --no-git-tag-version`.
2. In [`RELEASE-NOTES.md`](RELEASE-NOTES.md), add a `## 0.2.0 — <date>` heading
   with a one-line summary above the dated entries since the last version.
3. Commit, then tag and push: `git tag v0.2.0 && git push origin main v0.2.0`.
4. Create a GitHub release from the tag, with the summary as its notes.

Versions follow [semantic versioning](https://semver.org/). Before 1.0, a
minor bump (0.2.0) can change how skills route or how projects are laid out.

## Skill Development

### Skill Template

Every skill must have:

```
harness/skills/your-skill/
├── SKILL.md              # Required: Main skill file
├── references/           # Optional: Supporting docs
│   └── examples.md
└── scripts/              # Optional: Helper scripts
```

### SKILL.md Structure

```markdown
---
name: your-skill
description: One-line trigger description for the orchestrator
---

# Your Skill Name

## When this fires

[Routing conditions from ORCHESTRATOR.md]

## Prerequisites

[Any MCPs, files, or context needed]

## Steps

1. Step one
2. Step two
3. Step three

## Output

[What this skill produces]

## Self-improvement loop

[How to gather feedback and improve]
```

### Adding to the Orchestrator

Add your skill to [`harness/ORCHESTRATOR.md`](harness/ORCHESTRATOR.md) §2 routing table:

```markdown
| **"your trigger phrases here"** | **`your-skill`** | One-line explanation of what it does |
```

## Documentation

### Writing Good Docs

- **Use examples** - Show, don't just tell
- **Be specific** - "Click X, then Y" not "configure settings"
- **Test your instructions** - Follow them exactly as written
- **Keep it current** - Update docs when code changes
- **Link generously** - Reference related docs

### Doc Types

- **`GUIDE.md`** - The designer guide for a skill, shown on its Skills page
- **`HOWTO-*.md`** - General guides, shown in Documentation
- **`SKILL.md`** - Skill instructions for the agent
- **`references/*.md`** - Supporting material
- **`README.md`** - Project overview
- **`INSTALL.md`** - Installation guide

## Style Guidelines

### Markdown

- Use ATX headers (`#` not underlines)
- Wrap lines at 80 chars
- Use fenced code blocks with language tags
- Use tables for structured data
- Link to other docs with relative paths

### Skills

- Clear, actionable steps
- No invented facts or hallucinations
- Cite sources in references/
- Include self-improvement loops
- Follow routing standards

### Code

- Use TypeScript for new code
- Follow existing patterns in `src/`
- No external UI frameworks (we use vanilla + design system)
- Comment complex logic
- Use design system tokens, never hardcoded values

### Git

- Keep commits focused and atomic
- Write meaningful commit messages
- Don't commit `designer-profile.local.md` or `context/org-pack.local/`
- Rebase on main before submitting PR

## Recognition

Contributors are recognized in:
- Git history (your commits stay attributed)
- Release notes for significant contributions
- Special thanks in major releases

Thank you for contributing! 🎨

## Questions?

- **General questions:** [Open a discussion](https://github.com/marcopslopes/thedesignharness/discussions)
- **Bug reports:** [Open an issue](https://github.com/marcopslopes/thedesignharness/issues)
- **Security issues:** [Report privately](https://github.com/marcopslopes/thedesignharness/security/advisories/new), not in a public issue
