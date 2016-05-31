/* eslint no-var: "off", prefer-arrow-callback: "off" */

var test = require('tape');
var suite = require('../../../').cb;

test('array slice', function (t) {
  suite('array slice', function (s) {
    s.set('maxTime', 0.01);
    s.set('minSamples', 10);

    var arr = [1, 2, 3, 4, 5, 6];
    var args = null;

    s.after(function () {
      t.deepEqual(arr, [1, 2, 3, 4, 5, 6]);
    });

    s.cycle(function () {
      t.deepEqual(args, [2, 3, 4, 5, 6]);
      args = null;
    });

    s.bench('Array.prototype.slice', function () {
      args = Array.prototype.slice.call(arr, 1);
    });

    s.bench('for loop', function () {
      var l = arr.length;
      args = new Array(l - 1);
      for (var i = 1; i < l; i++) {
        args[i - 1] = arr[i];
      }
    });

    s.run(t.end);
  });
});

test('array slice - without asserts', function (t) {
  suite('array slice - without asserts', function (s) {
    s.set('maxTime', 0.01);
    s.set('minSamples', 10);

    var arr = [1, 2, 3, 4, 5, 6];

    s.bench('Array.prototype.slice', function () {
      Array.prototype.slice.call(arr, 1);
    });

    s.bench('for loop', function () {
      var l = arr.length;
      var args = new Array(l - 1);
      for (var i = 1; i < l; i++) {
        args[i - 1] = arr[i];
      }
    });

    s.run(t.end);
  });
});

test.skip('array slice - demonstrate bug', function (t) {
  suite('array slice - demonstrate bug', function (s) {
    s.set('maxTime', 0.01);
    s.set('minSamples', 10);

    var arr = [1, 2, 3, 4, 5, 6];
    var args = null;

    s.after(function () {
      t.deepEqual(arr, [1, 2, 3, 4, 5, 6]);
    });

    s.cycle(function () {
      t.deepEqual(args, [2, 3, 4, 5, 6]);
      args = null;
    });

    s.bench('Array.prototype.slice', function () {
      args = Array.prototype.slice.call(arr, 1);
    });

    s.bench('for loop', function () {
      var l = arr.length;
      args = new Array(l - 1);
      for (var i = 0; i < l; i++) {
        args[i - 1] = arr[i];
      }
    });

    s.run(t.end);
  });
});
