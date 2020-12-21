import MovingObject from "./moving_object";
import Util from "./util";
import Game from "./game.js";
import Ship from "./ship.js";
import Bullet from "./bullet.js";

const DEFAULTS = {
  COLOR: "#5cdb94",
  RADIUS: 25,
  SPEED: 1,
};

class Cell extends MovingObject {
  constructor(options = {}) {
    options.speed = options.speed || DEFAULTS.SPEED;
    options.color = DEFAULTS.COLOR;
    options.radius = DEFAULTS.RADIUS;
    options.direction = options.direction || Util.randomVec();
    options.pos = options.pos || Game.randomPos();
    super(options);
    this.speed = this.speed || 1;
  }

  draw(ctx) {
    const pos = this.pos;
    ctx.drawImage(Cell.image, pos[0] - 25, pos[1] - 25, 50, 50);
  }
}
const img = new Image();
img.src = `./assets/cell3.png`;
Cell.image = img;

export default Cell;
