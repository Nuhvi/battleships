const Game = (() => {
  let UI;
  let playerBoard;
  let computerBoard;

  const injectDependencies = (dependencies) => {
    UI = dependencies.UI;
    computerBoard = dependencies.computerBoard;
    playerBoard = dependencies.playerBoard;
  };

  const play = ({ cell, board }) => {
    board.receiveAttack(cell);
    UI.renderCell(cell);
  };

  const turn = ({ cell }) => {
    play({ cell, board: computerBoard });
  };

  return {
    injectDependencies,
    turn,
  };
})();

export default Game;