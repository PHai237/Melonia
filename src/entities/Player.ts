import Phaser from 'phaser';
import { PLAYER_ASSETS, SPRITE_DISPLAY } from '../assets/AssetManifest';

export type FacingDir = 'down' | 'up' | 'left' | 'right';

/** Encapsulates player sprite, physics body, animations and input handling. */
export class Player {
  readonly sprite: Phaser.Physics.Arcade.Sprite;
  private facing: FacingDir = 'down';
  private readonly speed = 185;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
  ) {
    // Use first available idle frame as initial texture.
    const initKey = PLAYER_ASSETS.idleDown[0];
    this.sprite = scene.physics.add.sprite(x, y, initKey);

    // Scale sprite from PNG canvas (96×128) to desired display size.
    const { w, h } = SPRITE_DISPLAY.player;
    this.sprite.setDisplaySize(w, h);

    // Collision footprint: narrow rect at the feet, not the full PNG.
    // body.setSize works on the original texture size; setOffset moves the hitbox.
    const body = this.sprite.body as Phaser.Physics.Arcade.Body;
    const texW = this.sprite.width;
    const texH = this.sprite.height;
    const footW = Math.round(texW * 0.35);
    const footH = Math.round(texH * 0.12);
    body.setSize(footW, footH);
    body.setOffset(
      Math.round((texW - footW) / 2),
      texH - footH,
    );
    body.setCollideWorldBounds(true);

    this.defineAnimations(scene);
  }

  get x(): number { return this.sprite.x; }
  get y(): number { return this.sprite.y; }
  get facingDir(): FacingDir { return this.facing; }

  /**
   * Call every frame from VillageScene.update().
   * Returns whether the player moved this frame.
   */
  update(
    up: Phaser.Input.Keyboard.Key,
    down: Phaser.Input.Keyboard.Key,
    left: Phaser.Input.Keyboard.Key,
    right: Phaser.Input.Keyboard.Key,
  ): boolean {
    let vx = Number(right.isDown) - Number(left.isDown);
    let vy = Number(down.isDown) - Number(up.isDown);
    const moving = vx !== 0 || vy !== 0;

    if (moving) {
      const mag = Math.hypot(vx, vy);
      vx = (vx / mag) * this.speed;
      vy = (vy / mag) * this.speed;

      // Determine facing direction (horizontal takes priority for mirroring).
      if (left.isDown) this.facing = 'left';
      else if (right.isDown) this.facing = 'right';
      else if (up.isDown) this.facing = 'up';
      else this.facing = 'down';
    }

    (this.sprite.body as Phaser.Physics.Arcade.Body).setVelocity(vx, vy);
    this.playAnimation(moving);

    // Depth sorting: use foot Y so sprites behind objects appear behind.
    this.sprite.setDepth(100 + this.sprite.y);

    // Mirror sprite for left-facing (reuse side animation).
    this.sprite.setFlipX(this.facing === 'left');

    return moving;
  }

  // -------------------------------------------------------------------------
  private playAnimation(moving: boolean): void {
    const key = moving
      ? `walk-${this.facing === 'left' ? 'side' : this.facing}`
      : `idle-${this.facing === 'left' ? 'side' : this.facing}`;
    this.sprite.anims.play(key, true);
  }

  private defineAnimations(scene: Phaser.Scene): void {
    const a = scene.anims;
    if (a.exists('idle-down')) return; // already defined (scene restart guard)

    const makeFrames = (keys: readonly string[]) =>
      keys.map(key => ({ key }));

    // Idle animations
    a.create({ key: 'idle-down', frames: makeFrames(PLAYER_ASSETS.idleDown), frameRate: 6, repeat: -1 });
    a.create({ key: 'idle-up', frames: makeFrames(PLAYER_ASSETS.idleUp), frameRate: 6, repeat: -1 });
    a.create({ key: 'idle-side', frames: makeFrames(PLAYER_ASSETS.idleSide), frameRate: 6, repeat: -1 });

    // Walk animations
    a.create({ key: 'walk-down', frames: makeFrames(PLAYER_ASSETS.walkDown), frameRate: 10, repeat: -1 });
    a.create({ key: 'walk-up', frames: makeFrames(PLAYER_ASSETS.walkUp), frameRate: 10, repeat: -1 });
    a.create({ key: 'walk-side', frames: makeFrames(PLAYER_ASSETS.walkSide), frameRate: 10, repeat: -1 });
  }
}
