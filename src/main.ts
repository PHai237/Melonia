import Phaser from 'phaser';
import { PreloadScene } from './scenes/PreloadScene';
import { VillageScene } from './scenes/VillageScene';
import './styles.css';

new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game',
  width: 960,
  height: 540,
  backgroundColor: '#7ab870',
  pixelArt: false,
  antialias: true,
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
  physics: { default: 'arcade', arcade: { debug: false } },
  scene: [PreloadScene, VillageScene],
});
