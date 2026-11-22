import Phaser from 'phaser';
import { WorldClock } from '../game/WorldClock';
import { FishingSystem } from '../game/FishingSystem';
import { Inventory } from '../game/Inventory';
import { Player } from '../entities/Player';
import { Npc } from '../entities/Npc';
import { HudOverlay } from '../ui/HudOverlay';
import { BUILDINGS, POND, SPAWN, ELIAS } from '../world/WorldLayout';
import { SPRITE_DISPLAY } from '../assets/AssetManifest';

// ---------------------------------------------------------------------------
// Depth sorting constants
// ---------------------------------------------------------------------------
const DEPTH = {
  GROUND:      0,
  GROUND_DECOR:10,
  OBJECTS:     20,   // static environment (buildings, trees) — their sprites
                     // also receive dynamic depth from y-position
  CHARACTERS:  100,  // base; actual depth = 100 + sprite.y / 10
  FOREGROUND:  500,  // building roofs that occlude player when walking behind
  HUD:         10000,
} as const;

// ---------------------------------------------------------------------------
// Elias dialogue lines
// ---------------------------------------------------------------------------
const ELIAS_DIALOGUE = [
  { text: 'Elias: Chào buổi sáng! Làng Melonia chào đón bạn.' },
  { text: 'Elias: Hồ câu cá ở phía đông. Hôm nay cá cắn nhiều lắm đấy.' },
  { text: 'Elias: Tôi đang chờ chuyến hàng từ thung lũng. Quay lại sau nhé.' },
  { text: 'Elias: Nếu cần gì cứ hỏi tôi. Tôi luôn ở đây từ sáng sớm đến xế chiều.' },
];

/** Main village scene — orchestrates all systems for the first playable demo. */
export class VillageScene extends Phaser.Scene {
  // --- Systems ---
  private readonly worldClock = new WorldClock();
  private readonly fishing = new FishingSystem();
  private readonly inventory = new Inventory();

  // --- Entities ---
  private player!: Player;
  private elias!: Npc;

  // --- Physics ---
  private blockers!: Phaser.Physics.Arcade.StaticGroup;

  // --- HUD ---
  private hud!: HudOverlay;

  // --- Input ---
  private keys!: {
    up: Phaser.Input.Keyboard.Key;
    down: Phaser.Input.Keyboard.Key;
    left: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
    interact: Phaser.Input.Keyboard.Key;
  };

  // --- State ---
  private nearElias = false;
  private nearPond = false;

  constructor() { super('Village'); }

  // ---------------------------------------------------------------------------
  create(): void {
    const { worldWidth, worldHeight } = { worldWidth: 1600, worldHeight: 1100 };

    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
    this.physics.world.setBounds(0, 0, worldWidth, worldHeight);

    // 1. Environment layers
    this.buildGround(worldWidth, worldHeight);
    this.buildEnvironment();

    // 2. Physics blockers
    this.blockers = this.physics.add.staticGroup();
    this.buildColliders();

    // 3. Entities
    this.player = new Player(this, SPAWN.x, SPAWN.y);
    this.elias  = new Npc(this, ELIAS.x, ELIAS.y, 'elias-idle-0', 'Elias', ELIAS_DIALOGUE);

    // 4. Physics collisions
    this.physics.add.collider(this.player.sprite, this.blockers);
    this.physics.add.collider(this.elias.sprite,  this.blockers);
    this.physics.add.collider(this.player.sprite, this.elias.sprite);

    // 5. Camera
    this.cameras.main.startFollow(this.player.sprite, true, 0.10, 0.10);

    // 6. Input
    if (!this.input.keyboard) throw new Error('Keyboard unavailable');
    this.keys = this.input.keyboard.addKeys({
      up: 'W', down: 'S', left: 'A', right: 'D', interact: 'E',
    }) as typeof this.keys;

    // 7. HUD
    this.hud = new HudOverlay(this);
    this.hud.setInventory([]);

    // 8. Fishing state listener
    this.fishing.onStateChange((state, result) => {
      this.hud.setFishingState(state);
      if (state === 'success' && result?.caught) {
        this.inventory.add(result.itemKey);
        this.hud.setInventory(this.inventory.getAll());
      }
    });
  }

  // ---------------------------------------------------------------------------
  update(_time: number, delta: number): void {
    this.worldClock.tick(delta);
    this.hud.setClock(this.worldClock.label);

    // Player movement
    this.player.update(this.keys.up, this.keys.down, this.keys.left, this.keys.right);
    this.elias.update();

    // Proximity checks
    this.nearElias = Phaser.Math.Distance.Between(
      this.player.x, this.player.y, this.elias.sprite.x, this.elias.sprite.y,
    ) < 90;

    this.nearPond = Phaser.Math.Distance.Between(
      this.player.x, this.player.y, POND.interactX, POND.interactY,
    ) < 100;

    // Interaction prompt
    if (this.nearElias && !this.fishing.isActive) {
      this.hud.setPrompt('Trò chuyện với Elias');
    } else if (this.nearPond && !this.fishing.isActive) {
      this.hud.setPrompt('Câu cá');
    } else if (!this.fishing.isActive) {
      this.hud.setPrompt(null);
    }

    // E key interactions
    if (Phaser.Input.Keyboard.JustDown(this.keys.interact)) {
      this.handleInteract();
    }
  }

