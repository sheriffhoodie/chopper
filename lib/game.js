import soundFX from './sounds.js';
import * as Util from './util';
import Chopper from './chopper';
import Explosion from './explosion';
import Rock from './rock';
import spaceBackground from './background';

class Game {
  constructor() {
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext('2d');
    this.canvasHeight = 500;
    this.canvasWidth = 1170;
    this.score = 0;
    this.highScore = parseInt(localStorage.getItem("highScore") || 0);
    this.chopper = new Chopper ();
    this.spacebg = new spaceBackground ();
    this.explosion = new Explosion ();
    this.showTitles = true;
    this.showGameEnd = false;
    this.gameOver = false;
    this.rocks = [];
    this.currentFrame = 0;
    this.highScore = 0;
    this.gameState = "pause";
    this.pauseTotal = 0;
    this.pauseStart = undefined;
    this.startTime = undefined;
    this.endTime = undefined;
    this.elapsedTime = undefined;
    Util.keyboardListeners(this);
    this.ctx.drawImage(this.chopper, this.chopper.XPos, this.chopper.YPos,
      this.chopper.width, this.chopper.height);
    this.ctx.drawImage(
      this.spacebg, 0, 0, this.spacebg.width, this.spacebg.height);
  }

  // Game State Modes
  clear() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  play() {
    if (this.startTime === undefined) {
      this.startTime = Date.now();
    }
    if (this.gameState === "pause") {
      this.gameState = "play";
      if (this.pauseStart) {
        this.pauseTotal += Date.now() - this.pauseStart;
      }
    }
  }

  pause() {
    if (this.gameState === "play") {
      this.gameState = "pause";
      this.pauseStart = Date.now();
    }
  }

  run () {
    this.render();
    Rock.addRock(this.canvas);
  }

  resetGame() {
    this.clear();
    this.chopper = new Chopper ();
    this.score = 0;
    this.rocks = [];
    // setTimeout(function () {
      this.showIntro();
    // }, 30);
    this.showGameEnd = false;
  }

  increaseScore () {
    this.endTime = Date.now();
    this.elapsedTime = this.endTime - this.startTime;
    this.score = Math.floor((
      this.endTime - this.startTime - this.pauseTotal) / 400);
  }

  showIntro () {
    this.ctx.font = '36px Orbitron';
    this.ctx.fillStyle = 'gray';
    this.ctx.fillText('Welcome to Space Chopper', 313, 100);
    this.ctx.font = '22px Orbitron';
    this.ctx.fillStyle = 'orange';
    this.ctx.fillText(
      'Pilot the chopper as far into the asteroid field as you can!', 250, 160);
    this.ctx.font = '22px Orbitron';
    this.ctx.fillStyle = 'orange';
    this.ctx.fillText(
      'Avoid asteroids and the top and bottom of the frame!', 272, 190);
    this.ctx.fillStyle = 'white';
    this.ctx.font = '30px Orbitron';
    this.ctx.fillText('Use "F" key to fly', 435, 250);
    this.ctx.font = '30px Orbitron';
    this.ctx.fillText('Press space bar to start', 375, 295);
  }

  update () {
    this.increaseScore();
    this.borderCrashCheck();
    this.collisionCheck();
    this.difficultyCheck();
  }

  render () {
    if (this.gameState !== "pause") {
      this.spacebg.render();
      this.clear();
      if (this.showTitles === true) {
        this.showIntro();
      } else {
        this.renderGame();
      }
    }
    // drawSolarBackground();
    this.ctx.fillStyle = "white";
    this.ctx.font = "30px Orbitron";
    this.ctx.fillText('Score: '+ Util.formatScore(this.score), 900, 50);
    this.ctx.fillText('HI: '+ Util.formatScore(this.highScore), 969, 80);
    requestAnimationFrame(this.render.bind(this));
  }

  renderGame() {
    this.clear();
    this.chopper.render(this.ctx, this.chopper.XPos, this.chopper.YPos);
    Rock.drawRocks(this.ctx);
    this.chopper.fly();
    this.update();
  }

  collisionCheck() {
    for (var i = 0; i < this.rockList.length; i++) {
      if (this.chopper.YPos + this.chopper.height > this.rockList[i].y + 5 &&
        this.chopper.YPos < this.rockList[i].y + this.rockList[i].height - 15 &&
        this.chopper.XPos + this.chopper.width > this.rockList[i].x - 5 &&
        this.chopper.XPos + 50 < this.rockList[i].x + this.rockList[i].width) {
          this.chopper.crash = true;
          this.gameOver = true;
          this.endGame();
        }
      }
    }

  borderCrashCheck(chopper) {
    if (chopper.flying) {
      if (chopper.YPos <= 0) {
        chopper.crash = true;
        this.gameOver = true;
        this.endGame();
      }
    } else {
      if (chopper.YPos + chopper.height > this.canvas.height) {
        chopper.crash = true;
        this.gameOver = true;
        this.endGame();
      }
    }
  }

  difficultyCheck () {
    //move to Level 2
    if (this.score < 50) {
      Rock.rockVelocity = 4;
      Rock.rockInterval = 140;
    } //Level 3
    if ((this.score > 50) && (this.score < 100)) {
      Rock.rockVelocity = 5;
      Rock.rockInterval = 110;
    } //Level 4
    if ((this.score > 100) && (this.score < 200)) {
      Rock.rockVelocity = 6;
      Rock.rockInterval = 90;
    } //Level 5
    if ((this.score > 200) && (this.score < 320)) {
      Rock.rockVelocity = 8;
      Rock.rockInterval = 70;
    } //Level 6
    if ((this.score > 320) && (this.score < 410)) {
      Rock.rockVelocity = 10;
      Rock.rockInterval = 60;
    } //Level 7
    if ((this.score > 410) && (this.score < 550)) {
      Rock.rockVelocity = 12;
      Rock.rockInterval = 50;
    } //Level 8
    if ((this.score > 550) && (this.score < 800)) {
      Rock.rockVelocity = 14;
      Rock.rockInterval = 40;
    } //Level 9
    if ((this.score > 800) && (this.score < 1000)) {
      Rock.rockVelocity = 16;
      Rock.rockInterval = 33;
    } //Level Hanhee
    if (this.score >= 1001) {
      Rock.rockVelocity = 18;
      Rock.rockInterval = 25;
    }
  }

  endGame() {
    if (this.gameOver === true) {
      soundFX.explosion.play();
      this.explosion.render();
      // setTimeout(function () {
      this.showGameEnd = true;
      this.renderGameOver();
      // }, 30);
      this.pause();
    }
    if (this.score > this.highScore) {
      localStorage.setItem("highScore", this.score);
    }
  }

  renderGameOver () {
    this.ctx.font = '48px Orbitron';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText('GAME OVER', 439, 230);
    this.ctx.font = "30px Orbitron";
    this.ctx.fillStyle = "orange";
    this.ctx.fillText('Your Score: '+ this.score, 482, 290);
    this.ctx.fillStyle = "white";
    this.ctx.font = '30px Orbitron';
    this.ctx.fillText('press R to restart', 453, 350);
  }

}

export default Game;
