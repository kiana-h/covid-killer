console.log("Webpack is working!");
import GameView from "./game_view";
import Corona from "./corona";
import Game from "./game";
window.addEventListener("DOMContentLoaded", (event) => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.height = Game.DIM_Y;
  canvasEl.width = Game.DIM_X;
  const ctx = canvasEl.getContext("2d");

  const gameView = new GameView(ctx);
});
