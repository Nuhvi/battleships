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

let ships;
let computerBoard;
let CBreceiveAttack;
let UIrenderCell;
let UIrenderSunkShip;

describe('#turn()', () => {
  beforeEach(() => {
    ships = [Ship([0, 1, 2, 3]), Ship([10, 11, 12, 13])];
    computerBoard = Board(ships);
    CBreceiveAttack = jest.spyOn(computerBoard, 'receiveAttack');
    UIrenderCell = jest.spyOn(UI, 'renderCell');
    UIrenderSunkShip = jest.spyOn(UI, 'renderSunkShip');

    Game.injectDependencies({ UI, computerBoard });
  });

  it('calls #recieveAttack() of the computer Board', () => {
    Game.turn({ cell: 0 });
    expect(CBreceiveAttack).toHaveBeenCalled();
  });

  it('calls #renderCell() of UI module with the cell and the result of board#receiveAttack', () => {
    Game.turn({ cell: 0 });
    expect(UIrenderCell).toHaveBeenCalledWith({ cell: 0, status: ships[0] });

    Game.turn({ cell: 4 });
    expect(UIrenderCell).toHaveBeenCalledWith({ cell: 4, status: 4 });
  });

  it('calls #renderSunkShip() of UI module if ship is sunk', () => {
    _.range(3).forEach((cell) => {
      Game.turn({ cell });
    });
    expect(UIrenderSunkShip).not.toHaveBeenCalled();

    Game.turn({ cell: 3 });
    expect(UIrenderSunkShip).toHaveBeenCalledWith(ships[0]);
  });

  it('returns the winner if the computerBoard ships are all Sunk', () => {
    _.range(3).forEach((cell) => {
      Game.turn({ cell });
    });

    expect(Game.turn({ cell: 3 })).not.toEqual('player');

    _.range(3).forEach((cell) => {
      Game.turn({ cell: cell + 10 });
    });
    expect(Game.turn({ cell: 13 })).toEqual('player');
  });
});
