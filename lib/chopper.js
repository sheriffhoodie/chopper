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
    this.chopEndFrame = 3;
    this.crash = false;
    this.flying = false;
    this.startFlyRate = 4;
    this.startDescRate = 5;
    this.lift = 0.8;
    this.gravity = 1.2;
    this.termVel = 10;
    this.counter = 0;
    this.rows = 4;
    this.cols = 1;
    this.spriteIndex = 0;
    this.chopFramesPerRow = Math.floor(this.width / this.chopFrameWidth);
    this.sprites = [];
    for (let i = 0; i <= 3; i++) {
      this.sprites.push([this.chopper, i * 32, 0, 32, 48]);
    }
    for (let i = 3; i >= 0; i--) {
      this.sprites.push([this.chopper, i * 32, 0, 32, 48]);
    }
    this.chopperFlight();
  }

  // update () {
  //   // if (counter === (frameSpeed - 1))
  //   this.currentFrame = (this.currentFrame + 1) % this.chopEndFrame;
  //     // counter = (counter +  1) % frameSpeed;
  //   }


  render(ctx) {
    // this.chopper.onload = function() {
    //   ctx.drawImage(...this.getSprite(), this.posX, this.posY, this.width, this.height);
    // };
    let that = this;
    this.chopper.addEventListener('load', function() {
  // execute drawImage statements here
      ctx.drawImage(...that.getSprite(), that.posX, that.posY, that.width, that.height);
    }, false);
    this.chopper.src = './assets/images/helicopter-spritesheet.png';
    // if (this.spriteIndex > 3) {
    //   this.spriteIndex = 0;
    // }
    // var x = this.spriteIndex % (this.cols - 1) * this.chopFrameWidth;
    // var y = parseInt(this.spriteIndex / (this.rows - 1)) * this.chopFrameHeight;
    // // let row = Math.floor(this.currentFrame / this.chopFramesPerRow);
    // // let col = Math.floor(this.currentFrame % this.chopFramesPerRow);
    // ctx.drawImage(
    //   this.chopper,
    //   x, y,
    //   this.chopFrameWidth, this.chopFrameHeight, this.XPos, this.YPos,
    //   this.width, this.height);
    // this.spriteIndex++;
    // ctx.drawImage(this.chopper, this.chopper.XPos,
    //   this.chopper.YPos, this.chopper.width, this.chopper.height);
    // this.update();
    this.fly();
    // ctx.drawImage(...this.getSprite(), this.posX, this.posY, this.width, this.height);

  }

  getSprite () {
    if (this.counter >= 80) {
      this.counter = 0;
    }
    let result = this.sprites[Math.floor(this.counter / 10)];
    this.counter++;
    return result;
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
