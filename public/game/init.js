import 'pixi';
import 'p2';
import Phaser from 'phaser';
import config from './config/config.js';

import Boot from './states/Boot.js';
import Preload from './states/Boot.js';
import Main from './states/Main.js';

class Game extends Phaser.Game {
  constructor() {
    super({
      width: config.gameWidth,
      height: config.gameHeight,
      transparent: false,
      enableDebug: true
    });
    this.state.add('boot', Boot);
    this.state.add('preload', Preload);
    this.state.add('main', Main);
    this.state.start('main');
  }
}


window.Game = new Game();
