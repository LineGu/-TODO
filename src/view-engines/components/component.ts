import { v4 as uuid } from 'uuid';
import { assert } from '../../utils/assert';
import { ComponentBase } from './componentBase';
import { VIRTUAL_DOM_ID } from './constants';

// 사용자 인터페이스 정의
export abstract class Component extends ComponentBase {
  // Component Start Interface
  static get CS() {
    const id = uuid();
    const CustomComponent = this;

    assert(CustomComponent !== Component, '추상 Class의 가상돔은 만들 수 없습니다.');

    /* @ts-ignore */
    COMPONENT_STORE.set(id, new CustomComponent());

    return `${VIRTUAL_DOM_ID} id="${id}"`;
  }

  // Component End Interface
  static get CE() {
    return VIRTUAL_DOM_ID;
  }
}
