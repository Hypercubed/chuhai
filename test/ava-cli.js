import test from 'ava';
import execa from 'execa';

test('ava', t => {
  process.chdir('../');

  return execa('ava', ['./test/fixtures/ava/loop.js', '--tap'], {preferLocal: true})
    .then(result => {
      t.regex(result.stdout, /TAP version/);
      t.regex(result.stdout, /not ok \d - array loop - demonstrate bug/);
      t.regex(result.stdout, /ok \d - array loop/);
    });
});
