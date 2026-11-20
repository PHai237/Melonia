# AI workflow — provider independent

1. Human owner + design reviewer write one small, testable task.
2. Select a single write agent (Antigravity OR Codex OR Copilot); other agent stays read-only.
3. Agent reads `AGENTS.md`, `VISION`, `DECISIONS`, `ROADMAP`, `WORLD_RULES`.
4. Agent implements narrowly scoped change, runs `npm run build`, reports evidence.
5. Reviewer looks at diff; human playtests and accepts/rejects.
6. Commit with descriptive message. Never have two agents editing the same working tree concurrently.

If both must work concurrently, use **separate git worktrees** and branches with independent tasks, then review PRs one by one.

Example task handoff:
- Goal: make NPC move between house and market when clock reaches a state.
- Files: `src/scenes/VillageScene.ts`, `src/game/WorldClock.ts` only.
- Acceptance: NPC location updates, interaction remains working, no build errors.
- Out of scope: item sales, inventories, network protocol.

A model's retirement must not break the repository. Text-based docs and source code stay readable in any IDE.
