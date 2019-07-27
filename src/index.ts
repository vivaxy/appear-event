import 'intersection-observer';
import finder from '@medv/finder';

export interface OnAppearCallback {
  (this: Element, e: CustomEvent<IntersectionObserverEntry>): any;
}

type AddAppearEventListenerOptions =
  | boolean
  | (IntersectionObserverInit & AddEventListenerOptions);

export const observingCollection: {
  [serializedIntersectionObserverOptions: string]: {
    serializedOptions: string;
    intersectionObserver: IntersectionObserver;
    elements: Element[];
  };
} = {};

function serializeIntersectionObserverOptions(
  options?: IntersectionObserverInit,
) {
  if (!options) {
    return '';
  }
  const serializer = {
    root(root: undefined | Element | null) {
      if (!root) {
        return '';
      }
      return finder(root);
    },
    rootMargin(rootMargin: undefined | string) {
      return rootMargin || '';
    },
    threshold(threshold: undefined | number | number[]) {
      if (threshold === undefined) {
        return '';
      }
      return String(threshold);
    },
  };
  return Object.keys(serializer)
    .map(function(key) {
      // @ts-ignore TODO fix types
      return serializer[key](options[key]);
    })
    .join('; ');
}

function intersectionObserverCallback(entries: IntersectionObserverEntry[]) {
  entries.forEach(function(entry) {
    const el = entry.target;
    if (entry.isIntersecting) {
      const appearEvent = new CustomEvent<IntersectionObserverEntry>('appear', {
        detail: entry,
      });
      el.dispatchEvent(appearEvent);
    } else {
      const disappearEvent = new CustomEvent<IntersectionObserverEntry>(
        'disappear',
        { detail: entry },
      );
      el.dispatchEvent(disappearEvent);
    }
  });
}

function getObserving(options?: IntersectionObserverInit) {
  const serialized = serializeIntersectionObserverOptions(options);
  const observing = observingCollection[serialized];
  if (observing) {
    return observing;
  }
  const intersectionObserver = new IntersectionObserver(
    intersectionObserverCallback,
    options,
  );
  const newObserving = {
    serializedOptions: serialized,
    intersectionObserver,
    elements: [],
  };
  observingCollection[serialized] = newObserving;
  return newObserving;
}

export function observe(el: Element, options?: IntersectionObserverInit): void {
  const observing = getObserving(options);
  if (!observing.elements.includes(el)) {
    observing.intersectionObserver.observe(el);
    observing.elements.push(el);
  }
}

export function unobserve(
  el: Element,
  options?: IntersectionObserverInit,
): void {
  const observing = getObserving(options);
  const { elements, intersectionObserver, serializedOptions } = observing;
  if (elements.includes(el)) {
    intersectionObserver.unobserve(el);
    elements.splice(elements.indexOf(el), 1);
    if (!elements.length) {
      intersectionObserver.disconnect();
      delete observingCollection[serializedOptions];
    }
  }
}

function prepareOptions(
  options?: AddAppearEventListenerOptions,
): [
  undefined | IntersectionObserverInit,
  undefined | boolean | AddEventListenerOptions,
] {
  const observeOptions =
    typeof options === 'undefined'
      ? undefined
      : typeof options === 'boolean'
      ? undefined
      : {
          root: options.root,
          rootMargin: options.rootMargin,
          threshold: options.threshold,
        };
  const eventListenerOptions =
    typeof options === 'undefined'
      ? undefined
      : typeof options === 'boolean'
      ? options
      : {
          once: options.once,
          passive: options.passive,
          capture: options.capture,
        };
  return [observeOptions, eventListenerOptions];
}

export function addAppearEventListener(
  el: Element,
  onAppear: OnAppearCallback,
  options?: AddAppearEventListenerOptions,
): void {
  const [observeOptions, eventListenerOptions] = prepareOptions(options);
  observe(el, observeOptions);
  el.addEventListener(
    'appear',
    (onAppear as unknown) as EventListenerOrEventListenerObject,
    eventListenerOptions,
  );
}

export function addDisappearEventListener(
  el: Element,
  onDisappear: OnAppearCallback,
  options?: AddAppearEventListenerOptions,
): void {
  const [observeOptions, eventListenerOptions] = prepareOptions(options);
  observe(el, observeOptions);
  el.addEventListener(
    'disappear',
    (onDisappear as unknown) as EventListenerOrEventListenerObject,
    eventListenerOptions,
  );
}

export function removeAppearEventListener(
  el: Element,
  onAppear: OnAppearCallback,
  options?: boolean | EventListenerOptions,
): void {
  el.removeEventListener(
    'appear',
    (onAppear as unknown) as EventListenerOrEventListenerObject,
    options,
  );
  // todo unobserve
}

export function removeDisappearEventListener(
  el: Element,
  onDisappear: OnAppearCallback,
  options?: boolean | EventListenerOptions,
): void {
  el.removeEventListener(
    'disappear',
    (onDisappear as unknown) as EventListenerOrEventListenerObject,
    options,
  );
  // todo unobserve
}
