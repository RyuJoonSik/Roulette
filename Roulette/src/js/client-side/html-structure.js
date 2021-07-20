'use strict';
import { TYPE } from './data-type-checker.js';

export const HTML_STRUCTURE = {
  setHTML() {
    const SECTION = document.createElement(`section`);
    SECTION.className = `wrapper`;
    SECTION.innerHTML = `
      <article id="roulette" class="roulette">
        <canvas id="canvas" class="roulette__canvas" tabindex="0">대체 텍스트 입니다.</canvas>
        <button  id="start" class="roulette__button">START</button>
      </article>
      <ul id="districtList" class="district">
      </ul>
    `;

    `prepend` in Element
      ? document.body.prepend(SECTION)
      : document.body.insertBefore(SECTION, document.body.firstChild);
  },

  createEl(element, text = ``) {
    if (!TYPE.isString(element) || !TYPE.isString(text)) {
      console.log(`WRONG TYPE`);
      return;
    }

    let myElement;

    switch (element) {
      case `LI`:
        myElement = document.createElement(`li`);
        myElement.className = `district__list`;

        return myElement;

      case `BUTTON`:
        myElement = document.createElement(`button`);
        myElement.className = `district__name`;
        myElement.innerText = text;

        return myElement;

      case `EM`:
        myElement = document.createElement(`em`);
        myElement.className = `district__number`;

        return myElement;

      case `UL`:
        myElement = document.createElement(`ul`);
        myElement.classList.add(`sub-district`);
        myElement.classList.add(`sub-district--unchecked`);

        return myElement;

      case `subLI`:
        myElement = document.createElement(`li`);

        return myElement;

      case `subButton`:
        myElement = document.createElement(`button`);
        myElement.className = `sub-district__name`;
        myElement.innerText = text;

        return myElement;

      default:
        console.log(`Undefined`);
    }
  },

  addList() {
    function fetchList(data) {
      if (!TYPE.isObject(data)) {
        return;
      }

      const FRAGMENT = document.createDocumentFragment();

      for (const DISTRICT in data) {
        if (Object.prototype.hasOwnProperty.call(data, DISTRICT)) {
          const LI = HTML_STRUCTURE.createEl(`LI`);
          const BUTTON = HTML_STRUCTURE.createEl(`BUTTON`, DISTRICT);
          const EM = HTML_STRUCTURE.createEl(`EM`);
          const UL = HTML_STRUCTURE.createEl(`UL`);
          const SUB_DISTRICTS = data[DISTRICT];

          if (`append` in Element) {
            LI.append(BUTTON, EM);
          } else {
            LI.appendChild(BUTTON);
            LI.appendChild(EM);
          }

          for (let i = 0; i < SUB_DISTRICTS.length; i++) {
            const SUB_LI = HTML_STRUCTURE.createEl(`subLI`);
            const SUB_BUTTON = HTML_STRUCTURE.createEl(
              `subButton`,
              SUB_DISTRICTS[i]
            );

            SUB_LI.appendChild(SUB_BUTTON);
            UL.appendChild(SUB_LI);
          }

          LI.appendChild(UL);
          FRAGMENT.appendChild(LI);
        }
      }

      const DISTRICT_LIST = document.getElementById(`districtList`);
      DISTRICT_LIST.appendChild(FRAGMENT);
    }

    if (`fetch` in window) {
      fetch(`./src/assets/json/district.json`)
        .then((response) => response.json())
        .then((data) => fetchList(data));
    } else {
      var XHR = new XMLHttpRequest();

      XHR.onreadystatechange = function () {
        if (XHR.readyState === 4 && XHR.status === 200) {
          const DATA = JSON.parse(XHR.response);
          fetchList(DATA);
        }
      };

      XHR.open(`GET`, `./src/assets/json/district.json`);
      XHR.send();
    }
  },
};
