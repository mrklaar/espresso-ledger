# CLAUDE.md — Espresso Ledger

This file provides guidance for AI assistants (Claude Code and similar) working in this repository.

## Project Overview

**espresso-ledger** is a personal finance / expense-tracking application owned by `mrklaar`. The project is in its initial setup phase — no source code has been committed yet. Use this file as the authoritative guide for all development conventions once code is added.

> When the first code lands, update this file to reflect the actual tech stack, directory structure, and build commands.

## Repository Status

| Item | Status |
|---|---|
| Commits | None yet (empty repo) |
| Remote | `http://local_proxy@127.0.0.1:16989/git/mrklaar/espresso-ledger` |
| Default working branch | `claude/claude-md-mmbqxu7irc7umdzx-ow92j` |

## Branch Naming Conventions

- `main` — stable, production-ready code
- `claude/<session-id>` — AI-generated feature/fix branches (never push directly to `main`)
- `feat/<short-description>` — human-authored feature branches
- `fix/<short-description>` — bug fix branches
- `chore/<short-description>` — maintenance branches (deps, config, docs)

## Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<optional scope>): <short description>

[optional body]

[optional footer(s)]
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`

Examples:
```
feat(ledger): add daily expense summary view
fix(auth): handle token expiry edge case
chore(deps): upgrade eslint to v9
```

## Development Workflow

1. **Branch** off `main` using the naming conventions above.
2. **Write code** following the conventions in this file.
3. **Run tests** before committing (`npm test` / `pytest` / cargo test — update once stack is confirmed).
4. **Run linter/formatter** before committing.
5. **Commit** with a conventional commit message.
6. **Push** to your branch and open a pull request against `main`.
7. **Never force-push** to `main`.

## Expected Tech Stack (update once confirmed)

Until the stack is decided, prefer:

- **Frontend**: TypeScript + React (or framework TBD)
- **Backend**: Node.js/TypeScript or Python
- **Database**: PostgreSQL (or SQLite for local dev)
- **Testing**: Jest (JS) or pytest (Python)
- **Linting**: ESLint + Prettier (JS/TS) or Ruff (Python)

## Directory Structure (template — update once code exists)

```
espresso-ledger/
├── CLAUDE.md           # This file
├── README.md           # Human-facing project description
├── .env.example        # Template for environment variables (never commit .env)
├── src/                # Application source code
│   ├── app/            # Core application logic
│   ├── components/     # UI components (if frontend exists)
│   ├── db/             # Database models, migrations, queries
│   └── utils/          # Shared utilities
├── tests/              # Test files mirroring src/ structure
├── scripts/            # One-off scripts, seed data, migrations
└── docs/               # Extended documentation
```

## Key Conventions for AI Assistants

### General

- Read existing code before modifying it. Never guess at structure.
- Keep changes minimal and focused — fix only what was asked.
- Do not add comments, docstrings, or type annotations to code you did not change.
- Do not add error handling for scenarios that cannot happen.
- Do not create helper utilities for one-off operations.

### Security

- Never commit secrets, API keys, tokens, or passwords. Use `.env` files excluded by `.gitignore`.
- Validate all user input at system boundaries.
- Avoid `eval`, dynamic SQL string interpolation, or `innerHTML` with untrusted data.
- Prefer parameterized queries for all database access.

### Git

- Commit only relevant files — never use `git add -A` blindly.
- Use `git push -u origin <branch-name>` — always specify the branch.
- Never skip commit hooks (`--no-verify`).
- Never amend published commits.
- Resolve merge conflicts rather than discarding changes.

### Testing

- Write tests for all new logic. Place test files adjacent to or mirroring source files.
- Tests must pass before marking any task complete.
- Do not mock internal implementation details; mock only external dependencies.

### Pull Requests

- Keep PRs small and focused on a single concern.
- Title format: `<type>(<scope>): <description>` (same as commit convention).
- Include a concise summary and a test plan in the PR body.

## Environment Variables

Copy `.env.example` to `.env` and fill in values locally. Never commit `.env`.

```bash
cp .env.example .env
```

Expected variables (update once stack is confirmed):

```
DATABASE_URL=
PORT=3000
NODE_ENV=development
```

## Running the Project (update once code exists)

```bash
# Install dependencies
npm install        # or: pip install -e ".[dev]"

# Start development server
npm run dev        # or: python -m app

# Run tests
npm test           # or: pytest

# Lint and format
npm run lint       # or: ruff check . && ruff format .

# Build for production
npm run build
```

## Updating This File

When new code, dependencies, or workflows are added, update the relevant sections of this file immediately. Keep it accurate — it is the primary context source for AI assistants working in this repo.
