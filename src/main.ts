import './style.css';
import { setupCounter } from './counter';
import { registerMockServer } from './_mocks/browser';
import axios from 'axios';
import { Todo } from './models/todo';

// 지우기 말기 (테스트용 서버 실행)
registerMockServer();

const CountCard = `
  <div class="card">
    <button id="counter" type="button"></button>
  </div>
`;

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <h1>Ray + Goo</h1>
    ${CountCard}
  </div>
`;

const exampleAPI = async () => {
  const { data } = await axios.get<Todo[]>('/todo');
  return data;
};

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);
