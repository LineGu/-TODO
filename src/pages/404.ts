import { Component, pushTo } from '../view-engines';

export default class NotFoundPage extends Component {
  constructor() {
    super();
  }

  createElement() {
    return `
    <div>
        <span>NOT FOUND</span>
        <${BackButton.CS}>
          <${Text.CS}></${Text.CE}>
        </${BackButton.CE}>
    </div>`;
  }
}

class BackButton extends Component {
  constructor() {
    super();
  }

  createElement({ children }: { children: string }) {
    return `<button>${children}</button>`;
  }

  events = [
    {
      type: 'click',
      callback: () => {
        pushTo('/create');
      },
    },
  ];
}

class Text extends Component {
  constructor() {
    super();
  }

  createElement() {
    return `<span>돌아가기</span>`;
  }
}
