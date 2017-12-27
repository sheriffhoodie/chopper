import ImageableSingleton from './imageable';
import {pause} from './game';

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

  render(ctx, chopper) {
    if (this.spriteIndex > 15) {
     return;
    }
    var x = this.spriteIndex % (this.cols - 1) * this.frameWidth;
    var y = parseInt(this.spriteIndex / (this.rows - 1)) * this.frameHeight;
    ctx.drawImage(this.explosion, x, y, this.frameWidth, this.frameHeight,
      chopper.XPos, chopper.YPos - chopper.height, 300, 300);
    this.spriteIndex++;
  }
}

export default Explosion;
