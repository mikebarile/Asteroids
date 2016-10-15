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
