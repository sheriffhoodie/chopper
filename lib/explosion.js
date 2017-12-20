import ImageableSingleton from './imageable';
import {pause, ctx} from './game';
import Chopper from './chopper';

class Explosion {
  constructor() {
    let images = new ImageableSingleton();
    this.explosion = images.explosionImg;
    this.spriteIndex = 0;
    this.frameWidth = 64;
    this.frameHeight = 64;
    this.expFramesPerRow = Math.floor(this.explosion.width / this.frameWidth);
    this.rows = 4;
    this.cols = 4;
  }

  render() {
    if (this.spriteIndex > 15) {
     return;
    }
    setTimeout(function () {
      var x = this.spriteIndex % (this.cols - 1) * this.frameWidth;
      var y = parseInt(this.spriteIndex / (this.rows - 1)) * this.frameHeight;
      ctx.drawImage(this.explosion, x, y, this.frameWidth, this.frameHeight,
        Chopper.XPos, Chopper.YPos - Chopper.height, 300, 300);
      this.spriteIndex++;
    }, 30
    );
  }
}

export default Explosion;
