import './scss/main.scss';
import UI from './js/lib/ui.js';

UI.computerBoard.addEventListener('click', (e) => {
  const { target } = e;
  const cell = target.getAttribute('data-id');
  if (cell) {
    console.log(cell);
  }
});