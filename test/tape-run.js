import test from 'ava';
import nixt from 'nixt';

test.skip.cb('tape-run', t => {
  nixt({colors: false})
    .cwd('..')
    .expect(result => {
      t.is(result.code, 0);
      t.regex(result.stdout, /TAP version/);
      t.regex(result.stdout, /# tests 3/);
      t.regex(result.stdout, /# pass {2}3/);
      t.regex(result.stdout, /## array slice/);
      t.regex(result.stdout, /## array slice - without asserts/);
      t.regex(result.stdout, /\*Fastest is __for loop__\*/);
    })
    .run('./node_modules/.bin/browserify ./test/fixtures/bluetape/slice.js | ./node_modules/.bin/tape-run --browser chrome')
    .end(t.end);
});
