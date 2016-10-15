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
