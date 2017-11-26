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
  let highScore = 0;

  //sounds
  var chopperSound = new Audio('sounds/helicopter.mp3');
  var menuMusic = new Audio('https://s3.us-east-2.amazonaws.com/chopper-dev/sounds/clearside-assimilator.wav');
  menuMusic.loop = true;
  var gameMusic = new Audio('sounds/space-hiphop-beat1.mp3');
  gameMusic.currentTime = 11;
  gameMusic.loop = true;
  gameMusic.volume = 0.8;
  var explosionSFX = new Audio('sounds/explosion.flac');
  explosionSFX.defaultMuted = true;
  let muteButton = document.querySelector("#mute-button");
  menuMusic.muted = true;
  gameMusic.muted = true;
  explosionSFX.muted = true;
  let muteCheck = true;
  muteButton.addEventListener('click', () => {
    // debugger
    if (event.clientX !== 0) {
      muteCheck = !muteCheck;
      gameMusic.muted = !gameMusic.muted;
      menuMusic.muted = !menuMusic.muted;
      explosionSFX.muted = !explosionSFX.muted;
    }
  });

  //chopper variables
  var chopper = new Image ();
  // chopper.src = "images/helicopter5.png";
  let chopperWidth = 208;
  let chopperHeight = 62;
  let chopperXPos;
  let chopperYPos;

  //Space Background
  var spaceBgHeight = 500;
  var spaceBgWidth = 1170;
  var spaceBgVelocity = 12;
  var spaceBackground = new Image ();
  var image = document.images[0];
  document.onload = function(){
    spaceBackground.src = "images/space-bkgd.jpg";
  };
  // spaceBackground.src = "https://s3.us-east-2.amazonaws.com/chopper-dev/images/space-bkgd.jpg";
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

  //rock variables
  var rock = new Image ();
  rock.src = "https://s3.us-east-2.amazonaws.com/chopper-dev/images/asteroid2.png";
  let rockList;
  let rockCount;
  let rockVelocity;
  let rockInterval;

  //gameplay variables
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
    if (localStorage.getItem("highScore") === null) {
      return 0;
    } else {
      highScore = localStorage.getItem("highScore");
    }
    chopperXPos = 75;
    chopperYPos = 100;
    spaceScrollX = 0;
    crash = false;
    rockList = new Array();
    rockCount = 0;
    addRock();
    ctx.drawImage(chopper, chopperXPos, chopperYPos, chopperWidth, chopperHeight);
    ctx.drawImage(spaceBackground, 0, 0, spaceBgWidth, spaceBgHeight);
    ctx.drawImage(solarBackground, 0, canvas.height - solarBgHeight * .75, canvas.width, solarBgHeight);
    menuMusic.play();
    gameMusic.preload = "auto";
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
    menuMusic.pause();
      if (muteCheck === false) {
        gameMusic.play();
        gameMusic.muted = false;
        explosionSFX.muted = false;
      } else {
        gameMusic.play();
        gameMusic.muted = true;
        explosionSFX.muted = true;
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
      gameMusic.pause();
      pauseStart = Date.now();
    }
  }

  function restart() {
    clear();
    setup();
    setTimeout(function () {showIntro();}, 30);
    gameStart();
    startAnimation(30);
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
    ctx.font = '30px Orbitron';
    ctx.fillStyle = 'white';
    ctx.fillText('Press space bar to start', 375, 250);
    ctx.font = '30px Orbitron';
    ctx.fillText('Use "F" key to fly', 435, 295);
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
    }
  });

  document.addEventListener("keypress", (event) => {
    if (event.key === "r") {
      location.reload();
    }
    // event.preventDefault();
  });

  function gameStart() {
    // console.log("i am starting game");
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
    spaceBackground.src = "images/space-bkgd.jpg";
    console.log(spaceBackground.complete);
    debugger
    if (spaceScrollX >= canvas.width) {
      spaceScrollX = 0;
    }
    spaceScrollX += spaceBgVelocity;

    ctx.drawImage(spaceBackground, -spaceScrollX, 0, spaceBgWidth, spaceBgHeight);
    ctx.drawImage(spaceBackground, canvas.width - spaceScrollX, 0, spaceBgWidth, spaceBgHeight);
  }

  function drawSolarBackground () {
    solarBackground.src = "images/sunsurface2.png";
    console.log(solarBackground.complete);
    debugger
    if (solarScrollX >= canvas.width) {
      solarScrollX = 0;
    }
    solarScrollX += solarBgVelocity;
    // solarBackground.onload(
      ctx.drawImage(solarBackground, -solarScrollX, 0, solarBgWidth, solarBgHeight);
      ctx.drawImage(solarBackground, canvas.width - solarScrollX, canvas.height - solarBgHeight, solarBgWidth, solarBgHeight);
    // );
  }

  function chopperSprite () {
    let path = "https://s3.us-east-2.amazonaws.com/chopper-dev/images/helicopter-spritesheet.png";
    let chopFrameWidth = 423;
    let chopFrameHeight = 150;
    let chopFrameSpeed = 3;
    let chopEndFrame = 3;
    let chopperImg = new Image ();
    let counter = 0;
    chopperImg.src = path;
    let chopFramesPerRow;
    chopFramesPerRow = Math.floor(chopperImg.width / chopFrameWidth);

    this.update = function () {
      // if (counter === (frameSpeed - 1))
      currentFrame = (currentFrame + 1) % chopEndFrame;
        // counter = (counter +  1) % frameSpeed;
    };

    this.draw = function (x, y) {
      // console.log("chopper:");
      console.log(chopperImg.complete);
      debugger
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

  function addRock() {
    let newRock = {};
    newRock.width = Math.floor(Math.random() * (140 - 80) + 80);
    newRock.height = Math.floor(Math.random() * (130 - 110) + 110);
    newRock.x = canvas.width;
    newRock.y = Math.floor(Math.random() * canvas.height - newRock.height);
    rockList.push(newRock);
  }

  function drawRocks () {
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
      if (chopperYPos + chopperHeight > canvas.height) {
        crash = true;
        gameOver = true;
        endGame();
      }
    }
  }

  function increaseScore() {
    endTime = Date.now();
    elapsedTime = endTime - startTime;
    score = Math.floor((endTime - startTime - pauseTotal) / 400);
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

  function formatHighScore () {
    if (highScore > 99999) {
      return '99999';
    } else if (highScore > 9999) {
      return highScore;
    } else if (highScore > 999) {
      return '0' + highScore;
    } else if (highScore > 99) {
      return '00' + highScore;
    } else if (highScore > 9) {
      return '000' + highScore;
    } else {
      return '0000' + highScore;
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
  //simplify equation with vertical velocity that decreases proportionately
  //and then increases upward velocity with accelaration, curving the flying
  function fly () {
    // console.log("i am flying");
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

  // Defining the Explosion Sprite
   let explosion = new Image ();
   explosion.src = 'images/explosion-sprite2.png';
   var spriteIndex = 0;
   var frameWidth = 64;
   var frameHeight = 64;
   let expFramesPerRow = Math.floor(explosion.width / frameWidth);
   var rows = 4;
   var cols = 4;

   function explodeChopper() {
    //  console.log(explosion.complete);
     if (spriteIndex > 15) {
      return;
     }
     setTimeout(function () {
       requestAnimationFrame(explodeChopper);
       var x = spriteIndex % (cols - 1) * frameWidth;
       var y = parseInt(spriteIndex / (rows - 1)) * frameHeight;
       ctx.drawImage(explosion, x, y, frameWidth, frameHeight, chopperXPos, chopperYPos - chopperHeight, 300, 300);
       spriteIndex++;
     }, 30
     );
     explosionSFX.play();
     pause();
   }

  // function explodeChopper() {
  //   if (crash === true) {
  //     chopper.src = "images/explosion1.png";
  //     chopperHeight = 483 * 0.72;
  //     chopperWidth = 726 * 0.72;
  //     setTimeout(function () {ctx.drawImage(chopper, chopperXPos - chopperWidth/4, chopperYPos - chopperHeight/2, chopperWidth, chopperHeight);}, 29);
  //     explosionSFX.play();
  //   }
  // }

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
    // console.log("i am rendering");
    clear();
    drawSpaceBackground();
    drawSolarBackground();
    drawChopper();
    drawRocks();
    ctx.fillStyle = "white";
    ctx.font = "30px Orbitron";
    ctx.fillText('Score: '+ formatScore(score), 900, 50);
    ctx.fillText('HI: '+ formatHighScore(highScore), 969, 80);
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
});
