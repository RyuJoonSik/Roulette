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
    SECTION.innerHTML = "\n      <ul id=\"districtList\" class=\"main-district\">\n      </ul>\n      <article id=\"roulette\" class=\"roulette\">\n        <canvas id=\"canvas\" class=\"roulette--canvas\">\uB300\uCCB4 \uD14D\uC2A4\uD2B8 \uC785\uB2C8\uB2E4.</canvas>\n        <button  id=\"start\" class=\"roulette--button\">\n          <span>START</span>\n        </button>\n      </article>\n      <ul id=\"recordList\" class=\"record\">\n      </ul>\n    ";
    document.body.prepend(SECTION);
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
        myElement.className = "main-district--list";
        return myElement;

      case "STRONG":
        myElement = document.createElement("strong");
        myElement.className = "main-district--name";
        myElement.innerText = text;
        return myElement;

      case "EM":
        myElement = document.createElement("em");
        myElement.className = "main-district--number";
        return myElement;

      case "UL":
        myElement = document.createElement("ul");
        myElement.className = "sub-district--unchecked";
        return myElement;

      case "subLI":
        myElement = document.createElement("li");
        myElement.className = "sub-district--list";
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
          var STRONG = HTML_STRUCTURE.createEl("STRONG", DISTRICT);
          var EM = HTML_STRUCTURE.createEl("EM");
          var UL = HTML_STRUCTURE.createEl("UL");
          var SUB_DISTRICTS = data[DISTRICT];
          LI.append(STRONG, EM);

          for (var i = 0; i < SUB_DISTRICTS.length; i++) {
            var SUB_LI = HTML_STRUCTURE.createEl("subLI", SUB_DISTRICTS[i]);
            UL.append(SUB_LI);
          }

          LI.append(UL);
          FRAGMENT.append(LI);
        }
      }

      var DISTRICT_LIST = document.getElementById("districtList");
      DISTRICT_LIST.append(FRAGMENT);
    }

    fetch("./data/district.json").then(function (response) {
      return response.json();
    }).then(function (data) {
      return fetchList(data);
    });
  }
};
exports.HTML_STRUCTURE = HTML_STRUCTURE;