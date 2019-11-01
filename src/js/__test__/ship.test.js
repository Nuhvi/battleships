import Ship from '../lib/ship.js';

let cells;
let ship;

beforeEach(() => {
  cells = [88, 89, 90];
  ship = Ship(cells);
});

describe('public variables', () => {
  it('returns the cells it occupy', () => {
    expect(ship.cells).toBe(cells);
  });

  it('returns its length', () => {
    expect(ship.length).toBe(cells.length);
  });

  it('returns its shot cells "hits"', () => {
    expect(ship.hits).toEqual([]);
  });
});

describe('#receiveAttack()', () => {
  it('adds shot cells', () => {
    ship.hit(88);
    expect(ship.hits).toEqual([88]);
  });

  it("doesn't add hits if already hit in that cell", () => {
    ship.hit(88);
    expect(ship.hit(88)).toBeFalsy();
    expect(ship.hits).toEqual([88]);
  });

  it("doesn't add hits if it doesn't occupy that cell", () => {
    expect(ship.hit(91)).toBeFalsy();
    expect(ship.hits).toEqual([]);
  });
});

describe('#isSunk()', () => {
  it('returns true if all cells are shot', () => {
    ship.hit(88);
    ship.hit(89);
    ship.hit(90);
    expect(ship.isSunk()).toBeTruthy();
  });
  it('returns false if not all cells are shot', () => {
    ship.hit(88);
    expect(ship.isSunk()).toBeFalsy();
  });
});
