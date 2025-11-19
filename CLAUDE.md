# CLAUDE.md - AI Assistant Guide for the Hey Repository

**Last Updated:** 2025-11-19
**Repository:** xrxrxr1004/hey
**Status:** Initial Setup

---

## Table of Contents

1. [Repository Overview](#repository-overview)
2. [Codebase Structure](#codebase-structure)
3. [Development Workflows](#development-workflows)
4. [Key Conventions](#key-conventions)
5. [Testing Standards](#testing-standards)
6. [Documentation Requirements](#documentation-requirements)
7. [AI Assistant Guidelines](#ai-assistant-guidelines)
8. [Common Tasks](#common-tasks)

---

## Repository Overview

### Current State
This repository is currently in its initial setup phase with no committed code yet.

### Project Purpose
**TODO:** Document the project's purpose, goals, and target audience once established.

### Technology Stack
**TODO:** Update this section as technologies are chosen:
- **Language:** TBD
- **Framework:** TBD
- **Package Manager:** TBD
- **Build Tools:** TBD
- **Testing Framework:** TBD

---

## Codebase Structure

### Directory Organization

**TODO:** Update this structure as the codebase develops. Recommended structure:

```
hey/
├── src/                  # Source code
│   ├── components/       # Reusable components
│   ├── services/         # Business logic and services
│   ├── utils/            # Utility functions
│   ├── types/            # Type definitions
│   └── config/           # Configuration files
├── tests/                # Test files
│   ├── unit/             # Unit tests
│   ├── integration/      # Integration tests
│   └── e2e/              # End-to-end tests
├── docs/                 # Documentation
├── scripts/              # Build and utility scripts
├── public/               # Static assets (if applicable)
└── dist/                 # Build output (gitignored)
```

### Key Files

**TODO:** Document important files as they are created:
- `package.json` - Project dependencies and scripts
- `README.md` - User-facing documentation
- `CONTRIBUTING.md` - Contribution guidelines
- `.gitignore` - Files to exclude from version control

---

## Development Workflows

### Branch Strategy

This project uses feature branches with the following naming convention:
- Feature branches: `claude/claude-md-<session-id>`
- Bug fixes: `fix/<description>`
- Enhancements: `feature/<description>`

**Important:** Always develop on the designated Claude branch and push changes there.

### Git Workflow

1. **Creating Changes:**
   ```bash
   # Ensure you're on the correct branch
   git checkout claude/claude-md-<session-id>

   # Make your changes

   # Stage changes
   git add <files>

   # Commit with descriptive message
   git commit -m "Description of changes"
   ```

2. **Pushing Changes:**
   ```bash
   # Always use -u flag for first push
   git push -u origin <branch-name>

   # Branch must start with 'claude/' and match session ID
   ```

3. **Retry Policy:**
   - If network errors occur, retry up to 4 times with exponential backoff (2s, 4s, 8s, 16s)
   - For 403 errors, verify branch name matches required pattern

### Commit Message Conventions

Follow these conventions for commit messages:

- **Format:** `<type>: <description>`
- **Types:**
  - `feat:` - New feature
  - `fix:` - Bug fix
  - `docs:` - Documentation changes
  - `style:` - Formatting, missing semicolons, etc.
  - `refactor:` - Code restructuring without changing behavior
  - `test:` - Adding or updating tests
  - `chore:` - Maintenance tasks

**Examples:**
```
feat: add user authentication module
fix: resolve memory leak in data processing
docs: update API documentation for v2.0
refactor: simplify error handling logic
```

---

## Key Conventions

### Code Style

**TODO:** Update based on chosen language and tooling:
- Use consistent indentation (2 or 4 spaces)
- Follow linting rules (configure ESLint, Prettier, or equivalent)
- Maximum line length: 100 characters
- Use meaningful variable and function names

### File Naming

**TODO:** Establish conventions:
- **JavaScript/TypeScript:** camelCase for files, PascalCase for components
- **Python:** snake_case for files and functions
- **Go:** lowercase or snake_case
- Be consistent within the project

### Error Handling

**TODO:** Document error handling patterns:
- Always validate input
- Use try-catch blocks appropriately
- Log errors with context
- Return meaningful error messages

### Security Best Practices

AI assistants MUST follow these security guidelines:

1. **Never commit sensitive data:**
   - API keys, passwords, tokens
   - .env files (should be gitignored)
   - credentials.json or similar

2. **Avoid common vulnerabilities:**
   - SQL injection
   - XSS (Cross-Site Scripting)
   - Command injection
   - Path traversal
   - CSRF (Cross-Site Request Forgery)

3. **Input validation:**
   - Sanitize all user inputs
   - Validate data types and ranges
   - Use parameterized queries

4. **Dependencies:**
   - Keep dependencies updated
   - Audit for known vulnerabilities
   - Use lock files (package-lock.json, yarn.lock, etc.)

---

## Testing Standards

### Test Coverage

**TODO:** Set coverage requirements:
- Minimum coverage: 80% (recommended)
- Critical paths: 100%
- Run tests before committing

### Test Organization

**TODO:** Document testing patterns:
```
tests/
├── unit/           # Test individual functions/components
├── integration/    # Test module interactions
└── e2e/            # Test complete user workflows
```

### Running Tests

**TODO:** Document test commands:
```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- <file-path>

# Watch mode
npm test -- --watch
```

---

## Documentation Requirements

### Code Documentation

1. **Functions/Methods:**
   - Document purpose, parameters, return values
   - Include examples for complex functions
   - Use JSDoc, docstrings, or equivalent

2. **Complex Logic:**
   - Add inline comments explaining "why" not "what"
   - Document assumptions and edge cases

3. **APIs:**
   - Document endpoints, parameters, responses
   - Include example requests/responses
   - Note authentication requirements

### Project Documentation

Keep these files updated:
- **README.md:** Installation, usage, quick start
- **CHANGELOG.md:** Version history and changes
- **API.md:** API reference (if applicable)
- **CLAUDE.md:** This file - update as project evolves

---

## AI Assistant Guidelines

### Before Starting Work

1. **Read this document thoroughly**
2. **Check for existing issues or tasks**
3. **Verify you're on the correct branch**
4. **Review recent commits to understand context**

### During Development

1. **Use TodoWrite tool for task tracking:**
   - Break down complex tasks
   - Update status as you progress
   - Mark tasks complete immediately

2. **Follow the principle of least surprise:**
   - Maintain existing patterns
   - Don't introduce new dependencies without reason
   - Keep changes focused and minimal

3. **Test your changes:**
   - Run existing tests
   - Add tests for new functionality
   - Verify no regressions

4. **Security review:**
   - Check for vulnerabilities
   - Validate input handling
   - Review error messages (don't leak sensitive info)

### After Completing Work

1. **Review your changes:**
   ```bash
   git diff
   git status
   ```

2. **Commit with clear messages:**
   - Explain what and why
   - Reference issues if applicable

3. **Push to the correct branch:**
   ```bash
   git push -u origin <branch-name>
   ```

4. **Update documentation:**
   - Add/update code comments
   - Update README if needed
   - Update this CLAUDE.md file if conventions change

### Common Pitfalls to Avoid

1. **Don't guess or make assumptions** - Ask the user if unclear
2. **Don't skip tests** - Always run tests before committing
3. **Don't commit commented-out code** - Remove it or explain why it's there
4. **Don't ignore warnings** - Fix them or document why they're acceptable
5. **Don't create files unnecessarily** - Prefer editing existing files
6. **Don't use bash for communication** - Output text directly to user
7. **Don't commit to wrong branch** - Always verify branch name

### Tool Usage Best Practices

1. **Prefer specialized tools:**
   - Read tool for file reading (not cat)
   - Edit tool for file editing (not sed/awk)
   - Write tool for new files (not echo)

2. **Use Task tool for exploration:**
   - When searching codebase
   - For complex multi-step tasks
   - When gathering context

3. **Parallel execution:**
   - Run independent tasks in parallel
   - Use single message with multiple tool calls
   - Don't parallelize dependent operations

---

## Common Tasks

### Adding a New Feature

1. Create todo list with TodoWrite
2. Research existing code patterns
3. Implement feature following conventions
4. Add tests
5. Update documentation
6. Commit and push

### Fixing a Bug

1. Reproduce the issue
2. Locate the problematic code
3. Write a failing test (if none exists)
4. Fix the issue
5. Verify test passes
6. Check for similar issues elsewhere
7. Commit with descriptive message

### Refactoring Code

1. Ensure tests exist and pass
2. Make incremental changes
3. Run tests after each change
4. Keep commits small and focused
5. Document why refactoring was needed

### Updating Dependencies

1. Check changelog for breaking changes
2. Update package files
3. Run tests
4. Update code if APIs changed
5. Document any required changes

---

## Project-Specific Notes

**TODO:** Add project-specific information:
- Architectural decisions
- Design patterns used
- Performance considerations
- Browser/platform compatibility
- Deployment process
- CI/CD pipeline
- Environment setup

---

## Resources

**TODO:** Add helpful links:
- Project documentation site
- Issue tracker
- CI/CD dashboard
- Deployment environments
- Related repositories

---

## Maintenance

### Updating This Document

This CLAUDE.md file should be updated:
- When project structure changes
- When new conventions are adopted
- When tooling changes
- At major version milestones
- When onboarding feedback suggests improvements

**Last Major Update:** 2025-11-19 (Initial creation)

---

## Questions or Issues?

If you encounter situations not covered in this guide:
1. Check the README.md for user-facing docs
2. Review recent commits for patterns
3. Ask the user for clarification
4. Update this document with the resolution

---

**Note to AI Assistants:** This document is your primary reference. When in doubt, ask the user rather than making assumptions. Always prioritize code quality, security, and maintainability over speed of delivery.
