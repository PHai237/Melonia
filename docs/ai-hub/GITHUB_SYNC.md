# Manual GitHub sync

The hub has no automatic synchronization. Keep branch `feat/pixel-visual-slice`; do not merge into main. Local files are invisible to web agents until an approved push or explicit file handoff. Do not put tokens, keys, node_modules, builds, trial ZIPs, screenshots or unapproved binaries into a commit.

1. Run `git status --short --branch` and `git log -1 --oneline`. Confirm the branch and preserve all WIP; do not reset/clean/stash away unrelated work or pull over it.
2. Owner reviews the exact diff, handoffs and artifacts. Only after explicit commit/push approval, stage the intended files by name. For this documentation setup the proposed scope is `AGENTS.md` and the text files in `docs/ai-hub/`; existing renderer/preview/pipeline changes are separate work.
3. Example commands **for later, after approval**:

```powershell
git add -- AGENTS.md docs/ai-hub/AI_HUB.md docs/ai-hub/TASK.md docs/ai-hub/HANDOFF_TEMPLATE.md docs/ai-hub/GITHUB_SYNC.md docs/ai-hub/REVIEW.md docs/ai-hub/handoffs/README.md docs/ai-hub/handoffs/gemini.md docs/ai-hub/handoffs/claude.md docs/ai-hub/handoffs/codex.md docs/ai-hub/handoffs/.gitkeep docs/ai-hub/references/README.md docs/ai-hub/references/.gitkeep
git diff --cached --check
git diff --cached --stat
git diff --cached
```

Stop if staged files include unintended work; do not use `git add .` or `git add -A`. Run `npm run build` and `git diff --check`, inspect staged content, then (if approved):

```powershell
git commit -m "docs: establish Melonia AI collaboration hub"
git push origin feat/pixel-visual-slice
git status --short --branch
```

4. Share repository, branch and commit SHA plus the TASK.md path with the agent. Verify that the agent can actually read those files; a private repository requires its own authorized integration. If unavailable, send the task/reference bundle once and import the returned handoff manually. No API keys or new connector setup is part of this hub.
5. Import each returned report without presenting it as accepted. Record the source commit/checksums and integrate only after owner review. If origin has advanced, inspect divergence and resolve with the owner before combining work; no force push or automatic merge.
