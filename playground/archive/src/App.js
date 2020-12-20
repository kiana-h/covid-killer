import logo from "./logo.svg";
import React, { useEffect, useRef } from "react";
import "./vendor/keymaster";
import "./App.css";
// import GameView from "./game/game_view";
import Game from "./game/game";

function App() {
  // const gameCanvas = useRef();
  useEffect(() => {
    const canvas = document.getElementById("gameCanvas");

    // canvas.height = Game.DIM_Y;
    // canvas.width = Game.DIM_X;
    const ctx = canvas.getContext("2d");
    const game = new Game();
    // const gameView = new GameView(game, ctx);
    // gameView.start();
  }, []);

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <div>
        <canvas id="gameCanvas" />
        {/* <img ref="image" src={cheese} className="hidden" /> */}
      </div>
    </div>
  );
}

export default App;
