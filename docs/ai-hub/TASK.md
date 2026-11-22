# Active Task — PIXEL-CHAR-001

**Status:** TODO

**Branch:** `feat/pixel-visual-slice`

**Objective:** Produce and visually validate **one** native-resolution pixel-art master of the *already approved* Melonia protagonist before generating any walk animation. Do not expand into 42 frames yet.

**Dispatch:** Task content supplied by the starter bundle, retained as a pending task. AI Hub installation does not start artwork generation, re-run the sprite pipeline, or authorize production integration. Owner assignment is required before the next action.

**Reference gate:** `references/protagonist-turnaround.png` is not installed yet. A Gemini turnaround candidate exists locally, but its approval/identity must be confirmed; see [reference provenance](references/README.md). The bundle's phrase “already approved” is an intent/requirement, not proof that a particular local file is approved.

## Design reference

Owner-approved turnaround: front/down, back/up, right-facing side. Codex should copy the approved PNG reference into `docs/ai-hub/references/protagonist-turnaround.png`, and optionally village concept into `docs/ai-hub/references/village-concept.png`, **with provenance notes**. Do not substitute prior v0/v1 character. Identifiers: tousled brown hair with a low ponytail, indigo eyes, muted teal open coat, cream undershirt, diagonal leather strap and satchel, dark trousers, brown boots.

## Trial technical contract — not production lock

- Canvas: 48×64 native; display: ×2, subject to in-game visual review.
- Pivot: (24,60) in canvas edge coordinates; standing ground-contact pixel around row 59.
- Alpha and palette checked by `tools/sprite-pipeline/` only once actual master exists.
- No AI-generated multi-frame sheet cut into independent poses; no generic automatic image shrink masquerading as hand-authored native pixel art.

## Agent deliverables

**Gemini:** Compare candidate master to approved turnaround and write concise visual feedback: likeness, proportions, face, clothing, ponytail, satchel, perspective, pixel clusters. If a visual candidate can be created, label it *draft*, not validated production pixel art. Save/share resulting image as an artifact.

**Claude:** Audit actual candidate file using existing `tools/sprite-pipeline/` and report precise measurements, warnings and which claims have not been tested. Propose a minimal fix only when there is measurable evidence. No extra animation frames.

**Codex:** Preserve current uncommitted changes; register image only in isolated `?preview=player` and capture an authentic game screenshot at ×2 on pixel background. Confirm nearest filtering, pivot and dimensions, run `npm run build` and `git diff --check`. Do not overwrite `public/assets/sprites/player` or alter VillageScene. Do not commit/push unless owner approves.

## Exit gate

Owner approves the visual result at actual gameplay display size; technical QA passes or deviations are documented; source/reference provenance and preview screenshots are attached. Then create a new small task for **walk-down key poses**, followed by in-betweens only after keys pass.
