import test from 'ava';
import execa from 'execa';

test('tape-run', t => {
  process.chdir('../');

  return execa.shell('browserify ./test/fixtures/bluetape/slice.js | tape-run', {preferLocal: true})
    .then(result => {
      t.regex(result.stdout, /TAP version/);
      t.regex(result.stdout, /# tests 3/);
      t.regex(result.stdout, /# pass {2}3/);
      t.regex(result.stdout, /## array slice/);
      t.regex(result.stdout, /## array slice - without asserts/);
      t.regex(result.stdout, /\*Fastest is __for loop__\*/);
    });
});
