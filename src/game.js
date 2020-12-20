import Corona from "./corona";
import Ship from "./ship";
import Bullet from "./bullet";
import Util from "./util";
import Cell from "./cell";

class Game {
  constructor(coronaCount = 3, cellCount = 10, speed = 1, lives = 3, mode) {
    this.coronas = [];
    this.cells = [];
    this.coronaCount = coronaCount;
    this.cellCount = cellCount;
    this.speed = speed;
    this.over = false;
    this.bullets = [];
    this.lives = lives;

    this.ship = new Ship({ game: this });
    const time = mode === "preview" ? 0 : 4000;
    setTimeout(() => {
      this.addCoronas();
      this.addCells();
    }, time);
  }

  addCoronas() {
    for (let i = 0; i < this.coronaCount; i++) {
      const corona = new Corona({ game: this, speed: this.speed });
      this.coronas.push(corona);
    }
  }

  addCells() {
    for (let i = 0; i < this.cellCount; i++) {
      const cell = new Cell({ game: this, speed: this.speed });
      this.cells.push(cell);
    }
  }

  updateSpeed(speed) {
    this.speed = speed;
    this.coronas.forEach((corona) => {
      corona.speed = this.speed;
    });
    this.cells.forEach((cell) => {
      cell.speed = this.speed;
    });
  }

  addBullet(bullet) {
    this.bullets.push(bullet);
  }

  static randomPos() {
    const x = Math.floor(Math.random() * (Game.DIM_X - 30)) + 15;
    const y = Math.floor(Math.random() * (Game.DIM_Y - 30)) + 15;
    return [x, y];
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    var grd = ctx.createRadialGradient(600, 400, 10, 600, 400, 600);
    var grd = ctx.createLinearGradient(0, 0, 0, 800);
    grd.addColorStop(0, "#184065");
    // grd.addColorStop(0, "#46bfcf");
    grd.addColorStop(1, "#000000");

    ctx.fillStyle = grd;
    ctx.fill();

    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.allObjects().forEach((el) => el.draw(ctx));
  }

  moveObjects(delta) {
    this.allObjects().forEach((el) => el.move(delta));
  }

  remove(object) {
    if (object instanceof Corona) {
      const index = this.coronas.indexOf(object);
      this.coronas.splice(index, 1);
      if (!this.coronas.length) {
        setTimeout(() => {
          this.over = "win";
          this.bullets = [];
        }, 500);
      }
    } else if (object instanceof Cell) {
      const index = this.cells.indexOf(object);
      this.cells.splice(index, 1);
      const corona = new Corona({
        game: this,
        pos: object.pos,
        speed: this.speed,
      });
      this.coronas.push(corona);
      if (!this.cells.length) {
        this.over = "lose";
        this.bullets = [];
      }
    } else if (object instanceof Ship) {
      this.lives -= 1;
      object.relocate();
      if (this.lives === 0) this.over = "killed";
    } else if (object instanceof Bullet) {
      const index = this.bullets.indexOf(object);
      this.bullets.splice(index, 1);
    }
  }

  outOfBound(pos, radius) {
    return (
      pos[0] < 0 + radius ||
      pos[1] < 0 + radius ||
      pos[0] > Game.DIM_X - radius ||
      pos[1] > Game.DIM_Y - radius
    );
  }

  wrap(pos) {
    return [Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)];
  }

  allObjects() {
    return [].concat(this.coronas, this.ship, this.bullets, this.cells);
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

  moveShip(direction) {
    this.ship.power(direction);
  }

  fire() {
    this.ship.fireBullet();
  }
}

Game.BG_COLOR = "#000000";
Game.DIM_X = 1200; //window.innerWidth;
Game.DIM_Y = 800; //window.innerHeight;
// Game.DIM_X = window.screen.width;
// Game.DIM_Y = window.screen.height;
Game.FPS = 32;

export default Game;
