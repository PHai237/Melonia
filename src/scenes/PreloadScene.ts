import Phaser from 'phaser';
import { ALL_ASSET_PATHS } from '../assets/AssetManifest';

/**
 * PreloadScene — loads all game assets and shows a simple loading bar.
 * Transitions to 'Village' scene when complete.
 */
export class PreloadScene extends Phaser.Scene {
  constructor() { super('Preload'); }

  preload(): void {
    this.createLoadingUI();

    // Load every asset registered in AssetManifest.
    // Paths pointing to missing files will produce a Phaser warning but
    // will NOT crash — missing textures render as the magenta error tile.
    for (const [key, path] of Object.entries(ALL_ASSET_PATHS)) {
      this.load.image(key, path);
    }

    this.load.on('progress', (v: number) => this.updateBar(v));
  }

  create(): void {
    this.scene.start('Village');
  }

  // -------------------------------------------------------------------------
  private bar!: Phaser.GameObjects.Graphics;

  private createLoadingUI(): void {
    const { width, height } = this.scale;
    const cx = width / 2;
    const cy = height / 2;

    this.add.text(cx, cy - 60, 'Melonia', {
      fontFamily: 'serif', fontSize: '36px', color: '#f5ead5',
    }).setOrigin(0.5);

    this.add.text(cx, cy - 20, 'Đang tải thế giới...', {
      fontFamily: 'sans-serif', fontSize: '15px', color: '#c8b89a',
    }).setOrigin(0.5);

    // Track background
    this.add.rectangle(cx, cy + 20, 320, 14, 0x2a1f14).setOrigin(0.5);
    this.bar = this.add.graphics();
  }

  private updateBar(v: number): void {
    const { width, height } = this.scale;
    const cx = width / 2;
    const cy = height / 2;
    this.bar.clear();
    this.bar.fillStyle(0xc8a86a);
    this.bar.fillRect(cx - 158, cy + 13, 316 * v, 8);
  }
}
