document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext('2d');

  let gameState;
  let gameOver;
  let currentFrame = 0;


  var chopper = new Image ();
  chopper.src = "images/helicopter5.png";
  let chopperWidth = 208;
  let chopperHeight = 62;
  let chopperXPos;
  let chopperYPos;
  // var chopperImage = new Image();
  // chopperImage.src = "images/helicopter-spritesheet.png";

  //Chopper Collision Box
  let chopperBox = {};
  chopperBox.mid = {};
  chopperBox.mid.x = chopperWidth / 2;
  chopperBox.mid.y = chopperHeight / 2;
  chopperBox.right = chopperBox.mid.x + chopperWidth / 2;
  chopperBox.left = chopperBox.mid.x - chopperWidth / 2;
  chopperBox.top = chopperBox.mid.y - chopperHeight / 2;
  chopperBox.bottom = chopperBox.mid.y + chopperHeight / 2;

  var bgHeight = 500;
  var bgWidth = 1170;
  var bgVelocity = 25;
  var background = new Image ();
  background.src = "images/space-bkgd.jpg";
  let scrollX;

  let wall;
  let wallList;
  let wallCount;
  var wallHeight = 130;
  var wallWidth = 40;
  var wallVelocity = 11;
  var wallInterval = 50;

  let score = 0;
  let crash;
  var flying = false;
  let startFlyRate = 7;
  let startDescRate = 9;
  let flyRate;
  let descRate;
  let lift = 1.8;
  let gravity = 2.2;
  let termVel = 15;

  function setup() {
    gameOver = false;
    score = 0;
    chopperXPos = 75;
    chopperYPos = 100;
    scrollX = 0;
    crash = false;
    wallList = new Array();
    wallCount = 0;
    addWall();
    ctx.drawImage(chopper, chopperXPos, chopperYPos, chopperWidth, chopperHeight);
    ctx.drawImage(background, 0, 0, bgWidth, bgHeight);
  }

  window.onload = function() {
    setup();
    setTimeout(function () {showIntro();}, 30);
  };

  // Game State Modes
  function clear() {
    // console.log("i am clearing");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function play() {
    if (gameState === "pause") {
      gameState = "play";
    }
  }

  function pause() {
    if (gameState === "play") {
      gameState = "pause";
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
    ctx.fillText('Press space bar to start', 380, 250);
    ctx.font = '30px Orbitron';
    ctx.fillText('Use "F" key to fly', 585-292/2, 320);
  }

  //play/pause with spacebar
  document.addEventListener("keypress", (event) => {
    // console.log(gameState);
    if (event.keyCode === 32) {
      if (gameState === "pause") {
        play();
      } else if (gameState === "play") {
        pause();
      }
    }
    event.preventDefault();
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
    drawBackground();
    drawChopper();
    wallList = new Array();
    drawWalls();
    fly();
    // ctx.fillStyle = "brown";
  }

  function drawBackground () {
    // console.log("i am drawing the bg");
    if (scrollX >= canvas.width) {
      scrollX = 0;
    }
    scrollX += bgVelocity;
    ctx.drawImage(background, -scrollX, 0, bgWidth, bgHeight);
    ctx.drawImage(background, canvas.width - scrollX, 0, bgWidth, bgHeight);
  }

  function SpriteSheet () {
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
    console.log("i am drawing the chopper");
    let spritesheet = new SpriteSheet();
    // // console.log("i am drawChopper");
    if (gameState === "play") {
      spritesheet.update();
      spritesheet.draw(chopperXPos, chopperYPos);
      // ctx.drawIma`ge(chopper, chopperXPos, chopperYPos, chopperWidth, chopperHeight);
    }
  }

  function addWall() {
    // console.log("i am adding wall");
    let newWall = {};
    newWall.x = canvas.width;
    newWall.y = Math.floor(Math.random() * canvas.height - wallHeight);
    wallList.push(newWall);
  }

  function drawWalls () {
    wallCount++;
    for (var i = 0; i < wallList.length; i++) {
      if (wallList[i].x < 0 - wallWidth) {
        wallList.splice(i, 1);
      } else {
        wallList[i].x -= wallVelocity;
        ctx.fillStyle = "gray";
        ctx.fillRect(wallList[i].x, wallList[i].y, wallWidth, wallHeight);

        if (wallCount >= wallInterval) {
          addWall();
          wallCount = 0;
          score += 10;
        }
      }
    }
  }

  function collisionCheck() {
    for (var i = 0; i < wallList.length; i++) {
      if (chopperXPos < (wallList[i].x + wallWidth) &&
      (chopperXPos + chopperWidth) > wallList[i].x && chopperYPos < (wallList[i].y + wallHeight) &&
      (chopperYPos + chopperHeight) > wallList[i].y ) {
          // console.log("hit");
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

  function difficultyCheck () {
    // console.log(score);
    //move to Level 2
    // debugger
    if (score === 100) {
      wallVelocity += 20;
      wallInterval -= 33;
      //Level 3
    } else if (score === 220) {
      wallVelocity += 3;
      wallInterval -= 5;
      //Level 4
    } else if (score === 300) {
      wallVelocity += 4;
      wallInterval -= 6;
      //Level 5
    } else if (score === 400) {
      wallVelocity += 3;
      wallInterval -= 6;
      //Level 6
    } else if (score === 510) {
      wallVelocity += 6;
      wallInterval -= 5;
    }
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
    // console.log("i am exploding chopper");
    // debugger
    if (crash === true) {
      chopper.src = "images/explosion1.png";
      chopperHeight = 350;
      chopperWidth = 350;
      setTimeout(function () {ctx.drawImage(chopper, chopperXPos - chopperWidth/4, chopperYPos - chopperHeight/2, chopperWidth, chopperHeight);}, 29);
    }
  }

  function endGame() {
    // console.log("i am ending game");
    if (gameOver === true) {
      pause();
      explodeChopper();
      setTimeout(function () {renderGameOver();}, 30);
    }
  }

  function renderGameOver () {
    ctx.font = '48px Orbitron';
    ctx.fillStyle = 'white';
    ctx.fillText('GAME OVER', 439, 230);
    ctx.font = "30px Orbitron";
    ctx.fillStyle = "blue";
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
    borderCrashCheck();
    collisionCheck();
    // difficultyCheck();
    fly();
  }

  function render () {
    clear();
    drawBackground();
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
    // event.preventDefault();
  });

  document.addEventListener('keyup', (event) => {
    // console.log("i am not flying - keyup");
    if (event.keyCode === 70) {
      flying = false;
    }
    // event.preventDefault();
  });

  let startTime;
  let endTime;
  let FPSInterval;
  let elapsedTime;

  function startAnimation(FPS) {
    FPSInterval = 1000/FPS;
    startTime = Date.now();
    animate();
  }

  function animate() {
    requestAnimationFrame(animate);
    endTime = Date.now();
    elapsedTime = endTime - startTime;
    if (elapsedTime > FPSInterval) {
      startTime = endTime - (elapsedTime - FPSInterval);
      if (gameState !== "pause") {
        update();
        render();
      }
    }
  }

  gameStart();
  startAnimation(30);

});
