import test from 'ava';
import nixt from 'nixt';

test.skip.cb('zuul', t => {
  nixt({colors: false})
    .cwd('..')
    .timeout(10000)
    .expect(result => {
      console.log(result);
      t.is(result.code, 0);
      t.regex(result.stdout, /TAP version/);
      t.regex(result.stdout, /# tests 3/);
      t.regex(result.stdout, /# pass {2}3/);
      t.regex(result.stdout, /## array slice/);
      t.regex(result.stdout, /## array slice - without asserts/);
      t.regex(result.stdout, /\*Fastest is __for loop__\*/);
    })
    .run('./node_modules/.bin/zuul --ui tape --phantom -- ./test/fixtures/assert/concat.js')
    .end(t.end);
});
