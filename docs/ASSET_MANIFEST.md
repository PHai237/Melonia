# Asset Manifest — Melonia

> Updated 2026-11-20. See `docs/ART_DIRECTION.md` for style specifications.

---

## Status Legend
- ✅ **ready** — asset exists, integrated and tested in game
- 🔄 **temporary** — placeholder or partial quality, needs replacement
- ❌ **missing** — required but not yet available

---

## Player Character

| Asset | Path | Size | Frames | Status | Notes |
|---|---|---|---|---|---|
| Idle Down | `sprites/player/idle-down-0.png` | 192×256 | 1 (×4 repeat) | ✅ ready | Static idle, no breathing anim yet |
| Walk Down F0 | `sprites/player/walk-down-0.png` | 192×256 | 1 of 2 | ✅ ready | Left foot forward |
| Walk Down F1 | `sprites/player/walk-down-1.png` | 192×256 | 2 of 2 | ✅ ready | Right foot forward |
| Idle Side | `sprites/player/idle-side-0.png` | 192×256 | 1 (×4 repeat) | ✅ ready | Mirror for left |
| Idle Up | `sprites/player/idle-up-0.png` | 192×256 | 1 (×4 repeat) | 🔄 temporary | Reuses idle-down (back-facing needed) |
| Walk Up F0 | `sprites/player/walk-up-0.png` | 192×256 | 1 of 2 | 🔄 temporary | Reuses walk-down-0 |
| Walk Up F1 | `sprites/player/walk-up-1.png` | 192×256 | 2 of 2 | 🔄 temporary | Reuses walk-down-1 |
| Walk Side F0 | `sprites/player/walk-side-0.png` | 192×256 | 1 of 2 | 🔄 temporary | Reuses walk-down-0 |
| Walk Side F1 | `sprites/player/walk-side-1.png` | 192×256 | 2 of 2 | 🔄 temporary | Reuses walk-down-1 |

> Walk-up and walk-side use walk-down frames as placeholders. Dedicated directional frames needed.

---

## NPC — Elias (Merchant)

| Asset | Path | Size | Frames | Status | Notes |
|---|---|---|---|---|---|
| Idle F0 | `sprites/npc/elias-idle-0.png` | 192×256 | 1 (×4 repeat) | ✅ ready | Facing camera |

---

## Environment

| Asset | Path | Size | Status | Notes |
|---|---|---|---|---|
| Cottage | `environment/cottage.png` | 640×560 | ✅ ready | Three-quarter view, hand-painted |
| Oak Tree | `environment/tree-oak.png` | 256×384 | ✅ ready | Full tree with trunk base |
| Grass Tile | `environment/grass-tile.png` | 256×256 | ✅ ready | Tiled across world ground |
| Path Tile | `environment/path-tile.png` | 256×256 | ✅ ready | Tiled along roads |
| Pond | `environment/pond.png` | 800×600 | ✅ ready | With pier, lily pads, fish |

---

## UI

| Asset | Type | Status | Notes |
|---|---|---|---|
| Dialogue panel | HTML/CSS text | ✅ ready | Fantasy-styled text panel |
| Interaction prompt | HTML/CSS text | ✅ ready | "[E] action" badge |
| Clock display | HTML/CSS text | ✅ ready | Top-right corner |
| Inventory display | HTML/CSS text | ✅ ready | Top-left corner |
| Fishing feedback | HTML/CSS text | ✅ ready | Centre screen state text |
| Fish icon | — | ❌ missing | For future inventory panel |

---

## Asset Source & Licence

| Asset Group | Source | Tool | Licence |
|---|---|---|---|
| All sprites & environment | AI-generated | image-generator subagent | AI-generated — confirm with owner before commercial use |

> [!CAUTION]
> AI-generated assets may have varying IP status by jurisdiction. Owner must confirm licensing before any public release.

---

## Known Gaps (not blockers for demo)

1. Walk-up / walk-side animations reuse walk-down frames — dedicated directional frames needed
2. Idle animations have no breathing/sway — all 4 frames point to same PNG
3. No bush/shrub decoration sprites
4. No grass-to-path transition tiles
5. No fish icon for inventory UI
6. Cottage has no separate roof layer for occlusion
