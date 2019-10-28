import _ from 'lodash';

const UI = (() => {
  const generateBoard = () => {
    const human = document.querySelector('#human');
    const computer = document.querySelector('#computer');

    let boxes = '';
    _.range(100).forEach((num) => {
      boxes += `<div data-id=${num} class="box"></div>`;
    });

    human.innerHTML = boxes;
    computer.innerHTML = boxes;
  };

  const renderShips = ({ id, ships }) => {
    const root = document.querySelector(`#${id}`);

    _.flatten(ships).forEach((position) => {
      const shipBody = root.querySelector(`[data-id="${position}"]`);
      shipBody.classList.add('ship');
    });
  };

  return {
    generateBoard,
    renderShips,
  };
})();

export default UI;
