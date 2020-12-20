import Asteroid from "./asteroid";
import Ship from "./ship";
import Bullet from "./bullet";
import Util from "./util";

class Game {
  constructor() {
    this.asteroids = [];
    this.addAsteroids();
    this.ship = new Ship({ game: this });
    this.over = false;
    this.bullets = [];
  }
  addAsteroids() {
    for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
      const asteroid = new Asteroid({ game: this });
      this.asteroids.push(asteroid);
    }
  }

  addBullet(bullet) {
    this.bullets.push(bullet);
  }

  static randomPos() {
    const x = Math.floor(Math.random() * Game.DIM_X);
    const y = Math.floor(Math.random() * Game.DIM_Y);
    return [x, y];
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
    // const grd = ctx.createRadialGradient(
    //   Game.DIM_X / 2,
    //   Game.DIM_Y / 2,
    //   10,
    //   Game.DIM_X / 2,
    //   Game.DIM_Y / 2,
    //   Game.DIM_X
    // );
    // grd.addColorStop(0, "white");
    // grd.addColorStop(1, "#79dac6");

    // // Fill with gradient
    // ctx.fillStyle = grd;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.allObjects().forEach((el) => el.draw(ctx));
  }

  moveObjects(delta) {
    this.allObjects().forEach((el) => el.move(delta));
  }

  remove(object) {
    if (object instanceof Asteroid) {
      const index = this.asteroids.indexOf(object);
      this.asteroids.splice(index, 1);
      if (this.asteroids.length == 0) {
        this.over = true;
        this.bullets = [];
      }
    } else if (object instanceof Ship) {
      this.gameOver();
    } else if (object instanceof Bullet) {
      const index = this.bullets.indexOf(object);
      this.bullets.splice(index, 1);
    }
  }

  outOfBound(pos) {
    return (
      pos[0] < 0 || pos[1] < 0 || pos[0] > Game.DIM_X || pos[1] > Game.DIM_Y
    );
  }

  wrap(pos) {
    return [Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)];
  }

  allObjects() {
    return [].concat(this.asteroids, this.ship, this.bullets);
  }

  checkCollisions() {
    let all = this.allObjects();

    for (let i = 0; i < all.length - 1; i++) {
      for (let j = i + 1; j < all.length; j++) {
        if (all[i].isCollidingWith(all[j])) {
          all[i].collide(all[j]);
        }
      }
    }
  }

  step(delta) {
    this.moveObjects(delta);
    this.checkCollisions();
  }

  gameOver() {
    // this.over = true;
    this.ship.relocate();
  }

  moveShip(direction) {
    this.ship.power(direction);
  }

  fire() {
    this.ship.fireBullet();
  }
}


Game.BG_COLOR = "#000000";
Game.DIM_X = 1200;
Game.DIM_Y = 600;
// Game.DIM_X = window.screen.width;
// Game.DIM_Y = window.screen.height;
Game.FPS = 32;
Game.NUM_ASTEROIDS = 1;


export default Game;