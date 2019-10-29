import '../scss/main.scss';
import UI from './lib/ui';
import GameBoard from './lib/game_board';
import AI from './lib/ai';

let gameOver = false;
UI.generateBoard();

// Place ships
const humanWaters = GameBoard();
const computerWaters = GameBoard();

const humanShips = [
  [1, 2, 3, 4],
  [17, 27, 37, 47, 57],
  [22, 23, 24, 25],
  [31, 32, 33, 34, 35],
  [52, 53, 54, 55],
  [70, 71, 72, 73],
  [76, 77, 78, 79],
  [9, 19],
  [97, 98, 99],
  [90],
  [93],
  [95],
  [30],
  [50],
  [49],
];

const computerShips = [
  [1, 2, 3, 4],
  [17, 27, 37, 47, 57],
  [22, 23, 24, 25],
  [31, 32, 33, 34, 35],
  [52, 53, 54, 55],
  [60, 61, 62, 63],
  [76, 77, 78, 79],
  [9, 19],
  [90],
  [97, 98, 99],
];

computerShips.forEach((ship) => {
  computerWaters.placeShip(ship);
});

humanShips.forEach((ship) => {
  humanWaters.placeShip(ship);
});

UI.renderShips({ id: 'human', ships: humanWaters.ships.map((ship) => ship.positions) });
// UI.renderShips({ id: 'computer', ships: computerWaters.ships.map((ship) => ship.positions) });

const processPlayFeedback = ({ player, position, feedback }) => {
  const id = player === 'human' ? 'computer' : 'human';
  const root = document.querySelector(`#${id}`);

  if (typeof feedback === 'object') {
    if (feedback.isSunk()) {
      feedback.positions.forEach((pos) => {
        root.querySelector(`[data-id="${pos}"]`).classList.add('sunk');
      });
    }
    root.querySelector(`[data-id="${position}"]`).classList.add('hit');
  } else if (feedback === 'miss') {
    root.querySelector(`[data-id="${position}"]`).classList.add(feedback);
  }

  // Check game won?
  if (humanWaters.allShipsSunk()) {
    gameOver = true;
    UI.gameOver({ winner: 'computer' });
  }
  if (computerWaters.allShipsSunk()) {
    gameOver = true;
    UI.gameOver({ winner: 'human' });
  }
};

// Add event listeners
const eventListener = () => {
  const root = document.querySelector('#computer');
  const boxes = root.querySelectorAll('div');

  const handlerClick = (e) => {
    if (gameOver) return;
    const position = e.target.getAttribute('data-id');
    const feedback = computerWaters.receiveAttack(Number(position));

    if (feedback !== 'invalid' && feedback !== 'hit') {
      processPlayFeedback({ player: 'human', position, feedback });

      // Pass turn to computer if game not over
      if (!humanWaters.allShipsSunk()) {
        let isTurnOver = false;

        while (!isTurnOver) {
          const position = AI.pickPosition(humanWaters.alreadyShotPositions());
          const feedback = humanWaters.receiveAttack(position);
          processPlayFeedback({ player: 'computer', position, feedback });

          if (feedback === 'miss') isTurnOver = true;
        }
      }
    }
  };

  boxes.forEach((box) => {
    box.addEventListener('click', (e) => handlerClick(e));
  });
};

eventListener();
