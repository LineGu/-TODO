import { Component } from '../abstracts/component';

export default class NotFoundPage extends Component {
  constructor() {
    super();
  }

  createElement() {
    return `
    <div>
        <span>NOT FOUND</span>
        <button>돌아가기</button>
    </div>`;
  }
}
