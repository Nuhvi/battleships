const Ship = (cells) => {
  const { length } = cells;
  const hits = [];

  const hit = (cell) => {
    if (!cells.includes(cell) || hits.includes(cell)) {
      return false;
    }
    hits.push(cell);

    return hits;
  };
  const isSunk = () => hits.length === length;

  return {
    get cells() {
      return cells;
    },
    get length() {
      return length;
    },
    get hits() {
      return hits;
    },
    hit,
    isSunk,
  };
};

export default Ship;
