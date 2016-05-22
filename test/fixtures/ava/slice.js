import test from 'ava';
import suite from '../../../';

test('array slice', t => {
  return suite('array slice', s => {
    s.set('maxTime', 0.01);
    s.set('minSamples', 10);

    const arr = [1, 2, 3, 4, 5, 6];
    var args = null;

    s.after(function () {
      t.deepEqual(arr, [1, 2, 3, 4, 5, 6]);
    });

    s.cycle(function () {
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
  });
});

test('array slice - without asserts', () => {
  return suite('array slice - without asserts', s => {
    s.set('maxTime', 0.01);
    s.set('minSamples', 10);

    const arr = [1, 2, 3, 4, 5, 6];
    var args = null;

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
  });
});

/* test('array slice - fail', t => {
  return suite('array slice', s => {
    const arr = [1, 2, 3, 4, 5, 6];
    var args = null;

    s.after(function () {
      t.deepEqual(arr, [1, 2, 3, 4, 5, 6]);
    });

    s.cycle(function () {
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
  });
}); */
