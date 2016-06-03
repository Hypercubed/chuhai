/* eslint no-loop-func: "off" */

import test from 'ava';
import suite from '../../../';

test('timeouts', t => {
  return suite('timeouts', s => {
    s.set('maxTime', 0.01);
    s.set('minSamples', 10);
    s.set('defer', true);

    let value = null;

    s.cycle(() => {
      t.is(value, 3628800);
      value = null;
    });

    s.burn('max', () => {
      value = 1;
      const N = 10;
      (function () {
        for (let i = 1; i <= N; i++) {
          value *= i;
        }
      })();
    }, {defer: false});

    s.bench('nextTick', deferred => {
      value = 1;
      const N = 10;
      process.nextTick(() => {
        for (let i = 1; i <= N; i++) {
          value *= i;
        }
        deferred.resolve();
      });
    });

    s.bench('setTimeout', deferred => {
      value = 1;
      const N = 10;
      setTimeout(() => {
        for (let i = 1; i <= N; i++) {
          value *= i;
        }
        deferred.resolve();
      }, 0);
    });

    s.bench('setImmediate', deferred => {
      value = 1;
      const N = 10;
      setImmediate(() => {
        for (let i = 1; i <= N; i++) {
          value *= i;
        }
        deferred.resolve();
      });
    });
  });
});

test.failing('timeouts - demonstrate bug', t => {
  return suite('timeouts - demonstrate bug', s => {
    s.set('maxTime', 0.01);
    s.set('minSamples', 10);
    s.set('defer', true);

    let value = null;

    s.cycle(() => {
      t.is(value, 3628800);
      value = null;
    });

    s.burn('max', () => {
      value = 1;
      let N = 10;
      (function () {
        for (let i = 1; i <= N; i++) {
          value *= i;
        }
      })();
      //  ... some time later
      N *= N;  // this has no impact i this case
    }, {defer: false});

    s.bench('nextTick', deferred => {
      value = 1;
      let N = 10;
      process.nextTick(() => {
        for (let i = 1; i <= N; i++) {
          value *= i;
        }
        deferred.resolve();
      });
      //  ... some time later
      N *= N;  // this is a common mistake, value of N changes before callback
    });

    s.bench('setTimeout', deferred => {
      value = 1;
      const N = 10;
      setTimeout(() => {
        for (let i = 1; i <= N; i++) {
          value *= i;
        }
        deferred.resolve();
      }, 0);
    });

    s.bench('setImmediate', deferred => {
      value = 1;
      let N = 10;
      setImmediate(() => {
        for (let i = 1; i <= N; i++) {
          value *= i;
        }
        deferred.resolve();
      });
      //  ... some time later
      N = 1; // this is a common mistake, value of N changes before callback, not fair test
    });
  });
});
