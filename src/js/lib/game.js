const Game = (() => {
  let gameOver;
  let UI;
  let playerBoard;
  let computerBoard;

  const injectDependencies = (dependencies) => {
    UI = dependencies.UI;
    computerBoard = dependencies.computerBoard;
    playerBoard = dependencies.playerBoard;
  };

  const checkWinner = (board) => {
    if (board.allShipsSunk()) gameOver = true;
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

  const computerPlay = () => {
    const cell = 19;
    attack({ cell, board: playerBoard });
    if (gameOver) return 'Computer';
  };

  const turn = ({ cell }) => {
    const validPlayerAttack = attack({ cell, board: computerBoard });
    if (gameOver) UI.renderWinner('player');

    if (validPlayerAttack && !gameOver) {
      // computerPlay();
    }
  };

  return {
    injectDependencies,
    turn,
  };
})();

export default Game;
