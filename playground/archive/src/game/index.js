console.log("Webpack is working!");
import GameView from "./game_view";
import Asteroid from "./asteroid.js";
import Game from "./game";
window.addEventListener("DOMContentLoaded", event => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.height = Game.DIM_Y;
  canvasEl.width = Game.DIM_X;
  const ctx = canvasEl.getContext("2d");

  // const img = new Image();
  // img.onload = function () {
  //   ctx.drawImage(img, xOffset, yOffset);
  // };
  // img.src = "myImage.png";
  
  const game = new Game();
  const gameView = new GameView(game , ctx);
  gameView.start();

});
window.Asteroid = Asteroid;
