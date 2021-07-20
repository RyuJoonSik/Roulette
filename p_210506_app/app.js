"use strict";
// HTML 구조
var HTMLStructure = {
  setHTML: function () {
    document.body.innerHTML =
      '\
      <section>\
        <div id="roulette" class="roulette">\
          <ul id="districtList" class="main-district">\
          </ul>\
          <button  id="start" class="roulette__button-start roulette__button">\
            <span>START</span>\
          </button>\
        </div>\
      </section>\
    ';
  },

  createEl: function (element, text) {
    var El;

    switch (element) {
      case "LI":
        El = document.createElement("li");
        El.className = "main-district--list";
        return El;

      case "STRONG":
        El = document.createElement("strong");
        El.className = "main-district--name";
        El.innerText = text;
        return El;

      case "EM":
        El = document.createElement("em");
        El.className = "main-district--number";
        return El;

      case "UL":
        El = document.createElement("ul");
        El.className = "sub-district--unchecked";
        return El;

      case "subLI":
        El = document.createElement("li");
        El.className = "sub-district--list";
        El.innerText = text;
        return El;

      default:
        console.log("정의되어있지 않습니다.");
    }
  },

  addList: function () {
    var XHR = new XMLHttpRequest();

    XHR.onreadystatechange = function () {
      if (XHR.readyState === 4 && XHR.status === 200) {
        var fragment = document.createDocumentFragment();
        var districtList = document.getElementById("districtList");
        var districtJSON = JSON.parse(XHR.response);
        var districts = [];
        var i, j, subDistricts;
        var LI, subLI, UL, STRONG, EM;

        for (i in districtJSON) {
          districts.push(i);
        }

        for (i = 0; i < districts.length; i++) {
          LI = HTMLStructure.createEl("LI");
          STRONG = HTMLStructure.createEl("STRONG", districts[i]);
          EM = HTMLStructure.createEl("EM");
          UL = HTMLStructure.createEl("UL");
          subDistricts = districtJSON[districts[i]];

          LI.appendChild(STRONG);
          LI.appendChild(EM);

          for (j = 0; j < subDistricts.length; j++) {
            subLI = HTMLStructure.createEl("subLI", subDistricts[j]);

            UL.appendChild(subLI);
          }

          LI.appendChild(UL);
          fragment.appendChild(LI);
        }

        districtList.appendChild(fragment);
      }
    };

    XHR.open("GET", "korea.json");
    XHR.send();
  },
};

// 캔버스
var canvas = {
  setCanvas: function (parentId, canvasId) {
    var parent = document.getElementById(parentId);
    var canvas = document.createElement("canvas");

    canvas.id = canvasId;
    canvas.className = "roulette--canvas";
    parent.insertBefore(canvas, parent.firstChild);
  },

  getCanvas: function (canvasId) {
    var canvas = document.getElementById(canvasId);

    return canvas;
  },

  drawCanvas: function (canvasId) {
    var canvas = document.getElementById(canvasId);
    var parent = canvas.parentNode;

    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetWidth;
  },
};

