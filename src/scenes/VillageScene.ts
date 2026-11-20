import Phaser from 'phaser';
import { WorldClock } from '../game/WorldClock';

type Controls = { up: Phaser.Input.Keyboard.Key; down: Phaser.Input.Keyboard.Key; left: Phaser.Input.Keyboard.Key; right: Phaser.Input.Keyboard.Key; interact: Phaser.Input.Keyboard.Key };

/** Placeholder scene: validates camera, movement, collisions and E interactions only. */
export class VillageScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Arc;
  private controls!: Controls;
  private blockers!: Phaser.Physics.Arcade.StaticGroup;
  private hint!: Phaser.GameObjects.Text;
  private clockText!: Phaser.GameObjects.Text;
  private readonly clock = new WorldClock();
  private readonly speed = 185;
  private readonly merchant = { x: 640, y: 400 };

  constructor() { super('Village'); }

  create(): void {
    const worldWidth = 1600;
    const worldHeight = 1100;
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
    this.physics.world.setBounds(0, 0, worldWidth, worldHeight);

    // Background is temporary, drawn by code. All final artwork stays separate from logic.
    const ground = this.add.graphics();
    ground.fillStyle(0x93bc91, 1).fillRect(0, 0, worldWidth, worldHeight);
    ground.fillStyle(0xdcca9e, 1).fillRoundedRect(320, 0, 165, worldHeight, 35);
    ground.fillRoundedRect(0, 415, worldWidth, 135, 32);
    ground.fillStyle(0x6ba7ab, 1).fillEllipse(1170, 790, 620, 420);
    ground.lineStyle(14, 0xc9deab, 1).strokeEllipse(1170, 790, 620, 420);

    this.blockers = this.physics.add.staticGroup();
    this.addBuilding(155, 175, 210, 175, 'Guild', 0x796b8b);
    this.addBuilding(690, 175, 210, 175, 'Quán trọ', 0x9c785c);
    this.addBuilding(985, 150, 170, 185, 'Xưởng', 0x8c806b);
    this.addBuilding(150, 700, 240, 150, 'Nhà nhỏ', 0x738b77);
    this.addDecoration(1110, 470, 'Hồ câu cá');

    const npc = this.add.circle(this.merchant.x, this.merchant.y, 19, 0x7c4665);
    npc.setStrokeStyle(3, 0xf6e7c8);
    this.add.text(this.merchant.x, this.merchant.y - 38, 'Elias · Thương nhân', {
      fontFamily: 'sans-serif', fontSize: '17px', color: '#24353a', backgroundColor: '#e9e1c1', padding: { x: 7, y: 3 },
    }).setOrigin(0.5);

    this.player = this.add.circle(425, 595, 16, 0xfcf4d3);
    this.player.setStrokeStyle(4, 0x375363);
    this.physics.add.existing(this.player);
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    body.setCircle(16);
    body.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.blockers);

    if (!this.input.keyboard) throw new Error('Keyboard unavailable');
    this.controls = this.input.keyboard.addKeys({ up: 'W', down: 'S', left: 'A', right: 'D', interact: 'E' }) as Controls;
    this.cameras.main.startFollow(this.player, true, 0.12, 0.12);

    this.hint = this.add.text(18, 490, 'Đi dạo bằng WASD · Gặp Elias để trò chuyện', {
      fontFamily: 'sans-serif', fontSize: '17px', color: '#eaf6ef', backgroundColor: '#263d49', padding: { x: 13, y: 8 },
    }).setScrollFactor(0).setDepth(1000);
    this.clockText = this.add.text(940, 16, '', {
      fontFamily: 'sans-serif', fontSize: '18px', color: '#edf4e7', backgroundColor: '#263d49', padding: { x: 12, y: 8 },
    }).setScrollFactor(0).setDepth(1000).setOrigin(1, 0);
  }

  update(_time: number, delta: number): void {
    this.clock.tick(delta);
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    let vx = Number(this.controls.right.isDown) - Number(this.controls.left.isDown);
    let vy = Number(this.controls.down.isDown) - Number(this.controls.up.isDown);
    const magnitude = Math.hypot(vx, vy) || 1;
    vx = vx / magnitude * this.speed;
    vy = vy / magnitude * this.speed;
    body.setVelocity(vx, vy);
    const near = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.merchant.x, this.merchant.y) < 78;
    if (near && Phaser.Input.Keyboard.JustDown(this.controls.interact)) {
      this.hint.setText('Elias: Chào mừng đến thị trấn! (NPC hiện chỉ là bản thử.)');
    } else if (!near) {
      this.hint.setText('Đi dạo bằng WASD · Gặp Elias và nhấn E để trò chuyện');
    }
    this.clockText.setText(this.clock.label);
  }

  private addBuilding(x: number, y: number, w: number, h: number, title: string, color: number): void {
    this.add.rectangle(x + 5, y + 12, w, h, 0x536958, 0.28);
    this.add.rectangle(x, y, w, h, color).setStrokeStyle(5, 0xf5ead1);
    this.add.rectangle(x, y + h / 2 - 18, 40, 34, 0x4b443a);
    this.add.text(x, y - 12, title, { fontFamily: 'sans-serif', fontSize: '23px', fontStyle: 'bold', color: '#fff7db' }).setOrigin(0.5);
    // Buildings have physics bodies; do not infer collision from illustrations.
    const blocker = this.add.rectangle(x, y, w + 6, h + 6, 0xffffff, 0);
    this.physics.add.existing(blocker, true);
    this.blockers.add(blocker);
  }

  private addDecoration(x: number, y: number, label: string): void {
    this.add.text(x, y, label, { fontFamily: 'sans-serif', fontSize: '21px', color: '#fef9e8', backgroundColor: '#2c6371', padding: { x: 8, y: 5 } }).setOrigin(0.5);
  }
}
