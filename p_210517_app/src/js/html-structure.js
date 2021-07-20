'use strict';
import { TYPE } from './data-type-checker.js';

export const HTML_STRUCTURE = {
  setHTML() {
    const SECTION = document.createElement(`section`);
    SECTION.className = `wrapper`;
    SECTION.innerHTML = `
      <ul id="districtList" class="main-district">
      </ul>
      <article id="roulette" class="roulette">
        <canvas id="canvas" class="roulette--canvas">대체 텍스트 입니다.</canvas>
        <button  id="start" class="roulette--button">
          <span>START</span>
        </button>
      </article>
      <ul id="recordList" class="record">
      </ul>
    `;

    `prepend` in Element
      ? document.body.prepend(SECTION)
      : document.body.insertBefore(SECTION, document.body.firstChild);
  },

  // setCanvas(parentID, Canvas) {
  //   if (!TYPE.isString(parentID) || !TYPE.isObject(Canvas)) {
  //     throw `Error ! 잘못된 타입 입니다.`;
  //   }

  //   if (!document.querySelector(`#${parentID}`)) {
  //     console.log(`없는 ID 입니다.`);
  //     return;
  //   }

  //   document.getElementById(parentID).prepend(Canvas.getCanvas());
  // },

  createEl(element, text = ``) {
    if (!TYPE.isString(element) || !TYPE.isString(text)) {
      console.log(`WRONG TYPE`);
      return;
    }

    let myElement;

    switch (element) {
      case `LI`:
        myElement = document.createElement(`li`);
        myElement.className = `main-district--list`;

        return myElement;

      case `STRONG`:
        myElement = document.createElement(`strong`);
        myElement.className = `main-district--name`;
        myElement.innerText = text;

        return myElement;

      case `EM`:
        myElement = document.createElement(`em`);
        myElement.className = `main-district--number`;

        return myElement;

      case `UL`:
        myElement = document.createElement(`ul`);
        myElement.className = `sub-district--unchecked`;

        return myElement;

      case `subLI`:
        myElement = document.createElement(`li`);
        myElement.className = `sub-district--list`;
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
          const STRONG = HTML_STRUCTURE.createEl(`STRONG`, DISTRICT);
          const EM = HTML_STRUCTURE.createEl(`EM`);
          const UL = HTML_STRUCTURE.createEl(`UL`);
          const SUB_DISTRICTS = data[DISTRICT];

          if (`append` in Element) {
            LI.append(STRONG, EM);
          } else {
            LI.appendChild(STRONG);
            LI.appendChild(EM);
          }

          for (let i = 0; i < SUB_DISTRICTS.length; i++) {
            const SUB_LI = HTML_STRUCTURE.createEl(`subLI`, SUB_DISTRICTS[i]);
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
      fetch(`./data/district.json`)
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

      XHR.open(`GET`, `./data/district.json`);
      XHR.send();
    }
  },
};
