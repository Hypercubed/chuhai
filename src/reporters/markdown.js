const StackUtils = require('stack-utils');

module.exports = function (suite) {
  if (suite.name && suite.name.length !== 0) {
    console.log(`## ${suite.name}`);
  }
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
      console.log('```');
      console.log(`${(i + 1)}. ${String(b)} ${prettyStack(b.error.stack)}`);
      console.log('```');
      console.error('');
    });
  }
};

const chuhaiInternals = /\/chuhai\/dist\//;
const chuhaiDependencies = /\/node_modules\/(?:bluebird|benchmark|lodash)\//;

const stackUtils = new StackUtils({
  cwd: process.cwd(),
  internals: [
    chuhaiInternals,
    chuhaiDependencies
  ]});

function prettyStack(stack) {
  if (!stack) {
    return '';
  }

  const title = stack.split('\n')[0];
  const lines = stackUtils
    .clean(stack)
    .split('\n')
    .filter(s => s.length > 0)
    .map(s => `    at ${s}`)
    .join('\n');

  return `${title}\n${lines}`;
}
