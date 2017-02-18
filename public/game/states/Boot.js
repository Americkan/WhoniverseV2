

class Boot {
  preload() {

  }

  create() {
    this.game.stage.backgroundColor = '#000';
    this.game.state.start('preload');
  }

}

export default Boot;
