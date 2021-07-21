'use strict';
import { TYPE } from './data-type-checker.js';
import { CANVAS } from './canvas.js';

export const DIALOG = {
  MODELESS_DIALOG: document.createElement('div'),
  MODELESS: document.createElement('div'),
  CONTAINER: document.createElement('article'),
  TITLE: document.createElement('h2'),
  CONTENT: document.createElement('div'),
  DESCRIPTION: document.createElement('p'),
  LIST: document.createElement('ul'),
  BUTTON: document.createElement('button'),
  BUTTON_NAME: document.createElement('span'),
  PARENT: document.getElementsByClassName('roulette')[0],

  /* 대화상자 초기화 */
  init() {
    const { CONTAINER, TITLE, CONTENT, DESCRIPTION, BUTTON, BUTTON_NAME, MODELESS, MODELESS_DIALOG, LIST } = this;

    MODELESS.className = 'modeless';
    CONTAINER.className = 'dialog';
    TITLE.className = 'dialog__title';
    CONTENT.className = 'dialog__content';
    DESCRIPTION.className = 'dialog__desc';
    LIST.className = 'dialog-list';
    BUTTON.id = 'btnDialogConfirm';
    BUTTON.className = 'dialog__btn';
    BUTTON_NAME.textContent = '확인';
    BUTTON.appendChild(BUTTON_NAME);
    CONTENT.appendChild(DESCRIPTION);
    CONTENT.appendChild(LIST);
    CONTAINER.appendChild(TITLE);
    CONTAINER.appendChild(CONTENT);
    CONTAINER.appendChild(BUTTON);
    MODELESS_DIALOG.appendChild(MODELESS);
    MODELESS_DIALOG.appendChild(CONTAINER);

    const handleClose = this.handleClose.bind(this);

    BUTTON.addEventListener('click', handleClose);
    /* 모달리스 해제 */
    MODELESS.addEventListener('click', handleClose);
  },

  /* 대화상자 컨텐츠 숨기기 */
  clearContent() {
    const { DESCRIPTION, LIST } = this;

    DESCRIPTION.classList.add('dialog__desc--isInvisible');
    LIST.classList.add('dialog-list--isInvisible');
  },

  /* 대화상자 body 태그 마지막에 삽입 */
  Equip() {
    // if (this.isOpen()) {
    // this.close();
    // }

    const { MODELESS_DIALOG, PARENT } = this;
    // const WRAP = document.getElementById('wrap');

    // document.body.insertBefore(MODELESS_DIALOG, WRAP.nextSibling);

    const BTN_ROULETTE_START = document.getElementById('btnRouletteStart');

    PARENT.insertBefore(MODELESS_DIALOG, BTN_ROULETTE_START);
  },

  /* 알림 대화상자 띄우기 */
  alert(title, desc) {
    if (!TYPE.isString(title) || !TYPE.isString(desc)) {
      return;
    }

    this.clearContent();

    const { TITLE, DESCRIPTION } = this;

    TITLE.textContent = title;
    DESCRIPTION.textContent = `${desc}`;
    DESCRIPTION.classList.remove('dialog__desc--isInvisible');
    this.Equip();
  },

  /* 대화상자 지역 리스트 설정 */
  setList(json) {
    if (!TYPE.isObject(json)) {
      return;
    }

    const { LIST } = this;
    const FRAGMENT = document.createDocumentFragment();
    const SPAN_EL = document.createElement('span');

    SPAN_EL.className = 'dialog-list__name';

    const BUTTON_EL = document.createElement('button');

    BUTTON_EL.className = 'dialog-list__btn';

    const LIST_EL = document.createElement('li');
    const UL_EL = document.createElement('ul');

    UL_EL.className = 'dialog-list--sub';

    const I_EL = document.createElement('i');

    I_EL.className = 'dialog-list__icon';
    I_EL.classList.add('fa');
    I_EL.classList.add('fa-check');

    /* 상위 행정구역 */
    for (const DISTRICT in json) {
      const SPAN_CLONE = SPAN_EL.cloneNode(true);

      SPAN_CLONE.textContent = DISTRICT;

      const BUTTON_CLONE = BUTTON_EL.cloneNode(true);

      BUTTON_CLONE.appendChild(SPAN_CLONE);

      const LIST_CLONE = LIST_EL.cloneNode(true);

      LIST_CLONE.appendChild(BUTTON_CLONE);

      /* 하위 행정구역 */
      const UL_CLONE = UL_EL.cloneNode(true);

      for (const SUB_DISTRICT of json[DISTRICT]) {
        const SPAN_CLONE = SPAN_EL.cloneNode(true);

        SPAN_CLONE.classList.add('dialog-list__name--sub');
        SPAN_CLONE.textContent = SUB_DISTRICT;

        const I_CLONE = I_EL.cloneNode(true);

        SPAN_CLONE.appendChild(I_CLONE);

        const BUTTON_CLONE = BUTTON_EL.cloneNode(true);

        BUTTON_CLONE.appendChild(SPAN_CLONE);

        const LIST_CLONE = LIST_EL.cloneNode(true);

        LIST_CLONE.appendChild(BUTTON_CLONE);
        UL_CLONE.appendChild(LIST_CLONE);
      }

      LIST_CLONE.appendChild(UL_CLONE);
      FRAGMENT.appendChild(LIST_CLONE);
    }

    LIST.appendChild(FRAGMENT);
    LIST.addEventListener('click', this.handleList);
  },

  /* 리스트 클릭 이벤트 핸들러 */
  handleList(e) {
    if (e.target.nodeName !== 'BUTTON' && e.target.nodeName !== 'SPAN') {
      return;
    }

    let targetEl = e.target;

    for (; targetEl.nodeName !== 'BUTTON'; targetEl = targetEl.parentNode);

    if (targetEl.nextSibling) {
      /* 상위 행정구역 */
      targetEl.children[0].classList.toggle('dialog-list__name--isClicked');
      targetEl.nextSibling.classList.toggle('dialog-list--isVisible');
    } else {
      /* 하위 행정구역 */
      const SPAN_EL = targetEl.children[0];

      SPAN_EL.classList.toggle('dialog-list__name--sub-isClicked');

      const DISTRICT = SPAN_EL.textContent;

      if (SPAN_EL.classList.contains('dialog-list__name--sub-isClicked')) {
        CANVAS.addDistrict(DISTRICT);
      } else {
        CANVAS.removeDistrict(DISTRICT);
      }

      return;
    }
  },

  /* 리스트 대화상자 열기 */
  set() {
    this.clearContent();

    const { TITLE, LIST } = this;

    TITLE.textContent = '지역 설정';
    LIST.classList.remove('dialog-list--isInvisible');
    this.Equip();
  },

  /* 리스트가 비었는지 */
  listIsEmpty() {
    const { LIST } = this;

    return LIST.textContent === '';
  },

  /* 대화상자가 열려있는지 */
  isOpen() {
    const { MODELESS_DIALOG } = this;

    return document.body.contains(MODELESS_DIALOG);
  },

  /* 대화상자 닫기 */
  handleClose() {
    const { MODELESS_DIALOG, PARENT } = this;

    PARENT.removeChild(MODELESS_DIALOG);
  },
};
