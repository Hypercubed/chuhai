
module.exports = function (suite) {
  console.log('## ' + suite.name);
  console.log('');

  var errored = [];

  suite
    .sort(function (b, a) {
      a = a.stats;
      b = b.stats;
      return (a.mean + a.moe > b.mean + b.moe) ? -1 : 1;
    })
    .each(function (b) {
      var m = [String(b)];
      if (b.error) {
        errored.push(b);
        m.push('*error*');
      }
      if (b.options.burn) {
        m.push('*burn in*');
      }
      console.log('    ' + m.join(' '));
    });

  if (suite.length > 1) {
    console.log('');

    var fastest = suite
      .filter(function (d) {
        return d.options.burn !== true;
      })
      .filter('fastest')
      .map('name')
      .join(', ');

    console.log('*Fastest is __' + fastest + '__*');
  }

  console.log('');

  if (errored.length > 0) {
    errored.forEach(function (b, i) {
      if (b.error.stack.indexOf('From previous event') > -1) {  // skip errors already caught by ava
        return;
      }
      console.error('```');
      console.error((i + 1) + '. ' + String(b));
      console.error(b.error);
      console.error('```');
    });
    console.error('');
  }
};
