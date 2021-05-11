'use strict';
// 룰렛
class Roulette {
  #canvas = {
    canvasEl: null,
    ctx: null
  };
  #circle = {
    radius: 0,
    X: 0,
    Y: 0,
    dividedAngle: 0
  };
  #arrow = {
    width: 0,
    X: 0,
    Y: 0
  };
  #time = {
    passedTime: 0,
    totalTime: 0
  }
  #spin = {
    spinnedAngle: 0,
    totalSpin: 0
  }
  #districts =  [];
  #colors =  [
    '#fc5c65',
    '#fd9644',
    '#fed330',
    '#26de81',
    '#2bcbba',
    '#45aaf2',
    '#4b7bec',
    '#a55eea'
  ];

  constructor(canvasNode) {
    if (!TYPE.isElementNode(canvasNode) || canvasNode.nodeName !== `CANVAS`) {
      throw `Error ! 잘못된 데이터 타입 입니다.`;
      // console.log(`잘못된 데이터 타입 입니다.`);
      // return;
    }
    
    if (Roulette.instance) {
      console.log(`생성된 객체가 이미 존재합니다.`);
      return Roulette.instance;
    }

    this.#canvas.canvasEl = canvasNode;
    this.#canvas.ctx = this.#canvas.canvasEl.getContext(`2d`);

    this.#circle.X = this.#canvas.canvasEl.width / 2;
    this.#circle.Y = this.#canvas.canvasEl.height / 2;
    this.#circle.radius = this.#canvas.canvasEl.width / 2 * 0.9;

    this.#arrow.X = this.#circle.X;
    this.#arrow.Y = this.#circle.Y - this.#circle.radius;
    this.#arrow.width = this.#circle.radius * 0.1;

    Roulette.instance = this;

    return this;
  }

  drawArrow() {
    const {ctx: CTX} = this.#canvas;

    CTX.beginPath();
    CTX.fillStyle = '#778ca3';
    CTX.moveTo(this.#arrow.X, this.#arrow.Y);
    CTX.lineTo(this.#arrow.X + this.#arrow.width, this.#arrow.Y -this.#arrow.width);
    CTX.lineTo(this.#arrow.X -this.#arrow.width, this.#arrow.Y -this.#arrow.width);
    CTX.fill();
  }

  convertToRadian(angle) {
    if (!TYPE.isNumber(angle)) {
      return;
    }

    const RADIAN = angle * (Math.PI / 180);

    return RADIAN;
  }

  setAngle() {
    this.#circle.dividedAngle = 360 / this.#districts.length;
  }

  setTime() {
    const RANDOM_TIME = (Math.random() * 10) % 3 + 2;
    const FPS = 60;

    this.#time.totalTime = RANDOM_TIME * FPS;
    this.#time.passedTime = 0;
  }

  setSpin() {
    const RANDOM_SPIN_COUNT = (Math.random() * 10) % 2 + 2;
    const SPIN = 360;

    this.#spin.totalSpin = RANDOM_SPIN_COUNT * SPIN;
  }

  addDistrict(district) {
    if (!TYPE.isString(district)) {
      return;
    }

    this.#districts.push(district);
    this.setAngle();
  }

  removeDistrict(district) {
    if (!TYPE.isString(district)) {
      return;
    }

    const INDEX = this.#districts.indexOf(district);

    this.#districts.splice(INDEX, 1);
    this.setAngle();
  }

  easingOut(t, b, c, d) {
    if (!TYPE.isNumber(t) || !TYPE.isNumber(b) || !TYPE.isNumber(c) || !TYPE.isNumber(d)) {
      return;
    }
    t /= d;
    t--;

    return c*(t*t*t + 1) + b;
  }

  divideCircle(piece) {
    if (!TYPE.isNumber(piece)) {
      return;
    }

    const {ctx: CTX} = this.#canvas;
    const {X, Y, dividedAngle: ANGLE} = this.#circle;

    CTX.beginPath();
    CTX.moveTo(X, Y);

    const {spinnedAngle: SPINNED_ANGLE} = this.#spin;
    const START_ANGLE = piece * ANGLE + SPINNED_ANGLE;
    const END_ANGLE = START_ANGLE + ANGLE;

    CTX.arc(X, Y, this.#circle.radius, this.convertToRadian(START_ANGLE), this.convertToRadian(END_ANGLE));
    CTX.strokeStyle = 'transparent';
    CTX.stroke();
    CTX.fillStyle = this.#colors[piece % this.#colors.length];
    CTX.fill();
  }

  addText(piece) {
    if (!TYPE.isNumber(piece)) {
      return;
    }

    const {ctx: CTX} = this.#canvas;
    
    CTX.font = '20px serif';
    CTX.fillStyle = 'black';
    CTX.save();

    const {dividedAngle: ANGLE, radius: RADIUS, X, Y} = this.#circle;
    const {spinnedAngle: SPINNED_ANGLE} = this.#spin;
    const TEXT_ANGLE = ANGLE / 2 + (piece * ANGLE) + SPINNED_ANGLE;
    const TEXT_POSITION = RADIUS * 0.9;

    CTX.translate(X + Math.cos(this.convertToRadian(TEXT_ANGLE)) * TEXT_POSITION, Y + Math.sin(this.convertToRadian(TEXT_ANGLE)) * TEXT_POSITION);

    const START_ANGLE = piece * ANGLE;
    const END_ANGLE = START_ANGLE + ANGLE;
    const TEXT_ROTATE = 90 + (START_ANGLE / 2) + (END_ANGLE/2) + SPINNED_ANGLE;

    CTX.rotate(this.convertToRadian(TEXT_ROTATE));
    CTX.fillText(this.#districts[piece], -CTX.measureText(this.#districts[piece]).width / 2, 0);
    CTX.restore();
  }

  drawRoulette() {
    this.#canvas.ctx.clearRect(0, 0, this.#canvas.canvasEl.width, this.#canvas.canvasEl.height);

    this.drawArrow();
    for (let i = 0; i < this.#districts.length; i++) {
      this.divideCircle(i);
      this.addText(i);
    }
  }

  spinRoulette() {
    let {passedTime, totalTime} = this.#time;

    if (passedTime < totalTime) {
      passedTime = ++this.#time.passedTime;
      let {totalSpin} = this.#spin;
      this.#spin.spinnedAngle = this.easingOut(passedTime, 0, totalSpin, totalTime);

      this.drawRoulette();
      window.requestAnimationFrame(this.spinRoulette.bind(this));
    } else {
      this.stopRoulette();
    }
  }

  stopRoulette() {
    const {spinnedAngle: SPINNED_ANGLE} = this.#spin;
    const {dividedAngle: DIVIDED_ANGLE} = this.#circle;
    const START_ANGLE = SPINNED_ANGLE + 90;
    const INDEX = Math.floor((360 - START_ANGLE % 360) / DIVIDED_ANGLE);

    alert(this.#districts[INDEX]);
  }
}