// 룰렛
var rouletteSingleton = (function () {
  var rouletteCanvas, ctx;
  var radius, centerX, centerY;
  var instance;
  var passedTime, totalTime;
  var totalSpin;
  var spinnedAngle, dividedAngle;
  var districts = [];
  var COLORS = [
    "#fc5c65",
    "#fd9644",
    "#fed330",
    "#26de81",
    "#2bcbba",
    "#45aaf2",
    "#4b7bec",
    "#a55eea",
  ];

  // 사용할 객체 반환
  function initiate() {
    return {
      initialize: function (canvasNode) {
        rouletteCanvas = canvasNode;
        ctx = rouletteCanvas.getContext("2d");
        centerX = canvasNode.width / 2;
        centerY = canvasNode.height / 2;
        radius = (canvasNode.width / 2) * 0.9;
        spinnedAngle = 0;
      },

      drawArrow: function () {
        var arrowWidth = radius * 0.1;
        var arrowX = centerX;
        var arrowY = centerY - radius;

        ctx.beginPath();
        ctx.fillStyle = "#778ca3";
        ctx.moveTo(arrowX, arrowY);
        ctx.lineTo(arrowX + arrowWidth, arrowY - arrowWidth);
        ctx.lineTo(arrowX - arrowWidth, arrowY - arrowWidth);
        ctx.fill();
      },

      convertToRadian: function (angle) {
        var radian = angle * (Math.PI / 180);

        return radian;
      },

      setAngle: function () {
        dividedAngle = 360 / districts.length;
      },

      setTime: function () {
        var randomTime = ((Math.random() * 10) % 3) + 2;
        var FPS = 60;

        passedTime = 0;
        totalTime = randomTime * FPS;
      },

      setSpin: function () {
        var randomSpinCount = ((Math.random() * 10) % 2) + 2;
        var SPIN = 360;

        totalSpin = randomSpinCount * SPIN;
      },

      addDistrict: function (district) {
        districts.push(district);
        this.setAngle();
      },

      removeDistrict: function (district) {
        var index = districts.indexOf(district);

        districts.splice(index, 1);
        this.setAngle();
      },

      easingOut: function (t, b, c, d) {
        t /= d;
        t--;

        return c * (t * t * t + 1) + b;
      },

      divideCircle: function (piece) {
        var startAngle = piece * dividedAngle + spinnedAngle;
        var endAngle = startAngle + dividedAngle;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(
          centerX,
          centerY,
          radius,
          this.convertToRadian(startAngle),
          this.convertToRadian(endAngle)
        );
        ctx.strokeStyle = "transparent";
        ctx.stroke();
        ctx.fillStyle = COLORS[piece % COLORS.length];
        ctx.fill();
      },

      addText: function (piece) {
        var startAngle = piece * dividedAngle;
        var endAngle = startAngle + dividedAngle;
        var textAngle = dividedAngle / 2 + piece * dividedAngle + spinnedAngle;
        var textPosition = radius * 0.9;
        var textRotate = 90 + startAngle / 2 + endAngle / 2 + spinnedAngle;

        ctx.font = "20px serif";
        ctx.fillStyle = "black";
        ctx.save();
        ctx.translate(
          centerX + Math.cos(this.convertToRadian(textAngle)) * textPosition,
          centerY + Math.sin(this.convertToRadian(textAngle)) * textPosition
        );
        ctx.rotate(this.convertToRadian(textRotate));
        ctx.fillText(
          districts[piece],
          -ctx.measureText(districts[piece]).width / 2,
          0
        );
        ctx.restore();
      },

      drawRoulette: function () {
        var i = 0;
        ctx.clearRect(0, 0, rouletteCanvas.width, rouletteCanvas.height);

        this.drawArrow();
        for (; i < districts.length; i++) {
          this.divideCircle(i);
          this.addText(i);
        }
      },

      spinRoulette: function () {
        var drawing = this.spinRoulette.bind(this);

        if (passedTime < totalTime) {
          passedTime++;
          spinnedAngle = this.easingOut(passedTime, 0, totalSpin, totalTime);

          this.drawRoulette();
          window.requestAnimationFrame(drawing);
        } else {
          this.stopRoulette();
        }
      },

      stopRoulette: function () {
        var startAngle = spinnedAngle + 90;
        console.log(startAngle);
        var index = Math.floor((360 - (startAngle % 360)) / dividedAngle);

        alert(districts[index]);
      },
    };
  }

  return {
    // 객체가 생성 안되있을 경우
    getInstance: function () {
      if (!instance) {
        instance = initiate();
      }

      // 기존의 것을 반환
      return instance;
    },
  };
})();

var clickEvent = {
  showSubDistrict: function () {
    var districtList = document.getElementById("districtList");
    var UL;

    districtList.addEventListener("click", function (e) {
      if (e.target.nodeName !== "STRONG") {
        return;
      }

      for (
        UL = e.target.nextSibling;
        UL.nodeName !== "UL";
        UL = UL.nextSibling
      );

      e.target.classList.toggle("main-district--name--checked");
      UL.classList.toggle("sub-district--unchecked");
    });
  },

  controlDistrictList: function () {
    var districtList = document.getElementById("districtList");

    districtList.addEventListener("click", function (e) {
      var EM;

      if (
        e.target.nodeName !== "LI" ||
        !e.target.classList.contains("sub-district--list")
      ) {
        return;
      }

      for (
        EM = e.target.parentNode;
        EM.nodeName !== "EM";
        EM = EM.previousSibling
      );

      e.target.classList.toggle("sub-district--list--checked");

      if (e.target.classList.contains("sub-district--list--checked")) {
        roulette.addDistrict(e.target.innerText);
        roulette.drawRoulette();
        EM.innerText =
          EM.innerText === "" ? "1" : (parseInt(EM.innerText) + 1).toString();
      } else {
        roulette.removeDistrict(e.target.innerText);
        roulette.drawRoulette();
        EM.innerText =
          EM.innerText === "1"
            ? (EM.innerText = "")
            : (parseInt(EM.innerText) - 1).toString();
      }
    });
  },

  startRoullete: function () {
    var startBtn = document.getElementById("start");

    startBtn.addEventListener("click", function () {
      roulette.setTime();
      roulette.setSpin();
      roulette.spinRoulette();
    });
  },
};

var canvasId = "canvas";
var canvasNode, roulette;

HTMLStructure.setHTML();
HTMLStructure.addList();

canvas.setCanvas("roulette", canvasId);
canvas.drawCanvas(canvasId);
canvasNode = canvas.getCanvas(canvasId);

roulette = rouletteSingleton.getInstance();
roulette.initialize(canvasNode);
roulette.drawArrow();

clickEvent.showSubDistrict();
clickEvent.controlDistrictList();
clickEvent.startRoullete();
