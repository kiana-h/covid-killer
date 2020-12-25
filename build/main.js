/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/bullet.js":
/*!***********************!*\
  !*** ./src/bullet.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _moving_object_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moving_object.js */ "./src/moving_object.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/util.js");
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game.js */ "./src/game.js");




const DEFAULTS = {
  RADIUS: 3,
  COLOR: "#00c1d1",
  SPEED: 6,
};

class Bullet extends _moving_object_js__WEBPACK_IMPORTED_MODULE_0__.default {
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Bullet);


/***/ }),

/***/ "./src/cell.js":
/*!*********************!*\
  !*** ./src/cell.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _moving_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moving_object */ "./src/moving_object.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/util.js");
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game.js */ "./src/game.js");
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ship.js */ "./src/ship.js");
/* harmony import */ var _bullet_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./bullet.js */ "./src/bullet.js");






const DEFAULTS = {
  COLOR: "#5cdb94",
  RADIUS: 25,
  SPEED: 1,
};

class Cell extends _moving_object__WEBPACK_IMPORTED_MODULE_0__.default {
  constructor(options = {}) {
    options.speed = options.speed || DEFAULTS.SPEED;
    options.color = DEFAULTS.COLOR;
    options.radius = DEFAULTS.RADIUS;
    options.direction = options.direction || _util__WEBPACK_IMPORTED_MODULE_1__.default.randomVec();
    options.pos = options.pos || _game_js__WEBPACK_IMPORTED_MODULE_2__.default.randomPos();
    super(options);
    this.speed = this.speed || 1;
  }

  draw(ctx) {
    const pos = this.pos;
    ctx.drawImage(Cell.image, pos[0] - 25, pos[1] - 25, 50, 50);
  }
}
const img = new Image();
img.src = `./assets/cell3.png`;
Cell.image = img;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Cell);


/***/ }),

/***/ "./src/corona.js":
/*!***********************!*\
  !*** ./src/corona.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _moving_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moving_object */ "./src/moving_object.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/util.js");
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game.js */ "./src/game.js");
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ship.js */ "./src/ship.js");
/* harmony import */ var _bullet_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./bullet.js */ "./src/bullet.js");
/* harmony import */ var _cell_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./cell.js */ "./src/cell.js");







const DEFAULTS = {
  COLOR: "#c90579",
  RADIUS: 25,
  SPEED: 1,
};

class Corona extends _moving_object__WEBPACK_IMPORTED_MODULE_0__.default {
  constructor(options = {}) {
    options.speed = options.speed || DEFAULTS.SPEED;
    options.color = DEFAULTS.COLOR;
    options.radius = DEFAULTS.RADIUS;
    options.direction = options.direction || _util__WEBPACK_IMPORTED_MODULE_1__.default.randomVec();
    options.pos = options.pos || _game_js__WEBPACK_IMPORTED_MODULE_2__.default.randomPos();
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
    if (other instanceof _cell_js__WEBPACK_IMPORTED_MODULE_5__.default) {
      other.remove();
    }
    if (other instanceof _ship_js__WEBPACK_IMPORTED_MODULE_3__.default) {
      other.remove();
    }
    if (other instanceof _bullet_js__WEBPACK_IMPORTED_MODULE_4__.default) {
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Corona);


/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _corona__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./corona */ "./src/corona.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship */ "./src/ship.js");
/* harmony import */ var _bullet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bullet */ "./src/bullet.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util */ "./src/util.js");
/* harmony import */ var _cell__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cell */ "./src/cell.js");






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