  // ---------------------------------------------------------------------------
  shutdown(): void {
    this.fishing.destroy();
  }

  // ---------------------------------------------------------------------------
  // Private helpers
  // ---------------------------------------------------------------------------

  private handleInteract(): void {
    // Fishing takes priority if active.
    if (this.fishing.isActive) {
      this.fishing.react();
      return;
    }

    if (this.nearElias) {
      const line = this.elias.nextDialogue();
      this.hud.showDialogue(line, 4000);
      return;
    }

    if (this.nearPond) {
      this.hud.setPrompt(null);
      this.fishing.startFishing();
      return;
    }
  }

  // ---------------------------------------------------------------------------
  private buildGround(worldWidth: number, worldHeight: number): void {
    // Tile grass texture across the entire world.
    const tileSize = 256; // asset grass-tile.png is 256×256
    for (let gx = 0; gx < worldWidth; gx += tileSize) {
      for (let gy = 0; gy < worldHeight; gy += tileSize) {
        this.add.image(gx, gy, 'env-grass')
          .setOrigin(0, 0)
          .setDisplaySize(tileSize, tileSize)
          .setDepth(DEPTH.GROUND);
      }
    }

    // Tile dirt path strips on top of grass.
    const pathTile = 128; // display each path tile at 128px
    // Vertical road (north-south).
    for (let py = 0; py < worldHeight; py += pathTile) {
      this.add.image(340, py, 'env-path')
        .setOrigin(0, 0)
        .setDisplaySize(pathTile, pathTile)
        .setDepth(DEPTH.GROUND_DECOR);
    }
    // Horizontal road (east-west).
    for (let px = 0; px < worldWidth; px += pathTile) {
      this.add.image(px, 430, 'env-path')
        .setOrigin(0, 0)
        .setDisplaySize(pathTile, pathTile)
        .setDepth(DEPTH.GROUND_DECOR);
    }
  }

  private buildEnvironment(): void {
    // Cottage — placed so its footprint base sits at y=275
    const cottageY = 275;
    this.add.image(155, cottageY, 'env-cottage')
      .setOrigin(0.5, 1)
      .setDisplaySize(SPRITE_DISPLAY.cottage.w, SPRITE_DISPLAY.cottage.h)
      .setDepth(DEPTH.OBJECTS + cottageY);

    // Trees scattered around the village
    const treePositions = [
      { x: 80,  y: 340 },
      { x: 530, y: 260 },
      { x: 850, y: 350 },
      { x: 1300, y: 540 },
    ];
    treePositions.forEach(({ x, y }) => {
      this.add.image(x, y, 'env-tree')
        .setOrigin(0.5, 1)
        .setDisplaySize(SPRITE_DISPLAY.tree.w, SPRITE_DISPLAY.tree.h)
        .setDepth(DEPTH.OBJECTS + y);
    });

    // Pond — base at pond bottom
    this.add.image(POND.x, POND.y + SPRITE_DISPLAY.pond.h / 2, 'env-pond')
      .setOrigin(0.5, 1)
      .setDisplaySize(SPRITE_DISPLAY.pond.w, SPRITE_DISPLAY.pond.h)
      .setDepth(DEPTH.GROUND_DECOR + 1); // ponds sit on the ground, below characters
  }

  private buildColliders(): void {
    // Only the Guild cottage is rendered in this slice (temporary title filter).
    BUILDINGS.filter(b => b.title === 'Guild').forEach(b => {
      const blocker = this.add.rectangle(b.x, b.y, b.w + 6, b.h + 6, 0xffffff, 0);
      this.physics.add.existing(blocker, true);
      this.blockers.add(blocker);
    });

    // Pond perimeter (no-entry zone over water)
    const pondBlocker = this.add.ellipse(POND.x, POND.y, POND.w - 60, POND.h - 60, 0xffffff, 0);
    this.physics.add.existing(pondBlocker, true);
    this.blockers.add(pondBlocker);

    // Tree trunks (small circles at base — match positions in buildEnvironment)
    [
      { x: 80,  y: 340 },
      { x: 530, y: 260 },
      { x: 850, y: 350 },
      { x: 1300, y: 540 },
    ].forEach(({ x, y }) => {
      const trunk = this.add.circle(x, y, 16, 0xffffff, 0);
      this.physics.add.existing(trunk, true);
      this.blockers.add(trunk);
    });
  }
}
