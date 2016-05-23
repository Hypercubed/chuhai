import test from 'ava';
import nixt from 'nixt';

test.cb('tape', t => {
  nixt({colors: false})
    .cwd('..')
    .expect(result => {
      t.is(result.code, 0);
      t.regex(result.stdout, /## array slice/);
      t.regex(result.stdout, /## array slice - without asserts/);
      t.regex(result.stdout, /\*Fastest is __for loop__\*/);
    })
    .run('node ./test/fixtures/assert/slice.js')
    .end(t.end);
});
