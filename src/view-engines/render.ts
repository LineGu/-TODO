import { Component } from './components/component';
import { listenRouting } from './router';

// TODO: 추후 별도 모듈로 활용하게 되면, Config 받기
const PAGE_BASE_PATH = '../pages';

async function loadCurrentPage(): Promise<Component> {
  const path = window.location.pathname.replace('/', '');

  // TODO: 파일 경로 수정
  try {
    const Page = await import(/* @vite-ignore */ `${PAGE_BASE_PATH}/${path}`);

    return new Page.default();
  } catch (err) {
    console.log(err);
    const Page = await import(`${PAGE_BASE_PATH}/404`);
    return new Page.default();
  }
}

export async function renderPage(target: HTMLElement) {
  const Page = await loadCurrentPage();

  listenRouting(() => renderPage(target));

  target.innerHTML = '';
  target.appendChild(Page.Element);
}
