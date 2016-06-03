import test from 'ava';
import execa from 'execa';

process.chdir('../');

test('blue-tape - concat', async t => {
  const result = await execa('node', ['./test/fixtures/bluetape/concat.js'], {preferLocal: true});
  t.regex(result.stdout, /TAP version/);
  t.regex(result.stdout, /# tests 2/);
  t.regex(result.stdout, /# pass *2/);
  t.regex(result.stdout, /## array concat/);
  t.regex(result.stdout, /\*Fastest is __.+__\*/);
});

test('blue-tape - slice', async t => {
  try {
    await execa('node', ['./test/fixtures/bluetape/slice.js'], {preferLocal: true});
    t.fail();
  } catch (result) {
    t.regex(result.stdout, /TAP version/);
    t.regex(result.stdout, /# tests 7/);
    t.regex(result.stdout, /# pass +5/);
    t.regex(result.stdout, /# fail +2/);
    t.regex(result.stdout, /## array slice/);
    t.regex(result.stdout, /## array slice - without asserts/);
    t.regex(result.stdout, /## array slice - demonstrate error/);
    t.regex(result.stdout, /\*Fastest is __.+__\*/);
  }
});

test('blue-tape - async', async t => {
  try {
    await execa('blue-tape', ['./test/fixtures/bluetape/async.js'], {preferLocal: true});
    t.fail();
  } catch (result) {
    t.regex(result.stdout, /TAP version/);
    t.regex(result.stdout, /# tests 8/);
    t.regex(result.stdout, /# pass *6/);
    t.regex(result.stdout, /# fail *2/);
    t.regex(result.stdout, /## timeouts/);
    t.regex(result.stdout, /## timeouts - demonstrate bug/);
    t.regex(result.stdout, /\*Fastest is __.+__\*/);
  }
});
