const TYPE = {
  isString(data) {
    let result = true;

    if (typeof data !== `string`) {
      result = false;
      console.log(`String이 아닙니다.`);
    }

    return result;
  },

  isNumber(data) {
    let result = true;

    if (typeof data !== `number`) {
      result = false;
      console.log(`Number가 아닙니다.`);
    }

    return result;
  },

  isBoolean(data) {
    let result = true;

    if (typeof data !== `boolean`) {
      result = false;
      console.log(`Boolean이 아닙니다.`);
    }

    return result;
  },
  
  isObject(data) {
    let result = true;

    if (typeof data !== `object`) {
      result = false;
      console.log(`Object가 아닙니다.`);
    }

    return result;
  },

  isArray(data) {
    let result = true;

    if (!Array.isArray(data)) {
      result = false;
      console.log(`Array가 아닙니다.`);
    }

    return result;
  },

  isNull(data) {
    let result = true;

    if (data !== null) {
      result = false;
      console.log(`Null이 아닙니다.`);
    }

    return result;
  },

  isUndefined(data) {
    let result = true;

    if (typeof data !== `undefined`) {
      result = false;
      console.log(`Undefined가 아닙니다.`);
    }

    return result;
  },

  isElementNode(data) {
    let result = true;

    if (data.nodeType !== 1) {
      result = false;
      console.log(`Element node가 아닙니다.`);
    }

    return result;
  }
}