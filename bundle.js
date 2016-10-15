/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const GameView = __webpack_require__(1);
	const Asteroid = __webpack_require__(3)

	document.addEventListener("DOMContentLoaded", function(event) {
	  let canvess = document.getElementById("game-canvas");
	  let ctx = canvess.getContext("2d");
	  let gv = new GameView(ctx);
	  gv.start();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const Game = __webpack_require__(2);

	const GameView = function(ctx) {
	  this.game = new Game();
	  this.ctx = ctx;
	};

	GameView.prototype.start = function () {
	  let func = function() {
	    this.game.moveObjects();
	    this.game.draw(this.ctx);
	  }

	  setInterval(func.bind(this), 20)
	};

	module.exports = GameView;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const Asteroid = __webpack_require__(3);

	const Game = function() {
	  this.DIM_X = 1000;
	  this.DIM_Y = 750;
	  this.NUM_ASTEROIDS = 17;
	  this.asteroids = [];

	  this.addAsteroids();
	}

	Game.prototype.addAsteroids = function() {
	  for (let i = 0; i < this.NUM_ASTEROIDS; i++) {
	    let ops = {
	      pos: this.randomPosition(),
	      dimX: this.DIM_X,
	      dimY: this.DIM_Y
	    };
	    this.asteroids.push(new Asteroid(ops));
	  }
	};

	Game.prototype.randomPosition = function() {
	  let x = Math.random() * this.DIM_X;
	  let y = Math.random() * this.DIM_Y;
	  return [x, y];
	};

	Game.prototype.draw = function (ctx) {
	  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
	  this.asteroids.forEach (asteroid => asteroid.draw(ctx));
	};

	Game.prototype.moveObjects = function () {
	  this.asteroids.forEach (asteroid => asteroid.move());
	};

	// Game.prototype.checkCollisions = function() {
	//   for (let i = 0; i < this.asteroids.length; i++) {
	//     let collided = false;
	//     for (let j = i + 1; j < this.asteroids.length; j++) {
	//       if (asteroid[i].isColliedWith(asteroid[j])) {
	//         alert("COLLISION")
	//       }
	//     }
	//   }
	// }

	module.exports = Game;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const Util = __webpack_require__(4);
	const MovingObject = __webpack_require__(5);

	const DEFAULTS = {
	  COLOR: "grey",
	  RADIUS: 25,
	  SPEED: 4
	}


	const Asteroid = function(ops = {}) {
	  ops.color = ops.color || DEFAULTS.COLOR;
	  ops.radius = ops.radius || DEFAULTS.RADIUS;
	  ops.speed = ops.speed || DEFAULTS.SPEED;
	  this.speed = ops.speed

	  this.vel = Util.randomVec(this.speed);
	  ops.vel = ops.vel || this.vel;

	  MovingObject.call(this, ops);
	}

	Util.inherits(MovingObject, Asteroid);
	module.exports = Asteroid;


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	const Util = {
	  inherits (parent, child) {
	    let Surrogate = function() {};
	    Surrogate.prototype = parent.prototype;
	    child.prototype = new Surrogate();
	    child.prototype.constructor = child;
	  },

	  randomVec(length) {
	    length = Math.random() * length + .75;
	    let x = Math.random() * length;
	    let y = Math.sqrt(Math.pow(length,2) - Math.pow(x, 2));
	    if (Math.random() > .5){
	      x *= -1
	    }
	    if (Math.random() > .5){
	      y *= -1
	    }

	    return [x,y];
	  }
	}

	module.exports = Util;


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	const MovingObject = function(ops) {
	  this.DIM_X = ops.dimX;
	  this.DIM_Y = ops.dimY;
	  this.pos = ops.pos;
	  this.vel = ops.vel;
	  this.radius = ops.radius;
	  this.color = ops.color;
	};

	MovingObject.prototype.draw = function(ctx) {
	  ctx.fillStyle = this.color;
	  ctx.beginPath();

	  ctx.arc(
	    this.pos[0],
	    this.pos[1],
	    this.radius,
	    0,
	    2 * Math.PI,
	    false
	  );

	  ctx.fill();
	};

	MovingObject.prototype.move = function() {
	  let x = this.pos[0] + this.vel[0];
	  let y = this.pos[1] + this.vel[1];

	  if (x < 0) {
	    x += this.DIM_X;
	  } else if (x > this.DIM_X) {
	    x -= this.DIM_X;
	  }

	  if (y < 0) {
	    y += this.DIM_Y;
	  } else if (y > this.DIM_Y) {
	    y -= this.DIM_Y;
	  }

	  this.pos = [x, y];
	  return this.pos;
	};

	MovingObject.prototype.isCollidedWith = function(otherObject) {
	  let dx = this.pos[0] - otherObject.pos[0];
	  let dy = this.pos[1] - otherObject.pos[1];
	  let distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
	  
	  if (distance < (this.radius + otherObject.radius)) {
	    return true;
	  } else {
	    return false;
	  }
	};



	module.exports = MovingObject;


/***/ }
/******/ ]);