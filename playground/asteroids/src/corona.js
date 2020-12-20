import MovingObject from "./moving_object";
import Util from "./util";
import Game from "./game.js";
import Ship from "./ship.js";
import Bullet from "./bullet.js";

const DEFAULTS = {
  COLOR: "#c90579",
  RADIUS: 25,
  SPEED: 1
};

class Asteroid extends MovingObject {
  constructor(options = {}) {
    options.color = DEFAULTS.COLOR;
    options.radius = DEFAULTS.RADIUS;
    options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);
    options.pos = options.pos || Game.randomPos();
    super(options);
  }

  draw(ctx) {
    // ctx.fillStyle = this.color;
    // ctx.beginPath();
    // ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
    // ctx.fill();
    // ctx.closePath();

    // var svg = document.querySelector("svg");
    // var svgns = "http://www.w3.org/2000/svg";

    // // get the center
    // var el = document.querySelector("path");
    // var bbox = el.getBBox();
    // var center = {
    //   x: bbox.left + bbox.width / 2,
    //   y: bbox.top + bbox.height / 2,
    // };

    // // create the dot
    // var dot = document.createElementNS(svgns, circle);
    // dot.setAttribute("cx", center.x);
    // dot.setAttribute("cy", center.y);
    // dot.setAttribute("r", 10);
    // svg.appendChild(dot);

      const pos = this.pos;
      ctx.drawImage(Asteroid.image, pos[0]-25, pos[1]-25, 50, 50);
      
      
  }

  collide(other) {
    if (other instanceof Asteroid) {
      // this.remove();
      // other.remove();
    }
    if (other instanceof Ship) {
      other.remove();
    }
    if (other instanceof Bullet) {
      this.remove();
    }
  }
}; 


const img = new Image();
img.src = "../virus.png";
Asteroid.image = img; 

export default Asteroid;