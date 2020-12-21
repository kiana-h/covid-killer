console.log("Webpack is working!");
import GameView from "./game_view";
import Game from "./game";
window.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.height = window.innerHeight - 200;
  canvasEl.width = window.innerWidth;
  const ctx = canvasEl.getContext("2d");
  const gameView = new GameView(ctx);

  $(window).on("resize", () => {
    canvasEl.height = window.innerHeight - 200;
    canvasEl.width = window.innerWidth;
  });
});
