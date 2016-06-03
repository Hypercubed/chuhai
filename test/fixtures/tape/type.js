/* eslint no-var: "off", prefer-arrow-callback: "off" */

var tape = require('tape');
var test = require('../../../').wrapper.cb(tape);

test('isArray', t => {
  t.set('maxTime', 0.01);
  t.set('minSamples', 10);

  var arr = [];
  var isArray = null;

  t.cycle(() => {
    t.true(isArray);
  });

  t.bench('Array.isArray', () => {
    isArray = Array.isArray(arr);
  });

  t.bench('Object.prototype.toString.call', () => {
    isArray = (Object.prototype.toString.call(arr) === '[object Array]');
  });

  t.bench('InstanceOf', () => {
    isArray = arr instanceof Array;
  });

  t.end();
});
