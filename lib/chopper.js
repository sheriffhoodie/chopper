import * as Util from './util';
import ImageableSingleton from './imageable';

class Chopper {
  constructor() {
    let images = new ImageableSingleton ();
    this.chopper = images.chopperImg;
    this.width = 208;
    this.height = 62;
    this.XPos = 75;
    this.YPos = 100;
    this.chopFrameWidth = 423;
    this.chopFrameHeight = 150;
    this.chopFrameSpeed = 3;
    this.currentFrame = 0;
    this.chopEndFrame = 3;
    this.chopFramesPerRow = 1;
    this.spriteIndex = 0;
    this.crash = false;
    this.flying = false;
    this.startFlyRate = 4;
    this.startDescRate = 5;
    this.lift = 0.8;
    this.gravity = 1.2;
    this.termVel = 10;
    this.chopperFlight();
  }

  update () {
    this.currentFrame = (this.currentFrame + 1) % this.chopEndFrame;
    }

  render(ctx) {
    if (this.spriteIndex > 3) {
      this.spriteIndex = 0;
    }
    this.update();
    let row = Math.floor(this.currentFrame / this.chopFramesPerRow);
    let col = Math.floor(this.currentFrame % this.chopFramesPerRow);
    ctx.drawImage(
      this.chopper,
      col * this.chopFrameWidth, row * this.chopFrameHeight,
      this.chopFrameWidth, this.chopFrameHeight, this.XPos, this.YPos,
      this.width, this.height);
    this.spriteIndex++;
    this.fly();
  }

  //simplify equation with vertical velocity that decreases proportionately
  //and then increases upward velocity with accelaration, curving the flying
  fly () {
    if(this.flying && this.crash === false) {
      this.flyRate = this.startFlyRate;
      this.YPos = this.YPos - this.flyRate;

      if(this.flyRate < this.termVel) {
          this.flyRate += this.lift;
      }
    } else if (!this.flying && this.crash === false) {
      this.descRate = this.startDescRate;
      this.YPos = this.YPos + this.descRate;

      if(this.descRate < this.termVel) {
        this.descRate += this.gravity;
      }
    }
  }

  chopperFlight () {
    document.addEventListener('keydown', (event) => {
      if (event.keyCode === 70) {
        this.flying = true;
      }
    });

    document.addEventListener('keyup', (event) => {
      if (event.keyCode === 70) {
        this.flying = false;
      }
    });
  }

}

export default Chopper;
