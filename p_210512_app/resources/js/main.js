'use strict';
HTML_STRUCTURE.setHTML();
HTML_STRUCTURE.addList();

const CANVAS_ID = `canvas`;
CANVAS.setCanvas(`roulette`, CANVAS_ID);
const CANVAS_NODE = CANVAS.getCanvas(CANVAS_ID);
CANVAS.drawCanvas(CANVAS_ID);

const ROULETTE_SINGLETON = new Roulette(CANVAS_NODE);
ROULETTE_SINGLETON.addDistrict('울산');
ROULETTE_SINGLETON.drawRoulette();

var clickEvent = {
  showSubDistrict() {
    const DISTRICT_LIST = document.getElementById('districtList');

    DISTRICT_LIST.addEventListener('click', e => {
      if (e.target.nodeName !== 'STRONG') {
        return;
      }

      var UL = e.target.nextSibling;

      for (; UL.nodeName !== 'UL'; UL = UL.nextSibling);

      e.target.classList.toggle('main-district--name--checked');
      UL.classList.toggle('sub-district--unchecked');
    });
  },

  controlDistrictList() {
    const DISTRICT_LIST = document.getElementById('districtList');

    DISTRICT_LIST.addEventListener('click', e => {
      if (e.target.nodeName !== 'LI' || !(e.target.classList.contains('sub-district--list'))) {
        return;
      }

      var EM =  e.target.parentNode;

      for (; EM.nodeName !== 'EM'; EM = EM.previousSibling);

      e.target.classList.toggle('sub-district--list--checked');

      if (e.target.classList.contains('sub-district--list--checked')) {
        ROULETTE_SINGLETON.addDistrict(e.target.innerText);
        ROULETTE_SINGLETON.drawRoulette();
        EM.innerText = EM.innerText === '' ? '1' : (parseInt(EM.innerText) + 1).toString();
      } else {
        ROULETTE_SINGLETON.removeDistrict(e.target.innerText);
        ROULETTE_SINGLETON.drawRoulette();
        EM.innerText = EM.innerText === '1' ? EM.innerText = '' : (parseInt(EM.innerText) - 1).toString();
      }
    });
  },

  startRoullete() {
    var startBtn = document.getElementById('start');

    startBtn.addEventListener('click', () => {
      ROULETTE_SINGLETON.setTime();
      ROULETTE_SINGLETON.setSpin();
      ROULETTE_SINGLETON.spinRoulette();
    });
  }
};

clickEvent.showSubDistrict();
clickEvent.controlDistrictList();
clickEvent.startRoullete();