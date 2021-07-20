'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HTML_STRUCTURE = void 0;

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.promise.js");

var _dataTypeChecker = require("./data-type-checker.js");

var HTML_STRUCTURE = {
  setHTML: function setHTML() {
    var SECTION = document.createElement("section");
    SECTION.className = "wrapper";
    SECTION.innerHTML = "\n      <article id=\"roulette\" class=\"roulette\">\n        <canvas id=\"canvas\" class=\"roulette__canvas\" tabindex=\"0\">\uB300\uCCB4 \uD14D\uC2A4\uD2B8 \uC785\uB2C8\uB2E4.</canvas>\n        <button  id=\"start\" class=\"roulette__button\">START</button>\n      </article>\n      <ul id=\"districtList\" class=\"district\">\n      </ul>\n    ";
    "prepend" in Element ? document.body.prepend(SECTION) : document.body.insertBefore(SECTION, document.body.firstChild);
  },
  createEl: function createEl(element) {
    var text = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

    if (!_dataTypeChecker.TYPE.isString(element) || !_dataTypeChecker.TYPE.isString(text)) {
      console.log("WRONG TYPE");
      return;
    }

    var myElement;

    switch (element) {
      case "LI":
        myElement = document.createElement("li");
        myElement.className = "district__list";
        return myElement;

      case "BUTTON":
        myElement = document.createElement("button");
        myElement.className = "district__name";
        myElement.innerText = text;
        return myElement;

      case "EM":
        myElement = document.createElement("em");
        myElement.className = "district__number";
        return myElement;

      case "UL":
        myElement = document.createElement("ul");
        myElement.classList.add("sub-district");
        myElement.classList.add("sub-district--unchecked");
        return myElement;

      case "subLI":
        myElement = document.createElement("li");
        return myElement;

      case "subButton":
        myElement = document.createElement("button");
        myElement.className = "sub-district__name";
        myElement.innerText = text;
        return myElement;

      default:
        console.log("Undefined");
    }
  },
  addList: function addList() {
    function fetchList(data) {
      if (!_dataTypeChecker.TYPE.isObject(data)) {
        return;
      }

      var FRAGMENT = document.createDocumentFragment();

      for (var DISTRICT in data) {
        if (Object.prototype.hasOwnProperty.call(data, DISTRICT)) {
          var LI = HTML_STRUCTURE.createEl("LI");
          var BUTTON = HTML_STRUCTURE.createEl("BUTTON", DISTRICT);
          var EM = HTML_STRUCTURE.createEl("EM");
          var UL = HTML_STRUCTURE.createEl("UL");
          var SUB_DISTRICTS = data[DISTRICT];

          if ("append" in Element) {
            LI.append(BUTTON, EM);
          } else {
            LI.appendChild(BUTTON);
            LI.appendChild(EM);
          }

          for (var i = 0; i < SUB_DISTRICTS.length; i++) {
            var SUB_LI = HTML_STRUCTURE.createEl("subLI");
            var SUB_BUTTON = HTML_STRUCTURE.createEl("subButton", SUB_DISTRICTS[i]);
            SUB_LI.appendChild(SUB_BUTTON);
            UL.appendChild(SUB_LI);
          }

          LI.appendChild(UL);
          FRAGMENT.appendChild(LI);
        }
      }

      var DISTRICT_LIST = document.getElementById("districtList");
      DISTRICT_LIST.appendChild(FRAGMENT);
    }

    if ("fetch" in window) {
      fetch("./src/assets/json/district.json").then(function (response) {
        return response.json();
      }).then(function (data) {
        return fetchList(data);
      });
    } else {
      var XHR = new XMLHttpRequest();

      XHR.onreadystatechange = function () {
        if (XHR.readyState === 4 && XHR.status === 200) {
          var DATA = JSON.parse(XHR.response);
          fetchList(DATA);
        }
      };

      XHR.open("GET", "./src/assets/json/district.json");
      XHR.send();
    }
  }
};
exports.HTML_STRUCTURE = HTML_STRUCTURE;