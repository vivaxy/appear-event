/**
 * @since 2019-07-29 13:58
 * @author vivaxy
 */
const {
  addEventListener,
  removeEventListener,
  addAppearListener,
  addDisappearListener,
  removeAppearListener,
  removeDisappearListener,
  EVENT_LISTENERS,
} = require('../../../lib/event-listener.js');

const item1 = document.getElementById('item1');
const item2 = document.getElementById('item2');

function onAppear() {}

function stat() {
  console.log('eventListeners1', item1[EVENT_LISTENERS]);
  console.log('eventListeners2', item2[EVENT_LISTENERS]);
}

document.getElementById('addAppear1').addEventListener('click', function() {
  addAppearListener(item1, onAppear);
  stat();
});

document.getElementById('addAppear2').addEventListener('click', function() {
  addAppearListener(item2, onAppear);
  stat();
});

document.getElementById('removeAppear1').addEventListener('click', function() {
  removeAppearListener(item1, onAppear);
  stat();
});

document.getElementById('removeAppear2').addEventListener('click', function() {
  removeAppearListener(item2, onAppear);
  stat();
});
