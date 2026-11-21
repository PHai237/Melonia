/**
 * AssetManifest — single source of truth for all asset keys and paths.
 * Update paths here; never hardcode them in scenes or entities.
 */

// ---------------------------------------------------------------------------
// Player spritesheet frames — individual PNGs loaded as separate textures.
// Phaser animations reference these keys.
// ---------------------------------------------------------------------------
export const PLAYER_ASSETS = {
  idleDown:  ['player-idle-down-0', 'player-idle-down-1', 'player-idle-down-2', 'player-idle-down-3'],
  idleUp:    ['player-idle-up-0',   'player-idle-up-1',   'player-idle-up-2',   'player-idle-up-3'],
  idleSide:  ['player-idle-side-0', 'player-idle-side-1', 'player-idle-side-2', 'player-idle-side-3'],
  walkDown:  ['player-walk-down-0', 'player-walk-down-1'],
  walkUp:    ['player-walk-up-0',   'player-walk-up-1'],
  walkSide:  ['player-walk-side-0', 'player-walk-side-1'],
} as const;

export const PLAYER_PATHS: Record<string, string> = {
  'player-idle-down-0': 'assets/sprites/player/idle-down-0.png',
  'player-idle-down-1': 'assets/sprites/player/idle-down-0.png', // repeat until more frames
  'player-idle-down-2': 'assets/sprites/player/idle-down-0.png',
  'player-idle-down-3': 'assets/sprites/player/idle-down-0.png',
  'player-idle-up-0':   'assets/sprites/player/idle-up-0.png',
  'player-idle-up-1':   'assets/sprites/player/idle-up-0.png',
  'player-idle-up-2':   'assets/sprites/player/idle-up-0.png',
  'player-idle-up-3':   'assets/sprites/player/idle-up-0.png',
  'player-idle-side-0': 'assets/sprites/player/idle-side-0.png',
  'player-idle-side-1': 'assets/sprites/player/idle-side-0.png',
  'player-idle-side-2': 'assets/sprites/player/idle-side-0.png',
  'player-idle-side-3': 'assets/sprites/player/idle-side-0.png',
  'player-walk-down-0': 'assets/sprites/player/walk-down-0.png',
  'player-walk-down-1': 'assets/sprites/player/walk-down-1.png',
  'player-walk-up-0':   'assets/sprites/player/walk-up-0.png',
  'player-walk-up-1':   'assets/sprites/player/walk-up-1.png',
  'player-walk-side-0': 'assets/sprites/player/walk-side-0.png',
  'player-walk-side-1': 'assets/sprites/player/walk-side-1.png',
};

// ---------------------------------------------------------------------------
// NPC assets
// ---------------------------------------------------------------------------
export const NPC_PATHS: Record<string, string> = {
  'elias-idle-0': 'assets/sprites/npc/elias-idle-0.png',
  'elias-idle-1': 'assets/sprites/npc/elias-idle-0.png',
  'elias-idle-2': 'assets/sprites/npc/elias-idle-0.png',
  'elias-idle-3': 'assets/sprites/npc/elias-idle-0.png',
};

// ---------------------------------------------------------------------------
// Environment assets
// ---------------------------------------------------------------------------
export const ENV_PATHS: Record<string, string> = {
  'env-grass':   'assets/environment/grass-tile.png',
  'env-path':    'assets/environment/path-tile.png',
  'env-cottage': 'assets/environment/cottage.png',
  'env-tree':    'assets/environment/tree-oak.png',
  'env-pond':    'assets/environment/pond.png',
};

// ---------------------------------------------------------------------------
// UI assets
// ---------------------------------------------------------------------------
export const UI_PATHS: Record<string, string> = {
  // Currently handled by HTML/CSS; PNG keys added here as they are created.
};

/** Flat map of every asset key → path, for use in preload(). */
export const ALL_ASSET_PATHS: Record<string, string> = {
  ...PLAYER_PATHS,
  ...NPC_PATHS,
  ...ENV_PATHS,
  ...UI_PATHS,
};

/** Sprite display size in world pixels (independent of PNG canvas size). */
export const SPRITE_DISPLAY = {
  player:  { w: 72, h: 96 },   // tuned for 1600×1100 world at 960×540 viewport
  npc:     { w: 72, h: 96 },
  cottage: { w: 280, h: 245 },
  tree:    { w: 112, h: 168 },
  pond:    { w: 480, h: 360 },
} as const;
