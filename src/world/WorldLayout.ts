/** World layout data — positions, sizes and colours extracted from scene.
 *  All values must match the physics collision bodies in VillageScene exactly.
 *  Do NOT modify coordinates here without also verifying collision behaviour. */

export interface BuildingDef {
  /** Centre-x of the building rectangle. */
  x: number;
  /** Centre-y of the building rectangle. */
  y: number;
  /** Width of the building rectangle. */
  w: number;
  /** Height of the building rectangle. */
  h: number;
  /** Display title shown above the building. */
  title: string;
  /** Fill colour (hex number) of the building body. */
  color: number;
}

export interface DecorationDef {
  /** Centre-x of the decoration label. */
  x: number;
  /** Centre-y of the decoration label. */
  y: number;
  /** Text label displayed at this position. */
  label: string;
}

export interface PondDef {
  /** Centre of the pond ellipse. */
  x: number;
  y: number;
  /** Ellipse radii. */
  w: number;
  h: number;
  /** Point where player stands to fish (edge of pond). */
  interactX: number;
  interactY: number;
}

export interface NpcDef {
  x: number;
  y: number;
}

/** Player start position. */
export const SPAWN = { x: 425, y: 595 } as const;

/** Elias merchant position. */
export const ELIAS: NpcDef = { x: 640, y: 400 };

/** Fishing pond. */
export const POND: PondDef = {
  x: 1150, y: 800,
  w: 580,  h: 380,
  interactX: 940,
  interactY: 760,
};

export const BUILDINGS: readonly BuildingDef[] = [
  { x: 155, y: 175, w: 210, h: 175, title: 'Guild',     color: 0x796b8b },
  { x: 690, y: 175, w: 210, h: 175, title: 'Quán trọ',  color: 0x9c785c },
  { x: 985, y: 150, w: 170, h: 185, title: 'Xưởng',     color: 0x8c806b },
  { x: 150, y: 700, w: 240, h: 150, title: 'Nhà nhỏ',   color: 0x738b77 },
] as const;

export const DECORATIONS: readonly DecorationDef[] = [
  { x: 1110, y: 470, label: 'Hồ câu cá' },
] as const;