    this.ship = new _ship__WEBPACK_IMPORTED_MODULE_1__.default({ game: this });
    const time = mode === "preview" ? 0 : 4000;
    setTimeout(() => {
      this.addCoronas();
      this.addCells();
    }, time);
  }

  addCoronas() {
    for (let i = 0; i < this.coronaCount; i++) {
      const corona = new _corona__WEBPACK_IMPORTED_MODULE_0__.default({ game: this, speed: this.speed });
      this.coronas.push(corona);
    }
  }

  addCells() {
    for (let i = 0; i < this.cellCount; i++) {
      const cell = new _cell__WEBPACK_IMPORTED_MODULE_4__.default({ game: this, speed: this.speed });
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
    const x = Math.floor(Math.random() * (window.innerWidth - 30)) + 15;
    const y = Math.floor(Math.random() * (window.innerHeight - 230)) + 115;
    return [x, y];
  }

  draw(ctx) {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight - 200);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight - 200);

    var grd = ctx.createRadialGradient(600, 400, 10, 600, 400, 600);
    var grd = ctx.createLinearGradient(0, 0, 0, window.innerHeight);
    grd.addColorStop(0, "#184065");
    // grd.addColorStop(0, "#46bfcf");
    grd.addColorStop(1, "#000000");

    ctx.fillStyle = grd;
    ctx.fill();

    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    this.allObjects().forEach((el) => el.draw(ctx));
  }

  moveObjects(delta) {
    this.allObjects().forEach((el) => el.move(delta));
  }

  remove(object) {
    if (object instanceof _corona__WEBPACK_IMPORTED_MODULE_0__.default) {
      const index = this.coronas.indexOf(object);
      this.coronas.splice(index, 1);
      if (!this.coronas.length) {
        setTimeout(() => {
          this.over = "win";
          this.bullets = [];
        }, 500);
      }
    } else if (object instanceof _cell__WEBPACK_IMPORTED_MODULE_4__.default) {
      const index = this.cells.indexOf(object);
      this.cells.splice(index, 1);
      const corona = new _corona__WEBPACK_IMPORTED_MODULE_0__.default({
        game: this,
        pos: object.pos,
        speed: this.speed,
      });
      this.coronas.push(corona);
      if (!this.cells.length) {
        this.over = "lose";
        this.bullets = [];
      }
    } else if (object instanceof _ship__WEBPACK_IMPORTED_MODULE_1__.default) {
      this.lives -= 1;
      object.relocate();
      if (this.lives === 0) this.over = "killed";
    } else if (object instanceof _bullet__WEBPACK_IMPORTED_MODULE_2__.default) {
      const index = this.bullets.indexOf(object);
      this.bullets.splice(index, 1);
    }
  }

  outOfBound(pos, radius) {
    return (
      pos[0] < 0 + radius ||
      pos[1] < 0 + radius ||
      pos[0] > window.innerWidth - radius ||
      pos[1] > window.innerHeight - 200 - radius
    );
  }

  wrap(pos) {
    return [
      _util__WEBPACK_IMPORTED_MODULE_3__.default.wrap(pos[0], window.innerWidth),
      _util__WEBPACK_IMPORTED_MODULE_3__.default.wrap(pos[1], window.innerHeight - 200),
    ];
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);


/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/game.js");


class GameView {
  constructor(ctx) {
    this.game = null;
    this.ctx = ctx;
    this.startGame("preview");
    this.startDialog({ intro: true });

    $(".restart").on("click", () => {
      this.game = null;
      $(".dialog").remove();
      this.startDialog({ intro: false });
    });

    $(".info").on("click", () => {
      if ($(".attribute").length) return;
      const $info = $(
        "<p class='attribute'>Game icons downloaded from www.flaticon.com</p>"
      );
      $(".iconContainer").append($info);
      setTimeout(() => {
        $(".attribute").remove();
      }, 3000);
    });
  }

  startDialog(intro) {
    const titleText = "COVID KILLER";
    const instruction = $(
      "<p class='dialogMission'>YOU ARE A WHITE BLOOD CELL. KILL ALL THE CORONA VIRUSES BEFORE THEY INFECT THE HEALTHY CELLS!</p><p class='dialogInstructions'>MOVE: <span class='dialogInstructionsColor'>W, A, S, D </span>   &   SHOOT: <span class='dialogInstructionsColor'>SPACE</span></p>"
    );
    const buttonText = "START GAME";
    this.createDialog(titleText, instruction, buttonText, intro);
  }

