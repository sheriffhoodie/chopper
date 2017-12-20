import ImageableSingleton from './imageable';

class Rock {
  constructor() {
    let images = new ImageableSingleton();
    this.rock = images.rockImg;
    this.rockList = [];
    this.rockCount = 0;
    this.rockVelocity = 4;
    this.rockInterval = 140;
  }

  addRock() {
    let newRock = {};
    newRock.width = Math.floor(Math.random() * (140 - 80) + 80);
    newRock.height = Math.floor(Math.random() * (130 - 110) + 110);
    newRock.x = canvas.width;
    newRock.y = Math.floor(Math.random() * canvas.height - newRock.height);
    rockList.push(newRock);
  }

  drawRocks () {
    rockCount++;
    for (var i = 0; i < rockList.length; i++) {
      if (rockList[i].x < 0 - rockList[i].width) {
        rockList.splice(i, 1);
      } else {
        rockList[i].x -= rockVelocity;
        ctx.drawImage(rock, rockList[i].x, rockList[i].y, rockList[i].width, rockList[i].height);

        if (rockCount >= rockInterval) {
          addRock();
          rockCount = 0;
        }
      }
    }
  }

}

export default Rock;
