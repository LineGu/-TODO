import { State, Component, pushTo } from '../view-engines';

export default class CreatePage extends Component {
  constructor() {
    super();
  }

  createElement() {
    return `
    <div>
        <div>렌더링 테스트 ${this.count}</div>
        <div>숫자가 10이 되면 페이지를 이동합니다.</div>
        <button>+1</button>
    </div>`;
  }

  @State
  count: number = 1;

  events = [
    {
      type: 'click',
      callback: () => {
        this.count += 1;

        if (this.count === 10) {
          pushTo('/list');
        }
      },
    },
  ];
}
