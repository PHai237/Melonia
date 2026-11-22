# Art Direction — Melonia

**Status:** Approved direction (D-001). Implementation details in this doc are guidelines, not locked decisions.

**Experimental branch note (2026-11-22):** The owner has requested preparation for a modern pixel-art style trial on `feat/pixel-visual-slice`. See [Pixel visual slice proposal and migration audit](PIXEL_VISUAL_SLICE.md). This document retains the hand-painted baseline; D-001 is not replaced by a final pixel-art production decision. Runtime assets and gameplay have not changed in this preparation task.

---

## 1. Visual Identity

**Style:** Hand-painted Anime Fantasy HD 2D

Melonia's world must feel **lived-in, warm and inviting**. Every visual element should reinforce the sense that this is a real place where real people live, not a backdrop for a game system.

**Mood keywords:** Cozy · Luminous · Grounded · Fantastical · Alive

---

## 2. Perspective Convention

**2D top-down with light three-quarter (3/4) perspective.**

| Property | Specification |
|---|---|
| Camera type | 2D orthographic, no tilt or rotation |
| Perspective | Painted into sprites — rooftops and front faces of buildings visible simultaneously |
| Horizon direction | Top of screen = "north"/back, bottom = "south"/front |
| Grid type | Standard X/Y — NOT isometric diamond |
| Coordinate system | Phaser default: X right, Y down |

**Buildings:** Viewer sees the rooftop from above and the front wall at an angle — typically ~30° elevation feel.

**Characters:** Full body visible from a slight overhead angle. Head, shoulders, torso, legs and feet all readable.

---

## 3. Character Proportions

**Style:** Anime-balanced with light chibi influence. **4.5–5 head ratio.**

```
Target ratio:  head height : total body height = 1 : 4.5 to 1 : 5
Head:          Slightly larger than realistic, defined face shape
Limbs:         Slightly short and compact — readable at small sizes
Silhouette:    Must be immediately readable at 96px height in-game
Feet/base:     Clear ground contact point for depth sorting
```

**NOT:**
- Chibi (1:2–1:3 ratio, oversized head)
- Realistic anime (1:7–1:8, elongated limbs)
- Pixel-art proportions (blocky, 16px per body part)

---

## 4. Colour Palette

### Environment
| Role | Hex | Description |
|---|---|---|
| Grass primary | `#7ab870` | Natural mid-green |
| Grass highlight | `#9ed48e` | Sun-catch on grass |
| Grass shadow | `#5a9158` | Underside/shadow areas |
| Path earth | `#c4a87a` | Warm sandy dirt |
| Path edge | `#a8865a` | Worn path border |
| Water surface | `#6fbed4` | Clear pond, light blue |
| Water deep | `#4a9bb8` | Deeper water |
| Wood warm | `#8b5e3c` | Building timber |
| Stone warm | `#a89880` | Wall stone, chimney |
| Roof terracotta | `#c86040` | Roof tiles |
| Roof shadow | `#9a4830` | Under-eave shadow |

### Characters
| Role | Hex | Description |
|---|---|---|
| Skin neutral | `#f0c8a0` | Base skin tone |
| Skin shadow | `#d4956a` | Shadow/contour |
| Hair warm brown | `#6b3a1f` | Default hair |
| Clothing accent | `#4a7a8c` | Traveler teal-blue |
| Clothing shadow | `#2d5560` | Clothing shadow |

### UI
| Role | Hex | Description |
|---|---|---|
| Panel background | `#2a1f14` | Dark wood feel |
| Panel border | `#c8a86a` | Gold trim |
| Text primary | `#f5ead5` | Warm white |
| Interaction highlight | `#f0d060` | Soft golden yellow |
| Health/positive | `#78c878` | Natural green |
| Warning | `#e08840` | Amber orange |

---

## 5. Lighting Convention

- **Primary light source:** Upper-left (consistent across all assets)
- **Time of day for base assets:** Morning/late morning (warm, soft)
- **Shadow direction:** Lower-right cast shadows at ~45°
- **Shadow style:** Soft ellipse beneath characters; painted drop-shadow on buildings and trees
- **No runtime light/shadow system in v0.0.x** — lighting is baked into sprites

