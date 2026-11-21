"""
process_assets.py — Melonia asset pipeline
Converts white-background JPEGs from AI generator to transparent PNGs
at the correct paths and sizes for the game.

Run from project root:
  python scripts/process_assets.py
"""

from pathlib import Path
from PIL import Image
import numpy as np

BRAIN_DIR = Path(r"C:\Users\Admin\.gemini\antigravity\brain\c9f105c7-952c-489c-8351-65332822011c")
ASSETS_DIR = Path(r"C:\My Future\Melonia\public\assets")

# ---------------------------------------------------------------------------
# Asset conversion spec
# (src_filename, dest_path_relative_to_ASSETS_DIR, (target_w, target_h))
# target size = None → keep original size (just remove bg)
# ---------------------------------------------------------------------------
ASSETS = [
    # Player sprites
    ("player_idle_down_1795165741715.jpg",  "sprites/player/idle-down-0.png",  (192, 256)),
    ("player_walk_down_0_1795165767878.jpg","sprites/player/walk-down-0.png",  (192, 256)),
    ("player_walk_down_1_1795165833822.jpg","sprites/player/walk-down-1.png",  (192, 256)),
    ("player_idle_side_0_1795165857940.jpg","sprites/player/idle-side-0.png",  (192, 256)),
    # Walk up/side: reuse idle frames as placeholders until dedicated frames are generated
    ("player_idle_down_1795165741715.jpg",  "sprites/player/idle-up-0.png",    (192, 256)),
    ("player_walk_down_0_1795165767878.jpg","sprites/player/walk-side-0.png",  (192, 256)),
    ("player_walk_down_1_1795165833822.jpg","sprites/player/walk-side-1.png",  (192, 256)),
    ("player_walk_down_0_1795165767878.jpg","sprites/player/walk-up-0.png",    (192, 256)),
    ("player_walk_down_1_1795165833822.jpg","sprites/player/walk-up-1.png",    (192, 256)),
    # NPC
    ("elias_idle_0_1795165883828.jpg",      "sprites/npc/elias-idle-0.png",    (192, 256)),
    # Environment
    ("fantasy_cottage_1795165906014.jpg",   "environment/cottage.png",         (640, 560)),
    ("tree_oak_1795165925980.jpg",          "environment/tree-oak.png",        (256, 384)),
    ("grass_tile_1795165947457.jpg",        "environment/grass-tile.png",      (256, 256)),
    ("path_tile_1795165974855.jpg",         "environment/path-tile.png",       (256, 256)),
    ("fishing_pond_1795166003384.jpg",      "environment/pond.png",            (800, 600)),
]

# ---------------------------------------------------------------------------
# White background removal using flood-fill from corners
# ---------------------------------------------------------------------------

def remove_white_bg(img: Image.Image, threshold: int = 240) -> Image.Image:
    """
    Converts near-white pixels (starting from the four image corners)
    to transparent. Uses flood-fill via numpy for clean edge detection.
    """
    img = img.convert("RGBA")
    data = np.array(img, dtype=np.uint8)

    h, w = data.shape[:2]
    alpha = data[:, :, 3].copy()

    # Create a mask of pixels that are "near white"
    r, g, b = data[:, :, 0], data[:, :, 1], data[:, :, 2]
    near_white = (r >= threshold) & (g >= threshold) & (b >= threshold)

    # BFS flood-fill from all four corners
    visited = np.zeros((h, w), dtype=bool)
    queue: list[tuple[int, int]] = []

    corners = [(0, 0), (0, w - 1), (h - 1, 0), (h - 1, w - 1)]
    for cy, cx in corners:
        if near_white[cy, cx] and not visited[cy, cx]:
            queue.append((cy, cx))
            visited[cy, cx] = True

    while queue:
        y, x = queue.pop()
        alpha[y, x] = 0
        for dy, dx in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            ny, nx = y + dy, x + dx
            if 0 <= ny < h and 0 <= nx < w and not visited[ny, nx] and near_white[ny, nx]:
                visited[ny, nx] = True
                queue.append((ny, nx))

    data[:, :, 3] = alpha
    return Image.fromarray(data)


def process(src_name: str, dest_rel: str, size: tuple[int, int] | None) -> str:
    src = BRAIN_DIR / src_name
    dest = ASSETS_DIR / dest_rel
    dest.parent.mkdir(parents=True, exist_ok=True)

    if not src.exists():
        return f"  ❌ MISSING source: {src_name}"

    img = Image.open(src)
    img = remove_white_bg(img)

    if size:
        img = img.resize(size, Image.LANCZOS)

    img.save(dest, "PNG", optimize=False)
    kb = dest.stat().st_size // 1024
    return f"  ✅ {dest_rel}  ({size[0]}×{size[1]}px, {kb}KB)"


if __name__ == "__main__":
    print("Melonia Asset Pipeline — processing 10 source images...\n")
    results = []
    for src_name, dest_rel, size in ASSETS:
        result = process(src_name, dest_rel, size)
        print(result)
        results.append(result)

    ok = sum(1 for r in results if "✅" in r)
    fail = sum(1 for r in results if "❌" in r)
    print(f"\nDone: {ok} OK, {fail} failed out of {len(results)} entries.")
