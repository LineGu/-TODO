import { assert } from '../utils/assert';

function createNodeFromHTMLString(htmlString: string): ChildNode {
  const converter = document.createElement('div');
  converter.innerHTML = htmlString.trim();

  const node = converter.firstChild;
  assert(node != null, '노드 생성에 문제가 있습니다.');

  return node;
}

interface Event {
  type: Parameters<typeof document['addEventListener']>[0];
  callback: Parameters<typeof document['addEventListener']>[1];
  options?: Parameters<typeof document['addEventListener']>[2];
}

export abstract class Component {
  private _node: ChildNode | null = null;

  protected events: Event[] = [];

  protected style: string = ``;

  private _attachHandlers = () => {
    this.events?.forEach(({ type, callback, options }) => {
      assert(this._node != null, '요소를 먼저 구성해야합니다.');
      this._node.addEventListener(type, callback, options);
    });
  };

  protected render() {
    const node = createNodeFromHTMLString(this.createElement());

    // insert node
    this._node?.replaceWith(node);
    this._node = node;

    // handler
    this._attachHandlers();

    return this._node;
  }

  abstract createElement(): string;

  constructor() {}

  // like jsx. <Component/> === Component.Element
  get Element() {
    return this.render();
  }
}
