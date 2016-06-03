import test from 'ava';
import execa from 'execa';

process.chdir('../');

test.skip('zuul', async t => {
  const result = await execa.shell('zuul --ui tape --phantom -- ./test/fixtures/assert/concat.js', {preferLocal: true});
  t.regex(result.stdout, /TAP version/);
  t.regex(result.stdout, /# tests 3/);
  t.regex(result.stdout, /# pass {2}3/);
  t.regex(result.stdout, /## array slice/);
  t.regex(result.stdout, /## array slice - without asserts/);
  t.regex(result.stdout, /\*Fastest is __for loop__\*/);
});
