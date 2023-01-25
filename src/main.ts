import './_mocks/browser';
import './style.css';

import { assert } from './utils/assert';
import { renderPage } from './abstracts/component';

const App = document.querySelector<HTMLDivElement>('#app');

assert(App != null, '최상단 Parent Node가 존재하지 않습니다.');

renderPage(App);
