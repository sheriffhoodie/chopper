/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var instance = null;

var ImageableSingleton = function ImageableSingleton() {
  _classCallCheck(this, ImageableSingleton);

  if (!instance) {
    instance = this;

    // space background
    this.spaceBackground = new Image();
    this.spaceBackground.src = './assets/images/space-bkgd.jpg';

    // solar background
    this.solarBackground = new Image();
    this.solarBackground.src = './assets/images/sunsurface2.png';

    // chopper
    this.chopperImg = new Image();
    this.chopperImg.src = './assets/images/helicopter-spritesheet.png';
    // this.chopperImg.src = './assets/images/helispritesheet2.png';

    // rock
    this.rockImg = new Image();
    this.rockImg.src = './assets/images/asteroid2.png';

    // explosion
    this.explosionImg = new Image();
    this.explosionImg.src = './assets/images/explosion-sprite2.png';
  }

  return instance;
};

exports.default = ImageableSingleton;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sounds = __webpack_require__(2);

var _sounds2 = _interopRequireDefault(_sounds);

var _util = __webpack_require__(3);

var Util = _interopRequireWildcard(_util);

var _chopper = __webpack_require__(5);

var _chopper2 = _interopRequireDefault(_chopper);

var _explosion = __webpack_require__(6);

var _explosion2 = _interopRequireDefault(_explosion);

var _rock = __webpack_require__(7);

var _rock2 = _interopRequireDefault(_rock);

var _background = __webpack_require__(8);

