/* eslint ava/test-title: "off" */

import test from 'ava';
import suite from '../../../';

test('array loop', suite.macro, t => {
  t.set('maxTime', 0.01);
  t.set('minSamples', 10);

  const arr = [1, 2, 3, 4, 5, 6];
  let s = null;

  t.cycle(() => {
    t.is(s, 21);
    s = null;
  });

  t.burn('max', () => {
    s = 0;
    s += 1;
    s += 2;
    s += 3;
    s += 4;
    s += 5;
    s += 6;
  });

  t.bench('foo.forEach', () => {
    s = 0;
    arr.forEach(n => {
      s += n;
    });
  });

  t.bench('for i in foo', () => {
    s = 0;
    for (const i in arr) { /* eslint guard-for-in: 0 */
      s += arr[i];
    }
  });

  t.bench('for count', () => {
    s = 0;
    for (let i = 0; i < arr.length; i++) {
      s += arr[i];
    }
  });
});

// this demostrates an actual bug found in benchmarking code
test('array loop - demonstrate bug', suite.macro, t => {
  t.set('maxTime', 0.01);
  t.set('minSamples', 10);

  const arr = [1, 2, 3, 4, 5, 6];
  let s = null;

  t.cycle(() => {
    t.is(s, 21);
    s = null;
  });

  t.bench('foo.forEach', () => {
    s = 0;
    arr.forEach(n => {
      s += n;
    });
  });

  t.bench('for i in foo', () => {
    s = 0;
    for (const i in arr) {
      s += arr[i];
    }
  });

  t.bench('for count', () => {
    s = 0;
    for (let i = 1; i < arr.length; i++) {
      s += arr[i];
    }
  });
});

test('array loop - demonstrate error', suite.macro, t => {
  t.set('maxTime', 0.01);
  t.set('minSamples', 10);

  const arr = [1, 2, 3, 4, 5, 6];
  let s = null;

  t.burn('max', () => {
    s = 0;
    s += 1;
    s += 2;
    s += 3;
    s += 4;
    s += 5;
    s += 6;
  });

  t.bench('foo.forEach', () => {
    s = 0;
    arr.forEach(n => {
      s += n;
    });
  });

  t.bench('for i in foo', () => {
    s = 0;
    for (const i in arr) { /* eslint guard-for-in: 0 */
      s += arr[i];
    }
  });

  t.bench('for count', () => {
    s = 0;
    for (let i = 0; i < arr.length; i++) {
      s += arr[i]();  // arr[i] is not a function
    }
  });
});
