

class Preload {
  preload(game) {

    //Create event listener for onLoadComplete
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);

    //Load Images/Spritesheets here
    this.load.image('starfield', '../assets/images/starfield.jpg');
    this.game.state.start('main', true, false);
  }


  onLoadComplete() {
    this.game.state.start('game', true, false);
  }

}

export default Preload;
