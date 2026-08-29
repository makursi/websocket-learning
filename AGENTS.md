# AGENTS.md — websocket-learning

WebSocket protocol learning project based on websocket.org content. ESM-only (`type: "module"`), Node >= 18, pnpm >= 9.

## Commands

| Command | Purpose |
|---------|---------|
| `pnpm exp <file>` | Run a TS script directly via tsx (e.g. an experiment's `server.ts` / `client.ts`) |
| `pnpm test` | Run all experiment tests (vitest) |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm lint` / `pnpm lint:fix` | ESLint over the repo (@antfu flat config in `eslint.config.mjs`) |

Pre-commit hook (simple-git-hooks + lint-staged) runs `eslint --fix` on staged files.

## Repo structure

- `content/`, `docs/` — protocol study notes in Chinese
- `experiments/NN-name/` — one experiment verifies one protocol concept; each has a `README.md` (concept, design, pitfalls) and runnable sources under `src/`

## Experiment conventions

- Directory naming: `NN-kebab-case`, numbered to match content chapters
- Prefer Node native modules (`node:http`, `node:http2`, `node:crypto`, `node:buffer`) — no third-party protocol libs (e.g. `ws`) until the protocol itself is understood; `ws`-based experiments go in `experiments/extra/`
- `experiments/**/*.ts` is exempt from `no-console` and `node/prefer-global/buffer` (learning demos rely on console output and global `Buffer`) — see `eslint.config.mjs`
- Run each side of a demo in a separate terminal (`pnpm exp .../server.ts` + `pnpm exp .../client.ts`)

## Git conventions

- Commit messages must be in English, conventional commits style (e.g. `chore: add base eslint config`). Never use Chinese in commit messages.
- Feature work goes on a branch → push → PR → merge remotely → `git checkout main && git pull`
- Branch naming follows existing patterns, e.g. `docs/<topic>`, `chore/<topic>`, `experiments/<topic>`
