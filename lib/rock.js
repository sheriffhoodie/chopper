import ImageableSingleton from './imageable';

class Rock {
  constructor(ctx) {
    let images = new ImageableSingleton();
    this.rock = images.rockImg;
    this.rockList = [];
    this.rockCount = 0;
    this.rockVelocity = 4;
    this.rockInterval = 140;
  }

}

export default Rock;
