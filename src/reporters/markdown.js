
module.exports = function (suite) {
  console.log(`## ${suite.name}`);
  console.log('');

  const errored = [];

  suite
    .sort((b, a) => (a.stats.mean + a.stats.moe > b.stats.mean + b.stats.moe ? -1 : 1))
    .each(b => {
      const m = [String(b)];
      if (b.error) {
        errored.push(b);
        m.push('*error*');
      }
      if (b.options.burn) {
        m.push('*burn in*');
      }
      console.log(`    ${m.join(' ')}`);
    });

  if (suite.length > 1) {
    console.log('');

    const fastest = suite
      .filter(d => d.options.burn !== true)
      .filter('fastest')
      .map('name')
      .join(', ');

    console.log(`*Fastest is __${fastest}__*`);
  }

  console.log('');

  if (errored.length > 0) {
    errored.forEach((b, i) => {
      if (b.error.stack.indexOf('From previous event') > -1) {  // skip errors already caught by ava
        return;
      }
      console.error('```');
      console.error(`${(i + 1)}. ${String(b)}`);
      console.error(b.error);
      console.error('```');
    });
    console.error('');
  }
};
