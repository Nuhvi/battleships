import _ from 'lodash';
import Ship from './ship.js';

const GameBoard = () => {
  const ships = [];
  const invalidPositions = [];

  const getNeighbours = (position) => {
    const neighbours = [];
    if (position > 9) neighbours.push(position - 10);
    if (position < 90) neighbours.push(position + 10);
    if (position % 10 > 0) neighbours.push(position - 1);
    if (position % 10 < 9) neighbours.push(position + 1);

    return neighbours;
  };

  const storeInvalid = (positions) => {
    if (positions.length === 1) invalidPositions.push(...positions);
    const neighbours = positions.map((position) => getNeighbours(position));
    invalidPositions.push(..._.flatten(neighbours));
  };

  const isInvalid = (pos) => pos.some(
    (position) => invalidPositions.includes(position),
  );

  const notSequential = (positions) => {
    const sorted = positions.sort();
    const spread = Math.max(...sorted) - Math.min(...sorted);
    return !(spread === positions.length - 1
      || spread === (positions.length - 1) * 10);
  };

  const outOfBound = (positions) => positions.some((pos) => pos < 0 || pos > 99);

  const crossRows = (positions) => {
    const leftColumnElements = positions.filter(
      (position) => position % 10 === 9,
    );
    if (leftColumnElements.length === 0) return false;
    if (leftColumnElements[0] < Math.max(...positions)) return true;
    return false;
  };

  const notPlaceable = (positions) => {
    if (notSequential(positions)) return true;
    if (outOfBound(positions)) return true;
    if (crossRows(positions)) return true;
    return false;
  };

  const placeShip = (positions) => {
    if (isInvalid(positions)) return false;
    if (notPlaceable(positions)) return false;

    ships.push(Ship(positions));
    storeInvalid(positions);

    return ships;
  };

  return {
    placeShip,
    ships,
  };
};

export default GameBoard;