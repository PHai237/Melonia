# Shared AI coding instructions — Fantasy Sandbox 2D

Read this file first, then `docs/VISION.md`, `docs/DECISIONS.md`, and `docs/ROADMAP.md`.

For file-based AI coordination, read [AI Hub](docs/ai-hub/AI_HUB.md) and [active task](docs/ai-hub/TASK.md). These provide context and handoff scope; they do not authorize starting a new task beyond the owner's current request.

## Product principles
- Web-first cooperative fantasy life sandbox; single-player vertical slice first.
- HD 2D / hand-painted anime visual target, **not pixel art**. Prototype shapes are placeholders, not approved art.
- Player agency, peaceful activities, living NPCs, and exploration. No mandatory PvP, pay-to-win or forced daily grind.
- Player should be able to enjoy a session without gaining XP or clearing a dungeon.
- A world clock and NPC schedules are important, but exact day length is **not decided** (150 minutes is experimental only).
- Future shared-world multiplayer is planned, **not present** in v0.0.1.

## Implementation rules
1. Before changing files, give a short plan with file ownership and acceptance criteria.
2. Scope every task to one small feature. Do not add combat, economy, accounts, online multiplayer, lore or asset packs without approval.
3. Keep game state, world simulation, rendering and UI in distinct modules as they grow.
4. Avoid external APIs, API keys and paid services for prototype gameplay.
5. Run `npm run build` and report actual result; never claim PASS if tests couldn't run.
6. Never commit tokens, keys, `node_modules`, binaries or generated build output.
7. Record design proposals separately from confirmed decisions; update `docs/DECISIONS.md` when an approval happens.
8. When coding agents alternate, inspect `git status` and latest commit before editing. Avoid simultaneous changes on one working tree.
9. End each task with summary of changed files, test evidence and known gaps.

## Definitions of done
- Can start, can use keyboard, no runtime errors observed, requested behavior works, docs updated, code diff reviewable.
- Visual polish is NOT accepted on the basis of one generated illustration; verify assets in the running game.
