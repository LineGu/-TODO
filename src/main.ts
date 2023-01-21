import './_mocks/browser';
import './style.css';

import { assert } from './utils/assert';
import { listenRouting } from './utils/router';

async function loadCurrentPage() {
  const path = window.location.pathname.replace('/', '');

  try {
    const Page = await import(/* @vite-ignore */ `./pages/${path}`);

    return new Page.default();
  } catch {
    const Page = await import('./pages/404');
    return new Page.default();
  }
}

async function renderPage(target: HTMLElement) {
  const page = await loadCurrentPage();

  // Clear Target
  target.innerHTML = '';
  // Render
  target.appendChild(page.Element);
}

const App = document.querySelector<HTMLDivElement>('#app');

assert(App != null, '최상단 Parent Node가 존재하지 않습니다.');

renderPage(App);
listenRouting(() => renderPage(App));
