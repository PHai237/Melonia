import Phaser from 'phaser';
import { SPRITE_DISPLAY } from '../assets/AssetManifest';

/** Dialogue line for an NPC. */
export interface DialogueLine {
  text: string;
}

/**
 * Npc — a simple static NPC with idle animation and a dialogue sequence.
 * Walk animation and schedules are out of scope for v0.0.2.
 */
export class Npc {
  readonly sprite: Phaser.Physics.Arcade.Sprite;
  private dialogueIndex = 0;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    private readonly idleKey: string,
    private readonly name: string,
    private readonly dialogue: readonly DialogueLine[],
  ) {
    this.sprite = scene.physics.add.sprite(x, y, idleKey);
    const { w, h } = SPRITE_DISPLAY.npc;
    this.sprite.setDisplaySize(w, h);
    this.sprite.setImmovable(true);

    // Footprint collision body.
    const body = this.sprite.body as Phaser.Physics.Arcade.Body;
    const texW = this.sprite.width;
    const texH = this.sprite.height;
    const footW = Math.round(texW * 0.35);
    const footH = Math.round(texH * 0.12);
    body.setSize(footW, footH);
    body.setOffset(Math.round((texW - footW) / 2), texH - footH);
    body.setAllowGravity(false);

    this.defineAnimations(scene);
    this.sprite.anims.play(`${idleKey}-anim`, true);
    this.sprite.setDepth(100 + y);
  }

  get displayName(): string { return this.name; }

  /** Returns the next dialogue line (cycles through the list). */
  nextDialogue(): string {
    const line = this.dialogue[this.dialogueIndex % this.dialogue.length];
    this.dialogueIndex++;
    return line.text;
  }

  /** Update depth sorting if NPC ever moves (future-proof). */
  update(): void {
    this.sprite.setDepth(100 + this.sprite.y);
  }

  // -------------------------------------------------------------------------
  private defineAnimations(scene: Phaser.Scene): void {
    const key = `${this.idleKey}-anim`;
    if (scene.anims.exists(key)) return;

    // Build 4 frames from single image (subtle repeat for now).
    scene.anims.create({
      key,
      frames: [
        { key: this.idleKey },
        { key: this.idleKey },
        { key: this.idleKey },
        { key: this.idleKey },
      ],
      frameRate: 4,
      repeat: -1,
    });
  }
}
