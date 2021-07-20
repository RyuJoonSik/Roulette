'use strict';
import { HTML_STRUCTURE } from './html-structure.js';
import { Roulette } from './roulette.js';

HTML_STRUCTURE.setHTML();
HTML_STRUCTURE.addList();

const CANVAS = document.getElementById(`canvas`);
CANVAS.width = CANVAS.parentNode.offsetWidth;
CANVAS.height = CANVAS.parentNode.offsetWidth;

const ROULETTE = new Roulette(CANVAS);
ROULETTE.drawArrow();

window.addEventListener(`resize`, () => {
  CANVAS.width = CANVAS.parentNode.offsetWidth;
  CANVAS.height = CANVAS.parentNode.offsetWidth;

  ROULETTE.setSize();
  ROULETTE.drawArrow();
  ROULETTE.drawRoulette();
});

const DISTRICT_LIST = document.getElementById('districtList');

DISTRICT_LIST.addEventListener('click', (e) => {
  if (e.target.nodeName !== `STRONG` && e.target.nodeName !== `LI`) {
    return;
  }

  if (e.target.nodeName === `STRONG`) {
    let UL = e.target.nextSibling;

    for (; UL.nodeName !== 'UL'; UL = UL.nextSibling);

    e.target.classList.toggle('main-district--name--checked');
    UL.classList.toggle('sub-district--unchecked');
  } else if (e.target.children.length === 0) {
    let EM = e.target.parentNode;

    for (; EM.nodeName !== 'EM'; EM = EM.previousSibling);

    e.target.classList.toggle('sub-district--list--checked');

    if (e.target.classList.contains('sub-district--list--checked')) {
      ROULETTE.addDistrict(e.target.innerText);
      ROULETTE.drawRoulette();
      EM.innerText =
        EM.innerText === '' ? '1' : (parseInt(EM.innerText) + 1).toString();
    } else {
      ROULETTE.removeDistrict(e.target.innerText);
      ROULETTE.drawRoulette();
      EM.innerText =
        EM.innerText === '1'
          ? (EM.innerText = '')
          : (parseInt(EM.innerText) - 1).toString();
    }
  }
});

const START_BUTTON = document.getElementById(`start`);
START_BUTTON.addEventListener(`click`, () => {
  ROULETTE.setTime();
  ROULETTE.setSpin();
  ROULETTE.spinRoulette();
});
