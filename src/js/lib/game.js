const Game = (() => {
  let winner;
  let UI;
  let playerBoard;
  let computerBoard;

  const injectDependencies = (dependencies) => {
    UI = dependencies.UI;
    computerBoard = dependencies.computerBoard;
    playerBoard = dependencies.playerBoard;
  };

  const checkWinner = (board) => {
    if (board.allShipsSunk()) winner = true;
  };

  const checkHit = ({ cell, board, status }) => {
    if (status !== cell) {
      const ship = status;
      if (ship.isSunk()) {
        UI.renderSunkShip(ship);
        checkWinner(board);
      }
    }
  };

  const attack = ({ cell, board }) => {
    const status = board.receiveAttack(cell);
    if (status) {
      checkHit({ cell, board, status });
      UI.renderCell({ cell, status });
    }

    return status;
  };

  const turn = ({ cell }) => {
    attack({ cell, board: computerBoard });
    if (winner) return 'player';
  };

  return {
    injectDependencies,
    turn,
  };
})();

export default Game;
