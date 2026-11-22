# AI Hub review

## Current — PIXEL-CHAR-001 activation

**Status:** Reference Gate publication authorized after successful checks; overall PIXEL-CHAR-001 IN_PROGRESS following owner dispatch from base e910973. No production sprite approval.

Selected the Gemini Front/Back/Right-facing Side turnaround matching brown low ponytail, teal coat and diagonal satchel. Copied it unchanged to `references/protagonist-turnaround.png`; source path, dimensions and SHA256 are recorded in `references/README.md`. Owner selection is a design-reference selection only, not production sprite or final style approval.

Corrected the reference after the owner identified a checksum mismatch: the accepted original download is 2048×1273, 4,311,155 bytes, SHA256 `1c3ea16ae7d4c10681ff20ebf50af4c983ef90cbf9cb092d252054c705e41270`. Get-FileHash matched before use and again after a byte-preserving copy. The previously installed different-sized variant is not the locked reference. No conversion or new artwork was created.

Updated TASK.md for one next pixel idle-down master, AI_HUB.md index, Codex handoff and AGENTS.md branch-specific Modern Fantasy Pixel Art exception. D-001 and the proposed final style status remain unchanged. No artwork was generated; no gameplay, renderer, pipeline, production manifest or existing trial assets were edited. Owner authorized commit/push of exactly these seven files with message `docs: activate pixel character task and lock reference`. Preserve all unrelated WIP, including the nine production player PNG deletions already present at this correction step; do not stage or repair them here.

Prior activation checks: build and diff check passed, but owner checksum review correctly stopped publication of the mismatched reference. Correction publication requires fresh staged-diff check and build. Scope remains exactly six text files plus the corrected reference PNG. No runtime/artwork validation is claimed; existing uncommitted gameplay asset deletions can still affect the local demo even if the bundler succeeds.

Correction checks completed: staged scope is exactly the seven authorized files; staged PNG is 4,311,155 bytes and hashes to the owner-supplied SHA256. `git diff --cached --check`, `npm run build` and `git diff --check` all exit 0; build reports the existing chunk >500 kB warning. Commit/push of this checked scope is explicitly authorized by the owner. No unrelated WIP is staged.

## Historical — Hub setup/publication

**Status:** Owner approved Hub publication — setup only; no art approval or next task execution.

Source bundle: local `melonia-ai-hub-starter.zip`, read `melonia-ai-hub/SETUP_FOR_CODEX.md` before installation. Base commit `e19ac106d182aa18476e137af563a3d4eb5a41b2`, branch `feat/pixel-visual-slice`; workspace already contains uncommitted renderer, preview, sprite-tool and trial-review work. Those are separate from this setup and must remain preserved.

Installed AI_HUB.md, TASK.md and HANDOFF_TEMPLATE.md; added manual GitHub sync instructions, per-agent handoff placeholders and a reference provenance gate. Linked AGENTS.md to the hub without removing existing rules. No model/API/connector/browser automation or background runner is installed. Gemini/Claude file access has not been configured or verified; no messages have been sent to them.

PIXEL-CHAR-001 stays TODO. The three handoff lanes are placeholders, not invented submissions. Prior Master v2 QA does not imply owner acceptance. Exact approved turnaround is pending owner confirmation; the hub references directory contains a provenance note rather than a guessed approved image.

Owner authorized commit and push with message `docs: establish Melonia AI collaboration hub`, limited to AGENTS.md and docs/ai-hub text files. Renderer, preview, pipeline and artwork remain outside this publication. PIXEL-CHAR-001 remains TODO; publishing the coordination documents does not approve character artwork or start the next task.

Validation: `npm run build` exit 0 (20 modules; existing chunk >500 kB warning), `git diff --check` exit 0. All hub Markdown links resolve locally and files were read as UTF-8. Before/after hashes confirm every pre-existing file under src/, tools/, public/, docs/ and the checked root configuration/context files is preserved, except the intended AGENTS.md index addition. No browser test was run: this task changes documentation only and explicitly excludes browser automation.

Historical Git state before publication: branch feat/pixel-visual-slice, HEAD at e19ac10; AGENTS.md modified and docs/ai-hub/ untracked, alongside the preserved prior WIP. At setup completion nothing had been staged, committed or pushed. Prior WIP remains intentionally uncommitted during the Hub-only publication. GitHub sync does not configure Gemini/Claude access; those integrations remain unverified. Local WIP files linked by the Hub may not exist on GitHub yet.
