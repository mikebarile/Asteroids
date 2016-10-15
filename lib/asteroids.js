"use strict";
const GameView = require("./game_view.js");
const Asteroid = require("./asteroid.js")

document.addEventListener("DOMContentLoaded", function(event) {
  let canvess = document.getElementById("game-canvas");
  let ctx = canvess.getContext("2d");
  let gv = new GameView(ctx);
  gv.start();
});
