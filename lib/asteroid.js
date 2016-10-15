"use strict";
const Util = require('./utils.js');
const MovingObject = require('./moving_objects.js');

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
