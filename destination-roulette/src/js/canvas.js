'use strict';
import { TYPE } from './data-type-checker.js';

export const CANVAS = {
  CANVAS_EL: document.getElementById('canvas'),
  SCALE: window.devicePixelRatio,
  CTX: document.getElementById('canvas').getContext('2d'),

  ROULETTE: {
    CENTER_X: 0,
    CENTER_Y: 0,
    RADIUS: 0,
    PI: Math.PI,
    ANGLE: 0,
    DISTRICTS: [],
    COLORS: ['#B10B77', '#804B21', '#685B5B', '#2254C5', '#16675E', '#5251A7', '#4F5456', '#B80235'],
    TOTAL_SPIN: 0,
    SPINNED_ANGLE: 0,
    TOTAL_TIME: 0,
    CUR_TIME: 0,
    RESULT: '',
    IS_SPINNING: false,
  },

  /* 캔버스 너비, 높이, 프로퍼티 초기화 */
  init() {
    const { CANVAS_EL, SCALE } = this;
    const { offsetWidth: OFFSET_W, offsetHeight: OFFSET_H } = CANVAS_EL;
    const WIDTH = OFFSET_W * SCALE;
    const HEIGHT = OFFSET_H * SCALE;

    CANVAS_EL.width = WIDTH;
    CANVAS_EL.height = HEIGHT;
    this.ROULETTE.CENTER_X = WIDTH / 2;
    this.ROULETTE.CENTER_Y = HEIGHT / 2;
    this.ROULETTE.RADIUS = (Math.min(WIDTH, HEIGHT) / 2) * 0.9;
    // this.CTX = CANVAS_EL.getContext('2d');
  },

  /* 캔버스 지우기 */
  erase() {
    const { CANVAS_EL, CTX } = this;

    CTX.clearRect(0, 0, CANVAS_EL.width, CANVAS_EL.height);
  },

  /* 룰렛 판 그리기 */
  drawCircle() {
    const { CTX, ROULETTE } = this;
    const { DISTRICTS, PI, CENTER_X, CENTER_Y, RADIUS, COLORS, SPINNED_ANGLE } = ROULETTE;
    const DISTRICTS_NUM = DISTRICTS.length;
    const COLORS_NUM = COLORS.length;
    const ANGLE = (PI * 2) / DISTRICTS_NUM;

    for (let i = 0; i < DISTRICTS_NUM; i += 1) {
      const START_ANGLE = i * ANGLE + SPINNED_ANGLE;
      const END_ANGLE = START_ANGLE + ANGLE;

      CTX.fillStyle = COLORS[i % COLORS_NUM];
      CTX.beginPath();
      CTX.moveTo(CENTER_X, CENTER_Y);
      CTX.arc(CENTER_X, CENTER_Y, RADIUS, START_ANGLE, END_ANGLE);
      CTX.fill();
    }
  },

  /* 룰렛 화살표 그리기 */
  drawArrow() {
    const { CTX, ROULETTE } = this;
    const { PI, CENTER_X, CENTER_Y, RADIUS } = ROULETTE;
    const ARROW_RADIUS = RADIUS * 0.1;

    /* 원 그리기 */
    CTX.fillStyle = 'white';
    CTX.beginPath();
    CTX.arc(CENTER_X, CENTER_Y, ARROW_RADIUS, 0, PI * 2);
    CTX.fill();

    /* 삼각형 그리기 */
    CTX.beginPath();
    CTX.moveTo(CENTER_X - ARROW_RADIUS, CENTER_Y);
    CTX.lineTo(CENTER_X, (CENTER_Y - ARROW_RADIUS) * 0.9);
    CTX.lineTo(CENTER_X + ARROW_RADIUS, CENTER_Y);
    CTX.fill();

    /* 작은 원 그리기 */
    CTX.fillStyle = '#aaa';
    CTX.beginPath();
    CTX.arc(CENTER_X, CENTER_Y, ARROW_RADIUS * 0.8, 0, PI * 2);
    CTX.fill();
  },

  /* 룰렛 텍스트 그리기 */
  drawText() {
    const { CTX, ROULETTE } = this;
    const { DISTRICTS, PI, CENTER_X, CENTER_Y, RADIUS, SPINNED_ANGLE } = ROULETTE;
    const DISTRICTS_NUM = DISTRICTS.length;
    const ANGLE = (PI * 2) / DISTRICTS_NUM;
    const TEXT_RADIUS = RADIUS * 0.8;

    CTX.fillStyle = 'white';
    CTX.font = TEXT_RADIUS / 5 + 'px sans-serif';

    for (let i = 0; i < DISTRICTS_NUM; i += 1) {
      CTX.beginPath();
      CTX.save(); // context 값 저장

      const TEXT_ANGLE = ANGLE / 2 + ANGLE * i + SPINNED_ANGLE;
      const TEXT_X = CENTER_X + Math.cos(TEXT_ANGLE) * TEXT_RADIUS;
      const TEXT_Y = CENTER_Y + Math.sin(TEXT_ANGLE) * TEXT_RADIUS;
      const BASE_ANGLE = (90 * PI) / 180;
      const START_ANGLE = (ANGLE * i) / 2;
      const END_ANGLE = (ANGLE * (i + 1)) / 2;
      const ROTATE_ANGLE = BASE_ANGLE + START_ANGLE + END_ANGLE;

      CTX.translate(TEXT_X, TEXT_Y); // 기준 좌표 설정
      CTX.rotate(ROTATE_ANGLE + SPINNED_ANGLE); // 회전 각도 설정
      CTX.textAlign = 'center'; // 글자 중앙 정렬

      CTX.fillText(DISTRICTS[i], 0, 0);
      CTX.restore(); // CTX.save() 가 호출되기 전 context 값 불러오기
    }
  },

  /* 룰렛 그리기 */
  drawRoulette() {
    if (this.rouletteIsEmpty()) {
      this.erase();

      return;
    }

    this.drawCircle();
    this.drawArrow();
    this.drawText();
  },

  /* 베지에 곡선 */
  easingOut(t, b, c, d) {
    /* 
      t : 경과 시간
      b : 시작 값
      c : 끝 값
      d : 총 지속 시간
    */
    if (!TYPE.isNumber(t) || !TYPE.isNumber(b) || !TYPE.isNumber(c) || !TYPE.isNumber(d)) {
      return;
    }

    t /= d;
    t--;

    return c * (t * t * t + 1) + b;
  },

  /* 총 회전 수 랜덤 값 생성 */
  setTotalTime() {
    /* 
      1초 동안 총 60 프레임 재생
      3초 ~ 6초 값
    */
    const RANDOM_SECOND = ((Math.random() * 10) % 3) + 3;

    this.ROULETTE.TOTAL_TIME = 60 * RANDOM_SECOND;
  },

  /* 총 회전 시간 랜덤 값 생성 */
  setTotalSpin() {
    /* 4 ~ 7 회전 수 */
    const { PI } = this.ROULETTE;
    const RANDOM_SPIN = ((Math.random() * 10) % 3) + 4;

    this.ROULETTE.TOTAL_SPIN = PI * 2 * RANDOM_SPIN;
  },

  /* 룰렛 초기화 */
  resetRoulette() {
    this.ROULETTE.CUR_TIME = 0;
    this.setTotalTime();
    this.setTotalSpin();
  },

  /* 룰렛 회전 */
  spinRoulette() {
    const { TOTAL_TIME, TOTAL_SPIN, CUR_TIME } = this.ROULETTE;

    if (CUR_TIME < TOTAL_TIME) {
      this.ROULETTE.IS_SPINNING = true;
      this.ROULETTE.CUR_TIME = CUR_TIME + 1;
      this.ROULETTE.SPINNED_ANGLE = this.easingOut(CUR_TIME, 0, TOTAL_SPIN, TOTAL_TIME);
      this.erase();
      this.drawRoulette();
      window.requestAnimationFrame(this.spinRoulette.bind(this));
    } else {
      /* 룰렛 회전 종료 */
      this.ROULETTE.IS_SPINNING = false;

      const { SPINNED_ANGLE, DISTRICTS, PI } = this.ROULETTE;
      const ANGLE360 = PI * 2;
      const ANGLE = ANGLE360 / DISTRICTS.length;
      const BASE_ANGLE = PI / 2; // 90 도
      const START_ANGLE = BASE_ANGLE + SPINNED_ANGLE;
      const INDEX = Math.floor((ANGLE360 - (START_ANGLE % ANGLE360)) / ANGLE);

      this.ROULETTE.RESULT = DISTRICTS[INDEX];
    }
  },

  /* 룰렛이 현재 회전 중인지 */
  rouletteIsSpinning() {
    return this.ROULETTE.IS_SPINNING;
  },

  /* 룰렛이 현재 비어있는지 */
  rouletteIsEmpty() {
    return this.ROULETTE.DISTRICTS.length === 0;
  },

  /* 룰렛 결괏값 반환 */
  getRouletteResult() {
    return this.ROULETTE.RESULT;
  },

  /* 지역 추가 */
  addDistrict(district) {
    if (!TYPE.isString(district)) {
      return;
    }

    this.ROULETTE.DISTRICTS.push(district);
    this.drawRoulette();
  },

  /* 지역 삭제 */
  removeDistrict(district) {
    if (!TYPE.isString(district)) {
      return;
    }

    const INDEX = this.ROULETTE.DISTRICTS.indexOf(district);

    this.ROULETTE.DISTRICTS.splice(INDEX, 1);
    this.drawRoulette();
  },
};
