import test from 'ava';
import execa from 'execa';

test.skip('testling', t => {
  process.chdir('../');

  return execa.shell('browserify ./test/fixtures/bluetape/slice.js | testling', {preferLocal: true})
    .then(result => {
      console.log(result);
      t.regex(result.stdout, /TAP version/);
      t.regex(result.stdout, /# tests 3/);
      t.regex(result.stdout, /# pass {2}3/);
      t.regex(result.stdout, /## array slice/);
      t.regex(result.stdout, /## array slice - without asserts/);
      t.regex(result.stdout, /\*Fastest is __for loop__\*/);
    });
});
