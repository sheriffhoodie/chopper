let instance = null;

class ImageableSingleton {
  constructor () {
    if (!instance) {
      instance = this;

      // space background
      this.spaceBackground = new Image ();
      this.spaceBackground.src = './assets/images/space-bkgd.jpg';

      // solar background
      this.solarBackground = new Image ();
      this.solarBackground.src = './assets/images/sunsurface2.png';

      // chopper
      this.chopperImg = new Image ();
      // this.chopperImg.src = './assets/images/helicopter-spritesheet.png';

      // rock
      this.rockImg = new Image ();
      this.rockImg.src = './assets/images/asteroid2.png';

      // explosion
      this.explosionImg = new Image ();
      this.explosionImg.src = './assets/images/explosion-sprite2.png';
    }

    return instance;
  }
}

export default ImageableSingleton;
