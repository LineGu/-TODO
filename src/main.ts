import './style.css';
import { setupCounter } from './counter';

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

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);
