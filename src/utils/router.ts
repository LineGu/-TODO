const PUSH_EVENT_ID = 'pushState';
const REPLACE_EVENT_ID = 'replaceState';

const pushEvent = new Event(PUSH_EVENT_ID);
const replaceEvent = new Event(REPLACE_EVENT_ID);

let initialize = false;

export function pushTo(path: string) {
  if (initialize === false) {
    throw new Error('router 초기화 후 사용해야합니다.');
  }
  const origin = window.location.origin;

  window.history.pushState({}, '', `${origin}${path}`);
  window.dispatchEvent(pushEvent);
}

export function replaceTo(path: string) {
  if (initialize === false) {
    throw new Error('router 초기화 후 사용해야합니다.');
  }

  const origin = window.location.origin;

  window.history.replaceState({}, '', `${origin}${path}`);
  window.dispatchEvent(replaceEvent);
}

export function listenRouting(callback: VoidFunction) {
  if (initialize) {
    return;
  }

  window.addEventListener(PUSH_EVENT_ID, () => {
    callback();
  });

  window.addEventListener(REPLACE_EVENT_ID, () => {
    callback();
  });

  window.addEventListener('popstate', () => {
    callback();
  });

  initialize = true;
}
