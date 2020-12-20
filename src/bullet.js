import MovingObject from "./moving_object.js";
import Util from "./util";
import Game from "./game.js";

const DEFAULTS = {
  RADIUS: 3,
  COLOR: "#00c1d1",
  SPEED: 6,
};

class Bullet extends MovingObject {
  constructor(options = {}) {
    options.speed = DEFAULTS.SPEED;
    options.color = DEFAULTS.COLOR;
    options.radius = DEFAULTS.RADIUS;
    options.direction = [...options.game.ship.face];
    const shipPos = options.game.ship.pos;
    options.pos = [
      shipPos[0] + options.direction[0] * 10,
      shipPos[1] + options.direction[1] * 10,
    ];
    super(options);
  }
}

Bullet.prototype.wrappable = false;

export default Bullet;
