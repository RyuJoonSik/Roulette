'use strict';
import { TYPE } from './data-type-checker.js';

// 캔버스
export class CANVAS {
  constructor(canvasId) {
    if (!TYPE.isString(canvasId)) {
      throw `Error ! 잘못된 타입 입니다.`;
    }

    if (document.querySelector(`#${canvasId}`)) {
      throw `Error ! 이미 정의된 ID 입니다.`;
    }

    this.canvas = document.createElement(`canvas`);
    this.canvas.id = canvasId;
    this.canvas.className = `roulette--canvas`;
    this.canvas.innerText = `대체 텍스트 입니다.`;
  }

  getCanvas() {
    return this.canvas;
  }

  // setCanvas(parentId, canvasId) {
  //   if (!TYPE.isString(parentId) || !TYPE.isString(canvasId)) {
  //     console.log(`잘못된 데이터 타입 입니다.`);
  //     return;
  //   }

  //   const PARENT = document.getElementById(parentId);

  //   console.log(PARENT.children);

  //   const CANVAS = document.createElement(`canvas`);
  //   CANVAS.id = canvasId;
  //   CANVAS.className = `roulette--canvas`;

  //   PARENT.prepend(CANVAS);
  // }

  // getCanvas(canvasId) {
  //   if (!TYPE.isString(canvasId)) {
  //     console.log(`잘못된 데이터 타입 입니다.`);
  //     return;
  //   }

  //   const CANVAS = document.getElementById(canvasId);

  //   return CANVAS;
  // }

  // drawCanvas(canvasId) {
  //   if (!TYPE.isString(canvasId)) {
  //     console.log(`잘못된 데이터 타입 입니다.`);
  //     return;
  //   }

  //   const CANVAS = document.getElementById(canvasId);
  //   CANVAS.width = CANVAS.parentNode.offsetWidth;
  //   CANVAS.height = CANVAS.parentNode.offsetWidth;

  //   console.log(`hi`);
  // }
}
