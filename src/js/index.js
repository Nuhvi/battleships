import '../scss/main.scss';
import UI from './lib/ui';
import GameBoard from './lib/game_board';

UI.generateBoard();

// Place ships
const humanWaters = GameBoard();
const computerWaters = GameBoard();

const humanShips = [
  [1, 2, 3, 4],
  [22, 23, 24, 25],
  [44, 54, 64, 74],
  [9, 19],
  [97, 98, 99],
];

const computerShips = [
  [1, 2, 3, 4],
  [22, 23, 24, 25],
  [44, 54, 64, 74],
  [9, 19],
  [97, 98, 99],
];

computerShips.forEach((ship) => {
  computerWaters.placeShip(ship);
});

humanShips.forEach((ship) => {
  humanWaters.placeShip(ship);
});

UI.renderShips({ id: 'human', ships: humanWaters.ships.map((ship) => ship.positions) });
UI.renderShips({ id: 'computer', ships: computerWaters.ships.map((ship) => ship.positions) });

// Add event listeners

const eventListener = () => {
  const root = document.querySelector('#computer');
  const boxes = root.querySelectorAll('div');

  const handlerClick = (e) => {
    const id = e.target.getAttribute('data-id');
    console.log(`box ${id} clicked!`);
    // humanWaters.receiveAttack(Number(id));
  };

  boxes.forEach((box) => {
    box.addEventListener('click', (e) => handlerClick(e));
  });
};

eventListener();
