import '/src/css/reset.css';
import '/src/css/style.css';
import { CANVAS } from './canvas.js';
import { DIALOG } from './dialog.js';

if ('serviceWorker' in navigator) {
  try {
    navigator.serviceWorker.register('serviceWorker.js');
    console.log('Service Worker Registered');
  } catch (error) {
    console.log('Service Worker Registration Failed');
  }
}

/* 
  tab 이동 시에만(클릭 X) 스타일을 줄 수 있도록 하기 위해
  click 을 주면 스타일이 해제된다.
 */
document.body.addEventListener('mousedown', function () {
  document.body.classList.remove('tab');
});

document.body.addEventListener('keydown', function (e) {
  if (e.keyCode === 9) {
    document.body.classList.add('tab');
  }
});

/* 룰렛이 회전 중이거나 대화상자가 열려있는지 확인 */
function btnIsAvailable() {
  let result = true;

  if (CANVAS.rouletteIsSpinning() || DIALOG.isOpen()) {
    if (CANVAS.rouletteIsSpinning()) {
      DIALOG.alert('알림', '회전 중...');
    } else {
      DIALOG.handleClose();
    }
    result = false;
  }

  return result;
}

/* Fetc를 사용해서 서버와 통신 */
async function FetchDistricts() {
  try {
    const RESPONSE = await fetch('/src/assets/json/district.json');

    if (!RESPONSE.ok) {
      throw new Error(`HTTP error! status: ${RESPONSE.status}`);
    }

    const RESPONSE_JSON = await RESPONSE.json();
    const DISTRICTS = RESPONSE_JSON;

    DIALOG.setList(DISTRICTS);
    DIALOG.set();
  } catch (e) {
    console.log(e);
  }
}

/* fetch를 지원하지 않을 경우 XMLHttpRequest를 사용(IE11) */
function XHRDistricts() {
  const XHR = new XMLHttpRequest();

  if (!XHR) {
    console.log('XMLHTTP 생성 불가');

    return;
  }

  XHR.open('GET', '/src/assets/json/district.json');
  XHR.send();

  XHR.onreadystatechange = function () {
    try {
      if (XHR.readyState === XMLHttpRequest.DONE) {
        if (XHR.status === 200) {
          DIALOG.setList(JSON.parse(XHR.response));
          DIALOG.set();
        } else {
          console.log('request 문제 발생');
        }
      }
    } catch (e) {
      console.log('Caught Exception: ' + e.description);
    }
  };
}

/* 윈도우 창 크기에 맞게 룰렛을 반응형으로 구현 */
window.addEventListener('resize', () => {
  CANVAS.init();
  CANVAS.drawRoulette();
});

CANVAS.init();
DIALOG.init();

/* START 버튼 클릭 이벤트 핸들러 */
const BTN_ROULETTE_START = document.getElementById('btnRouletteStart');

BTN_ROULETTE_START.addEventListener('click', () => {
  if (!btnIsAvailable()) {
    return;
  } else if (CANVAS.rouletteIsEmpty()) {
    DIALOG.alert('알림', '룰렛 설정 필수!');
  } else {
    const BTN_STATE = 'roulette__btn--isInActivated';

    BTN_ROULETTE_START.classList.add(BTN_STATE);
    CANVAS.resetRoulette();
    CANVAS.spinRoulette();

    const TIMER = setInterval(() => {
      if (!CANVAS.rouletteIsSpinning()) {
        BTN_ROULETTE_START.classList.remove(BTN_STATE);

        const RESULT = CANVAS.getRouletteResult();

        DIALOG.alert('결과', RESULT);
        clearInterval(TIMER);
      }
    }, 1000);
  }
});

/* '+'(설정) 버튼 클릭 이벤트 핸들러 */
const BTN_ROULETTE_ADD = document.getElementById('btnRouletteAdd');

BTN_ROULETTE_ADD.addEventListener('click', () => {
  if (!btnIsAvailable()) {
    return;
  } else {
    if (DIALOG.listIsEmpty()) {
      if (window.fetch) {
        FetchDistricts();
      } else {
        XHRDistricts();
      }
    } else {
      DIALOG.set();
    }
  }
});
