import test from 'ava';
import execa from 'execa';

// process.chdir('../');

test('tape - concat', async t => {
  const result = await execa('node', ['./test/fixtures/tape/concat.js'], {preferLocal: true});
  t.regex(result.stdout, /TAP version/);
  t.regex(result.stdout, /# tests 2/);
  t.regex(result.stdout, /# pass *2/);
  t.regex(result.stdout, /## array concat/);
  t.regex(result.stdout, /\*Fastest is __.+__\*/);
});

test('tape - slice', async t => {
  try {
    await execa('node', ['test/fixtures/tape/slice.js'], {preferLocal: true});
    t.fail();
  } catch (err) {
    t.regex(err.stdout, /TAP version/);
    t.regex(err.stdout, /# tests 6/);
    t.regex(err.stdout, /# pass +5/);
    t.regex(err.stdout, /# fail +1/);
    t.regex(err.stdout, /## array slice/);
    t.regex(err.stdout, /## array slice - without asserts/);
    t.regex(err.stdout, /## array slice - demonstrate bug/);
    t.regex(err.stdout, /\*Fastest is __.+__\*/);
  }
});

test('tape - async', async t => {
  try {
    await execa('node', ['./test/fixtures/tape/async.js'], {preferLocal: true});
    t.fail();
  } catch (err) {
    t.regex(err.stdout, /TAP version/);
    t.regex(err.stdout, /# tests 8/);
    t.regex(err.stdout, /# pass *6/);
    t.regex(err.stdout, /# fail *2/);
    t.regex(err.stdout, /## timeouts/);
    t.regex(err.stdout, /## timeouts - demonstrate bug/);
    t.regex(err.stdout, /\*Fastest is __.+__\*/);
  }
});
