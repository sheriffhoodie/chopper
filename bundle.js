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
    this.canvasHeight = 500;
    this.canvasWidth = 1170;
    this.score = 0;
    this.chopper = new _chopper2.default();
    this.spacebg = new _background2.default();
    this.explosion = new _explosion2.default();
    this.rock = new _rock2.default();
    this.showTitles = true;
    this.showGameEnd = false;
    this.gameOver = false;
    this.rocks = [];
    this.highScore = 0;
    this.gameState = "pause";
    this.pauseTotal = 0;
    this.pauseStart = undefined;
    this.startTime = undefined;
    this.endTime = undefined;
    this.elapsedTime = undefined;
    if (localStorage.getItem("gameMusic.muted") === "false") {
      _sounds2.default.gameMusic.muted = false;
      _sounds2.default.menuMusic.muted = false;
      _sounds2.default.explosion.muted = false;
    }
    Util.keyboardListeners(this);
    var that = this;
    setTimeout(function () {
      that.showIntro();
    }, 200);
    this.addRock();
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
    key: 'resetGame',
    value: function resetGame() {
      location.reload();
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
      var solarbg = new Image();
      var that = this;
      solarbg.addEventListener('load', function () {
        that.ctx.drawImage(solarbg, 0, that.canvas.height - 200, 1312, 200);
      }, false);
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
      this.highScore = localStorage.getItem("highScore") || 0;
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
      this.drawRocks();
      this.update();
    }
  }, {
    key: 'addRock',
    value: function addRock() {
      var newRock = {};
      newRock.width = Math.floor(Math.random() * (140 - 80) + 80);
      newRock.height = Math.floor(Math.random() * (130 - 110) + 110);
      newRock.x = this.canvasWidth;
      newRock.y = Math.floor(Math.random() * this.canvasHeight - newRock.height);
      this.rocks.push(newRock);
    }
  }, {
    key: 'drawRocks',
    value: function drawRocks() {
      this.rock.rockCount++;
      for (var i = 0; i < this.rocks.length; i++) {
        if (this.rocks[i].x < 0 - this.rocks[i].width) {
          this.rocks.splice(i, 1);
        } else {
          this.rocks[i].x -= this.rock.rockVelocity;
          this.ctx.drawImage(this.rock.rock, this.rocks[i].x, this.rocks[i].y, this.rocks[i].width, this.rocks[i].height);

          if (this.rock.rockCount >= this.rock.rockInterval) {
            this.addRock();
            this.rock.rockCount = 0;
          }
        }
      }
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
        this.rock.rockVelocity = 4;
        this.rock.rockInterval = 140;
      } //Level 3
      if (this.score > 50 && this.score < 100) {
        this.rock.rockVelocity = 5;
        this.rock.rockInterval = 110;
        this.rock.rock.src = './assets/images/spaceship2.png';
      } //Level 4
      if (this.score > 100 && this.score < 200) {
        this.rock.rockVelocity = 6;
        this.rock.rockInterval = 90;
        this.rock.rock.src = './assets/images/asteroid3.png';
      } //Level 5
      if (this.score > 200 && this.score < 320) {
        this.rock.rockVelocity = 8;
        this.rock.rockInterval = 70;
        this.rock.rock.src = './assets/images/asteroid2.png';
      } //Level 6
      if (this.score > 320 && this.score < 410) {
        this.rock.rockVelocity = 10;
        this.rock.rockInterval = 60;
      } //Level 7
      if (this.score > 410 && this.score < 550) {
        this.rock.rockVelocity = 12;
        this.rock.rockInterval = 50;
        this.rock.rock.src = './assets/images/spaceship.png';
      } //Level 8
      if (this.score > 550 && this.score < 800) {
        this.rock.rockVelocity = 14;
        this.rock.rockInterval = 40;
        this.rock.rock.src = './assets/images/asteroid3.png';
      } //Level 9
      if (this.score > 800 && this.score < 1000) {
        this.rock.rockVelocity = 16;
        this.rock.rockInterval = 33;
      } //Level 10
      if (this.score >= 1001) {
        this.rock.rockVelocity = 18;
        this.rock.rockInterval = 25;
      }
    }
  }, {
    key: 'endGame',
    value: function endGame() {
      if (this.gameOver === true) {
        _sounds2.default.explosion.play();
        this.explosion.render(this.ctx, this.chopper);
        this.chopper.chopper.src = "";
        this.showGameEnd = true;
        this.renderGameOver();
        if (this.score > this.highScore) {
          localStorage.setItem("highScore", this.score);
        }
        var that = this;
        setTimeout(function () {
          that.pause();
        }, 150);
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
      this.ctx.fillText('press Enter to restart', 423, 350);
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

var soundFX = {
  explosion: new Audio('./assets/sounds/explosion.flac'),
  menuMusic: new Audio('./assets/sounds/twilight.mp3'),
  // gameMusic: new Audio('./assets/sounds/space-hiphop-beat2.mp3'),
  gameMusic: new Audio('./assets/sounds/space-hiphop-beat1.mp3')
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
      case 13:
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

_sounds2.default.menuMusic.muted = true;
_sounds2.default.gameMusic.muted = true;
_sounds2.default.explosion.muted = true;
_sounds2.default.menuMusic.loop = true;
_sounds2.default.gameMusic.currentTime = 11;
_sounds2.default.gameMusic.loop = true;
_sounds2.default.gameMusic.volume = 0.9;
_sounds2.default.menuMusic.play();

settings.muteButton.addEventListener('click', function () {
  settings.muted = !settings.muted;
  if (event.clientX !== 0) {
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
    setTimeout(function () {
      game.render();
    }, 150);
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

var _imageable = __webpack_require__(0);

var _imageable2 = _interopRequireDefault(_imageable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rock = function Rock(ctx) {
  _classCallCheck(this, Rock);

  var images = new _imageable2.default();
  this.rock = images.rockImg;
  this.rockList = [];
  this.rockCount = 0;
  this.rockVelocity = 4;
  this.rockInterval = 140;
};

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
  }]);

  return spaceBackground;
}();

exports.default = spaceBackground;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map