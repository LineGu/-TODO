import { Component } from '../abstracts/component';

export default class ListPage extends Component {
  constructor() {
    super();
  }

  createElement() {
    return `
    <div>리스트</div>
    `;
  }
}
