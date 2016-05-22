
module.exports = function (suite) {
  console.log('## ' + suite.name);
  console.log('');

  suite
    .sort(function (b, a) {
      a = a.stats;
      b = b.stats;
      return (a.mean + a.moe > b.mean + b.moe) ? -1 : 1;
    })
    .each(function (b) {
      var burn = b.options.burn === true ? ' *burn in*' : '';
      console.log('    ' + String(b) + burn);
    });

  if (suite.length > 1) {
    console.log('');

    var fastest = suite
      .filter(function (d) {
        return d.options.burn !== true;
      })
      .filter('fastest')
      .map('name');

    console.log('*Fastest is __' + fastest + '__*');
  }

  console.log('');
};
