import test from 'ava';
import execa from 'execa';

test('ava', async t => {
  process.chdir('../');

  try {
    await execa('ava', ['./test/fixtures/ava/slice.js', '--tap'], {preferLocal: true});
  } catch (result) {
    t.regex(result.stdout, /TAP version/);
    t.regex(result.stdout, /# tests 4/);
    t.regex(result.stdout, /# pass 3/);
    t.regex(result.stdout, /# fail 1/);
    t.regex(result.stderr, /## array slice/);
    t.regex(result.stderr, /## array slice - without asserts/);
    t.regex(result.stderr, /\*Fastest is __for loop__\*/);
  }
});
