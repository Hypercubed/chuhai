var test = require('tape');
var suite = require('../../../').cb;

test('array slice', t => {
  suite('array slice', s => {
    s.set('maxTime', 0.01);
    s.set('minSamples', 10);

    const arr = [1, 2, 3, 4, 5, 6];
    var args = null;

    s.after(() => {
      t.deepEqual(arr, [1, 2, 3, 4, 5, 6]);
    });

    s.cycle(() => {
      t.deepEqual(args, [2, 3, 4, 5, 6]);
      args = null;
    });

    s.bench('Array.prototype.slice', () => {
      args = Array.prototype.slice.call(arr, 1);
    });

    s.bench('for loop', () => {
      const l = arr.length;
      args = new Array(l - 1);
      for (let i = 1; i < l; i++) {
        args[i - 1] = arr[i];
      }
    });

    s.run(t.end);
  });
});

test('array slice - without asserts', t => {
  suite('array slice - without asserts', s => {
    s.set('maxTime', 0.01);
    s.set('minSamples', 10);

    const arr = [1, 2, 3, 4, 5, 6];

    s.bench('Array.prototype.slice', () => {
      Array.prototype.slice.call(arr, 1);
    });

    s.bench('for loop', () => {
      const l = arr.length;
      const args = new Array(l - 1);
      for (let i = 1; i < l; i++) {
        args[i - 1] = arr[i];
      }
    });

    s.run(t.end);
  });
});

test.skip('array slice - demonstrate bug', t => {
  suite('array slice - demonstrate bug', s => {
    s.set('maxTime', 0.01);
    s.set('minSamples', 10);

    const arr = [1, 2, 3, 4, 5, 6];
    var args = null;

    s.after(() => {
      t.deepEqual(arr, [1, 2, 3, 4, 5, 6]);
    });

    s.cycle(() => {
      t.deepEqual(args, [2, 3, 4, 5, 6]);
      args = null;
    });

    s.bench('Array.prototype.slice', () => {
      args = Array.prototype.slice.call(arr, 1);
    });

    s.bench('for loop', () => {
      const l = arr.length;
      args = new Array(l - 1);
      for (let i = 0; i < l; i++) {
        args[i - 1] = arr[i];
      }
    });

    s.run(t.end);
  });
});
