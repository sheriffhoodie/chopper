import ImageableSingleton from './imageable';
import {canvasHeight, canvasWidth} from './game';

class spaceBackground {
  constructor() {
    let images = new ImageableSingleton ();
    this.spaceBkgd = images.spaceBackground;
    this.height = 500;
    this.width = 1170;
    this.spaceBgVelocity = 10;
    this.spaceScrollX = 0;
    this.solarBgHeight = 220;
    this.solarBgWidth = 1112;
    this.solarBgVelocity = 12;
    this.solarScrollX = 0;
  }

  render (ctx) {
    if (this.spaceScrollX >= this.width) {
      this.spaceScrollX = 0;
    }
    this.spaceScrollX += this.spaceBgVelocity;

    ctx.drawImage(this.spaceBkgd, -this.spaceScrollX, 0,
       this.width, this.height);
    ctx.drawImage(this.spaceBkgd, this.width - this.spaceScrollX, 0,
       this.width, this.height);
  }

  // drawSolarBackground () {
  //   solarBackground.src = "images/sunsurface2.png";
  //   if (solarScrollX >= canvas.width) {
  //     solarScrollX = 0;
  //   }
  //   solarScrollX += solarBgVelocity;
  //   this.ctx.drawImage(
  // solarBackground, -solarScrollX, 0, solarBgWidth, solarBgHeight);
  //   this.ctx.drawImage(solarBackground, canvas.width - solarScrollX,
  // canvas.height - solarBgHeight, solarBgWidth, solarBgHeight);
  // }
}

export default spaceBackground;
