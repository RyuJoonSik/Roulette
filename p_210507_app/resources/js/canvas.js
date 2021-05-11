'use strict';
// 캔버스

const CANVAS = {
  setCanvas(parentId, canvasId) {
    if (!TYPE.isString(parentId) || !TYPE.isString(canvasId)) {
      console.log(`잘못된 데이터 타입 입니다.`);
      return;
    }

    const CANVAS = document.createElement(`canvas`);
    CANVAS.id = canvasId;
    CANVAS.className = `roulette--canvas`;

    const PARENT = document.getElementById(parentId);
    document.prepend === undefined ? 
      PARENT.insertBefore(CANVAS, PARENT.firstChild) : PARENT.prepend(CANVAS);
  },

  getCanvas(canvasId) {
    if (!TYPE.isString(canvasId)) {
      console.log(`잘못된 데이터 타입 입니다.`);
      return;
    }

    const CANVAS = document.getElementById(canvasId);
  
    return CANVAS;
  },

  drawCanvas(canvasId) {
    if (!TYPE.isString(canvasId)) {
      console.log(`잘못된 데이터 타입 입니다.`);
      return;
    }

    const CANVAS = document.getElementById(canvasId);
    const PARENT = canvas.parentNode;
    CANVAS.width = PARENT.offsetWidth;
    CANVAS.height = PARENT.offsetWidth;
  }
};