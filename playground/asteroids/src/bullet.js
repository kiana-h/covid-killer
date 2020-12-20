import MovingObject from "./moving_object.js";
import Util from "./util";
import Game from "./game.js";


const DEFAULTS = {
  RADIUS: 3,
  COLOR: "#f7f8fa",
  SPEED: 4,
};

class Bullet extends MovingObject{
    constructor(options = {}){
        options.color = DEFAULTS.COLOR;
        options.radius = DEFAULTS.RADIUS;
        options.pos = options.game.ship.pos;

        options.vel = options.game.ship.vel.map(el => el*DEFAULTS.SPEED);
        super(options);
    }

}

Bullet.prototype.wrappable = false;

export default Bullet;