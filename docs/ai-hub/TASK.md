# Active Task — PIXEL-CHAR-001

**Status:** IN_PROGRESS

**Branch:** `feat/pixel-visual-slice`

**Objective:** Produce and visually validate **one pixel idle-down master** of the Melonia protagonist using the owner-selected design reference. Design-reference selection does not approve a production sprite. Do not generate walk animation or expand into 42 frames yet.

**Dispatch:** Owner explicitly started PIXEL-CHAR-001 on branch `feat/pixel-visual-slice`, base `e910973`, and subsequently authorized commit/push of the seven agreed Reference Gate files after matching the original-image checksum and passing checks. No sprite generation, gameplay edits, reset/clean or unrelated WIP publication. Stop after the authorized Reference Gate push.

**Reference gate:** [protagonist-turnaround.png](references/protagonist-turnaround.png) is installed unchanged from the Gemini image matching the owner's Front/Back/Right-facing Side selection. See [provenance and checksum](references/README.md). It is a design reference only; no sprite production approval is granted.

**Locked reference identity:** original PNG 2048×1273, 4,311,155 bytes; SHA256 `1c3ea16ae7d4c10681ff20ebf50af4c983ef90cbf9cb092d252054c705e41270`. The earlier different-sized variant failed this gate and is not accepted as the reference.

## Design reference

Owner-selected turnaround: front/down, back/up, right-facing side, stored in `docs/ai-hub/references/protagonist-turnaround.png`. Do not substitute a prior v0/v1 character, single-view crop or village concept. Identifiers: tousled brown hair with a low ponytail, indigo eyes, muted teal open coat, cream undershirt, diagonal leather strap and satchel, dark trousers, brown boots. This large three-view image is not a native sprite sheet and must not be sliced or automatically shrunk into production sprites.

## Next output — one pixel idle-down master

The next artwork deliverable is exactly one native 48×64 transparent RGBA `idle-down-0.png`, with its palette/provenance and measured QA, reviewed in the isolated preview at ×2 with pivot (24,60). Keep it in a review/experimental location until owner acceptance. No other directions, walk poses, in-betweens or duplicated frames at this stage. Existing Master v2 remains an unapproved trial; task activation does not accept it. The current activation request does not create this next artwork deliverable.

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
