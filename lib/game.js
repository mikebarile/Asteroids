"use strict";
const Asteroid = require('./asteroid.js');

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
