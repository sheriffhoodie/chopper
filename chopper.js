document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext('2d');

  //Global Variables
  let gameState;
  let gameOver;
  let currentFrame = 0;
  let pauseStart;
  let pauseTotal;
  let startTime;
  let endTime;
  let FPSInterval;
  let elapsedTime;
  // let score;

  var chopper = new Image ();
  chopper.src = "images/helicopter5.png";
  let chopperWidth = 208;
  let chopperHeight = 62;
  let chopperXPos;
  let chopperYPos;

  //Space Background
  var spaceBgHeight = 500;
  var spaceBgWidth = 1170;
  var spaceBgVelocity = 12;
  var spaceBackground = new Image ();
  spaceBackground.src = "images/space-bkgd.jpg";
  let spaceScrollX;

  //Solar Background
  var solarBgHeight = 220;
  var solarBgWidth = 1112;
  var solarBgVelocity = 12;
  var solarBackground = new Image ();
  solarBackground.src = "images/sunsurface2.png";
  let solarScrollX;

  var wall = new Image ();
  wall.src = "images/asteroid2.png";
  let wallList;
  let wallCount;
  let wallHeight;
  let wallWidth;
  let wallVelocity;
  let wallInterval;

  let score;
  let crash;
  var flying = false;
  let startFlyRate = 4;
  let startDescRate = 5;
  let flyRate;
  let descRate;
  let lift = 0.8;
  let gravity = 1.2;
  let termVel = 10;

  function setup() {
    pauseTotal = 0;
    gameOver = false;
    score = 0;
    chopperXPos = 75;
    chopperYPos = 100;
    spaceScrollX = 0;
    crash = false;
    wallList = new Array();
    wallCount = 0;
    addWall();
    ctx.drawImage(chopper, chopperXPos, chopperYPos, chopperWidth, chopperHeight);
    ctx.drawImage(spaceBackground, 0, 0, spaceBgWidth, spaceBgHeight);
    ctx.drawImage(solarBackground, 0, canvas.height - solarBgHeight * .75, canvas.width, solarBgHeight);
  }

  window.onload = function() {
    setup();
    setTimeout(function () {showIntro();}, 30);
  };

  // Game State Modes
  function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function play() {
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

  function pause() {
    if (gameState === "play") {
      gameState = "pause";
      pauseStart = Date.now();
    }
  }

  function restart() {
    clear();
    setup();
    gameStart();
  }

  function showIntro () {
    ctx.font = '30px Orbitron';
    ctx.fillStyle = 'white';
    ctx.fillText('Press space bar to start', 380, 220);
    ctx.font = '30px Orbitron';
    ctx.fillText('Use "F" key to fly', 585-292/2, 280);
    ctx.font = '22px Orbitron';
    ctx.fillStyle = 'orange';
    ctx.fillText('Avoid asteroids and the top and bottom of the frame!', 270, 360);
  }

  //play/pause with spacebar
  document.addEventListener("keypress", (event) => {
    if ((event.keyCode === 32) && (gameOver !== true)) {
      if (gameState === "pause") {
        play();
      } else if (gameState === "play") {
        pause();
      }
    }
    event.preventDefault();
    if (gameOver === true) {
      // restart();
    }
  });

  document.addEventListener("keypress", (event) => {
    // console.log("i am restarting");
    if (event.keyCode === 82) {
      restart();
    }
    // event.preventDefault();
  });

  function gameStart() {
  // console.log("i am game start");
    gameState = "pause";
    clear();
    wallVelocity = 7;
    wallInterval = 90;
    drawSpaceBackground();
    drawSolarBackground();
    drawChopper();
    wallList = new Array();
    drawWalls();
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
    // if (solarScrollX >= canvas.width) {
    //   solarScrollX = 0;
    // }
    // solarScrollX += solarBgVelocity;
    // ctx.drawImage(solarBackground, -solarScrollX, 0, solarBgWidth, solarBgHeight);
    // ctx.drawImage(solarBackground, canvas.width - solarScrollX, canvas.height - solarBgHeight, solarBgWidth, solarBgHeight);
  }

  function chopperSprite () {
    let path = 'images/helicopter-spritesheet.png';
    let frameWidth = 423;
    let frameHeight = 150;
    let frameSpeed = 3;
    let endFrame = 3;
    let image = new Image ();
    let counter = 0;
    image.src = path;
    let framesPerRow;
    framesPerRow = Math.floor(image.width / frameWidth);

    this.update = function () {
      // if (counter === (frameSpeed - 1))
      // console.log("HEREHEREHERE");
      currentFrame = (currentFrame + 1) % endFrame;
        // counter = (counter +  1) % frameSpeed;
    };

    this.draw = function (x, y) {
      // console.log("spritesheet drawing");
      let row = Math.floor(currentFrame / framesPerRow);
      let col = Math.floor(currentFrame % framesPerRow);
      ctx.drawImage(
        image,
        col * frameWidth, row * frameHeight,
        frameWidth, frameHeight, x, y,
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

  function addWall() {
    // console.log("i am adding wall");
    let newWall = {};
    newWall.x = canvas.width;
    newWall.y = Math.floor(Math.random() * canvas.height - wallHeight);
    wallWidth = Math.floor(Math.random() * (140 - 80) + 80);
    wallHeight = Math.floor(Math.random() * (130 - 110) + 110);
    wallList.push(newWall);
  }

  function drawWalls () {
    wallCount++;
    for (var i = 0; i < wallList.length; i++) {
      if (wallList[i].x < 0 - wallWidth) {
        wallList.splice(i, 1);
      } else {
        wallList[i].x -= wallVelocity;
        ctx.drawImage(wall, wallList[i].x, wallList[i].y, wallWidth, wallHeight);

        if (wallCount >= wallInterval) {
          addWall();
          wallCount = 0;
          // score += 10;
        }
      }
    }
  }

  function collisionCheck() {
    for (var i = 0; i < wallList.length; i++) {
      if (chopperXPos < (wallList[i].x + wallWidth) &&
      (chopperXPos + chopperWidth) > wallList[i].x && chopperYPos < (wallList[i].y + wallHeight) &&
      (chopperYPos + chopperHeight) > wallList[i].y) {
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
      if (chopperYPos + chopperHeight > canvas.height) {
        crash = true;
        gameOver = true;
        endGame();
      }
    }
  }

  function increaseScore() {
    // console.log("i am increasing the score");
    endTime = Date.now();
    elapsedTime = endTime - startTime;
    score = Math.floor((endTime - startTime - pauseTotal) / 400);
  }

  function difficultyCheck () {
    // debugger
    console.log(wallVelocity);
    //move to Level 2
    if (score < 50) {
      wallVelocity = 4;
      wallInterval = 140;
    } //Level 3
    if ((score > 50) && (score < 100)) {
      wallVelocity = 5;
      wallInterval = 110;
    } //Level 4
    if ((score > 100) && (score < 200)) {
      wallVelocity = 6;
      wallInterval = 90;
    } //Level 5
    if ((score > 200) && (score < 320)) {
      wallVelocity = 8;
      wallInterval = 70;
    } //Level 6
    if ((score > 320) && (score < 410)) {
      wallVelocity = 10;
      wallInterval = 60;
    } //Level 7
    // if ((score > 410) && (score < 550)) {
    //   wallVelocity = 12;
    //   wallInterval = 50;
    // } //Level 8
    // if ((score > 550) && (score < 800)) {
    //   wallVelocity = 14;
    //   wallInterval = 40;
    // } //Level 9
    // if ((score > 800) && (score < 1000)) {
    //   wallVelocity = 16;
    //   wallInterval = 33;
    // // } //Level Hanhee
    // if (score >= 1001) {
    //   wallVelocity = 18;
    //   wallInterval = 25;
    // }
  }

  //simplify equation with vertical velocity that decreases proportionately
  //and then increases upward velocity with accelaration, curving the flying
  function fly () {
    // console.log("i am fly");
    if(flying && crash === false) {
      flyRate = startFlyRate;
      chopperYPos = chopperYPos - flyRate;

      if(flyRate < termVel) {
          flyRate += lift;
      }
    } else if (!flying && crash === false) {
      descRate = startDescRate;
      chopperYPos = chopperYPos + descRate;

      if(descRate < termVel) {
        descRate += gravity;
      }
    }
  }

  function explodeChopper() {
    if (crash === true) {
      chopper.src = "images/explosion1.png";
      chopperHeight = 483 * 0.72;
      chopperWidth = 726 * 0.72;
      setTimeout(function () {ctx.drawImage(chopper, chopperXPos - chopperWidth/4, chopperYPos - chopperHeight/2, chopperWidth, chopperHeight);}, 29);
    }
  }

  function endGame() {
    if (gameOver === true) {
      pause();
      explodeChopper();
      setTimeout(function () {showGameOver();}, 30);
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
    ctx.fillText('press cmd + r to restart', 417, 350);
  }

  function formatScore () {
  if (score > 99999) {
    return '99999';
  } else if (score > 9999) {
    return score;
  } else if (score > 999) {
    return '0' + score;
  } else if (score > 99) {
    return '00' + score;
  } else if (score > 9) {
    return '000' + score;
  } else {
    return '0000' + score;
  }
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
    drawWalls();
    ctx.fillStyle = "white";
    ctx.font = "30px Orbitron";
    ctx.fillText('Score: '+ formatScore(score), 900, 50);
  }

  document.addEventListener('keydown', (event) => {
    // console.log("i am flying - keydown");
    if (event.keyCode === 70) {
      flying = true;
    }
  });

  document.addEventListener('keyup', (event) => {
    // console.log("i am not flying - keyup");
    if (event.keyCode === 70) {
      flying = false;
    }
  });

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
});