  startGame(mode) {
    let coronaCount = parseInt($("#corona").val());
    coronaCount = isNaN(coronaCount) ? 3 : coronaCount;
    let cellCount = parseInt($("#cell").val());
    cellCount = isNaN(cellCount) ? 10 : cellCount;
    const lives = 3;
    let speed = 1;
    let selected;
    if (mode !== "preview") {
      selected = $(".dialog").find(".selected").attr("id");
      if (selected === "easy") speed = 0.25;
      else if (selected === "hard") speed = 3;
      this.countdown(3);
    } else {
      speed = 0.001;
    }

    this.game = new _game__WEBPACK_IMPORTED_MODULE_0__.default(coronaCount, cellCount, speed, lives, mode);

    this.bindKeyHandlers();
    this.lastTime = 0;

    $(".dialog").remove();

    if ($("#difficulty").children().length) {
      $("#difficulty").children().remove();
    }

    const $buttons = this.difficultyButtons("game", selected);
    $("#difficulty").append($buttons);

    $(document).on("click", ".diffButt-game", (e) => {
      $(".diffButt-game").removeClass("selected");
      let val = e.target.id;
      let speed = 1;
      if (val === "easy") speed = 0.25;
      else if (val === "hard") speed = 3;

      const $target = $(event.target);
      $target.addClass("selected");
      this.game.updateSpeed(speed);
    });

    $("#stats").removeClass("hidden");
    $("#difficultyContainer").removeClass("hidden");

    this.updateStats();
    requestAnimationFrame(this.animate.bind(this));
  }

  countdown(seconds) {
    const $number = $("<h1></h1>").addClass("countdown").text(seconds);
    $("body").append($number);

    const counter = setInterval(() => {
      seconds--;
      $number.text(seconds);
      if (seconds <= 0) {
        clearInterval(counter);
        $number.text("KILL THE CORONA!");
        setTimeout(() => {
          $number.remove();
        }, 1000);
      }
    }, 1000);
  }

  step(delta) {
    this.game.step(delta);
    this.game.draw(this.ctx);
  }

  animate(time) {
    const delta = time - this.lastTime;
    this.step(delta);
    this.lastTime = time;
    this.updateStats();
    if (!this.game.over) {
      requestAnimationFrame(this.animate.bind(this));
    } else {
      this.gameOver();
    }

    const direction = [0, 0];
    for (const k of Object.keys(GameView.MOVES)) {
      const move = GameView.MOVES[k];
      if (key.isPressed(k)) {
        direction[0] += move[0];
        direction[1] += move[1];
      }
    }

    this.game.moveShip(direction);
  }

  updateStats() {
    $("#lives").text(this.game.lives);
    $("#cells").text(this.game.cells.length);
    $("#coronas").text(this.game.coronas.length);
  }

  gameOver() {
    const titleText =
      this.game.over === "win" ? "YOU BEAT CORONA !" : "CORONA BEAT YOU !";
    const buttonText = "PLAY AGAIN";
    let instructionText;
    switch (this.game.over) {
      case "win":
        instructionText = "YOU DESTROYED ALL THE CORONA VIRUSES! :)";
        break;
      case "lose":
        instructionText = "ALL THE HEALTHY CELLS WERE INFECTED! :(";
        break;
      default:
        instructionText = "YOU WERE KILLED BEFORE SAVING THE HEALTHY CELLS! :(";
    }
    const instruction = $("<p></p>").text(instructionText);
    this.createDialog(titleText, instruction, buttonText, { intro: false });
  }

  createDialog(titleText, instruction, buttonText, { intro }) {
    if ($(".dialog").length) return;
    const $dialog = $("<div></div>").addClass("dialog");
    const $title = $("<h1></h1>").addClass("dialogTitle").text(titleText);
    $dialog.append($title);
    $dialog.append("<br/>");

    $dialog.append(instruction);

    if (!intro) {
      const $inputs = $("<div></div>").addClass("inputs");
      const $coronaDiv = $("<div></div>").addClass("inputContainer");
      const $coronaText = $("<p>CORONA VIRUSES:</p>");
      const $coronaNum = $(
        '<input type="number" min="1" max="100" value="3" id="corona"></p>'
      );
      $coronaDiv.append($coronaText).append($coronaNum);
      const $cellDiv = $("<div></div>").addClass("inputContainer");
      const $cellText = $("<p>HEALTHY CELLS:</p>");
      const $cellNum = $(
        '<input type="number" min="1" max="100" value="10" id="cell"></p>'
      );
      $cellDiv.append($cellText).append($cellNum);
      $inputs.append($coronaDiv).append($cellDiv);
      $dialog.append($inputs);
    }
    const $button = $("<button></button>")
      .addClass("dialogButton")
      .text(buttonText);

    const $buttons = this.difficultyButtons("dialog");
    $dialog.append($buttons);

    $(document).on("click", ".diffButt-dialog", (e) => {
      $(".diffButt-dialog").removeClass("selected");
      const $target = $(event.target);
      $target.addClass("selected");
    });

    $button.on("click", this.startGame.bind(this));
    $dialog.append("<br/>");
    $dialog.append($button);

    $("body").append($dialog);
  }

