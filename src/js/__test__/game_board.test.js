import GameBoard from '../lib/game_board.js';

let board;

beforeEach(() => {
  board = GameBoard();
});

it('places a ship on the board', () => {
  board.placeShip([88, 89, 90]);
  expect(board.ships[0].positions).toEqual([88, 89, 90]);
});

it('does not place a ship if position is occupied', () => {
  board.placeShip([88, 89, 90]);
  const res = board.placeShip([87, 88]);

  expect(res).toBeFalsy();
  expect(board.ships.length).toBe(1);
});

it('does not place a ship if position too close to another ship', () => {
  board.placeShip([88, 89, 90]);
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
