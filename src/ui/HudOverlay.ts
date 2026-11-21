import Phaser from 'phaser';
import { FishingState } from '../game/FishingSystem';
import { InventoryItem } from '../game/Inventory';

/** Depth value for all HUD elements (always on top). */
const HUD_DEPTH = 10000;

/** Interaction prompt styles. */
const PROMPT_STYLE: Phaser.Types.GameObjects.Text.TextStyle = {
  fontFamily: 'serif',
  fontSize: '14px',
  color: '#f0d060',
  backgroundColor: '#2a1f14cc',
  padding: { x: 10, y: 6 },
};

/** Dialogue/status panel style. */
const PANEL_STYLE: Phaser.Types.GameObjects.Text.TextStyle = {
  fontFamily: 'serif',
  fontSize: '16px',
  color: '#f5ead5',
  backgroundColor: '#2a1f14ee',
  padding: { x: 16, y: 12 },
  wordWrap: { width: 420, useAdvancedWrap: true },
};

/** Clock label style. */
const CLOCK_STYLE: Phaser.Types.GameObjects.Text.TextStyle = {
  fontFamily: 'sans-serif',
  fontSize: '14px',
  color: '#edf4e7',
  backgroundColor: '#1a2d1acc',
  padding: { x: 10, y: 6 },
};

/**
 * HudOverlay — manages all screen-fixed UI elements.
 * All text objects have scrollFactor 0 and sit at HUD_DEPTH.
 */
export class HudOverlay {
  private readonly promptText: Phaser.GameObjects.Text;
  private readonly panelText: Phaser.GameObjects.Text;
  private readonly clockText: Phaser.GameObjects.Text;
  private readonly inventoryText: Phaser.GameObjects.Text;
  private readonly fishingText: Phaser.GameObjects.Text;

  constructor(private readonly scene: Phaser.Scene) {
    const { width, height } = scene.scale;

    // Interaction prompt — appears above nearby interactables.
    this.promptText = scene.add.text(width / 2, height - 80, '', PROMPT_STYLE)
      .setOrigin(0.5, 1)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH)
      .setVisible(false);

    // Dialogue / status panel — lower centre.
    this.panelText = scene.add.text(width / 2, height - 20, '', PANEL_STYLE)
      .setOrigin(0.5, 1)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH)
      .setVisible(false);

    // World clock — top right.
    this.clockText = scene.add.text(width - 12, 12, '', CLOCK_STYLE)
      .setOrigin(1, 0)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH);

    // Inventory summary — top left.
    this.inventoryText = scene.add.text(12, 12, '', CLOCK_STYLE)
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH);

    // Fishing feedback — centre screen.
    this.fishingText = scene.add.text(width / 2, height / 2 - 40, '', {
      ...PANEL_STYLE,
      fontSize: '20px',
      color: '#f0d060',
    })
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setDepth(HUD_DEPTH)
      .setVisible(false);
  }

  // ---------------------------------------------------------------------------

  /** Show or hide the [E] interaction prompt. */
  setPrompt(text: string | null): void {
    if (text) {
      this.promptText.setText(`[E] ${text}`).setVisible(true);
    } else {
      this.promptText.setVisible(false);
    }
  }

  /** Show or hide the dialogue panel. Auto-hides after `durationMs` if provided. */
  showDialogue(text: string, durationMs?: number): void {
    this.panelText.setText(text).setVisible(true);
    if (durationMs) {
      this.scene.time.delayedCall(durationMs, () => this.panelText.setVisible(false));
    }
  }

  hideDialogue(): void {
    this.panelText.setVisible(false);
  }

  /** Update the world clock label. */
  setClock(label: string): void {
    this.clockText.setText(label);
  }

  /** Update the inventory summary in the top-left corner. */
  setInventory(items: InventoryItem[]): void {
    if (items.length === 0) {
      this.inventoryText.setText('🎒 Túi đồ: trống');
    } else {
      const lines = items.map(i => `${i.displayName} ×${i.count}`).join('  ·  ');
      this.inventoryText.setText(`🎒 ${lines}`);
    }
  }

  /** Reflect fishing minigame state in UI. */
  setFishingState(state: FishingState): void {
    switch (state) {
      case 'idle':
        this.fishingText.setVisible(false);
        break;
      case 'casting':
        this.fishingText.setText('🎣 Đang thả câu… chờ cá cắn').setVisible(true);
        break;
      case 'biting':
        this.fishingText.setText('⚡ CÁ CẮN! Nhấn E ngay!').setColor('#ff4444').setVisible(true);
        break;
      case 'success':
        this.fishingText.setText('✅ Bắt được cá!').setColor('#78c878').setVisible(true);
        break;
      case 'fail':
        this.fishingText.setText('💨 Cá bỏ chạy mất rồi…').setColor('#c89060').setVisible(true);
        break;
    }
  }
}
