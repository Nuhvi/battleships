const Game = (() => {
  let gameNotOver;
  let UI;
  let playerBoard;
  let computerBoard;

  const reset = (dependencies) => {
    UI = dependencies.UI;
    computerBoard = dependencies.computerBoard;
    playerBoard = dependencies.playerBoard;

    gameNotOver = true;
  };

  const checkWinner = (board) => {
    if (board.allShipsSunk()) {
      gameNotOver = false;
      UI.renderWinner('player');
    }
  };

  const checkHit = ({ board, ship }) => {
    if (ship && ship.isSunk()) {
      UI.renderSunkShip(ship);
      checkWinner(board);
    }
  };

  const attack = ({ cell, board }) => {
    const status = board.receiveAttack(cell);
    if (status) {
      checkHit({ board, ship: status === cell ? null : status });
      UI.renderCell({ cell, status });
    }

    return status;
  };

  const computerPlay = (validPlayerAttack) => {
    if (validPlayerAttack && gameNotOver) {
      const cell = Math.floor(Math.random() * 10); // change later
      attack({ attacker: 'computer', cell, board: playerBoard });
    }
  };

  const turn = ({ cell }) => {
    const validPlayerAttack = attack(
      { attacker: 'player', cell, board: computerBoard },
    );

    computerPlay(validPlayerAttack);
  };

  return {
    reset,
    turn,
  };
})();

export default Game;
