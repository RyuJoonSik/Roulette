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

require("core-js/modules/es.weak-set.js");

var _dataTypeChecker = require("./data-type-checker.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

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

var _convertToRadian = /*#__PURE__*/new WeakSet();

var _setAngle = /*#__PURE__*/new WeakSet();

var _easingOut = /*#__PURE__*/new WeakSet();

var _divideCircle = /*#__PURE__*/new WeakSet();

var _addText = /*#__PURE__*/new WeakSet();

var _stopRoulette = /*#__PURE__*/new WeakSet();

// 룰렛
var Roulette = /*#__PURE__*/function () {
  function Roulette(canvasNode) {
    _classCallCheck(this, Roulette);

    _stopRoulette.add(this);

    _addText.add(this);

    _divideCircle.add(this);

    _easingOut.add(this);

    _setAngle.add(this);

    _convertToRadian.add(this);

    _canvas.set(this, {
      writable: true,
      value: {
        canvasEl: null,
        ctx: null,
        fontSize: "16px"
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
      value: ['#B10B77', '#804B21', '#685B5B', '#2254C5', '#16675E', '#5251A7', '#4F5456', '#B80235']
    });

    if (!_dataTypeChecker.TYPE.isElementNode(canvasNode) || canvasNode.nodeName !== "CANVAS") {
      throw "Error ! \uC798\uBABB\uB41C \uB370\uC774\uD130 \uD0C0\uC785 \uC785\uB2C8\uB2E4.";
    }

    if (Roulette.instance) {
      return Roulette.instance;
    }

    _classPrivateFieldGet(this, _canvas).canvasEl = canvasNode;
    _classPrivateFieldGet(this, _canvas).ctx = _classPrivateFieldGet(this, _canvas).canvasEl.getContext("2d");
    _classPrivateFieldGet(this, _circle).X = _classPrivateFieldGet(this, _canvas).canvasEl.width / 2;
    _classPrivateFieldGet(this, _circle).Y = _classPrivateFieldGet(this, _canvas).canvasEl.height / 2;
    _classPrivateFieldGet(this, _circle).radius = _classPrivateFieldGet(this, _canvas).canvasEl.width / 2 * 0.9;
    _classPrivateFieldGet(this, _canvas).fontSize = "".concat(_classPrivateFieldGet(this, _circle).radius * 0.1, "px");
    _classPrivateFieldGet(this, _canvas).ctx.font = _classPrivateFieldGet(this, _canvas).fontSize + " sans-serif";
    _classPrivateFieldGet(this, _arrow).X = _classPrivateFieldGet(this, _circle).X;
    _classPrivateFieldGet(this, _arrow).Y = _classPrivateFieldGet(this, _circle).Y - _classPrivateFieldGet(this, _circle).radius;
    _classPrivateFieldGet(this, _arrow).width = _classPrivateFieldGet(this, _circle).radius * 0.1;
    Roulette.instance = this;
  }

  _createClass(Roulette, [{
    key: "isEmpty",
    value: function isEmpty() {
      var result = false;

      if (_classPrivateFieldGet(this, _districts).length === 0) {
        result = true;
      }

      return result;
    }
  }, {
    key: "setSize",
    value: function setSize() {
      _classPrivateFieldGet(this, _circle).X = _classPrivateFieldGet(this, _canvas).canvasEl.width / 2;
      _classPrivateFieldGet(this, _circle).Y = _classPrivateFieldGet(this, _canvas).canvasEl.height / 2;
      _classPrivateFieldGet(this, _circle).radius = _classPrivateFieldGet(this, _circle).X * 0.9;
      _classPrivateFieldGet(this, _canvas).fontSize = "".concat(_classPrivateFieldGet(this, _circle).radius * 0.1, "px");
      _classPrivateFieldGet(this, _canvas).ctx.font = _classPrivateFieldGet(this, _canvas).fontSize + " sans-serif";
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
      CTX.fillStyle = '#3F4A58';
      CTX.moveTo(_classPrivateFieldGet(this, _arrow).X, _classPrivateFieldGet(this, _arrow).Y);
      CTX.lineTo(_classPrivateFieldGet(this, _arrow).X + _classPrivateFieldGet(this, _arrow).width, _classPrivateFieldGet(this, _arrow).Y - _classPrivateFieldGet(this, _arrow).width);
      CTX.lineTo(_classPrivateFieldGet(this, _arrow).X - _classPrivateFieldGet(this, _arrow).width, _classPrivateFieldGet(this, _arrow).Y - _classPrivateFieldGet(this, _arrow).width);
      CTX.fill();
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
    key: "getTime",
    value: function getTime() {
      return _classPrivateFieldGet(this, _time).totalTime;
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

      _classPrivateMethodGet(this, _setAngle, _setAngle2).call(this);
    }
  }, {
    key: "removeDistrict",
    value: function removeDistrict(district) {
      if (!_dataTypeChecker.TYPE.isString(district)) {
        return;
      }

      var INDEX = _classPrivateFieldGet(this, _districts).indexOf(district);

      _classPrivateFieldGet(this, _districts).splice(INDEX, 1);

      _classPrivateMethodGet(this, _setAngle, _setAngle2).call(this);
    }
  }, {
    key: "drawRoulette",
    value: function drawRoulette() {
      _classPrivateFieldGet(this, _canvas).ctx.clearRect(0, 0, _classPrivateFieldGet(this, _canvas).canvasEl.width, _classPrivateFieldGet(this, _canvas).canvasEl.height);

      this.drawArrow();

      for (var i = 0; i < _classPrivateFieldGet(this, _districts).length; i++) {
        _classPrivateMethodGet(this, _divideCircle, _divideCircle2).call(this, i);

        _classPrivateMethodGet(this, _addText, _addText2).call(this, i);
      }
    }
  }, {
    key: "spinRoulette",
    value: function spinRoulette() {
      var _classPrivateFieldGet3 = _classPrivateFieldGet(this, _time),
          passedTime = _classPrivateFieldGet3.passedTime,
          totalTime = _classPrivateFieldGet3.totalTime;

      if (passedTime < totalTime) {
        passedTime = ++_classPrivateFieldGet(this, _time).passedTime;

        var _classPrivateFieldGet4 = _classPrivateFieldGet(this, _spin),
            totalSpin = _classPrivateFieldGet4.totalSpin;

        _classPrivateFieldGet(this, _spin).spinnedAngle = _classPrivateMethodGet(this, _easingOut, _easingOut2).call(this, passedTime, 0, totalSpin, totalTime);
        this.drawRoulette();
        window.requestAnimationFrame(this.spinRoulette.bind(this));
      } else {
        _classPrivateMethodGet(this, _stopRoulette, _stopRoulette2).call(this);
      }
    }
  }]);

  return Roulette;
}();

exports.Roulette = Roulette;

function _convertToRadian2(angle) {
  if (!_dataTypeChecker.TYPE.isNumber(angle)) {
    return;
  }

  var RADIAN = angle * (Math.PI / 180);
  return RADIAN;
}

function _setAngle2() {
  _classPrivateFieldGet(this, _circle).dividedAngle = 360 / _classPrivateFieldGet(this, _districts).length;
}

function _easingOut2(t, b, c, d) {
  if (!_dataTypeChecker.TYPE.isNumber(t) || !_dataTypeChecker.TYPE.isNumber(b) || !_dataTypeChecker.TYPE.isNumber(c) || !_dataTypeChecker.TYPE.isNumber(d)) {
    return;
  }

  t /= d;
  t--;
  return c * (t * t * t + 1) + b;
}

function _divideCircle2(piece) {
  if (!_dataTypeChecker.TYPE.isNumber(piece)) {
    return;
  }

  var _classPrivateFieldGet5 = _classPrivateFieldGet(this, _canvas),
      CTX = _classPrivateFieldGet5.ctx;

  var _classPrivateFieldGet6 = _classPrivateFieldGet(this, _circle),
      X = _classPrivateFieldGet6.X,
      Y = _classPrivateFieldGet6.Y,
      ANGLE = _classPrivateFieldGet6.dividedAngle;

  CTX.beginPath();
  CTX.moveTo(X, Y);

  var _classPrivateFieldGet7 = _classPrivateFieldGet(this, _spin),
      SPINNED_ANGLE = _classPrivateFieldGet7.spinnedAngle;

  var START_ANGLE = piece * ANGLE + SPINNED_ANGLE;
  var END_ANGLE = START_ANGLE + ANGLE;
  CTX.arc(X, Y, _classPrivateFieldGet(this, _circle).radius, _classPrivateMethodGet(this, _convertToRadian, _convertToRadian2).call(this, START_ANGLE), _classPrivateMethodGet(this, _convertToRadian, _convertToRadian2).call(this, END_ANGLE));
  CTX.strokeStyle = 'transparent';
  CTX.stroke();
  CTX.fillStyle = _classPrivateFieldGet(this, _colors)[piece % _classPrivateFieldGet(this, _colors).length];
  CTX.fill();
}

function _addText2(piece) {
  if (!_dataTypeChecker.TYPE.isNumber(piece)) {
    return;
  }

  var _classPrivateFieldGet8 = _classPrivateFieldGet(this, _canvas),
      CTX = _classPrivateFieldGet8.ctx;

  CTX.font = _classPrivateFieldGet(this, _canvas).fontSize + ' sans-serif';
  CTX.fillStyle = '#ffffff';
  CTX.save();

  var _classPrivateFieldGet9 = _classPrivateFieldGet(this, _circle),
      ANGLE = _classPrivateFieldGet9.dividedAngle,
      RADIUS = _classPrivateFieldGet9.radius,
      X = _classPrivateFieldGet9.X,
      Y = _classPrivateFieldGet9.Y;

  var _classPrivateFieldGet10 = _classPrivateFieldGet(this, _spin),
      SPINNED_ANGLE = _classPrivateFieldGet10.spinnedAngle;

  var TEXT_ANGLE = ANGLE / 2 + piece * ANGLE + SPINNED_ANGLE;
  var TEXT_POSITION = RADIUS * 0.9;
  CTX.translate(X + Math.cos(_classPrivateMethodGet(this, _convertToRadian, _convertToRadian2).call(this, TEXT_ANGLE)) * TEXT_POSITION, Y + Math.sin(_classPrivateMethodGet(this, _convertToRadian, _convertToRadian2).call(this, TEXT_ANGLE)) * TEXT_POSITION);
  var START_ANGLE = piece * ANGLE;
  var END_ANGLE = START_ANGLE + ANGLE;
  var TEXT_ROTATE = 90 + START_ANGLE / 2 + END_ANGLE / 2 + SPINNED_ANGLE;
  CTX.rotate(_classPrivateMethodGet(this, _convertToRadian, _convertToRadian2).call(this, TEXT_ROTATE));
  CTX.fillText(_classPrivateFieldGet(this, _districts)[piece], -CTX.measureText(_classPrivateFieldGet(this, _districts)[piece]).width / 2, 0);
  CTX.restore();
}

function _stopRoulette2() {
  var _classPrivateFieldGet11 = _classPrivateFieldGet(this, _spin),
      SPINNED_ANGLE = _classPrivateFieldGet11.spinnedAngle;

  var _classPrivateFieldGet12 = _classPrivateFieldGet(this, _circle),
      DIVIDED_ANGLE = _classPrivateFieldGet12.dividedAngle;

  var START_ANGLE = SPINNED_ANGLE + 90;
  var INDEX = Math.floor((360 - START_ANGLE % 360) / DIVIDED_ANGLE);
  alert(_classPrivateFieldGet(this, _districts)[INDEX]);
}

_defineProperty(Roulette, "instance", void 0);