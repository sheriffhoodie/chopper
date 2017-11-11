document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext('2d');

  // Variable this may change during gameplay
  let gameState = "play";
  var chopper = new Image ();
  chopper.src = "images/Superman-PNG-Pic.png";
  let chopperWidth = 150;
  let chopperHeight = 250;
  let chopperXPos;
  let chopperYPos;
  // var chopperImage = new Image();
  // chopperImage.src = "images/helicopter-spritesheet.png";
  let score;
  var flying = false;
  let startFlyRate = 4;
  let startDescRate = 6;
  let flyRate;
  let descRate;
  let lift = 1;
  let gravity = 1.5;
  let termVel = 10;

//   	function gameLoop () {
//
//   	  window.requestAnimationFrame(gameLoop);
//
//   	  chopper.update();
//   	  chopper.render();
//   	}
//
//   	function sprite (options) {
//
//   		var obj = {},
//   			frameIndex = 0,
//   			tickCount = 0,
//   			ticksPerFrame = options.ticksPerFrame || 0,
//   			numberOfFrames = options.numberOfFrames || 1;
//
//   		sprite.context = options.context;
//   		sprite.width = options.width;
//   		sprite.height = options.height;
//   		sprite.image = options.image;
//
//   		sprite.update = function () {
//
//               tickCount += 1;
//
//               if (tickCount > ticksPerFrame) {
//
//   				tickCount = 0;
//
//                   // If the current frame index is in range
//                   if (frameIndex < numberOfFrames - 1) {
//                       // Go to the next frame
//                       frameIndex += 1;
//                   } else {
//                       frameIndex = 0;
//                   }
//               }
//           };
//
//   		sprite.render = function () {
//
//   		  // Clear the canvas
//   		  ctx.clearRect(0, 0, sprite.width, sprite.height);
//
//   		  // Draw the animation
//   		  sprite.ctx.drawImage(
//   		    sprite.image,
//   		    frameIndex * sprite.width / numberOfFrames,
//   		    0,
//   		    sprite.width / numberOfFrames,
//   		    sprite.height,
//   		    0,
//   		    0,
//   		    sprite.width / numberOfFrames,
//   		    sprite.height);
//   		};
//
//   		return sprite;
//   	}
//
// chopper = sprite({
//   context: canvas.getContext("2d"),
//   width: 200,
//   height: 100,
//   image: chopperImage,
//   numberOfFrames: 4,
//   ticksPerFrame: 4
// });

  function setup() {
    // gameState = "pause";
    score = 0;
    chopperXPos = 400;
    chopperYPos = 300;
    ctx.drawImage(chopper, chopperXPos, chopperYPos, chopperWidth, chopperHeight);
  }

  window.onload = function() {
  setup();
};

  function play() {
    if (gameState === "pause") {
      // window.requestAnimationFrame(gameStart, canvas);
      gameState = "play";
    }
  }

  function pause() {
    if (gameState === "play") {
      gameState = "pause";
    }
  }

  function stop() {
    gameState = "stop";
  }

  //play/pause with spacebar
  document.addEventListener("keypress", (event) => {
    console.log(gameState);
    if (event.keyCode === 32) {
      if (gameState === "pause") {
        play();
      } else if (gameState === "play") {
        pause();
      }
    }
    event.preventDefault();
  });


  function gameStart() {
    console.log("i am game start");
    // debugger
    if (gameState === "play") {
      // chopper = new Chopper(100, 200);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawChopper();
      fly();
    }
  }

    // this.x = x;
    // this.y = y;
    // this.radius = radius;
    // this.color = color;

    function drawChopper () {
      console.log("i am drawChopper");
      // debugger
      if (gameState === "play") {
        ctx.drawImage(chopper, chopperXPos, chopperYPos, chopperWidth, chopperHeight);
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        // ctx.fillStyle = this.color;
        // ctx.fill();
        // ctx.closePath();
      }
    }

    function fly () {
      // debugger
      console.log("i am fly");
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
    // this.drawChopper();
  }

  function update () {
    fly();
  }

  function render () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawChopper();
  }

  document.addEventListener('keydown', (event) => {
    console.log("i am flying - keydown");
    if (event.keyCode === 87) {
      flying = true;
    }
    // event.preventDefault();
  });

  document.addEventListener('keyup', (event) => {
    console.log("i am not flying - keyup");
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


// this.update = function() {
//   if (this.y + this.radius > canvas.height) {
//     this.descRate = 0;
//     this.y = canvas.height - 30;
//     pause();
//     console.log(gameState);
//     // this.descRate = -this.descRate;
//   } else {
//     this.descRate += 1;
//   }
//   this.y += this.descRate;
// };


// sdsfds