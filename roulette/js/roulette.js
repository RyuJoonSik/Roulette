var passedTime = 0;
var FPS = 60
var randomSecond = (Math.random() * 10) + 5;
var SECOND = randomSecond > 10 ? randomSecond - 5 : randomSecond;
var randomSpinCount = (Math.random() * 5) + 2;
var totalTime = FPS * SECOND; 
var PI = Math.PI;
var totalSpinCount = 360 * randomSpinCount;
var changedAngle = 0;

function angleToRadian(angle) {
  var radian = angle * (PI / 180);

  return radian;
}

// t : currentTime, b : startValue, c : changeInValue, d : duration
function easingOut(t, b, c, d) {
  t /= d;
	t--;
	return c * Math.sqrt(1 - t*t) + b;
}

function drawRoulette() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var PI = Math.PI;
  var PIECE_COUNT = 3; // 등분 개수
  var ADDED_ANGLE = 360 / PIECE_COUNT;
  var REGIONS = ['울산', '부산', '대구', '포항'];
  var COLORS = ['#fc5c65', '#fd9644', '#fed330', '#26de81', '#2bcbba', '#45aaf2', '#a55eea', '#d1d8e0'];
  var canvasCenterX, canvasCenterY, radius;
  var startAngle, endAngle, angle, rotateAngle;
  var i, text, textRadius, start;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvasCenterX = canvas.width / 2
  canvasCenterY = canvas.height / 2
  radius = canvasCenterX * 0.5;

  changedAngle = easingOut(passedTime, 0, totalSpinCount,totalTime);
  // console.log(easingOut(passedTime, 0, totalSpinCount,totalTime));
  // changedAngle += 6;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = '20px serif';
  for (i = 0; i < PIECE_COUNT; i++) {
    ctx.beginPath();
    ctx.fillStyle = COLORS[i % COLORS.length];
    startAngle = i * ADDED_ANGLE + changedAngle;
    endAngle = startAngle + ADDED_ANGLE;
    ctx.moveTo(canvasCenterX, canvasCenterY);
    ctx.arc(canvasCenterX, canvasCenterY, radius, angleToRadian(startAngle), angleToRadian(endAngle));
    ctx.stroke();
    ctx.fill();
    ctx.save();

    angle = (ADDED_ANGLE / 2) + (i * ADDED_ANGLE) + changedAngle;
    textRadius = radius / 1.5;
    ctx.translate(canvasCenterX + Math.cos(angleToRadian(angle)) * textRadius, canvasCenterY + Math.sin(angleToRadian(angle)) * textRadius);
    rotateAngle = endAngle + ADDED_ANGLE / 2;
    // rotateAngle === 360 ? rotateAngle -= 360 : rotateAngle;
    ctx.rotate(angleToRadian(rotateAngle));
    text = REGIONS[i % REGIONS.length];
    ctx.fillStyle = 'black';
    ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
    ctx.restore();
  }

  // if (passedTime < totalTime) {
  //   passedTime += 1;
  //   window.requestAnimationFrame(drawRoulette);
  // }
}

drawRoulette();
