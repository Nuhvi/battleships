import _ from 'lodash';
import Game from '../lib/game.js';
import Ship from '../lib/ship.js';
import Board from '../lib/board.js';

const UI = (() => {
  const renderCell = () => true;
  const renderSunkShip = () => true;

  return {
    renderCell,
    renderSunkShip,
  };
})();

let computerBoard;
let CBreceiveAttack;
let ships;
let UIrenderCell;
let UIrenderSunkShip;

describe('#turn()', () => {
  beforeAll(() => {
    ships = [Ship([0, 1, 2, 3])];
    computerBoard = Board(ships);
    CBreceiveAttack = jest.spyOn(computerBoard, 'receiveAttack');
    UIrenderCell = jest.spyOn(UI, 'renderCell');
    UIrenderSunkShip = jest.spyOn(UI, 'renderSunkShip');

    Game.injectDependencies({ UI, computerBoard });
  });

  it('calls #recieveAttack() of the computer Board', () => {
    Game.turn({ cell: 0, computerBoard, UI });
    expect(CBreceiveAttack).toHaveBeenCalled();
  });

  it('calls #renderCell() of UI module', () => {
    Game.turn({ cell: 0, computerBoard, UI });
    expect(UIrenderCell).toHaveBeenCalled();
  });

  it('calls #renderSunkShip() of UI module if ship is sunk', () => {
    _.range(4).forEach((cell) => {
      Game.turn({ cell, computerBoard, UI });
    });

    expect(UIrenderSunkShip).toHaveBeenCalled();
  });
});
