'use strict'; // HTML 구조 

var HTML_STRUCTURE = {
  setHTML: function setHTML() {
    document.body.innerHTML = "\n      <section>\n        <div id=\"roulette\" class=\"roulette wrapper--article\">\n          <ul id=\"districtList\" class=\"main-district\">\n          </ul>\n          <button  id=\"start\" class=\"roulette--button-start roulette--button\">\n            <span>START</span>\n          </button>\n        </div>\n      </section>\n    ";
  },
  createEl: function createEl(element) {
    var text = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

    if (!TYPE.isString(element) || !TYPE.isString(text)) {
      console.log("\uC798\uBABB\uB41C \uB370\uC774\uD130 \uD0C0\uC785 \uC785\uB2C8\uB2E4.");
      return;
    }

    var ELEMENT;

    switch (element) {
      case "LI":
        ELEMENT = document.createElement("li");
        ELEMENT.className = "main-district--list";
        return ELEMENT;

      case "STRONG":
        ELEMENT = document.createElement("strong");
        ELEMENT.className = "main-district--name";
        ELEMENT.innerText = text;
        return ELEMENT;

      case "EM":
        ELEMENT = document.createElement("em");
        ELEMENT.className = "main-district--number";
        return ELEMENT;

      case "UL":
        ELEMENT = document.createElement("ul");
        ELEMENT.className = "sub-district--unchecked";
        return ELEMENT;

      case "subLI":
        ELEMENT = document.createElement("li");
        ELEMENT.className = "sub-district--list";
        ELEMENT.innerText = text;
        return ELEMENT;

      default:
        console.log("\uC815\uC758\uB418\uC5B4\uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.");
    }
  },
  addList: function addList() {
    function fetchList(data) {
      if (!TYPE.isObject(data)) {
        return;
      }

      var FRAGMENT = document.createDocumentFragment();

      for (var DISTRICT in data) {
        if (data.hasOwnProperty(DISTRICT)) {
          var LI = HTML_STRUCTURE.createEl("LI");
          var STRONG = HTML_STRUCTURE.createEl("STRONG", DISTRICT);
          var EM = HTML_STRUCTURE.createEl("EM");
          var UL = HTML_STRUCTURE.createEl("UL");
          var SUB_DISTRICTS = data[DISTRICT];

          if ("append" in Element.prototype) {
            LI.append(STRONG, EM);
          } else {
            LI.appendChild(STRONG);
            LI.appendChild(EM);
          }

          for (var i = 0; i < SUB_DISTRICTS.length; i++) {
            var SUB_LI = HTML_STRUCTURE.createEl("subLI", SUB_DISTRICTS[i]);
            UL.appendChild(SUB_LI);
          }

          LI.appendChild(UL);
          FRAGMENT.appendChild(LI);
        }
      }

      var DISTRICT_LIST = document.getElementById("districtList");
      DISTRICT_LIST.appendChild(FRAGMENT);
      ;
    }

    if (!!window.fetch) {
      fetch("/resources/data/district.json").then(function (response) {
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

      XHR.open("GET", "resources/data/district.json");
      XHR.send();
    }
  }
};