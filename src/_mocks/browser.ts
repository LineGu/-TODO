import { setupWorker } from 'msw';
import { handlers } from './handlers';

const worker = setupWorker(...handlers);

export const registerMockServer = async () => {
  if (process.env.NODE_ENV === 'development') {
    await worker.start({
      serviceWorker: {
        url: '/mockServiceWorker.js',
      },
    });
  }
};
