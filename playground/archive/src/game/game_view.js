import Game from "./game.js";

class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  start() {
    // this.bindKeyHandlers();
    // setInterval(this.step.bind(this),10);
    this.bindKeyHandlers();
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  step(delta) {
    this.game.step(delta);
    this.game.draw(this.ctx);
  }

  animate(time) {
    const delta = time - this.lastTime;
    this.step(delta);
    this.lastTime = time;
    if (!this.game.over) {
      requestAnimationFrame(this.animate.bind(this));
    } else {
      this.gameOver();
    }
  }
  gameOver() {
    this.ctx.font = "48px sans-serif";
    this.ctx.fillStyle = "#ff7665";
    this.ctx.fillText("YOU BEAT CORONA!", 100, 100);
  }

  bindKeyHandlers() {
    const game = this.game;

    for (let k of Object.keys(GameView.MOVES)) {
      const move = GameView.MOVES[k];
      key(k, function () {
        game.moveShip(move);
      });
    }
    key("space", function () {
      game.fire();
    });
  }
}

GameView.MOVES = {
  w: [0, -1],
  a: [-1, 0],
  s: [0, 1],
  d: [1, 0],
};

export default GameView;
