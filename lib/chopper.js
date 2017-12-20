import * as Util from './util';

class Chopper {
  constructor() {
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
    this.chopFramesPerRow = Math.floor(chopperImg.width / chopFrameWidth);
    chopperFlight()
  }

  update () {
    // if (counter === (frameSpeed - 1))
    currentFrame = (currentFrame + 1) % chopEndFrame;
      // counter = (counter +  1) % frameSpeed;
    };

  draw (ctx, x, y) {
    let row = Math.floor(currentFrame / chopFramesPerRow);
    let col = Math.floor(currentFrame % chopFramesPerRow);
    ctx.drawImage(
      chopperImg,
      col * chopFrameWidth, row * chopFrameHeight,
      chopFrameWidth, chopFrameHeight, x, y,
      208, 62);
    };


  render () {
    let chopperImage = new chopperSprite();
    if (gameState === "play") {
      chopperImage.update();
      chopperImage.draw(chopperXPos, chopperYPos);
    }
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
