# AI Hub setup review

**Status:** Owner approved Hub publication — setup only; no art approval or next task execution.

Source bundle: local `melonia-ai-hub-starter.zip`, read `melonia-ai-hub/SETUP_FOR_CODEX.md` before installation. Base commit `e19ac106d182aa18476e137af563a3d4eb5a41b2`, branch `feat/pixel-visual-slice`; workspace already contains uncommitted renderer, preview, sprite-tool and trial-review work. Those are separate from this setup and must remain preserved.

Installed AI_HUB.md, TASK.md and HANDOFF_TEMPLATE.md; added manual GitHub sync instructions, per-agent handoff placeholders and a reference provenance gate. Linked AGENTS.md to the hub without removing existing rules. No model/API/connector/browser automation or background runner is installed. Gemini/Claude file access has not been configured or verified; no messages have been sent to them.

PIXEL-CHAR-001 stays TODO. The three handoff lanes are placeholders, not invented submissions. Prior Master v2 QA does not imply owner acceptance. Exact approved turnaround is pending owner confirmation; the hub references directory contains a provenance note rather than a guessed approved image.

Owner authorized commit and push with message `docs: establish Melonia AI collaboration hub`, limited to AGENTS.md and docs/ai-hub text files. Renderer, preview, pipeline and artwork remain outside this publication. PIXEL-CHAR-001 remains TODO; publishing the coordination documents does not approve character artwork or start the next task.

Validation: `npm run build` exit 0 (20 modules; existing chunk >500 kB warning), `git diff --check` exit 0. All hub Markdown links resolve locally and files were read as UTF-8. Before/after hashes confirm every pre-existing file under src/, tools/, public/, docs/ and the checked root configuration/context files is preserved, except the intended AGENTS.md index addition. No browser test was run: this task changes documentation only and explicitly excludes browser automation.

Historical Git state before publication: branch feat/pixel-visual-slice, HEAD at e19ac10; AGENTS.md modified and docs/ai-hub/ untracked, alongside the preserved prior WIP. At setup completion nothing had been staged, committed or pushed. Prior WIP remains intentionally uncommitted during the Hub-only publication. GitHub sync does not configure Gemini/Claude access; those integrations remain unverified. Local WIP files linked by the Hub may not exist on GitHub yet.
