export function findInShadowRoot(
  rootElement: HTMLElement,
  selector: string,
): Element {
  return rootElement.shadowRoot?.querySelector(selector)!;
}

export function findAllInShadowRoot(
  rootElement: HTMLElement,
  selector: string,
): NodeList {
  return rootElement.shadowRoot?.querySelectorAll(selector)!;
}

type callback = (...args: Params) => any;

export function debounce<Params extends any[]>(func: callback, delay = 0) {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Params) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export function addToHistory(state: unknown, urlPath: string) {
  history.pushState(state, '', urlPath);
}

export const ALPHABET_REGEX = /^[A-Za-z]+$/;

export const BACKSPACE_NAME = 'BACKSPACE';

export function isSearchScreen() {
  return window.location.href.includes('query');
}

export function getSearchQuery() {
  return window.location.href.split('?query=')[1];
}

export function isDetailScreen() {
  return window.location.href.includes('grocery');
}

export function getDetailScreenGroceryName() {
  return window.location.href.split('/grocery/')[1];
}
