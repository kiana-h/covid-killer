import Util from "./util";

class MovingObject {
  constructor(options){
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
  }

  draw(ctx){
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }

  move(delta){
    delta = delta/10 || 1;
    const x = this.pos[0] + this.vel[0]*delta;
    const y = this.pos[1] + this.vel[1]*delta;
    this.pos = [x,y];
    if (this.game.outOfBound(this.pos)){
      if (this.wrappable) {
        this.pos = this.game.wrap([x, y]);
      } else {
        this.remove();
      }
    }
  }

  isCollidingWith(other){
    return Util.dist(this.pos , other.pos) < (this.radius + other.radius);
  }

  remove(){
    this.game.remove(this);
  }

  collide(other){

  }
    
}

MovingObject.prototype.wrappable = true;


export default MovingObject;
