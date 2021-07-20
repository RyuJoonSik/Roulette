'use strict';

export const TYPE = {
  isString(data) {
    let result = true;

    if (typeof data !== `string`) {
      result = false;
      console.log(`is not String.`);
    }

    return result;
  },

  isNumber(data) {
    let result = true;

    if (typeof data !== `number`) {
      result = false;
      console.log(`is not Number.`);
    }

    return result;
  },

  isBoolean(data) {
    let result = true;

    if (typeof data !== `boolean`) {
      result = false;
      console.log(`is not Boolean.`);
    }

    return result;
  },

  isObject(data) {
    let result = true;

    if (typeof data !== `object`) {
      result = false;
      console.log(`is not Object.`);
    }

    return result;
  },

  isArray(data) {
    let result = true;

    if (!Array.isArray(data)) {
      result = false;
      console.log(`is not Array.`);
    }

    return result;
  },

  isNull(data) {
    let result = true;

    if (data !== null) {
      result = false;
      console.log(`is not Null.`);
    }

    return result;
  },

  isUndefined(data) {
    let result = true;

    if (typeof data !== `undefined`) {
      result = false;
      console.log(`is not Undefined.`);
    }

    return result;
  },

  isElementNode(data) {
    let result = true;

    if (data.nodeType !== 1) {
      result = false;
      console.log(`is not Element node.`);
    }

    return result;
  },
};
