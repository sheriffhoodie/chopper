document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext('2d');

  // Variable that may change during gameplay
  let gameState = "play";
  let chopper;
  let score;
  var flying = false;
  let startFlyRate = 1;
  let startDescRate = 200;
  let flyRate;
  let descRate;
  let lift = .08;
  let gravity = 1;
  let termVel = 5;
  // const width = 300;
  // const height = 200;
  // let x = 200;
  // let y = 100;

  function setup() {
    // gameState = "pause";
    score = 0;
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
    // event.preventDefault();
  });

  function gameStart() {
    console.log("i am game start");
    debugger
    if (gameState === "play") {
      chopper = new Chopper(200, 150, 30, 'red');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // flying = true;
      chopper.drawChopper();
      chopper.fly();
      // window.requestAnimationFrame(gameStart, canvas);
    }
  }

  function Chopper(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.drawChopper = function () {
      console.log("i am drawChopper");
      debugger
      if (gameState === "play") {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
      }
    };

    this.fly = function() {
      debugger
      console.log("i am fly");
      if(flying) {
        flyRate = startFlyRate;
        this.y = this.y - flyRate;

        if(flyRate < termVel) {
            flyRate += lift;
        }
    } else {
      descRate = startDescRate;
        this.y = this.y + descRate;

        if(!(descRate > termVel)) {
            descRate += gravity;
        }
    }
    // this.drawChopper();
  };

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
      // if (gameState !== "pause") {
      //   gameStart();
      //   // chopper.update();
      // }
    }
  }
  gameStart();
  startAnimation(30);

});
















// sdsfds
