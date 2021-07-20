'use strict';

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.regexp.to-string.js");

var _htmlStructure = require("./html-structure.js");

var _roulette = require("./roulette.js");

_htmlStructure.HTML_STRUCTURE.setHTML();

_htmlStructure.HTML_STRUCTURE.addList();

var CANVAS = document.getElementById("canvas");
CANVAS.width = CANVAS.parentNode.offsetWidth;
CANVAS.height = CANVAS.parentNode.offsetWidth;
var ROULETTE = new _roulette.Roulette(CANVAS);
ROULETTE.drawArrow();
window.addEventListener("resize", function () {
  CANVAS.width = CANVAS.parentNode.offsetWidth;
  CANVAS.height = CANVAS.parentNode.offsetWidth;
  ROULETTE.setSize();
  ROULETTE.drawArrow();
  ROULETTE.drawRoulette();
});
var DISTRICT_LIST = document.getElementById('districtList');
DISTRICT_LIST.addEventListener('click', function (e) {
  if (e.target.nodeName !== "STRONG" && e.target.nodeName !== "LI") {
    return;
  }

  if (e.target.nodeName === "STRONG") {
    var UL = e.target.nextSibling;

    for (; UL.nodeName !== 'UL'; UL = UL.nextSibling) {
      ;
    }

    e.target.classList.toggle('main-district--name--checked');
    UL.classList.toggle('sub-district--unchecked');
  } else if (e.target.children.length === 0) {
    var EM = e.target.parentNode;

    for (; EM.nodeName !== 'EM'; EM = EM.previousSibling) {
      ;
    }

    e.target.classList.toggle('sub-district--list--checked');

    if (e.target.classList.contains('sub-district--list--checked')) {
      ROULETTE.addDistrict(e.target.innerText);
      ROULETTE.drawRoulette();
      EM.innerText = EM.innerText === '' ? '1' : (parseInt(EM.innerText) + 1).toString();
    } else {
      ROULETTE.removeDistrict(e.target.innerText);
      ROULETTE.drawRoulette();
      EM.innerText = EM.innerText === '1' ? EM.innerText = '' : (parseInt(EM.innerText) - 1).toString();
    }
  }
});
var START_BUTTON = document.getElementById("start");
START_BUTTON.addEventListener("click", function () {
  ROULETTE.setTime();
  ROULETTE.setSpin();
  ROULETTE.spinRoulette();
});