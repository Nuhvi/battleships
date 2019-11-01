import Ship from '../lib/ship.js';

let cells;
let ship;

beforeEach(() => {
  cells = [88, 89, 90];
  ship = Ship(cells);
});

it('returns the cells it occupy', () => {
  expect(ship.cells).toBe(cells);
});

it('returns its length', () => {
  expect(ship.length).toBe(cells.length);
});

it('returns its hits', () => {
  expect(ship.hits).toEqual([]);
});

it('add hits ', () => {
  ship.hit(88);
  expect(ship.hits).toEqual([88]);
});

it('doesnt add hits if already hit in this cell', () => {
  ship.hit(88);
  expect(ship.hit(88)).toBeFalsy();
  expect(ship.hits).toEqual([88]);
});

it('doesnt add hits if out of its cells', () => {
  expect(ship.hit(91)).toBeFalsy();
  expect(ship.hits).toEqual([]);
});

it('checks if sunk', () => {
  ship.hit(88);
  expect(ship.isSunk()).toBeFalsy();
  ship.hit(89);
  ship.hit(90);
  expect(ship.isSunk()).toBeTruthy();
});