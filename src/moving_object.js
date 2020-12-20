import Util from "./util";

class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.radius = options.radius;
    this.color = options.color;
    this.speed = options.speed;
    this.direction = options.direction;
    this.game = options.game;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }

  move(delta) {
    delta = delta / 10 || 1;
    const x = this.pos[0] + this.direction[0] * this.speed * delta;
    const y = this.pos[1] + this.direction[1] * this.speed * delta;
    this.pos = [x, y];
    if (this.game.outOfBound(this.pos, this.radius)) {
      if (this.wrappable) {
        this.pos = this.game.wrap([x, y]);
      } else {
        this.remove();
      }
    }
  }

  isCollidingWith(other) {
    return Util.dist(this.pos, other.pos) < this.radius + other.radius;
  }

  remove() {
    this.game.remove(this);
  }

  collide(other) {}
}

MovingObject.prototype.wrappable = true;

export default MovingObject;
