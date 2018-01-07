import soundFX from './sounds.js';
import * as Util from './util';
import Chopper from './chopper';
import Explosion from './explosion';
import Rock from './rock';
import spaceBackground from './background';

class Game {
  constructor() {
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvasHeight = 500;
    this.canvasWidth = 1170;
    this.score = 0;
    this.highScore = localStorage.getItem("highScore");
    this.chopper = new Chopper ();
    this.spacebg = new spaceBackground ();
    this.explosion = new Explosion ();
    this.rock = new Rock ();
    this.showTitles = true;
    this.showGameEnd = false;
    this.gameOver = false;
    this.rocks = [];
    this.currentFrame = 0;
    this.highScore = 0;
    this.gameState = "pause";
    this.showIntro();
    this.pauseTotal = 0;
    this.pauseStart = undefined;
    this.startTime = undefined;
    this.endTime = undefined;
    this.elapsedTime = undefined;
    Util.keyboardListeners(this);
    this.addRock();
  }

  // Game State Modes

  play() {
    soundFX.menuMusic.pause();
    soundFX.gameMusic.play();
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
      soundFX.gameMusic.pause();
      this.gameState = "pause";
      this.pauseStart = Date.now();
    }
  }

  resetGame() {
    this.clear();
    this.chopper = new Chopper ();
    this.score = 0;
    this.rocks = [];
    this.showIntro();
    this.showGameEnd = false;
  }

  clearScreen() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  increaseScore () {
    this.endTime = Date.now();
    this.elapsedTime = this.endTime - this.startTime;
    this.score = Math.floor((
      this.endTime - this.startTime - this.pauseTotal) / 400);
  }

  showIntro () {
    let spacebg = new Image ();
    let solarbg = new Image ();
    let that = this;
    solarbg.addEventListener('load', function() {
      that.ctx.drawImage(solarbg, 0, that.canvas.height - 200, 1312, 200);
    }, false);
    solarbg.src = './assets/images/sunsurface2.png';
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
      this.clearScreen();
      if (this.showTitles === true) {
          this.showIntro();
      } else {
        this.renderGame();
      }
    }
    this.ctx.fillStyle = "white";
    this.ctx.font = "30px Orbitron";
    this.ctx.fillText('Score: '+ Util.formatScore(this.score), 900, 50);
    this.ctx.fillText('HI: '+ Util.formatScore(localStorage.getItem("highScore")), 969, 80);
    requestAnimationFrame(this.render.bind(this));
  }

  renderGame() {
    this.spacebg.render(this.ctx);
    this.chopper.render(this.ctx);
    this.drawRocks();
    this.update();
  }

  addRock() {
    let newRock = {};
    newRock.width = Math.floor(Math.random() * (140 - 80) + 80);
    newRock.height = Math.floor(Math.random() * (130 - 110) + 110);
    newRock.x = this.canvasWidth;
    newRock.y = Math.floor(Math.random() * this.canvasHeight - newRock.height);
    this.rocks.push(newRock);
  }

  drawRocks() {
    this.rock.rockCount++;
    for (var i = 0; i < this.rocks.length; i++) {
      if (this.rocks[i].x < 0 - this.rocks[i].width) {
        this.rocks.splice(i, 1);
      } else {
        this.rocks[i].x -= this.rock.rockVelocity;
        this.ctx.drawImage(this.rock.rock, this.rocks[i].x, this.rocks[i].y,
          this.rocks[i].width, this.rocks[i].height);

        if (this.rock.rockCount >= this.rock.rockInterval) {
          this.addRock();
          this.rock.rockCount = 0;
        }
      }
    }
  }

  collisionCheck() {
    for (var i = 0; i < this.rocks.length; i++) {
      if (this.chopper.YPos + this.chopper.height > this.rocks[i].y + 5 &&
        this.chopper.YPos < this.rocks[i].y + this.rocks[i].height - 15 &&
        this.chopper.XPos + this.chopper.width > this.rocks[i].x - 5 &&
        this.chopper.XPos + 50 < this.rocks[i].x + this.rocks[i].width) {
          this.chopper.crash = true;
          this.gameOver = true;
          this.endGame();
        }
      }
    }

  borderCrashCheck(chopper) {
    if (this.chopper.flying) {
      if (this.chopper.YPos <= 0) {
        this.chopper.crash = true;
        this.gameOver = true;
        this.endGame();
      }
    } else {
      if (this.chopper.YPos + this.chopper.height > this.canvas.height) {
        this.chopper.crash = true;
        this.gameOver = true;
        this.endGame();
      }
    }
  }

  difficultyCheck () {
    //move to Level 2
    if (this.score < 50) {
      this.rock.rockVelocity = 4;
      this.rock.rockInterval = 140;
    } //Level 3
    if ((this.score > 50) && (this.score < 100)) {
      this.rock.rockVelocity = 5;
      this.rock.rockInterval = 110;
      this.rock.rock.src = './assets/images/spaceship2.png';
    } //Level 4
    if ((this.score > 100) && (this.score < 200)) {
      this.rock.rockVelocity = 6;
      this.rock.rockInterval = 90;
      this.rock.rock.src = './assets/images/Asteroid.png';
    } //Level 5
    if ((this.score > 200) && (this.score < 320)) {
      this.rock.rockVelocity = 8;
      this.rock.rockInterval = 70;
      this.rock.rock.src = './assets/images/asteroid2.png';
    } //Level 6
    if ((this.score > 320) && (this.score < 410)) {
      this.rock.rockVelocity = 10;
      this.rock.rockInterval = 60;
    } //Level 7
    if ((this.score > 410) && (this.score < 550)) {
      this.rock.rockVelocity = 12;
      this.rock.rockInterval = 50;
      this.rock.rock.src = './assets/images/spaceship.png';
    } //Level 8
    if ((this.score > 550) && (this.score < 800)) {
      this.rock.rockVelocity = 14;
      this.rock.rockInterval = 40;
      this.rock.rock.src = './assets/images/Asteroid.png';
    } //Level 9
    if ((this.score > 800) && (this.score < 1000)) {
      this.rock.rockVelocity = 16;
      this.rock.rockInterval = 33;
    } //Level Hanhee
    if (this.score >= 1001) {
      this.rock.rockVelocity = 18;
      this.rock.rockInterval = 25;
    }
  }

  endGame() {
    if (this.gameOver === true) {
      soundFX.explosion.play();
      this.explosion.render(this.ctx, this.chopper);
      this.chopper.chopper.src = "";
      this.showGameEnd = true;
      this.renderGameOver();
      if (this.score > this.highScore) {
        localStorage.setItem("highScore", this.score);
      }
      let that = this;
      setTimeout(function () {
       that.pause();
      }, 150);
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
    this.ctx.fillText('press Cmd + R to restart', 408, 350);
  }
}
export default Game;
