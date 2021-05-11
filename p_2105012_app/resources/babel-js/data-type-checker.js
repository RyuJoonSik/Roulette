"use strict";

var TYPE = {
  isString: function isString(data) {
    var result = true;

    if (typeof data !== "string") {
      result = false;
      console.log("String\uC774 \uC544\uB2D9\uB2C8\uB2E4.");
    }

    return result;
  },
  isNumber: function isNumber(data) {
    var result = true;

    if (typeof data !== "number") {
      result = false;
      console.log("Number\uAC00 \uC544\uB2D9\uB2C8\uB2E4.");
    }

    return result;
  },
  isBoolean: function isBoolean(data) {
    var result = true;

    if (typeof data !== "boolean") {
      result = false;
      console.log("Boolean\uC774 \uC544\uB2D9\uB2C8\uB2E4.");
    }

    return result;
  },
  isObject: function isObject(data) {
    var result = true;

    if (typeof data !== "object") {
      result = false;
      console.log("Object\uAC00 \uC544\uB2D9\uB2C8\uB2E4.");
    }

    return result;
  },
  isArray: function isArray(data) {
    var result = true;

    if (!Array.isArray(data)) {
      result = false;
      console.log("Array\uAC00 \uC544\uB2D9\uB2C8\uB2E4.");
    }

    return result;
  },
  isNull: function isNull(data) {
    var result = true;

    if (data !== null) {
      result = false;
      console.log("Null\uC774 \uC544\uB2D9\uB2C8\uB2E4.");
    }

    return result;
  },
  isUndefined: function isUndefined(data) {
    var result = true;

    if (typeof data !== "undefined") {
      result = false;
      console.log("Undefined\uAC00 \uC544\uB2D9\uB2C8\uB2E4.");
    }

    return result;
  },
  isElementNode: function isElementNode(data) {
    var result = true;

    if (data.nodeType !== 1) {
      result = false;
      console.log("Element node\uAC00 \uC544\uB2D9\uB2C8\uB2E4.");
    }

    return result;
  }
};