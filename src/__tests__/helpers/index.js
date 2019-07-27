/**
 * @since 2019-07-26 20:02
 * @author vivaxy
 */

import * as appearEvent from '../../index.ts';

let testSeq = 0;

const $items = document.querySelectorAll('.item');
$items[0].addEventListener('appear', function() {
  testSeq++;
  switch (testSeq) {
    case 1:
      document.title = 'should_appear';
      break;
    case 3:
      document.title = 'should_appear_again';
      break;
    default:
      throw new Error('Unhandled testSeq: ' + testSeq);
  }
});
$items[0].addEventListener('disappear', function() {
  testSeq++;
  switch (testSeq) {
    case 2:
      document.title = 'should_disappear';
      break;
    case 4:
      // nothing
      break;
    default:
      throw new Error('Unhandled testSeq: ' + testSeq);
  }
});
appearEvent.observe($items[0]);
