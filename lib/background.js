import ImageableSingleton from './imageable';
import {canvasHeight, canvasWidth} from './game';

class spaceBackground {
  constructor() {
    let images = new ImageableSingleton ();
    this.spaceBkgd = images.spaceBackground;
    this.height = 500;
    this.width = 2000;
    this.velocity = 10;
    this.XPos = 0;
    this.counter = 0;
  }

  render (ctx) {
    if (this.XPos >= this.width) {
      this.XPos = 0;
    }
    this.XPos += this.velocity;

    ctx.drawImage(this.spaceBkgd, -this.XPos, 0,
       this.width, this.height);
    ctx.drawImage(this.spaceBkgd, this.width - this.XPos, 0,
       this.width, this.height);
  }

}

export default spaceBackground;
