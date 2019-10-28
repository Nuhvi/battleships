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

  return {
    generateBoard,
  };
})();

export default UI;
