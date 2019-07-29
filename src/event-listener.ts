/**
 * @since 2019-07-29 13:06
 * @author vivaxy
 */
import { observe, unobserve } from './index';

type AppearEvent = CustomEvent<IntersectionObserverEntry>;

interface OnEvent {
  (e: AppearEvent): any;
}

type Options = boolean | (AddEventListenerOptions & IntersectionObserverInit);

export const EVENT_LISTENERS = Symbol('appear-event/event-listeners');

export enum EVENT_TYPE {
  APPEAR = 'appear',
  DISAPPEAR = 'disappear',
}

interface ElementWithEventListeners extends Element {
  [EVENT_LISTENERS]: {
    type: EVENT_TYPE;
    handler: OnEvent;
    options?: Options;
  }[];
}

function prepareOptions(
  options?: Options,
): [
  undefined | IntersectionObserverInit,
  undefined | boolean | AddEventListenerOptions,
] {
  const intersectionObserverOptions =
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
  return [intersectionObserverOptions, eventListenerOptions];
}

function toEventListenerElement(el: Element): ElementWithEventListeners {
  (<ElementWithEventListeners>el)[EVENT_LISTENERS] =
    (<ElementWithEventListeners>el)[EVENT_LISTENERS] || [];
  return <ElementWithEventListeners>el;
}

export function addEventListener(
  ele: Element,
  type: EVENT_TYPE,
  onEvent: OnEvent,
  options?: Options,
) {
  const el = toEventListenerElement(ele);
  const [intersectionObserverOptions, eventListenerOptions] = prepareOptions(
    options,
  );
  observe(el, intersectionObserverOptions);
  el.addEventListener(type, onEvent as EventListener, eventListenerOptions);
  el[EVENT_LISTENERS].push({
    type,
    handler: onEvent,
    options,
  });
}

export function addAppearListener(
  el: Element,
  onAppear: OnEvent,
  options?: Options,
) {
  addEventListener(el, EVENT_TYPE.APPEAR, onAppear, options);
}

export function addDisappearListener(
  el: Element,
  onDisappear: OnEvent,
  options?: Options,
) {
  addEventListener(el, EVENT_TYPE.DISAPPEAR, onDisappear, options);
}

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener
 */
function optionsMatches(options1?: Options, options2?: Options): boolean {
  if (options1 === options2) {
    return true;
  }
  return !!(
    typeof options1 === 'object' &&
    typeof options2 === 'object' &&
    options1.capture === options2.capture
  );
}

export function removeEventListener(
  ele: Element,
  type: EVENT_TYPE,
  onEvent: OnEvent,
  options?: Options,
) {
  const el = toEventListenerElement(ele);
  const [intersectionObserverOptions, eventListenerOptions] = prepareOptions(
    options,
  );
  const listenerIndex = el[EVENT_LISTENERS].findIndex(function(listener) {
    return (
      listener.type === type &&
      listener.handler === onEvent &&
      optionsMatches(listener.options, eventListenerOptions)
    );
  });
  if (listenerIndex !== -1) {
    el.removeEventListener(
      type,
      onEvent as EventListener,
      eventListenerOptions,
    );
    el[EVENT_LISTENERS].splice(listenerIndex, 1);
  }
  if (el[EVENT_LISTENERS].length === 0) {
    delete el[EVENT_LISTENERS];
    unobserve(el, intersectionObserverOptions);
  }
}

export function removeAppearListener(
  el: Element,
  onAppear: OnEvent,
  options?: Options,
) {
  removeEventListener(el, EVENT_TYPE.APPEAR, onAppear, options);
}

export function removeDisappearListener(
  el: Element,
  onDisappear: OnEvent,
  options?: Options,
) {
  removeEventListener(el, EVENT_TYPE.DISAPPEAR, onDisappear, options);
}
