import test from 'ava';
import {wrapper} from '../../../';

const suite = wrapper(test);

suite('isArray', t => {
  t.set('maxTime', 0.01);
  t.set('minSamples', 10);

  var arr = [];
  var isArray = null;

  t.cycle(() => {
    t.truthy(isArray);
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
});

suite.failing('isArray - demostrate bug', t => {
  t.set('maxTime', 0.01);
  t.set('minSamples', 2);

  var arr = [];
  var isArray = null;

  t.cycle(() => {
    t.truthy(isArray);
  });

  t.bench('Array.isArray', () => {
    isArray = Array.isArray(arr);
  });

  t.bench('Object.prototype.toString.call', () => {
    isArray = (Object.prototype.toString.call(arr) === 'object Array');
  });

  t.bench('InstanceOf', () => {
    isArray = arr instanceof Array;
  });
});

suite.failing('isArray - demostrate error', t => {
  t.set('maxTime', 0.01);
  t.set('minSamples', 2);

  var arr = [];
  var isArray = null;

  /* t.cycle(() => {
    t.truthy(isArray);
  }); */

  t.bench('Array.isArray', () => {
    isArray = Array.issArray(arr);
  });

  t.bench('Object.prototype.toString.call', () => {
    isArray = (Object.prototype.toString.call(arr) === 'object Array');
  });

  t.bench('InstanceOf', () => {
    isArray = arr instanceof Array;
  });
});
