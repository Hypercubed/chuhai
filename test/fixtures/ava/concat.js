import test from 'ava';
import suite from '../../../';

test('array concat', t => {
  return suite('array concat', s => {
    s.set('maxTime', 0.01);
    s.set('minSamples', 10);

    const arr1 = ['a', 'b', 'c'];
    const arr2 = ['d', 'e', 'f'];
    let arr3 = null;

    s.cycle(() => {
      t.deepEqual(arr3, ['a', 'b', 'c', 'd', 'e', 'f']);
      arr3 = null;
    });

    s.bench('concat', () => {
      arr3 = arr1.concat(arr2);
    });

    s.bench('for loop', () => {
      let i;
      const l1 = arr1.length;
      const l2 = arr2.length;
      arr3 = Array(l1 + l2);
      for (i = 0; i < l1; i++) {
        arr3[i] = arr1[i];
      }
      for (let i2 = 0; i2 < l2; i2++) {
        arr3[i + i2] = arr2[i2];
      }
    });
  });
});
