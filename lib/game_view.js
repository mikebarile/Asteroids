"use strict";
const Game = require("./game.js");

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
