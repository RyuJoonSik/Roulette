'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TYPE = void 0;
var TYPE = {
  isString: function isString(data) {
    var result = true;

    if (typeof data !== "string") {
      result = false;
      console.log("is not String.");
    }

    return result;
  },
  isNumber: function isNumber(data) {
    var result = true;

    if (typeof data !== "number") {
      result = false;
      console.log("is not Number.");
    }

    return result;
  },
  isBoolean: function isBoolean(data) {
    var result = true;

    if (typeof data !== "boolean") {
      result = false;
      console.log("is not Boolean.");
    }

    return result;
  },
  isObject: function isObject(data) {
    var result = true;

    if (typeof data !== "object") {
      result = false;
      console.log("is not Object.");
    }

    return result;
  },
  isArray: function isArray(data) {
    var result = true;

    if (!Array.isArray(data)) {
      result = false;
      console.log("is not Array.");
    }

    return result;
  },
  isNull: function isNull(data) {
    var result = true;

    if (data !== null) {
      result = false;
      console.log("is not Null.");
    }

    return result;
  },
  isUndefined: function isUndefined(data) {
    var result = true;

    if (typeof data !== "undefined") {
      result = false;
      console.log("is not Undefined.");
    }

    return result;
  },
  isElementNode: function isElementNode(data) {
    var result = true;

    if (data.nodeType !== 1) {
      result = false;
      console.log("is not Element node.");
    }

    return result;
  }
};
exports.TYPE = TYPE;