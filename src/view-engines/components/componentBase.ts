import { assert } from '../../utils/assert';
import { COMPONENT_STORE, VIRTUAL_DOM_ID } from './constants';

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

export abstract class ComponentBase {
  private _node: HTMLElement | null = null;

  private _attachHandlers() {
    this.events?.forEach(({ type, callback, options }) => {
      assert(this._node != null, '요소를 먼저 구성해야합니다.');
      this._node.addEventListener(type, callback, options);
    });
  }

  protected events: Event[] = [];

  protected children: string = '';

  constructor() {}

  abstract createElement({ children }: { children: string }): string;

  public freshNode() {
    const node = createNodeFromHTMLString(this.createElement({ children: this.children }));

    // insert node
    this._node?.replaceWith(node);
    this._node = node;

    // attach handler
    this._attachHandlers();
  }

  public get Element() {
    this.freshNode();
    assert(this._node != null, 'Node를 먼저 구성해야합니다.');

    return this._node;
  }
}
