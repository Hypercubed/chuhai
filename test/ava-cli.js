import test from 'ava';
import execa from 'execa';

process.chdir('../');

// basic
test('ava - slice', async t => {
  const result = await execa('ava', ['./test/fixtures/ava/slice.js', '--tap'], {preferLocal: true});
  t.regex(result.stdout, /TAP version/);
  t.regex(result.stdout, /# tests 4/);
  t.regex(result.stdout, /# pass 4/);
  t.regex(result.stdout, /# fail 0/);
  t.regex(result.stderr, /## array slice/);
  t.regex(result.stderr, /## array slice - without asserts/);
  t.regex(result.stderr, /\*Fastest is __.+__\*/);
});

// macro
test('ava - loop', async t => {
  const result = await execa('ava', ['./test/fixtures/ava/loop.js', '--tap'], {preferLocal: true});
  t.regex(result.stdout, /TAP version/);
  t.regex(result.stdout, /# tests 3/);
  t.regex(result.stdout, /# pass 3/);
  t.regex(result.stdout, /# fail 0/);
  t.regex(result.stderr, /## array loop/);
  t.regex(result.stderr, /## array loop - demonstrate error/);
  t.regex(result.stderr, /\*Fastest is __.+__\*/);
});

// async
test('ava - async', async t => {
  const result = await execa('ava', ['./test/fixtures/ava/async.js', '--tap'], {preferLocal: true});
  t.regex(result.stdout, /TAP version/);
  t.regex(result.stdout, /# tests 2/);
  t.regex(result.stdout, /# pass 2/);
  t.regex(result.stdout, /# fail 0/);
  t.regex(result.stderr, /## timeouts/);
  t.regex(result.stderr, /## timeouts - demonstrate bug/);
  t.regex(result.stderr, /\*Fastest is __.+__\*/);
});
