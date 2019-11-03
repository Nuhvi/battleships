const UI = (() => {
  const computerBoard = document.getElementById('computer-board');

  const renderCell = ({ cell, status }) => {

  };

  return {
    renderCell,
    get computerBoard() {
      return computerBoard;
    },
  };
})();

export default UI;