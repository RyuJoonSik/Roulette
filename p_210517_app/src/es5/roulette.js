'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Roulette = void 0;

require("core-js/modules/es.array.fill.js");

require("core-js/modules/es.array.splice.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/web.dom-collections.iterator.js");

var _dataTypeChecker = require("./data-type-checker.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

var _canvas = /*#__PURE__*/new WeakMap();

var _circle = /*#__PURE__*/new WeakMap();

var _arrow = /*#__PURE__*/new WeakMap();

var _time = /*#__PURE__*/new WeakMap();

var _spin = /*#__PURE__*/new WeakMap();

var _districts = /*#__PURE__*/new WeakMap();

var _colors = /*#__PURE__*/new WeakMap();

// 룰렛
var Roulette = /*#__PURE__*/function () {
  function Roulette(canvasNode) {
    _classCallCheck(this, Roulette);

    _canvas.set(this, {
      writable: true,
      value: {
        canvasEl: null,
        ctx: null
      }
    });

    _circle.set(this, {
      writable: true,
      value: {
        radius: 0,
        X: 0,
        Y: 0,
        dividedAngle: 0
      }
    });

    _arrow.set(this, {
      writable: true,
      value: {
        width: 0,
        X: 0,
        Y: 0
      }
    });

    _time.set(this, {
      writable: true,
      value: {
        passedTime: 0,
        totalTime: 0
      }
    });

    _spin.set(this, {
      writable: true,
      value: {
        spinnedAngle: 0,
        totalSpin: 0
      }
    });

    _districts.set(this, {
      writable: true,
      value: []
    });

    _colors.set(this, {
      writable: true,
      value: ['#fc5c65', '#fd9644', '#fed330', '#26de81', '#2bcbba', '#45aaf2', '#4b7bec', '#a55eea']
    });

    if (!_dataTypeChecker.TYPE.isElementNode(canvasNode) || canvasNode.nodeName !== "CANVAS") {
      throw "Error ! \uC798\uBABB\uB41C \uB370\uC774\uD130 \uD0C0\uC785 \uC785\uB2C8\uB2E4."; // console.log(`잘못된 데이터 타입 입니다.`);
      // return;
    }

    if (Roulette.instance) {
      console.log("\uC0DD\uC131\uB41C \uAC1D\uCCB4\uAC00 \uC774\uBBF8 \uC874\uC7AC\uD569\uB2C8\uB2E4.");
      return Roulette.instance;
    }

    _classPrivateFieldGet(this, _canvas).canvasEl = canvasNode;
    _classPrivateFieldGet(this, _canvas).ctx = _classPrivateFieldGet(this, _canvas).canvasEl.getContext("2d");
    _classPrivateFieldGet(this, _circle).X = _classPrivateFieldGet(this, _canvas).canvasEl.width / 2;
    _classPrivateFieldGet(this, _circle).Y = _classPrivateFieldGet(this, _canvas).canvasEl.height / 2;
    _classPrivateFieldGet(this, _circle).radius = _classPrivateFieldGet(this, _canvas).canvasEl.width / 2 * 0.9;
    _classPrivateFieldGet(this, _arrow).X = _classPrivateFieldGet(this, _circle).X;
    _classPrivateFieldGet(this, _arrow).Y = _classPrivateFieldGet(this, _circle).Y - _classPrivateFieldGet(this, _circle).radius;
    _classPrivateFieldGet(this, _arrow).width = _classPrivateFieldGet(this, _circle).radius * 0.1;
    Roulette.instance = this;
    return this;
  }

  _createClass(Roulette, [{
    key: "setSize",
    value: function setSize() {
      _classPrivateFieldGet(this, _circle).X = _classPrivateFieldGet(this, _canvas).canvasEl.width / 2;
      _classPrivateFieldGet(this, _circle).Y = _classPrivateFieldGet(this, _canvas).canvasEl.height / 2;
      _classPrivateFieldGet(this, _circle).radius = _classPrivateFieldGet(this, _circle).X * 0.9;
      _classPrivateFieldGet(this, _arrow).X = _classPrivateFieldGet(this, _circle).X;
      _classPrivateFieldGet(this, _arrow).Y = _classPrivateFieldGet(this, _circle).Y - _classPrivateFieldGet(this, _circle).radius;
      _classPrivateFieldGet(this, _arrow).width = _classPrivateFieldGet(this, _circle).radius * 0.1;
    }
  }, {
    key: "drawArrow",
    value: function drawArrow() {
      var _classPrivateFieldGet2 = _classPrivateFieldGet(this, _canvas),
          CTX = _classPrivateFieldGet2.ctx;

      CTX.beginPath();
      CTX.fillStyle = '#778ca3';
      CTX.moveTo(_classPrivateFieldGet(this, _arrow).X, _classPrivateFieldGet(this, _arrow).Y);
      CTX.lineTo(_classPrivateFieldGet(this, _arrow).X + _classPrivateFieldGet(this, _arrow).width, _classPrivateFieldGet(this, _arrow).Y - _classPrivateFieldGet(this, _arrow).width);
      CTX.lineTo(_classPrivateFieldGet(this, _arrow).X - _classPrivateFieldGet(this, _arrow).width, _classPrivateFieldGet(this, _arrow).Y - _classPrivateFieldGet(this, _arrow).width);
      CTX.fill();
    }
  }, {
    key: "convertToRadian",
    value: function convertToRadian(angle) {
      if (!_dataTypeChecker.TYPE.isNumber(angle)) {
        return;
      }

      var RADIAN = angle * (Math.PI / 180);
      return RADIAN;
    }
  }, {
    key: "setAngle",
    value: function setAngle() {
      _classPrivateFieldGet(this, _circle).dividedAngle = 360 / _classPrivateFieldGet(this, _districts).length;
    }
  }, {
    key: "setTime",
    value: function setTime() {
      var RANDOM_TIME = Math.random() * 10 % 3 + 2;
      var FPS = 60;
      _classPrivateFieldGet(this, _time).totalTime = RANDOM_TIME * FPS;
      _classPrivateFieldGet(this, _time).passedTime = 0;
    }
  }, {
    key: "setSpin",
    value: function setSpin() {
      var RANDOM_SPIN_COUNT = Math.random() * 10 % 2 + 2;
      var SPIN = 360;
      _classPrivateFieldGet(this, _spin).totalSpin = RANDOM_SPIN_COUNT * SPIN;
    }
  }, {
    key: "addDistrict",
    value: function addDistrict(district) {
      if (!_dataTypeChecker.TYPE.isString(district)) {
        return;
      }

      _classPrivateFieldGet(this, _districts).push(district);

      this.setAngle();
    }
  }, {
    key: "removeDistrict",
    value: function removeDistrict(district) {
      if (!_dataTypeChecker.TYPE.isString(district)) {
        return;
      }

      var INDEX = _classPrivateFieldGet(this, _districts).indexOf(district);

      _classPrivateFieldGet(this, _districts).splice(INDEX, 1);

      this.setAngle();
    }
  }, {
    key: "easingOut",
    value: function easingOut(t, b, c, d) {
      if (!_dataTypeChecker.TYPE.isNumber(t) || !_dataTypeChecker.TYPE.isNumber(b) || !_dataTypeChecker.TYPE.isNumber(c) || !_dataTypeChecker.TYPE.isNumber(d)) {
        return;
      }

      t /= d;
      t--;
      return c * (t * t * t + 1) + b;
    }
  }, {
    key: "divideCircle",
    value: function divideCircle(piece) {
      if (!_dataTypeChecker.TYPE.isNumber(piece)) {
        return;
      }

      var _classPrivateFieldGet3 = _classPrivateFieldGet(this, _canvas),
          CTX = _classPrivateFieldGet3.ctx;

      var _classPrivateFieldGet4 = _classPrivateFieldGet(this, _circle),
          X = _classPrivateFieldGet4.X,
          Y = _classPrivateFieldGet4.Y,
          ANGLE = _classPrivateFieldGet4.dividedAngle;

      CTX.beginPath();
      CTX.moveTo(X, Y);

      var _classPrivateFieldGet5 = _classPrivateFieldGet(this, _spin),
          SPINNED_ANGLE = _classPrivateFieldGet5.spinnedAngle;

      var START_ANGLE = piece * ANGLE + SPINNED_ANGLE;
      var END_ANGLE = START_ANGLE + ANGLE;
      CTX.arc(X, Y, _classPrivateFieldGet(this, _circle).radius, this.convertToRadian(START_ANGLE), this.convertToRadian(END_ANGLE));
      CTX.strokeStyle = 'transparent';
      CTX.stroke();
      CTX.fillStyle = _classPrivateFieldGet(this, _colors)[piece % _classPrivateFieldGet(this, _colors).length];
      CTX.fill();
    }
  }, {
    key: "addText",
    value: function addText(piece) {
      if (!_dataTypeChecker.TYPE.isNumber(piece)) {
        return;
      }

      var _classPrivateFieldGet6 = _classPrivateFieldGet(this, _canvas),
          CTX = _classPrivateFieldGet6.ctx;

      CTX.font = '20px serif';
      CTX.fillStyle = 'black';
      CTX.save();

      var _classPrivateFieldGet7 = _classPrivateFieldGet(this, _circle),
          ANGLE = _classPrivateFieldGet7.dividedAngle,
          RADIUS = _classPrivateFieldGet7.radius,
          X = _classPrivateFieldGet7.X,
          Y = _classPrivateFieldGet7.Y;

      var _classPrivateFieldGet8 = _classPrivateFieldGet(this, _spin),
          SPINNED_ANGLE = _classPrivateFieldGet8.spinnedAngle;

      var TEXT_ANGLE = ANGLE / 2 + piece * ANGLE + SPINNED_ANGLE;
      var TEXT_POSITION = RADIUS * 0.9;
      CTX.translate(X + Math.cos(this.convertToRadian(TEXT_ANGLE)) * TEXT_POSITION, Y + Math.sin(this.convertToRadian(TEXT_ANGLE)) * TEXT_POSITION);
      var START_ANGLE = piece * ANGLE;
      var END_ANGLE = START_ANGLE + ANGLE;
      var TEXT_ROTATE = 90 + START_ANGLE / 2 + END_ANGLE / 2 + SPINNED_ANGLE;
      CTX.rotate(this.convertToRadian(TEXT_ROTATE));
      CTX.fillText(_classPrivateFieldGet(this, _districts)[piece], -CTX.measureText(_classPrivateFieldGet(this, _districts)[piece]).width / 2, 0);
      CTX.restore();
    }
  }, {
    key: "drawRoulette",
    value: function drawRoulette() {
      _classPrivateFieldGet(this, _canvas).ctx.clearRect(0, 0, _classPrivateFieldGet(this, _canvas).canvasEl.width, _classPrivateFieldGet(this, _canvas).canvasEl.height);

      this.drawArrow();

      for (var i = 0; i < _classPrivateFieldGet(this, _districts).length; i++) {
        this.divideCircle(i);
        this.addText(i);
      }
    }
  }, {
    key: "spinRoulette",
    value: function spinRoulette() {
      var _classPrivateFieldGet9 = _classPrivateFieldGet(this, _time),
          passedTime = _classPrivateFieldGet9.passedTime,
          totalTime = _classPrivateFieldGet9.totalTime;

      if (passedTime < totalTime) {
        passedTime = ++_classPrivateFieldGet(this, _time).passedTime;

        var _classPrivateFieldGet10 = _classPrivateFieldGet(this, _spin),
            totalSpin = _classPrivateFieldGet10.totalSpin;

        _classPrivateFieldGet(this, _spin).spinnedAngle = this.easingOut(passedTime, 0, totalSpin, totalTime);
        this.drawRoulette();
        window.requestAnimationFrame(this.spinRoulette.bind(this));
      } else {
        this.stopRoulette();
      }
    }
  }, {
    key: "stopRoulette",
    value: function stopRoulette() {
      var _classPrivateFieldGet11 = _classPrivateFieldGet(this, _spin),
          SPINNED_ANGLE = _classPrivateFieldGet11.spinnedAngle;

      var _classPrivateFieldGet12 = _classPrivateFieldGet(this, _circle),
          DIVIDED_ANGLE = _classPrivateFieldGet12.dividedAngle;

      var START_ANGLE = SPINNED_ANGLE + 90;
      var INDEX = Math.floor((360 - START_ANGLE % 360) / DIVIDED_ANGLE);
      alert(_classPrivateFieldGet(this, _districts)[INDEX]);
    }
  }]);

  return Roulette;
}();

exports.Roulette = Roulette;