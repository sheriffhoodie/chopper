import * as Util from './util';

class Chopper {
  constructor() {
    this.width = 208;
    this.height = 62;
    this.XPos = 75;
    this.YPos = 100;
    this.crash = false;
    this.flying = false;
    this.startFlyRate = 4;
    this.startDescRate = 5;
    this.lift = 0.8;
    this.gravity = 1.2;
    this.termVel = 10;
  }

  function chopperSprite () {
    let chopFrameWidth = 423;
    let chopFrameHeight = 150;
    let chopFrameSpeed = 3;
    let chopEndFrame = 3;

    // let path = "https://s3.us-east-2.amazonaws.com/chopper-dev/images/helicopter-spritesheet.png";
    let counter = 0;
    let chopFramesPerRow;
    chopFramesPerRow = Math.floor(chopperImg.width / chopFrameWidth);

    this.update = function () {
      // if (counter === (frameSpeed - 1))
      currentFrame = (currentFrame + 1) % chopEndFrame;
        // counter = (counter +  1) % frameSpeed;
    };

    this.draw = function (x, y) {
      // console.log("chopperImg:");
      // console.log(chopperImg.complete);
      let row = Math.floor(currentFrame / chopFramesPerRow);
      let col = Math.floor(currentFrame % chopFramesPerRow);
      ctx.drawImage(
        chopperImg,
        col * chopFrameWidth, row * chopFrameHeight,
        chopFrameWidth, chopFrameHeight, x, y,
        208, 62);
    };
    let self = this;
  }

  function drawChopper () {
    let chopperImage = new chopperSprite();
    if (gameState === "play") {
      chopperImage.update();
      chopperImage.draw(chopperXPos, chopperYPos);
      // ctx.drawImage(chopper, chopperXPos, chopperYPos, chopperWidth, chopperHeight);
    }
  }

  //simplify equation with vertical velocity that decreases proportionately
  //and then increases upward velocity with accelaration, curving the flying
  fly () {
    if(this.flying && this.crash === false) {
      this.flyRate = this.startFlyRate;
      this.chopperYPos = this.chopperYPos - this.flyRate;

      if(this.flyRate < this.termVel) {
          this.flyRate += this.lift;
      }
    } else if (!this.flying && this.crash === false) {
      this.descRate = this.startDescRate;
      this.chopperYPos = this.chopperYPos + this.descRate;

      if(this.descRate < this.termVel) {
        this.descRate += this.gravity;
      }
    }
  }

}

export default Chopper;
