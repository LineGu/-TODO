import { assert } from '../utils/assert';
import { v4 as uuid } from 'uuid';
import { listenRouting } from '../utils/router';

const VIRTUAL_DOM_ID = 'tempTag';
const COMPONENT_STORE = new Map();

function changeVirtualDomToComponent(node: HTMLElement | Element) {
  const virtualDomList = node.querySelectorAll(VIRTUAL_DOM_ID);

  virtualDomList.forEach(virtualDom => {
    changeVirtualDomToComponent(virtualDom);

    const hasVirtualDomData = COMPONENT_STORE.has(virtualDom.id);

    if (hasVirtualDomData) {
      // 자식 정보를 컴포넌트에게 주입
      COMPONENT_STORE.get(virtualDom.id).children = virtualDom.innerHTML;

      // 실제 컴포넌트로 교환
      virtualDom.replaceWith(COMPONENT_STORE.get(virtualDom.id).Element);
    }
  });
}

function createNodeFromHTMLString(htmlString: string) {
  const converter = document.createElement('div');
  converter.innerHTML = htmlString.trim();

  const node = converter.firstChild as HTMLElement;
  assert(node != null, '노드 생성에 문제가 있습니다.');

  changeVirtualDomToComponent(node);

  return node as HTMLElement;
}

interface Event {
  type: Parameters<typeof document['addEventListener']>[0];
  callback: Parameters<typeof document['addEventListener']>[1];
  options?: Parameters<typeof document['addEventListener']>[2];
}

export abstract class Component {
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

  private _node: HTMLElement | null = null;

  private _attachHandlers = () => {
    this.events?.forEach(({ type, callback, options }) => {
      assert(this._node != null, '요소를 먼저 구성해야합니다.');
      this._node.addEventListener(type, callback, options);
    });
  };

  protected events: Event[] = [];

  protected children: string = '';

  protected render() {
    const node = createNodeFromHTMLString(this.createElement({ children: this.children }));

    // insert node
    this._node?.replaceWith(node);
    this._node = node;

    // attach handler
    this._attachHandlers();

    return this._node;
  }

  constructor() {}

  abstract createElement({ children }: { children: string }): string;

  get Element() {
    return this.render();
  }
}

async function loadCurrentPage(): Promise<Component> {
  const path = window.location.pathname.replace('/', '');

  // TODO: 파일 경로 수정
  try {
    const Page = await import(/* @vite-ignore */ `../pages/${path}`);

    return new Page.default();
  } catch {
    const Page = await import('../pages/404');
    return new Page.default();
  }
}

export async function renderPage(target: HTMLElement) {
  const Page = await loadCurrentPage();

  listenRouting(() => renderPage(target));

  target.innerHTML = '';
  target.appendChild(Page.Element);
}
