export const CANVAS = {
  canvas: document.getElementById('canvas'),
  scale: window.devicePixelRatio,
  ctx: null,
  width: 0,
  height: 0,
  centerX: 0,
  centerY: 0,
  radius: 0,
  PI: Math.PI,
  districts: [
    '남구', 
    '북구', 
    '중구', 
    '동구', 
    '울주군'],
  districtNum: 0,
  colors = [
    '#B10B77',
    '#804B21',
    '#685B5B',
    '#2254C5',
    '#16675E',
    '#5251A7',
    '#4F5456',
    '#B80235',
  ],

  /* 캔버스 너비, 높이, 프로퍼티 초기화 */
  init() {
    const { canvas, scale } = this;
    const { offsetWidth, offsetHeight } = this.canvas;
    this.ctx = canvas.getContext('2d');
    this.width = offsetWidth * scale;
    this.height = offsetHeight * scale;

    const { width, height } = this;
    this.canvas.width = width;
    this.canvas.height = height;
    this.centerX = width / 2;
    this.centerY = height / 2;
    this.radius = (Math.min(width, height) / 2) * 0.9;

    // const { ctx, centerX, centerY, radius, PI } = this;
    // ctx.arc(centerX, centerY, radius, 0, PI * 2);
    // ctx.fill();
  },

  drawCircle() {
    this.districtNum = this.districts.length;

    const { districtNum, PI, ctx, centerX, centerY, radius } = this;
    const ANGLE = (2 * PI) / districtNum;

    ctx.beginPath();
    ctx.
  }
};
