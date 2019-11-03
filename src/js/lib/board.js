import _ from 'lodash';

const Board = (ships) => {
  const grid = {};
  _.range(100).forEach((cell) => {
    grid[cell] = { ship: null, status: 0 };
  });

  ships.forEach((ship) => {
    ship.cells.forEach((cell) => {
      grid[cell].ship = ship;
    });
  });

  const receiveAttack = (cell) => {
    const shipAtCell = grid[cell].ship;

    if (shipAtCell) {
      if (shipAtCell.hit(cell)) {
        grid[cell].status = 2;
        return shipAtCell;
      }
      return false;
    }

    if (grid[cell].status === 1) return false;

    grid[cell].status = 1;
    return cell;
  };

  const allShipsSunk = () => ships.every((ship) => ship.isSunk());

  return {
    get grid() {
      return grid;
    },
    receiveAttack,
    allShipsSunk,
  };
};

export default Board;