---

## 6. Rendering Rules

### All assets must share:
- Same perspective angle
- Same line-weight feel (soft anti-aliased edges, not hard pixel borders)
- Same shadow direction and softness
- Comparable level of detail relative to size
- Consistent colour temperature (warm-neutral, slight golden cast)

### Anti-mix rules:
- ❌ Do not mix pixel-art sprites with painted backgrounds
- ❌ Do not mix 3D-rendered assets with 2D-painted sprites
- ❌ Do not mix assets with different perspective angles
- ❌ Do not use photo textures without heavy painterly treatment

---

## 7. Sprite Technical Specifications

### Player Character
```
Canvas size:    96 × 128 px per frame (adjustable after in-game review)
Pivot point:    Bottom-centre of sprite (foot position)
Background:     Transparent (PNG alpha)
Frame layout:   Horizontal strip or grid spritesheet
Directions:     Down, Up, Side (mirror for left/right if symmetric)
```

| Animation | Frames | FPS | Notes |
|---|---|---|---|
| idle-down | 4 | 6 | Subtle breathing/sway |
| idle-up | 4 | 6 | Back-facing idle |
| idle-side | 4 | 6 | Side idle; mirror for left |
| walk-down | 8 | 10 | Toward camera |
| walk-up | 8 | 10 | Away from camera |
| walk-side | 8 | 10 | Side walk; mirror for left |

### NPC Elias
```
Canvas size:    96 × 128 px per frame (match player scale)
Pivot point:    Bottom-centre
Background:     Transparent
Animations:     idle-down (4 frames), idle-side (4 frames) minimum
Distinguishing: Merchant attire — bag/pack, different colour scheme
```

### Buildings (Cottage)
```
Format:         Single PNG, transparent background
Size:           ~320 × 280 px (adjust for world scale)
Layers needed:  
  - main body (walls + windows + door)  
  - roof (separate layer for occlusion if player walks behind)
Pivot:          Bottom-centre of building footprint
Collision:      Defined separately in WorldLayout — do NOT use PNG bounds
```

### Trees
```
Format:         Single PNG, transparent background
Size:           ~128 × 192 px (tall tree), ~80 × 80 (bush/small)
Pivot:          Bottom-centre of trunk base
Collision:      Trunk only (~32px wide at base) — canopy is NOT a collider
Foreground:     Canopy can be separate layer for occlusion
```

### Ground / Environment
```
Grass:          Tileable 128 × 128 px or painted flat image
Path:           Tileable 128 × 64 px sections or standalone painted patch
Pond:           Single painted image ~400 × 300 px with animated water frames
Transitions:    Grass-to-path edge painted, not hard-cut
```

---

## 8. UI Style

- Panels: dark parchment background, gold trim border, rounded corners
- Text: warm white `#f5ead5`, serif or fantasy-lite font
- Interaction prompt: small floating badge, golden highlight
- Dialogue box: bottom-third of screen, NPC portrait on left (future)
- Fishing UI: simple tension indicator and reaction prompt
- NO mobile-game button grids, NO floating damage numbers, NO progress bar walls

---

## 9. What "Hand-Painted" Means in Practice

The assets should look as if painted by hand with a digital brush tool:
- Visible brush texture in colour fills
- Soft anti-aliased outlines, not hard pixel grid
- Colour is not flat — there is shading and local variation
- Specular highlights are subtle, not glossy or cel-shaded
- Leaves, grass blades and water have organic variation

This does NOT require ultra-high resolution — a 96×128 character sprite can look hand-painted if the brush work is done well.

---

## 10. Version Notes

| Version | Art milestone |
|---|---|
| v0.0.1 | Phaser graphics placeholder (current — not final) |
| v0.0.2 | First real sprites: player, Elias, 1 cottage, 2 trees, ground (this sprint) |
| v0.0.3+ | Expanded environment, more NPCs, UI polish |
