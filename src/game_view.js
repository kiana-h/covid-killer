import Game from "./game";

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

    this.game = new Game(coronaCount, cellCount, speed, lives, mode);

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

export default GameView;
