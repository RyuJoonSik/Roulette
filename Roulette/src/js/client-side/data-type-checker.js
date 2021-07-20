'use strict';

// 함수의 매개변수로 넘어오는 인자들의 데이터 타입 체크
export const TYPE = {
  // 문자열
  isString(data) {
    let result = true;

    if (typeof data !== `string`) {
      result = false;
      console.log(`is not String.`);
    }

    return result;
  },

  // 숫자
  isNumber(data) {
    let result = true;

    if (typeof data !== `number`) {
      result = false;
      console.log(`is not Number.`);
    }

    return result;
  },

  // 참, 거짓
  isBoolean(data) {
    let result = true;

    if (typeof data !== `boolean`) {
      result = false;
      console.log(`is not Boolean.`);
    }

    return result;
  },

  // 객체
  isObject(data) {
    let result = true;

    if (typeof data !== `object`) {
      result = false;
      console.log(`is not Object.`);
    }

    return result;
  },

  // 배열
  isArray(data) {
    let result = true;

    if (!Array.isArray(data)) {
      result = false;
      console.log(`is not Array.`);
    }

    return result;
  },

  // null
  isNull(data) {
    let result = true;

    if (data !== null) {
      result = false;
      console.log(`is not Null.`);
    }

    return result;
  },

  // undefined
  isUndefined(data) {
    let result = true;

    if (typeof data !== `undefined`) {
      result = false;
      console.log(`is not Undefined.`);
    }

    return result;
  },

  // 요소 노드
  isElementNode(data) {
    let result = true;

    if (data.nodeType !== 1) {
      result = false;
      console.log(`is not Element node.`);
    }

    return result;
  }
};
