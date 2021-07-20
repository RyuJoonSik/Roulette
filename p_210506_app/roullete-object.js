var roulette = {
  passedTime: 0, // 경과 프레임
  FPS: 60,
  totalTime: 0,
  totalSpin: 0,
  changedAngle: 0,
  pieceCount: 0,
  addedAngle: 0,
  districts: [],
  COLORS: [
    "#fc5c65",
    "#fd9644",
    "#fed330",
    "#26de81",
    "#2bcbba",
    "#45aaf2",
    "#a55eea",
    "#d1d8e0",
  ],

  initRandom: function () {
    var randomTime = ((Math.random() * 10) % 3) + 2;
    var randomSpinCount = ((Math.random() * 10) % 2) + 2;

    this.passedTime = 0;
    this.totalTime = randomTime * this.FPS; // 1초에 60프레임
    this.totalSpin = 360 * randomSpinCount;
    this.pieceCount = this.districts.length;
    this.addedAngle = 360 / this.pieceCount;
  },

  // t : currentTime, b : startValue, c : changeInValue, d : duration
  easingOut: function (t, b, c, d) {
    t /= d;
    t--;

    return c * (t * t * t + 1) + b;
  },

  angleToRadian: function (angle) {
    var radian = angle * (Math.PI / 180);

    return radian;
  },

  drawCanvas: function () {
    // var articleEl = document.getElementById('roulette');
    var canvasEl = document.getElementById("canvas");
    var searchEl = document.getElementById("search");
    // canvasEl.id = 'canvas';
    // canvasEl.className = 'canvas';
    // canvasEl.innerText = '대체 텍스트 입니다.';
    canvasEl.width = 600;
    canvasEl.height = 600;
    // articleEl.appendChild(canvasEl);
  },

  drawRoulette: function () {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var canvasCenterX = canvas.width / 2;
    var canvasCenterY = canvas.height / 2;
    var radius = canvasCenterX * 0.9;
    var startAngle, endAngle, angle, rotateAngle;
    var i, text, textRadius;

    function drawArrow() {
      var triangleXY = radius * 0.1;
      var triangleX = canvasCenterX;
      var triangleY = canvasCenterY - radius;
      // ctx.strokeStyle = 'black';
      // ctx.lineWidth = '5';
      ctx.beginPath();
      ctx.fillStyle = "gray";
      // ctx.translate(triangleX, triangleY);
      ctx.moveTo(triangleX, triangleY);
      ctx.lineTo(triangleX + triangleXY, triangleY - triangleXY);
      ctx.lineTo(triangleX - triangleXY, triangleY - triangleXY);
      ctx.fill();
      // ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
      // ctx.fill();
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "20px serif";
    // this.changedAngle = 180;
    for (i = 0; i < this.pieceCount; i++) {
      ctx.beginPath();
      ctx.fillStyle = this.COLORS[i % this.COLORS.length];
      ctx.strokeStyle = "transparent";
      startAngle = i * this.addedAngle + this.changedAngle;
      endAngle = startAngle + this.addedAngle;
      ctx.moveTo(canvasCenterX, canvasCenterY);
      ctx.arc(
        canvasCenterX,
        canvasCenterY,
        radius,
        this.angleToRadian(startAngle),
        this.angleToRadian(endAngle)
      );
      ctx.stroke();
      ctx.fill();
      ctx.save();

      angle = this.addedAngle / 2 + i * this.addedAngle + this.changedAngle;
      textRadius = radius * 0.9;
      ctx.translate(
        canvasCenterX + Math.cos(this.angleToRadian(angle)) * textRadius,
        canvasCenterY + Math.sin(this.angleToRadian(angle)) * textRadius
      );
      rotateAngle =
        90 + this.changedAngle / 2 + endAngle / 2 + (i * this.addedAngle) / 2;
      ctx.rotate(this.angleToRadian(rotateAngle));
      text = this.districts[i % this.districts.length];
      ctx.fillStyle = "black";
      ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
      ctx.restore();
    }

    drawArrow();
  },

  stopRoulette: function () {
    console.log(roulette.changedAngle);
    var degrees = roulette.changedAngle + 90;
    var arcd = roulette.addedAngle;
    var index = Math.floor((360 - (degrees % 360)) / arcd);
    alert(this.districts[index]);
  },

  rotateRoulette: function () {
    if (roulette.passedTime < roulette.totalTime) {
      roulette.passedTime += 1;
      roulette.changedAngle = roulette.easingOut(
        roulette.passedTime,
        0,
        roulette.totalSpin,
        roulette.totalTime
      );
      roulette.drawRoulette();
      window.requestAnimationFrame(roulette.rotateRoulette);
    } else {
      roulette.stopRoulette();
    }
  },
};

var searchBtn = document.getElementById("search");
var startBtn = document.getElementById("start");
var districtList = document.getElementById("districtList");
var PLACES = ["울산", "부산", "경주", "포항"];
var rouletteCanvas = document.getElementById("canvas");

function showDistrictList() {
  var xhr = new XMLHttpRequest();

  xhr.open("GET", "korea.json");
  xhr.onload = function () {
    var district = JSON.parse(xhr.response);
    var districts = [];
    var innerHTMLText = "";
    var i, j;

    for (i in district) {
      districts.push(i);
    }

    for (i = 0; i < districts.length; i++) {
      innerHTMLText +=
        '<li class="main-district--list">' +
        '<strong class="main-district--name">' +
        districts[i] +
        '</strong><em class="main-district--number"></em><ul class="sub-district sub-district--unchecked">';
      for (j = 0; j < district[districts[i]].length; j++) {
        innerHTMLText +=
          '<li class="sub-district--list">' +
          district[districts[i]][j] +
          "</li>";
      }
      innerHTMLText += "</ul></li>";
    }

    districtList.innerHTML = innerHTMLText;
  };
  xhr.send();
}

window.onload = showDistrictList;

// 행정 구역 리스트 클릭 이벤트
districtList.addEventListener("click", function (e) {
  var count = 0;
  var index, i;
  console.log(e);

  if (e.target.nodeName === "STRONG") {
    e.target.classList.toggle("main-district--name--checked");
    for (i = e.target.nextSibling; i.nodeName !== "UL"; i = i.nextSibling) {}
    i.classList.toggle("sub-district--unchecked");
  } else if (e.target.nodeName === "LI" && e.target.children.length === 0) {
    e.target.classList.toggle("sub-district--list--checked");
    if (e.target.classList.contains("sub-district--list--checked")) {
      for (i = 0; i < e.target.parentNode.children.length; i++) {
        if (
          e.target.parentNode.children[i].classList.contains(
            "sub-district--list--checked"
          )
        ) {
          count++;
        }
      }
      count = count === 0 ? "" : count;
      e.target.parentNode.previousSibling.innerText = count;
      roulette.districts.push(e.target.innerText);
      roulette.initRandom();
      roulette.drawCanvas();
      roulette.drawRoulette();
    } else {
      for (i = 0; i < e.target.parentNode.children.length; i++) {
        if (
          e.target.parentNode.children[i].classList.contains(
            "sub-district--list--checked"
          )
        ) {
          count++;
        }
      }
      count = count === 0 ? "" : count;
      e.target.parentNode.previousSibling.innerText = count;

      index = roulette.districts.indexOf(e.target.innerText);
      roulette.districts.splice(index, 1);
      roulette.initRandom();
      roulette.drawCanvas();
      roulette.drawRoulette();
    }
  }
});

startBtn.addEventListener("click", function () {
  roulette.initRandom();
  roulette.rotateRoulette();
});

roulette.initRandom();
roulette.drawCanvas();
roulette.drawRoulette();
