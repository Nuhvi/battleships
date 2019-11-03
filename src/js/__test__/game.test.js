import _ from 'lodash';
import Game from '../lib/game.js';
import Ship from '../lib/ship.js';
import Board from '../lib/board.js';

const UI = (() => {
  const renderCell = () => true;
  const renderSunkShip = () => true;
  const renderWinner = () => true;
  return {
    renderCell,
    renderSunkShip,
    renderWinner,
  };
})();

let computerShips;
let computerBoard;
let CBreceiveAttack;
const UIrenderCell = jest.spyOn(UI, 'renderCell');
const UIrenderSunkShip = jest.spyOn(UI, 'renderSunkShip');
const UIrenderWinner = jest.spyOn(UI, 'renderWinner');

describe('#turn()', () => {
  beforeEach(() => {
    computerShips = [Ship([0, 1, 2, 3]), Ship([10, 11, 12, 13])];
    computerBoard = Board(computerShips);
    CBreceiveAttack = jest.spyOn(computerBoard, 'receiveAttack');

    Game.injectDependencies({ UI, computerBoard });
  });

  it('calls #recieveAttack() of the computer Board', () => {
    Game.turn({ cell: 0 });
    expect(CBreceiveAttack).toHaveBeenCalled();
  });

  it('calls #renderCell() of UI module with the cell and the result of board#receiveAttack', () => {
    Game.turn({ cell: 0 });
    expect(UIrenderCell).toHaveBeenCalledWith({ cell: 0, status: computerShips[0] });

    Game.turn({ cell: 4 });
    expect(UIrenderCell).toHaveBeenCalledWith({ cell: 4, status: 4 });
  });

  it('calls #renderSunkShip() of UI module if ship is sunk', () => {
    _.range(3).forEach((cell) => {
      Game.turn({ cell });
    });
    expect(UIrenderSunkShip).not.toHaveBeenCalled();

    Game.turn({ cell: 3 });
    expect(UIrenderSunkShip).toHaveBeenCalledWith(computerShips[0]);
  });

  it('calls #renderWinner() of UI module if all computerBoard ships are sunk', () => {
    _.range(4).forEach((cell) => {
      Game.turn({ cell });
    });
    expect(UIrenderWinner).not.toHaveBeenCalled();

    _.range(4).forEach((cell) => {
      Game.turn({ cell: cell + 10 });
    });
    expect(UIrenderWinner).toHaveBeenCalledWith('player');
  });
});
