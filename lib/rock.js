import ImageableSingleton from './imageable';

class Rock {
  constructor(ctx) {
    let images = new ImageableSingleton();
    this.rock = images.rockImg;
    this.rockList = [];
    this.rockCount = 0;
    this.rockVelocity = 4;
    this.rockInterval = 140;
    this.drawRocks(ctx);
  }

  addRock(game) {
    let newRock = {};
    newRock.width = Math.floor(Math.random() * (140 - 80) + 80);
    newRock.height = Math.floor(Math.random() * (130 - 110) + 110);
    newRock.x = game.canvasWidth;
    newRock.y = Math.floor(Math.random() * game.canvasHeight - newRock.height);
    this.rockList.push(newRock);
  }

  drawRocks(ctx) {
    this.rockCount++;
    for (var i = 0; i < this.rockList.length; i++) {
      if (this.rockList[i].x < 0 - this.rockList[i].width) {
        this.rockList.splice(i, 1);
      } else {
        this.rockList[i].x -= this.rockVelocity;
        ctx.drawImage(this.rock, this.rockList[i].x, this.rockList[i].y,
          this.rockList[i].width, this.rockList[i].height);

        if (this.rockCount >= this.rockInterval) {
          this.addRock();
          this.rockCount = 0;
        }
      }
    }
  }

}

export default Rock;
