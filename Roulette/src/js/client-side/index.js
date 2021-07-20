'use strict';
import { HTML_STRUCTURE } from './html-structure.js';
import { Roulette } from './roulette.js';

// HTML_STRUCTURE.setHTML();
// HTML_STRUCTURE.addList();

const CANVAS = document.getElementById(`canvas`);
CANVAS.width = CANVAS.parentNode.offsetWidth;
CANVAS.height = CANVAS.parentNode.offsetWidth;

const ROULETTE = new Roulette(CANVAS);

ROULETTE.drawArrow();

const DISTRICT_LIST = document.getElementById(`districtList`);
const START_BUTTON = document.getElementById(`start`);

const controlList = (e) => {
  if (e.target.nodeName !== `BUTTON`) {
    /* 버튼 요소가 아니면 실행 종료 */
    return;
  }

  if (e.target.classList.contains(`district__name`)) {
    /* 상위 행정구역 버튼을 클릭 한 경우 */
    let UL = e.target.nextSibling;

    for (; UL.nodeName !== 'UL'; UL = UL.nextSibling);

    e.target.classList.toggle('district__name--checked');
    UL.classList.toggle('sub-district--unchecked');
  } else if (e.target.classList.contains(`sub-district__name`)) {
    /* 하위 행정구역 버튼을 클릭 한 경우 */
    let EM = e.target.parentNode.parentNode;

    for (; EM.nodeName !== 'EM'; EM = EM.previousSibling);
    e.target.classList.toggle('sub-district__name--checked');

    if (e.target.classList.contains('sub-district__name--checked')) {
      ROULETTE.addDistrict(e.target.innerText);
      ROULETTE.drawRoulette();
      EM.innerText = EM.innerText === '' ? '1' : (parseInt(EM.innerText) + 1).toString();
    } else {
      ROULETTE.removeDistrict(e.target.innerText);
      ROULETTE.drawRoulette();
      EM.innerText = EM.innerText === '1' ? (EM.innerText = '') : (parseInt(EM.innerText) - 1).toString();
    }

    if (!ROULETTE.isEmpty()) {
      START_BUTTON.classList.add(`roulette__button--activated`);
    } else {
      START_BUTTON.classList.remove(`roulette__button--activated`);
    }
  }
};

DISTRICT_LIST.addEventListener('click', controlList);

function spin(e) {
  if (ROULETTE.isEmpty()) {
    alert(`지역을 선택해주세요.`);
  } else {
    e.target.classList.remove(`roulette__button--activated`);
    e.target.removeEventListener('click', spin);
    DISTRICT_LIST.removeEventListener('click', controlList);
    ROULETTE.setSpin();
    ROULETTE.setTime();
    setTimeout(() => {
      e.target.addEventListener('click', spin);
      e.target.classList.add(`roulette__button--activated`);
      DISTRICT_LIST.addEventListener('click', controlList);
    }, ROULETTE.getTime() * 16.5);
    ROULETTE.spinRoulette();
  }
}

START_BUTTON.addEventListener(`click`, spin);

window.addEventListener(`resize`, () => {
  CANVAS.width = CANVAS.parentNode.offsetWidth;
  CANVAS.height = CANVAS.parentNode.offsetWidth;

  ROULETTE.setSize();
  ROULETTE.drawRoulette();
});
