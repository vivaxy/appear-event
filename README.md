# appear-event

Element appear event.

[![Build Status][travis-image]][travis-url]
[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-url]
[![MIT License][license-image]][license-url]
[![Standard Version][standard-version-image]][standard-version-url]
[![Codecov][codecov-image]][codecov-url]

# Install

`yarn add appear-event` or `npm i appear-event --save`

# Usage

## `observe` and `unobserve`

```js
const { observe, unobserve } = require('appear-event');

const el = getElementSomehow();
const eventListenerOptions = getEventListenerOptions();
const intersectionObserverOptions = getIntersectionObserverOptions();

el.addEventListener('appear', function onAppear(appearEvent) {
  // element appeared
}, eventListenerOptions);
el.addEventListener('disappear', function onDisappear(disappearEvent) {
  // element disappeared
}, eventListenerOptions);
observe(el, intersectionObserverOptions); // watch for appear and disappear event
unobserve(el, intersectionObserverOptions); // unwatch for appear and disappear event
```

### `eventListenerOptions`

[addEventListener options](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Parameters)

### `intersectionObserverOptions`

[IntersectionObserver Properties](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver#Properties)

### `appearEvent` and `disappearEvent`

[CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent)

#### `detail`

`appearEvent.detail` and `disappearEvent.detail` is an [IntersectionObserveEntry](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry)

## In React

See [demo](./demo/src/App.js)
Also see [jsx-native-events](https://github.com/calebdwilliams/jsx-native-events)

#

Project created by [create-n](https://github.com/vivaxy/create-n).

[travis-image]: https://img.shields.io/travis/vivaxy/appear-event.svg?style=flat-square
[travis-url]: https://travis-ci.org/vivaxy/appear-event
[npm-version-image]: https://img.shields.io/npm/v/appear-event.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/appear-event
[npm-downloads-image]: https://img.shields.io/npm/dt/appear-event.svg?style=flat-square
[license-image]: https://img.shields.io/npm/l/appear-event.svg?style=flat-square
[license-url]: LICENSE
[standard-version-image]: https://img.shields.io/badge/release-standard%20version-brightgreen.svg?style=flat-square
[standard-version-url]: https://github.com/conventional-changelog/standard-version
[codecov-image]: https://img.shields.io/codecov/c/github/vivaxy/appear-event.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/vivaxy/appear-event
