import soundFX from './sounds.js';
import * as Util from './util';
import Chopper from './chopper';
import Explosion from './explosion';
import Rock from './rock';

class Game {
  constructor() {
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext('2d');
    this.score = 0
    this.gameOver = false
    this.currentFrame = 0;
    this.highScore = 0;
    this.gameState = "pause"
    this.pauseTotal = 0;
    let pauseStart;
    let startTime;
    let endTime;
    let FPSInterval;
    let elapsedTime;
  }

    //Space Background
    var spaceBgHeight = 500;
    var spaceBgWidth = 1170;
    var spaceBgVelocity = 12;
    let spaceScrollX;

    //Solar Background
    var solarBgHeight = 220;
    var solarBgWidth = 1112;
    var solarBgVelocity = 12;
    var solarBackground = new Image ();
    document.onload = function() {
      solarBackground.src = "images/sunsurface2.png";
    };
    let solarScrollX;

    function setup() {
      spaceScrollX = 0;
      addRock();
      this.ctx.drawImage(chopper, chopperXPos, chopperYPos, chopperWidth, chopperHeight);
      this.ctx.drawImage(spaceBackground, 0, 0, spaceBgWidth, spaceBgHeight);
      this.ctx.drawImage(solarBackground, 0, this.canvas.height - solarBgHeight * .75, this.canvas.width, solarBgHeight);
    }

    window.onload = function() {
      setup();
      setTimeout(function () {showIntro();}, 30);
    };

    // Game State Modes
    clear() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    play() {
      if (startTime === undefined) {
        startTime = Date.now();
      }
      if (gameState === "pause") {
        gameState = "play";
        if (pauseStart) {
          pauseTotal += Date.now() - pauseStart;
        }
      }
    }

    pause() {
      if (gameState === "play") {
        gameState = "pause";
        pauseStart = Date.now();
      }
    }

    restart() {
      clear();
      setup();
      setTimeout(function () {showIntro();}, 30);
      gameStart();
      startAnimation(30);
    }

    increaseScore (game) {
      endTime = Date.now();
      elapsedTime = endTime - startTime;
      score = Math.floor((endTime - startTime - pauseTotal) / 400);
    }

    function showIntro () {
      ctx.font = '36px Orbitron';
      ctx.fillStyle = 'gray';
      ctx.fillText('Welcome to Space Chopper', 313, 100);
      ctx.font = '22px Orbitron';
      ctx.fillStyle = 'orange';
      ctx.fillText('Pilot the chopper as far into the asteroid field as you can!', 250, 160);
      ctx.font = '22px Orbitron';
      ctx.fillStyle = 'orange';
      ctx.fillText('Avoid asteroids and the top and bottom of the frame!', 272, 190);
      ctx.fillStyle = 'white';
      ctx.font = '30px Orbitron';
      ctx.fillText('Use "F" key to fly', 435, 250);
      ctx.font = '30px Orbitron';
      ctx.fillText('Press space bar to start', 375, 295);
    }

    function gameStart() {
      gameState = "pause";
      clear();
      rockVelocity = 4;
      rockInterval = 140;
      drawSpaceBackground();
      drawSolarBackground();
      drawChopper();
      rockList = new Array();
      drawRocks();
      fly();
    }

    function drawSpaceBackground () {
      if (spaceScrollX >= canvas.width) {
        spaceScrollX = 0;
      }
      spaceScrollX += spaceBgVelocity;

      ctx.drawImage(spaceBackground, -spaceScrollX, 0, spaceBgWidth, spaceBgHeight);
      ctx.drawImage(spaceBackground, canvas.width - spaceScrollX, 0, spaceBgWidth, spaceBgHeight);
    }

    function drawSolarBackground () {
      solarBackground.src = "images/sunsurface2.png";
      if (solarScrollX >= canvas.width) {
        solarScrollX = 0;
      }
      solarScrollX += solarBgVelocity;
      this.ctx.drawImage(solarBackground, -solarScrollX, 0, solarBgWidth, solarBgHeight);
      this.ctx.drawImage(solarBackground, canvas.width - solarScrollX, canvas.height - solarBgHeight, solarBgWidth, solarBgHeight);
    }

    function collisionCheck() {
      for (var i = 0; i < rockList.length; i++) {
        if (chopperYPos + chopperHeight > rockList[i].y + 5 &&
          chopperYPos < rockList[i].y + rockList[i].height - 15 &&
          chopperXPos + chopperWidth > rockList[i].x - 5 &&
          chopperXPos + 50 < rockList[i].x + rockList[i].width) {
            crash = true;
            gameOver = true;
            endGame();
          }
        }
      }

    function borderCrashCheck() {
      if (flying) {
        if (chopperYPos <= 0) {
          crash = true;
          gameOver = true;
          endGame();
        }
      } else {
        if (chopperYPos + chopperHeight > this.canvas.height) {
          crash = true;
          gameOver = true;
          endGame();
        }
      }
    }

    function difficultyCheck () {
      //move to Level 2
      if (score < 50) {
        rockVelocity = 4;
        rockInterval = 140;
      } //Level 3
      if ((score > 50) && (score < 100)) {
        rockVelocity = 5;
        rockInterval = 110;
      } //Level 4
      if ((score > 100) && (score < 200)) {
        rockVelocity = 6;
        rockInterval = 90;
      } //Level 5
      if ((score > 200) && (score < 320)) {
        rockVelocity = 8;
        rockInterval = 70;
      } //Level 6
      if ((score > 320) && (score < 410)) {
        rockVelocity = 10;
        rockInterval = 60;
      } //Level 7
      if ((score > 410) && (score < 550)) {
        rockVelocity = 12;
        rockInterval = 50;
      } //Level 8
      if ((score > 550) && (score < 800)) {
        rockVelocity = 14;
        rockInterval = 40;
      } //Level 9
      if ((score > 800) && (score < 1000)) {
        rockVelocity = 16;
        rockInterval = 33;
      } //Level Hanhee
      if (score >= 1001) {
        rockVelocity = 18;
        rockInterval = 25;
      }
    }

    function endGame() {
      if (gameOver === true) {
        explodeChopper();
        setTimeout(function () {showGameOver();}, 30);
        pause();
      }
      if (score > highScore) {
        localStorage.setItem("highScore", score);
      }
    }

    function showGameOver () {
      ctx.font = '48px Orbitron';
      ctx.fillStyle = 'white';
      ctx.fillText('GAME OVER', 439, 230);
      ctx.font = "30px Orbitron";
      ctx.fillStyle = "orange";
      ctx.fillText('Your Score: '+ score, 482, 290);
      ctx.fillStyle = "white";
      ctx.font = '30px Orbitron';
      ctx.fillText('press R to restart', 453, 350);
    }

    function update () {
      increaseScore();
      borderCrashCheck();
      collisionCheck();
      difficultyCheck();
      fly();
    }

    function render () {
      clear();
      drawSpaceBackground();
      drawSolarBackground();
      drawChopper();
      drawRocks();
      this.ctx.fillStyle = "white";
      this.ctx.font = "30px Orbitron";
      this.ctx.fillText('Score: '+ formatScore(score), 900, 50);
      this.ctx.fillText('HI: '+ formatHighScore(highScore), 969, 80);
    }

    function startAnimation(FPS) {
      FPSInterval = 1000/FPS;
      animate();
    }

    function animate() {
      requestAnimationFrame(animate);
      if (gameState !== "pause") {
        update();
        render();
      }
    }

      gameStart();
      startAnimation(30);
}

export default Game
