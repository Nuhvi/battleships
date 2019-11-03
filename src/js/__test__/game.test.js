import _ from 'lodash';
import Game from '../lib/game.js';
import Ship from '../lib/ship.js';
import Board from '../lib/board.js';

// START Mock UI
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

const UIrenderCell = jest.spyOn(UI, 'renderCell');
const UIrenderSunkShip = jest.spyOn(UI, 'renderSunkShip');
const UIrenderWinner = jest.spyOn(UI, 'renderWinner');
// END Mock UI

let computerShips;
let computerBoard;
let CBreceiveAttack;
let playerShips;
let playerBoard;
let PBreceiveAttack;

describe('#turn()', () => {
  beforeEach(() => {
    computerShips = [Ship([0, 1, 2, 3]), Ship([20, 21, 22])];
    computerBoard = Board(computerShips);
    CBreceiveAttack = jest.spyOn(computerBoard, 'receiveAttack');

    playerShips = [Ship([20, 21, 22])];
    playerBoard = Board(playerShips);
    PBreceiveAttack = jest.spyOn(playerBoard, 'receiveAttack');

    Game.reset({ UI, playerBoard, computerBoard });
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

    _.range(3).forEach((cell) => {
      Game.turn({ cell: cell + 20 });
    });

    expect(UIrenderWinner).toHaveBeenCalledWith('player');
  });

  it('the computer attacks back', () => {
    Game.turn({ cell: 0 });
    expect(PBreceiveAttack).toHaveBeenCalled();
    expect(UIrenderCell).toHaveBeenCalled();
  });

  it('haults if the player attack was invalid', () => {
    Game.turn({ cell: 0 });
    Game.turn({ cell: 0 });
    expect(PBreceiveAttack).toHaveBeenCalledTimes(1);
    Game.turn({ cell: 1 });
    expect(PBreceiveAttack).toHaveBeenCalledTimes(2);
  });

  it('haults if the player attack resulted in gameOver', () => {
    _.range(4).forEach((cell) => {
      Game.turn({ cell });
    });

    _.range(3).forEach((cell) => {
      Game.turn({ cell: cell + 20 });
    });

    expect(PBreceiveAttack).toHaveBeenCalledTimes(6);
  });
});
