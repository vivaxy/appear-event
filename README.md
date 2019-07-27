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
el.addEventListener('appear', function onAppear(e) { // or `disappear` event
  // element appear
  // `e` is a [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent)
  // `e.detail` is an [IntersectionObserveEntry](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry).
}, options); // `options` can be [addEventListener options](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Parameters) or [IntersectionObserver Properties](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver#Properties)
observe(el); // watch for appear and disappear event
unobserve(el); // unwatch for appear and disappear event
```

## `addAppearEventListener`, `addDisappearEventListener`, `removeAppearEventListener` and `removeDisappearEventListener`

```js
const {
  addAppearEventListener,
  addDisappearEventListener,
  removeAppearEventListener,
  removeDisappearEventListener,
} = require('appear-event');

const el = getElementSomehow();
addAppearEventListener(el, onAppear, options);
addDisappearEventListener(el, onDisappear, options);
removeAppearEventListener(el, onAppear, options);
removeDisappearEventListener(el, onAppear, options);

function onAppear(e) {
  // element appear
}

function onDisappear(e) {
  // element disappear
}
```

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
