import test from 'ava';
import execa from 'execa';

process.chdir('../');

test('node-assert - concat', async t => {
  const result = await execa('node', ['./test/fixtures/bluetape/concat.js'], {preferLocal: true});
  t.regex(result.stdout, /## array concat/);
  t.regex(result.stdout, /\*Fastest is __.+__\*/);
});

test('node-assert - slice', async t => {
  const result = await execa('node', ['./test/fixtures/assert/slice.js'], {preferLocal: true});
  t.regex(result.stdout, /## array slice/);
  t.regex(result.stdout, /## array slice - without asserts/);
  t.regex(result.stdout, /## array slice - demonstrate bug/);
  t.regex(result.stdout, /for loop: +Error: AssertionError/);
  t.regex(result.stdout, /\*Fastest is __for loop__\*/);
});

test('node-assert - async', async t => {
  const result = await execa('node', ['./test/fixtures/assert/async.js'], {preferLocal: true});
  t.regex(result.stdout, /## timeouts/);
  t.regex(result.stdout, /## timeouts - demonstrate bug/);
  t.regex(result.stdout, /\*Fastest is __.+__\*/);
  t.regex(result.stdout, /setImmediate: +Error: AssertionError: 1 == 3628800/);
  t.regex(result.stdout, /nextTick: +Error: AssertionError: 9.33262154439441e\+157 == 3628800/);
});
