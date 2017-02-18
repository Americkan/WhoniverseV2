import Player from '../classes/Player.js';


class Game {
  preload(game) {
    this.game.load.image('starfield', 'images/starfield.jpg')
    this.load.image('tardis', 'images/tardis.gif');
    $.ajax({
      url: '/api/planets/list'
    }).done(function(res) {
      this.planets = res;
    }).fail(function(err) {
      console.log('ERROR');
    });
  }

  create(game) {
    //Global vars
    //Background Settings
    console.log(this.planets);
    game.stage.backgroundColor = '#FFF';
    game.world.setBounds(0, 0, 5000, 5000);
    game.add.tileSprite(0, 0, game.world.width, game.world.height, 'starfield');

    game.physics.startSystem(Phaser.Physics.ARCADE);


    this.player = new Player(game);
    game.physics.arcade.enable(this.player);

  }

  update(game) {
    this.player.update(game);
    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.text('fps: '+ game.time.fps || '--', 32, 140);
  }
}


export default Game;
