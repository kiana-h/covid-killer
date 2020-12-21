import MovingObject from "./moving_object.js";
import Util from "./util";
import Game from "./game.js";
import Bullet from "./bullet.js";

const DEFAULTS = {
  RADIUS: 20,
  COLOR: "white",
  SPEED: 1.5,
};

class Ship extends MovingObject {
  constructor(options = {}) {
    options.speed = DEFAULTS.SPEED;
    options.color = options.color || DEFAULTS.COLOR;
    options.radius = DEFAULTS.RADIUS;
    options.pos = options.pos || [600, 400];
    options.direction = options.direction || [0, 0];
    super(options);
    this.face = [1, 0];
  }

  relocate() {
    this.pos = Game.randomPos();
  }

  power(direction) {
    this.direction[0] = direction[0] * DEFAULTS.SPEED;
    this.direction[1] = direction[1] * DEFAULTS.SPEED;
    if (direction[0] != 0 || direction[1] != 0) this.face = direction;
  }
  draw(ctx) {
    const pos = this.pos;
    ctx.drawImage(Ship.image, pos[0] - 25, pos[1] - 25, 50, 50);
  }
  fireBullet() {
    // if (this.direction[0] === 0 && this.direction[1] === 0) return;
    const bullet = new Bullet({ game: this.game });
    this.game.addBullet(bullet);
  }
}
const img = new Image();
img.src = "./assets/ship.png";
Ship.image = img;
export default Ship;
