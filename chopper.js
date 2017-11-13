document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext('2d');

  let gameState;

  var chopper = new Image ();
  chopper.src = "images/helicopter5.png";
  let chopperWidth = 225;
  let chopperHeight = 75;
  let chopperXPos;
  let chopperYPos;
  // var chopperImage = new Image();
  // chopperImage.src = "images/helicopter-spritesheet.png";

  var bgHeight = 500;
  var bgWidth = 1170;
  var bgVelocity = 30;
  var background = new Image ();
  background.src = "images/space-bkgd.jpg";
  let scrollX;

  let score;
  let borderCrash;
  var flying = false;
  let startFlyRate = 4;
  let startDescRate = 6;
  let flyRate;
  let descRate;
  let lift = 1;
  let gravity = 1.5;
  let termVel = 10;

  function setup() {
    score = 0;
    chopperXPos = 75;
    chopperYPos = 100;
    scrollX = 0;
    borderCrash = 0;
    ctx.drawImage(chopper, chopperXPos, chopperYPos, chopperWidth, chopperHeight);
    ctx.drawImage(background, 0, 0, bgWidth, bgHeight);
  }

  window.onload = function() {
  setup();
};

  // Game State Modes
  function clear() {
    console.log("i am clearing");
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
    console.log("i am restarting");
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
    fly();
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

  function drawChopper () {
    // console.log("i am drawChopper");
    if (gameState === "play") {
      ctx.drawImage(chopper, chopperXPos, chopperYPos, chopperWidth, chopperHeight);
    }
  }

  function borderCrashCheck() {
    if (flying) {
      if (chopperYPos <= 0) {
        borderCrash = true;
        gameState = "pause";
        restart();
      }
    } else {
      if (chopperYPos + chopperHeight > canvas.height) {
        borderCrash = true;
        gameState = "pause";
        restart();
      }
    }
  }

  function fly () {
    // console.log("i am fly");
    if(flying) {
      flyRate = startFlyRate;
      chopperYPos = chopperYPos - flyRate;

      if(flyRate < termVel) {
          flyRate += lift;
      }
    } else {
      descRate = startDescRate;
      chopperYPos = chopperYPos + descRate;

      if(!(descRate > termVel)) {
        descRate += gravity;
      }
    }
  }

  function update () {
    borderCrashCheck();
    fly();
  }

  function render () {
    clear();
    drawBackground();
    drawChopper();
  }

  document.addEventListener('keydown', (event) => {
    // console.log("i am flying - keydown");
    if (event.keyCode === 87) {
      flying = true;
    }
    // event.preventDefault();
  });

  document.addEventListener('keyup', (event) => {
    // console.log("i am not flying - keyup");
    if (event.keyCode === 87) {
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