  difficultyButtons(location, selected = "normal") {
    const $container = $("<div></div>").addClass("difficultyButtons");
    const $text = $("<p>DIFFICULTY:</p>");
    const $easy = $("<button></button>")
      .addClass(`diffButt-${location}`)
      .attr("id", "easy")
      .text("SHELTER IN PLACE");

    const $normal = $("<button></button>")
      .addClass(`diffButt-${location}`)
      .attr("id", "normal")
      .text("NORMAL");
    const $hard = $("<button></button>")
      .addClass(`diffButt-${location}`)
      .attr("id", "hard")
      .text("TRUMP RALLY");

    if (selected === "easy") $easy.addClass("selected");
    else if (selected === "hard") $hard.addClass("selected");
    else $normal.addClass("selected");

    $container.append($text).append($easy).append($normal).append($hard);
    return $container;
  }

  bindKeyHandlers() {
    const game = this.game;
    key("space", function () {
      game.fire();
    });
  }
}

GameView.MOVES = {
  w: [0, -1],
  a: [-1, 0],
  s: [0, 1],
  d: [1, 0],
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameView);


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game_view */ "./src/game_view.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ "./src/game.js");
console.log("Webpack is working!");


window.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.height = window.innerHeight - 200;
  canvasEl.width = window.innerWidth;
  const ctx = canvasEl.getContext("2d");
  const gameView = new _game_view__WEBPACK_IMPORTED_MODULE_0__.default(ctx);

  $(window).on("resize", () => {
    canvasEl.height = window.innerHeight - 200;
    canvasEl.width = window.innerWidth;
  });
});


/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/util.js");


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
    return _util__WEBPACK_IMPORTED_MODULE_0__.default.dist(this.pos, other.pos) < this.radius + other.radius;
  }

  remove() {
    this.game.remove(this);
  }

  collide(other) {}
}

MovingObject.prototype.wrappable = true;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MovingObject);


/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _moving_object_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moving_object.js */ "./src/moving_object.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/util.js");
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game.js */ "./src/game.js");
/* harmony import */ var _bullet_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bullet.js */ "./src/bullet.js");





const DEFAULTS = {
  RADIUS: 20,
  COLOR: "white",
  SPEED: 1.5,
};

class Ship extends _moving_object_js__WEBPACK_IMPORTED_MODULE_0__.default {
  constructor(options = {}) {
    options.speed = DEFAULTS.SPEED;
    options.color = options.color || DEFAULTS.COLOR;
    options.radius = DEFAULTS.RADIUS;
    options.pos = options.pos || [
      window.innerWidth / 2,
      (window.innerHeight - 200) / 2,
    ];
    options.direction = options.direction || [0, 0];
    super(options);
    this.face = [1, 0];
  }

  relocate() {
    this.pos = _game_js__WEBPACK_IMPORTED_MODULE_2__.default.randomPos();
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
    const bullet = new _bullet_js__WEBPACK_IMPORTED_MODULE_3__.default({ game: this.game });
    this.game.addBullet(bullet);
  }
}
const img = new Image();
img.src = "./assets/ship.png";
Ship.image = img;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);


/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
const Util = {
  inherits(ChildClass, ParentClass) {
    ChildClass.prototype = Object.create(ParentClass.prototype);
    ChildClass.constructor = ChildClass;
  },

  randomVec(length) {
    //angle between 0 & 180
    const deg = 2 * Math.PI * Math.random();
    //get x & y value of degree
    const x = Math.cos(deg);
    const y = Math.sin(deg);
    return [x, y];
  },

  wrap(cord, max) {
    if (cord > max) {
      return cord % max;
    } else if (cord < 0) {
      return max - (cord % max);
    } else {
      return cord;
    }
  },

  dist(pos1, pos2) {
    const x = Math.abs(pos1[0] - pos2[0]);
    const y = Math.abs(pos1[1] - pos2[1]);
    return Math.sqrt(x * x + y * y);
  },
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Util);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=main.js.map