var _background2 = _interopRequireDefault(_background);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    // this.canvas2 = document.getElementById('canvas2');
    // this.ctx2 = this.canvas2.getContext('2d');
    this.canvasHeight = 500;
    this.canvasWidth = 1170;
    this.score = 0;
    this.highScore = localStorage.getItem("highScore") || 0;
    this.chopper = new _chopper2.default();
    this.spacebg = new _background2.default();
    this.explosion = new _explosion2.default();
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
  }

  // Game State Modes

  _createClass(Game, [{
    key: 'play',
    value: function play() {
      _sounds2.default.menuMusic.pause();
      _sounds2.default.gameMusic.play();
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
  }, {
    key: 'pause',
    value: function pause() {
      if (this.gameState === "play") {
        _sounds2.default.gameMusic.pause();
        this.gameState = "pause";
        this.pauseStart = Date.now();
      }
    }
  }, {
    key: 'run',
    value: function run() {
      this.render();
    }
  }, {
    key: 'resetGame',
    value: function resetGame() {
      this.clear();
      this.chopper = new _chopper2.default();
      this.score = 0;
      this.rocks = [];
      // setTimeout(function () {
      this.showIntro();
      // }, 30);
      this.showGameEnd = false;
    }
  }, {
    key: 'clearScreen',
    value: function clearScreen() {
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }
  }, {
    key: 'increaseScore',
    value: function increaseScore() {
      this.endTime = Date.now();
      this.elapsedTime = this.endTime - this.startTime;
      this.score = Math.floor((this.endTime - this.startTime - this.pauseTotal) / 400);
    }
  }, {
    key: 'showIntro',
    value: function showIntro() {
      var spacebg = new Image();
      var solarbg = new Image();
      var that = this;
      // spacebg.addEventListener('load', function () {
      //   that.ctx.drawImage(spacebg, 0, 0, that.spacebg.width, that.spacebg.height);
      // });
      solarbg.addEventListener('load', function () {
        that.ctx.drawImage(solarbg, 0, that.canvas.height - 200, 1312, 200);
      }, false);
      spacebg.src = './assets/images/space-bkgd.jpg';
      solarbg.src = './assets/images/sunsurface2.png';
      this.ctx.font = '36px Orbitron';
      this.ctx.fillStyle = 'gray';
      this.ctx.fillText('Welcome to Space Chopper', 313, 100);
      this.ctx.font = '22px Orbitron';
      this.ctx.fillStyle = 'orange';
      this.ctx.fillText('Pilot the chopper as far into the asteroid field as you can!', 250, 160);
      this.ctx.font = '22px Orbitron';
      this.ctx.fillStyle = 'orange';
      this.ctx.fillText('Avoid asteroids and the top and bottom of the frame!', 272, 190);
      this.ctx.fillStyle = 'white';
      this.ctx.font = '30px Orbitron';
      this.ctx.fillText('Use "F" key to fly', 435, 250);
      this.ctx.font = '30px Orbitron';
      this.ctx.fillText('Press space bar to start', 375, 295);
    }
  }, {
    key: 'update',
    value: function update() {
      this.increaseScore();
      this.borderCrashCheck();
      this.collisionCheck();
      this.difficultyCheck();
    }
  }, {
    key: 'render',
    value: function render() {
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
      this.ctx.fillText('Score: ' + Util.formatScore(this.score), 900, 50);
      this.ctx.fillText('HI: ' + Util.formatScore(this.highScore), 969, 80);
      requestAnimationFrame(this.render.bind(this));
    }
  }, {
    key: 'renderGame',
    value: function renderGame() {
      this.spacebg.render(this.ctx);
      this.chopper.render(this.ctx);
      var rocks = new _rock2.default(this.ctx);
      // Rock.drawRocks(this.ctx);
      this.update();
    }
  }, {
    key: 'collisionCheck',
    value: function collisionCheck() {
      for (var i = 0; i < this.rocks.length; i++) {
        if (this.chopper.YPos + this.chopper.height > this.rocks[i].y + 5 && this.chopper.YPos < this.rocks[i].y + this.rocks[i].height - 15 && this.chopper.XPos + this.chopper.width > this.rocks[i].x - 5 && this.chopper.XPos + 50 < this.rocks[i].x + this.rocks[i].width) {
          this.chopper.crash = true;
          this.gameOver = true;
          this.endGame();
        }
      }
    }
  }, {
    key: 'borderCrashCheck',
    value: function borderCrashCheck(chopper) {
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
  }, {
    key: 'difficultyCheck',
    value: function difficultyCheck() {
      //move to Level 2
      if (this.score < 50) {
        _rock2.default.rockVelocity = 4;
        _rock2.default.rockInterval = 140;
      } //Level 3
      if (this.score > 50 && this.score < 100) {
        _rock2.default.rockVelocity = 5;
        _rock2.default.rockInterval = 110;
      } //Level 4
      if (this.score > 100 && this.score < 200) {
        _rock2.default.rockVelocity = 6;
        _rock2.default.rockInterval = 90;
      } //Level 5
      if (this.score > 200 && this.score < 320) {
        _rock2.default.rockVelocity = 8;
        _rock2.default.rockInterval = 70;
      } //Level 6
      if (this.score > 320 && this.score < 410) {
        _rock2.default.rockVelocity = 10;
        _rock2.default.rockInterval = 60;
      } //Level 7
      if (this.score > 410 && this.score < 550) {
        _rock2.default.rockVelocity = 12;
        _rock2.default.rockInterval = 50;
      } //Level 8
      if (this.score > 550 && this.score < 800) {
        _rock2.default.rockVelocity = 14;
        _rock2.default.rockInterval = 40;
      } //Level 9
      if (this.score > 800 && this.score < 1000) {
        _rock2.default.rockVelocity = 16;
        _rock2.default.rockInterval = 33;
      } //Level Hanhee
      if (this.score >= 1001) {
        _rock2.default.rockVelocity = 18;
        _rock2.default.rockInterval = 25;
      }
    }
  }, {
    key: 'endGame',
    value: function endGame() {
      if (this.gameOver === true) {
        _sounds2.default.explosion.play();
        this.explosion.render(this.ctx, this.chopper);
        this.showGameEnd = true;
        this.renderGameOver();
        var that = this;
        setTimeout(function () {
          that.pause();
        }, 150);
      }
      if (this.score > this.highScore) {
        localStorage.setItem("highScore", this.score);
      }
    }
  }, {
    key: 'renderGameOver',
    value: function renderGameOver() {
      this.ctx.font = '48px Orbitron';
      this.ctx.fillStyle = 'white';
      this.ctx.fillText('GAME OVER', 439, 230);
      this.ctx.font = "30px Orbitron";
      this.ctx.fillStyle = "orange";
      this.ctx.fillText('Your Score: ' + this.score, 482, 290);
      this.ctx.fillStyle = "white";
      this.ctx.font = '30px Orbitron';
      this.ctx.fillText('press R to restart', 453, 350);
    }
  }]);

  return Game;
}();

exports.default = Game;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// import {Howl} from 'howler';

var soundFX = {
  explosion: new Audio('./assets/sounds/explosion.flac'),
  menuMusic: new Audio('./assets/sounds/clearside-assimilator.wav'),
  gameMusic: new Audio('./assets/sounds/space-hiphop-beat2.mp3')
};

exports.default = soundFX;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var keyboardListeners = exports.keyboardListeners = function keyboardListeners(game) {
  document.addEventListener("keypress", function (event) {
    switch (event.keyCode) {
      case 32:
        event.preventDefault();
        if (game.gameOver !== true) {
          if (game.gameState === "pause") {
            game.showTitles = false;
            game.play();
          } else if (game.gameState === "play") {
            game.pause();
          }
        }
        break;
      case 82:
        console.log("trying to reset");
        game.resetGame();
        break;
      default:
        break;
    }
  });
};

var formatScore = exports.formatScore = function formatScore(score) {
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
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(1);

var _game2 = _interopRequireDefault(_game);

var _sounds = __webpack_require__(2);

var _sounds2 = _interopRequireDefault(_sounds);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var settings = {
  muted: true,
  muteButton: document.querySelector("#mute-button")
};
// import {Howl} from 'howler';

_sounds2.default.menuMusic.muted = true;
_sounds2.default.gameMusic.muted = true;
_sounds2.default.explosion.muted = true;
_sounds2.default.menuMusic.loop = true;
_sounds2.default.gameMusic.currentTime = 11;
_sounds2.default.gameMusic.loop = true;
_sounds2.default.gameMusic.volume = 0.8;
var muteCheck = true;
_sounds2.default.menuMusic.play();

settings.muteButton.addEventListener('click', function () {
  settings.muted = !settings.muted;
  if (event.clientX !== 0) {
    muteCheck = !muteCheck;
    _sounds2.default.gameMusic.muted = !_sounds2.default.gameMusic.muted;
    _sounds2.default.menuMusic.muted = !_sounds2.default.menuMusic.muted;
    _sounds2.default.explosion.muted = !_sounds2.default.explosion.muted;
    if (_sounds2.default.gameMusic.muted === true) {
      localStorage.setItem("gameMusic.muted", "true");
    } else {
      localStorage.setItem("gameMusic.muted", "false");
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var game = new _game2.default();
  window.onload = function () {
    game.run();
  };
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(3);

var Util = _interopRequireWildcard(_util);

var _imageable = __webpack_require__(0);

var _imageable2 = _interopRequireDefault(_imageable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Chopper = function () {
  function Chopper() {
    _classCallCheck(this, Chopper);

    var images = new _imageable2.default();
    this.chopper = images.chopperImg;
    this.width = 208;
    this.height = 62;
    this.XPos = 75;
    this.YPos = 100;
    this.chopFrameWidth = 423;
    this.chopFrameHeight = 150;
    this.chopFrameSpeed = 3;
    this.currentFrame = 0;
    this.chopEndFrame = 3;
    this.chopFramesPerRow = 1;
    this.spriteIndex = 0;
    this.crash = false;
    this.flying = false;
    this.startFlyRate = 4;
    this.startDescRate = 5;
    this.lift = 0.8;
    this.gravity = 1.2;
    this.termVel = 10;
    this.chopperFlight();
  }

  _createClass(Chopper, [{
    key: 'update',
    value: function update() {
      this.currentFrame = (this.currentFrame + 1) % this.chopEndFrame;
    }
  }, {
    key: 'render',
    value: function render(ctx) {
      if (this.spriteIndex > 3) {
        this.spriteIndex = 0;
      }
      this.update();
      var row = Math.floor(this.currentFrame / this.chopFramesPerRow);
      var col = Math.floor(this.currentFrame % this.chopFramesPerRow);
      ctx.drawImage(this.chopper, col * this.chopFrameWidth, row * this.chopFrameHeight, this.chopFrameWidth, this.chopFrameHeight, this.XPos, this.YPos, this.width, this.height);
      this.spriteIndex++;
      this.fly();
    }

    //simplify equation with vertical velocity that decreases proportionately
    //and then increases upward velocity with accelaration, curving the flying

  }, {
    key: 'fly',
    value: function fly() {
      if (this.flying && this.crash === false) {
        this.flyRate = this.startFlyRate;
        this.YPos = this.YPos - this.flyRate;

        if (this.flyRate < this.termVel) {
          this.flyRate += this.lift;
        }
      } else if (!this.flying && this.crash === false) {
        this.descRate = this.startDescRate;
        this.YPos = this.YPos + this.descRate;

        if (this.descRate < this.termVel) {
          this.descRate += this.gravity;
        }
      }
    }
  }, {
    key: 'chopperFlight',
    value: function chopperFlight() {
      var _this = this;

      document.addEventListener('keydown', function (event) {
        if (event.keyCode === 70) {
          _this.flying = true;
        }
      });

      document.addEventListener('keyup', function (event) {
        if (event.keyCode === 70) {
          _this.flying = false;
        }
      });
    }
  }]);

  return Chopper;
}();

exports.default = Chopper;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _imageable = __webpack_require__(0);

var _imageable2 = _interopRequireDefault(_imageable);

var _game = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Explosion = function () {
  function Explosion() {
    _classCallCheck(this, Explosion);

    var images = new _imageable2.default();
    this.explosion = images.explosionImg;
    this.spriteIndex = 0;
    this.frameWidth = 64;
    this.frameHeight = 64;
    this.expFramesPerRow = Math.floor(this.explosion.width / this.frameWidth);
    this.rows = 4;
    this.cols = 4;
  }

  _createClass(Explosion, [{
    key: 'render',
    value: function render(ctx, chopper) {
      if (this.spriteIndex > 15) {
        return;
      }
      var x = this.spriteIndex % (this.cols - 1) * this.frameWidth;
      var y = parseInt(this.spriteIndex / (this.rows - 1)) * this.frameHeight;
      ctx.drawImage(this.explosion, x, y, this.frameWidth, this.frameHeight, chopper.XPos, chopper.YPos - chopper.height, 300, 300);
      this.spriteIndex++;
    }
  }]);

  return Explosion;
}();

exports.default = Explosion;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _imageable = __webpack_require__(0);

var _imageable2 = _interopRequireDefault(_imageable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rock = function () {
  function Rock(ctx) {
    _classCallCheck(this, Rock);

    var images = new _imageable2.default();
    this.rock = images.rockImg;
    this.rockList = [];
    this.rockCount = 0;
    this.rockVelocity = 4;
    this.rockInterval = 140;
    this.drawRocks(ctx);
  }

  _createClass(Rock, [{
    key: 'addRock',
    value: function addRock(game) {
      var newRock = {};
      newRock.width = Math.floor(Math.random() * (140 - 80) + 80);
      newRock.height = Math.floor(Math.random() * (130 - 110) + 110);
      newRock.x = game.canvasWidth;
      newRock.y = Math.floor(Math.random() * game.canvasHeight - newRock.height);
      this.rockList.push(newRock);
    }
  }, {
    key: 'drawRocks',
    value: function drawRocks(ctx) {
      this.rockCount++;
      for (var i = 0; i < this.rockList.length; i++) {
        if (this.rockList[i].x < 0 - this.rockList[i].width) {
          this.rockList.splice(i, 1);
        } else {
          this.rockList[i].x -= this.rockVelocity;
          ctx.drawImage(this.rock, this.rockList[i].x, this.rockList[i].y, this.rockList[i].width, this.rockList[i].height);

          if (this.rockCount >= this.rockInterval) {
            this.addRock();
            this.rockCount = 0;
          }
        }
      }
    }
  }]);

  return Rock;
}();

exports.default = Rock;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _imageable = __webpack_require__(0);

var _imageable2 = _interopRequireDefault(_imageable);

var _game = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var spaceBackground = function () {
  function spaceBackground() {
    _classCallCheck(this, spaceBackground);

    var images = new _imageable2.default();
    this.spaceBkgd = images.spaceBackground;
    this.height = 500;
    this.width = 1170;
    this.spaceBgVelocity = 10;
    this.spaceScrollX = 0;
    this.solarBgHeight = 220;
    this.solarBgWidth = 1112;
    this.solarBgVelocity = 12;
    this.solarScrollX = 0;
  }

  _createClass(spaceBackground, [{
    key: 'render',
    value: function render(ctx) {
      if (this.spaceScrollX >= this.width) {
        this.spaceScrollX = 0;
      }
      this.spaceScrollX += this.spaceBgVelocity;

      ctx.drawImage(this.spaceBkgd, -this.spaceScrollX, 0, this.width, this.height);
      ctx.drawImage(this.spaceBkgd, this.width - this.spaceScrollX, 0, this.width, this.height);
    }

    // drawSolarBackground () {
    //   solarBackground.src = "images/sunsurface2.png";
    //   if (solarScrollX >= canvas.width) {
    //     solarScrollX = 0;
    //   }
    //   solarScrollX += solarBgVelocity;
    //   this.ctx.drawImage(
    // solarBackground, -solarScrollX, 0, solarBgWidth, solarBgHeight);
    //   this.ctx.drawImage(solarBackground, canvas.width - solarScrollX,
    // canvas.height - solarBgHeight, solarBgWidth, solarBgHeight);
    // }

  }]);

  return spaceBackground;
}();

exports.default = spaceBackground;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map