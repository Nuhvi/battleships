import Board from '../lib/board.js';
import Ship from '../lib/ship.js';

let board;
let ships;
let ship;

describe('initializing', () => {
  beforeAll(() => {
    ships = [Ship([0, 1, 2, 3])];
    board = Board(ships);
  });

  it('stores the ships in its grid "grid[cell].ship"', () => {
    expect(board.grid[0].ship).toBe(ships[0]);
    expect(board.grid[4].ship).toBe(null);
  });

  it('initiates the grid cells status as unshot "0"', () => {
    expect(board.grid[0].status).toEqual(0);
  });
});

describe('#receiveAttack()', () => {
  let hitSpy;
  beforeEach(() => {
    ship = Ship([0, 1, 2, 3]);
    hitSpy = jest.spyOn(ship, 'hit');
    board = Board([ship]);
  });

  it('marks the cell as missed if there is no ships or previous shots', () => {
    board.receiveAttack(4);
    expect(board.grid[4].status).toEqual(1);
  });

  it('returns false if the cell was shot before!', () => {
    board.receiveAttack(4);

    expect(board.receiveAttack(4)).toBeFalsy();
    expect(board.grid[4].status).toEqual(1);
  });

  it('returns false if the cell was shot before!', () => {
    board.receiveAttack(3);

    expect(board.receiveAttack(3)).toBeFalsy();
    expect(board.grid[3].status).toEqual(2);
  });

  it('calls #hit() on the ship at that cell!', () => {
    board.receiveAttack(3);
    expect(hitSpy).toHaveBeenCalled();
  });

  it('returns the ship object if the cell was a successful hit!', () => {
    expect(board.receiveAttack(3)).toBe(ship);
  });

  it('marks the cell as Shot if the cell was a successful hit!', () => {
    board.receiveAttack(3);
    expect(board.grid[3].status).toEqual(2);
  });

  it('returns "Missed!" if the cell was not shot before and not occupied by a ship', () => {
    expect(board.receiveAttack(4)).toEqual('Missed!');
  });
});

describe('#allShipsSunk()', () => {
  beforeEach(() => {
    ships = [Ship([0]), Ship([2, 3])];
    board = Board(ships);
  });

  it('returns true if all ships were sunk', () => {
    [0, 2, 3].forEach((cell) => {
      board.receiveAttack(cell);
    });
    expect(board.allShipsSunk()).toBeTruthy();
  });

  it('returns false if any ship is still not sunk', () => {
    [2, 3].forEach((cell) => {
      board.receiveAttack(cell);
    });
    expect(board.allShipsSunk()).toBeFalsy();
  });
});
