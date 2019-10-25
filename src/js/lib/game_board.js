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

  // const notPlaceable = (positions) => false;

  const placeShip = (positions) => {
    if (isInvalid(positions)) return false;
    // if (notPlaceable(positions)) return false;

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