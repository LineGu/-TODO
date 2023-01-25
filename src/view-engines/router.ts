const PUSH_EVENT_ID = 'pushState';
const REPLACE_EVENT_ID = 'replaceState';

const pushEvent = new Event(PUSH_EVENT_ID);
const replaceEvent = new Event(REPLACE_EVENT_ID);

let initialize = false;

// history o
export function pushTo(path: string) {
  if (initialize === false) {
    throw new Error('router 초기화 후 사용해야합니다.');
  }
  const origin = window.location.origin;

  window.history.pushState({}, '', `${origin}${path}`);
  window.dispatchEvent(pushEvent);
}

// history x
export function replaceTo(path: string) {
  if (initialize === false) {
    throw new Error('router 초기화 후 사용해야합니다.');
  }

  const origin = window.location.origin;

  window.history.replaceState({}, '', `${origin}${path}`);
  window.dispatchEvent(replaceEvent);
}

// router method를 사용하기 전에 필수로 선언되어야함
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
