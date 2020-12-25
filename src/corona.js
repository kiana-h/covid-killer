import MovingObject from "./moving_object";
import Util from "./util";
import Game from "./game.js";
import Ship from "./ship.js";
import Bullet from "./bullet.js";
import Cell from "./cell.js";

const DEFAULTS = {
  COLOR: "#c90579",
  RADIUS: 25,
  SPEED: 1,
};

class Corona extends MovingObject {
  constructor(options = {}) {
    options.speed = options.speed || DEFAULTS.SPEED;
    options.color = DEFAULTS.COLOR;
    options.radius = DEFAULTS.RADIUS;
    options.direction = options.direction || Util.randomVec();
    options.pos = options.pos || Game.randomPos();
    super(options);
  }

  draw(ctx) {
    const pos = this.pos;
    ctx.drawImage(Corona.image, pos[0] - 25, pos[1] - 25, 50, 50);
  }

  collide(other) {
    if (other instanceof Corona) {
      this.bounce(this, other);
    }
    if (other instanceof Cell) {
      other.remove();
    }
    if (other instanceof Ship) {
      other.remove();
    }
    if (other instanceof Bullet) {
      this.remove();
    }
  }
  bounce(obj1, obj2) {
    const [p1, p2] = [obj1.pos, obj2.pos];
    const [d1, d2] = [obj1.direction, obj2.direction];
    const [s1, s2] = [obj1.speed, obj2.speed];

    //calculate velocity based on direction and speed
    // const [v1, v2] = [
    //   [d1[0] * s1, d1[1] * s1],
    //   [d2[0] * s2, d1[2] * s2],
    // ];

    //get vector of collision (arrow between the center of two objects)
    const vCollision = { x: p2[0] - p1[0], y: p2[1] - p1[1] };

    //calculate distance between two objects
    const distance = Math.sqrt(
      Math.pow(obj2.pos[0] - obj1.pos[0], 2) +
        Math.pow(obj2.pos[1] - obj1.pos[1], 2)
    );

    //scale the vector of collision to get the collision normal / direction
    const vCollisionNorm = {
      x: vCollision.x / distance,
      y: vCollision.y / distance,
    };

    //calculate relative velocity
    const vRelativeVelocity = { x: d1[0] - d2[0], y: d1[1] - d2[1] };

    //calculate speed based on relative velocity and normal vector
    const speed =
      vRelativeVelocity.x * vCollisionNorm.x +
      vRelativeVelocity.y * vCollisionNorm.y;

    //if objects are moving away from eachother no further change is needed
    if (speed < 0) {
      return;
    }

    //move objects in opposite directions
    obj1.direction[0] -= speed * vCollisionNorm.x;
    obj1.direction[1] -= speed * vCollisionNorm.y;
    obj2.direction[0] += speed * vCollisionNorm.x;
    obj2.direction[1] += speed * vCollisionNorm.y;
  }
}

const img = new Image();
img.src = "./assets/virus.png";
Corona.image = img;

export default Corona;
