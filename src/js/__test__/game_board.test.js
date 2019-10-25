import GameBoard from '../lib/game_board.js';

let board;

beforeEach(() => {
  board = GameBoard();
});

it('places a ship on the board', () => {
  board.placeShip([87, 88, 89]);
  expect(board.ships[0].positions).toEqual([87, 88, 89]);
});

it('does not place a ship if position is occupied', () => {
  board.placeShip([87, 88, 89]);
  const res = board.placeShip([87, 88]);

  expect(res).toBeFalsy();
  expect(board.ships.length).toBe(1);
});

it('does not place a ship if position too close to another ship', () => {
  board.placeShip([87, 88, 89]);
  const res = board.placeShip([98, 99]);

  expect(res).toBeFalsy();
  expect(board.ships.length).toBe(1);
});

it('considers the edge of the board', () => {
  board.placeShip([87, 88, 89]);
  const res = board.placeShip([90, 91]);

  expect(res).toBeTruthy();
  expect(board.ships.length).toBe(2);
});

it('doesnt add ship with non-sequential positions', () => {
  expect(board.placeShip([2, 3, 5, 6])).toBeFalsy();
  expect(board.placeShip([20, 30, 50, 60])).toBeFalsy();
  expect(board.placeShip([2, 3, 4, 5])).toBeTruthy();
  expect(board.placeShip([8, 18, 28, 38])).toBeTruthy();
});

it('doesnt add ship if positions contain out of bound position', () => {
  expect(board.placeShip([99, 100])).toBeFalsy();
  expect(board.placeShip([-1, 0])).toBeFalsy();
});

it('doesnt add ship across two rows', () => {
  expect(board.placeShip([9, 10, 11])).toBeFalsy();
  expect(board.placeShip([99, 100])).toBeFalsy();
});
