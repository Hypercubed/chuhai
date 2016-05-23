import test from 'ava';
import nixt from 'nixt';

test.cb('ava', t => {
  nixt({colors: false})
    .cwd('..')
    .expect(result => {
      t.is(result.code, 0);
      t.regex(result.stdout, /TAP version/);
      t.regex(result.stdout, /not ok 1 - array loop - demonstrate bug/);
      t.regex(result.stdout, /ok 2 - array loop/);
    })
    .run('./node_modules/.bin/ava ./test/fixtures/ava/loop.js --tap')
    .end(t.end);
});
