import test from 'ava';
import execa from 'execa';

test('node-assert', t => {
  process.chdir('../');

  return execa('node', ['./test/fixtures/assert/slice.js'], {preferLocal: true})
    .then(result => {
      t.regex(result.stdout, /## array slice/);
      t.regex(result.stdout, /## array slice - without asserts/);
      t.regex(result.stdout, /\*Fastest is __for loop__\*/);
    });
});
