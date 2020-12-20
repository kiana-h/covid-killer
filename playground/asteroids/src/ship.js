import MovingObject from './moving_object.js';
import Util from "./util";
import Game from "./game.js";
import Bullet from "./bullet.js";

const DEFAULTS = {
  RADIUS: 10,
  COLOR: "white",
  SPEED: 1.5
};

class Ship extends MovingObject{
    constructor(options={}){
        options.color = options.color || DEFAULTS.COLOR;
        options.radius = DEFAULTS.RADIUS;
        options.pos = options.pos || Game.randomPos();
        options.vel = options.vel || [0,0];
        super(options);
    }

    relocate(){
        this.pos = Game.randomPos();
    }

    power(direction){
        this.vel[0] = direction[0] * DEFAULTS.SPEED;
        this.vel[1] = direction[1] * DEFAULTS.SPEED;
    }
    fireBullet(){
        const bullet = new Bullet({game: this.game});
        this.game.addBullet(bullet);
    }
}

export default Ship;
