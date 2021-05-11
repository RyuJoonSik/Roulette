'use strict'; // 캔버스

var CANVAS = {
  setCanvas: function setCanvas(parentId, canvasId) {
    if (!TYPE.isString(parentId) || !TYPE.isString(canvasId)) {
      console.log("\uC798\uBABB\uB41C \uB370\uC774\uD130 \uD0C0\uC785 \uC785\uB2C8\uB2E4.");
      return;
    }

    var CANVAS = document.createElement("canvas");
    CANVAS.id = canvasId;
    CANVAS.className = "roulette--canvas";
    var PARENT = document.getElementById(parentId);
    document.prepend === undefined ? PARENT.insertBefore(CANVAS, PARENT.firstChild) : PARENT.prepend(CANVAS);
  },
  getCanvas: function getCanvas(canvasId) {
    if (!TYPE.isString(canvasId)) {
      console.log("\uC798\uBABB\uB41C \uB370\uC774\uD130 \uD0C0\uC785 \uC785\uB2C8\uB2E4.");
      return;
    }

    var CANVAS = document.getElementById(canvasId);
    return CANVAS;
  },
  drawCanvas: function drawCanvas(canvasId) {
    if (!TYPE.isString(canvasId)) {
      console.log("\uC798\uBABB\uB41C \uB370\uC774\uD130 \uD0C0\uC785 \uC785\uB2C8\uB2E4.");
      return;
    }

    var CANVAS = document.getElementById(canvasId);
    var PARENT = canvas.parentNode;
    CANVAS.width = PARENT.offsetWidth;
    CANVAS.height = PARENT.offsetWidth;
  }
};