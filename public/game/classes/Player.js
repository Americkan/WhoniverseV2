class Player {
  constructor(game) {
    this.game = game;
    this.x = this.game.world.centerX;
    this.y = this.game.world.centerY;
    this.getSprite('tardis');
  }

  getSprite(spriteName) {
    this.sprite = this.game.add.sprite(this.x, this.y, 'tardis');
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.game.camera.follow(this.sprite);
  }

  update(game) {
    game.physics.arcade.moveToPointer(this.sprite, 400);
  }
}


export default Player;
