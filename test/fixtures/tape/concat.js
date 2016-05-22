var test = require('tape');
var suite = require('../../../').cb;

test('array concat', function (t) {
  suite('array concat', s => {
    s.set('maxTime', 0.01);
    s.set('minSamples', 10);

    var arr1 = ['a', 'b', 'c'];
    var arr2 = ['d', 'e', 'f'];
    var arr3 = null;

    s.cycle(function () {
      t.deepEqual(arr3, ['a', 'b', 'c', 'd', 'e', 'f']);
      arr3 = null;
    });

    s.bench('concat', function () {
      arr3 = arr1.concat(arr2);
    });

    s.bench('for loop', function () {
      var i;
      var l1 = arr1.length;
      var l2 = arr2.length;
      arr3 = Array(l1 + l2);
      for (i = 0; i < l1; i++) {
        arr3[i] = arr1[i];
      }
      for (var i2 = 0; i2 < l2; i2++) {
        arr3[i + i2] = arr2[i2];
      }
    });

    s.run(t.end);
  });
});
