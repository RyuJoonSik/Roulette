'use strict';
// HTML 구조 
const HTML_STRUCTURE = {
  setHTML() {
    document.body.innerHTML = `
      <section>
        <div id="roulette" class="roulette wrapper--article">
          <ul id="districtList" class="main-district">
          </ul>
          <button  id="start" class="roulette--button-start roulette--button">
            <span>START</span>
          </button>
        </div>
      </section>
    `;
  },

  createEl(element, text = ``) {
    if (!TYPE.isString(element) || !TYPE.isString(text)) {
      console.log(`잘못된 데이터 타입 입니다.`);
      return;
    }

    let ELEMENT;

    switch (element) {
      case `LI`:
        ELEMENT = document.createElement(`li`)
        ELEMENT.className = `main-district--list`;

        return ELEMENT;

      case `STRONG`:
        ELEMENT = document.createElement(`strong`)
        ELEMENT.className = `main-district--name`;
        ELEMENT.innerText = text;

        return ELEMENT;

      case `EM`:
        ELEMENT = document.createElement(`em`)
        ELEMENT.className = `main-district--number`;

        return ELEMENT;
      
      case `UL`:
        ELEMENT = document.createElement(`ul`)
        ELEMENT.className = `sub-district--unchecked`;

        return ELEMENT;

      case `subLI`:
        ELEMENT = document.createElement(`li`)
        ELEMENT.className = `sub-district--list`;
        ELEMENT.innerText = text;

        return ELEMENT;

      default:
        console.log(`정의되어있지 않습니다.`);
    }
  },

  addList() {
    function fetchList(data) {
      if (!TYPE.isObject(data)) {
        return;
      }
      const FRAGMENT = document.createDocumentFragment();
      for (const DISTRICT in data) {
        if (data.hasOwnProperty(DISTRICT)) {
          console.log(data.hasOwnProperty(DISTRICT));
          const LI = HTML_STRUCTURE.createEl(`LI`);
          const STRONG = HTML_STRUCTURE.createEl(`STRONG`, DISTRICT);
          const EM = HTML_STRUCTURE.createEl(`EM`);
          const UL = HTML_STRUCTURE.createEl(`UL`);
          const SUB_DISTRICTS = data[DISTRICT];
  
          if (`append` in Element.prototype) {
            LI.append(STRONG, EM);
          } else {
            LI.appendChild(STRONG);
            LI.appendChild(EM);
          }
  
          for (let i = 0 ; i < SUB_DISTRICTS.length; i++) {
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
      fetch(`/resources/data/district.json`)
        .then(response => response.json())
        .then(data => fetchList(data));
      } else {
        var XHR = new XMLHttpRequest();
        
        XHR.onreadystatechange = function() {
          if (XHR.readyState === 4 && XHR.status === 200) {
            const DATA = JSON.parse(XHR.response);
            fetchList(DATA);
          }
        }
    
        XHR.open(`GET`, `resources/data/district.json`);
        XHR.send();
    }
  }
};