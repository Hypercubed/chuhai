/* eslint no-var: "off", prefer-arrow-callback: "off" */

var test = require('blue-tape');
var suite = require('../../../');

require('setimmediate');  // for the browser

test('timeouts', function (t) {
  return suite('timeouts', function (s) {
    s.set('maxTime', 0.01);
    s.set('minSamples', 10);
    s.set('defer', true);

    var value = null;

    s.cycle(function () {
      t.equal(value, 3628800);
      value = null;
    });

    s.burn('max', function () {
      value = 1;
      var N = 10;
      (function () {
        for (var i = 1; i <= N; i++) {
          value *= i;
        }
      })();
    }, {defer: false});

    s.bench('nextTick', function (deferred) {
      value = 1;
      var N = 10;
      process.nextTick(function () {
        for (var i = 1; i <= N; i++) {
          value *= i;
        }
        deferred.resolve();
      });
    });

    s.bench('setTimeout', function (deferred) {
      value = 1;
      var N = 10;
      setTimeout(function () {
        for (var i = 1; i <= N; i++) {
          value *= i;
        }
        deferred.resolve();
      }, 0);
    });

    s.bench('setImmediate', function (deferred) {
      value = 1;
      var N = 10;
      setImmediate(function () {
        for (var i = 1; i <= N; i++) {
          value *= i;
        }
        deferred.resolve();
      });
    });
  });
});

test('timeouts - demonstrate bug', function (t) {
  return suite('timeouts - demonstrate bug', function (s) {
    s.set('maxTime', 0.01);
    s.set('minSamples', 10);
    s.set('defer', true);

    var value = null;

    s.cycle(function () {
      t.equal(value, 3628800);
      value = null;
    });

    s.burn('max', function () {
      value = 1;
      var N = 10;
      (function () {
        for (var i = 1; i <= N; i++) {
          value *= i;
        }
      })();
      //  ... some time later
      N *= N;  // this has no impact i this case
    }, {defer: false});

    s.bench('nextTick', function (deferred) {
      value = 1;
      var N = 10;
      process.nextTick(function () {
        for (var i = 1; i <= N; i++) {
          value *= i;
        }
        deferred.resolve();
      });
      //  ... some time later
      N *= N;  // this is a common mistake, value of N changes before callback
    });

    s.bench('setTimeout', function (deferred) {
      value = 1;
      var N = 10;
      setTimeout(function () {
        for (var i = 1; i <= N; i++) {
          value *= i;
        }
        deferred.resolve();
      }, 0);
    });

    s.bench('setImmediate', function (deferred) {
      value = 1;
      var N = 10;
      setImmediate(function () {
        for (var i = 1; i <= N; i++) {
          value *= i;
        }
        deferred.resolve();
      });
      //  ... some time later
      N = 1; // this is a common mistake, value of N changes before callback, not fair test
    });
  });
});
