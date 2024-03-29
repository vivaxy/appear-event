import 'intersection-observer';
import { finder } from '@medv/finder';

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
    .map(function (key) {
      // @ts-ignore TODO fix types
      return serializer[key](options[key]);
    })
    .join('; ');
}

function intersectionObserverCallback(entries: IntersectionObserverEntry[]) {
  entries.forEach(function (entry) {
    const el = entry.target as Element & { appeared?: boolean };
    if (entry.isIntersecting && !el.appeared) {
      el.appeared = true;
      const appearEvent = new CustomEvent<IntersectionObserverEntry>('appear', {
        detail: entry,
      });
      el.dispatchEvent(appearEvent);
    } else if (el.appeared) {
      delete el.appeared;
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
  if (!el) {
    return;
  }
  const observing = getObserving(options);
  if (observing.elements.indexOf(el) === -1) {
    observing.intersectionObserver.observe(el);
    observing.elements.push(el);
  }
}

export function unobserve(
  el: Element,
  options?: IntersectionObserverInit,
): void {
  if (!el) {
    return;
  }
  // strict observing retrieving
  const observing = getObserving(options);
  const { elements, intersectionObserver, serializedOptions } = observing;
  if (elements.indexOf(el) !== -1) {
    intersectionObserver.unobserve(el);
    elements.splice(elements.indexOf(el), 1);
    if (!elements.length) {
      intersectionObserver.disconnect();
      delete observingCollection[serializedOptions];
    }
  }
}
