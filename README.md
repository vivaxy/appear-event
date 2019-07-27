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
const options = getEventListenerOptionsAndIntersectionObserverOptions();

el.addEventListener('appear', function onAppear(appearEvent) {
  // element appeared
}, options);
el.addEventListener('appear', function onDisappear(disappearEvent) {
  // element disappeared
}, options);
observe(el); // watch for appear and disappear event
unobserve(el); // unwatch for appear and disappear event
```

## `options`

[addEventListener options](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Parameters) or [IntersectionObserver Properties](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver#Properties)

## `appearEvent` and `disappearEvent`

[CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent)

### `detail`

`appearEvent.detail` and `disappearEvent.detail` is an [IntersectionObserveEntry](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry)

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
