/* global window */

const Promise = require('bluebird');
const fnName = require('fn-name');
const debug = require('debug')('chuhai');

// require('loud-rejection/api')(process);

let benchmark = require('benchmark');

/* istanbul ignore next */
if (typeof window !== 'undefined') {
  const _ = require('lodash');
  const process = require('process');
  benchmark = benchmark.runInContext({_, process});
  window.Benchmark = benchmark;
}

// Promise.longStackTraces();

const reporterKey = process.env.REPORTER || 'markdown';

const reporters = {
  markdown: require('./reporters/markdown')
};

const reporter = reporters[reporterKey];

function noop() {}

// maybe usefull later
// check if the test is being run in AVA cli
// const isAva = typeof process.send === 'function';
// const ava = isAva ? require('ava/api') : undefined;

// process.on('message', message => {
//   debug('message ->', message);
// });

/* main api */
exports = module.exports = function (title, fn) {
  if (typeof title === 'function') {
    fn = title;
    title = fnName(fn) || '[anonymous]';
  }
  return new Promise((resolve, reject) => {
    createSuite(title, b => {
      b.error(reject);
      fn(b);
      b.run(resolve);
    });
  });
};

exports.skip = noop;
exports.failing = noop;
exports.cb = createSuite;

/* warning, experimental api below */

/* macros supported in ava > 0.15.0*/
exports.macro = function (t, fn) {
  return new Promise((resolve, reject) => {
    createSuite(t._test.title, b => {
      fn(Object.assign(t, b));
      b.error(reject);
      b.run(resolve);
    });
  });
};

exports.macro.cb = function (t, fn) {
  createSuite(t._test.title, b => {
    fn(Object.assign(t, b));
  });
};

/* experimental wrapper should work in ava or blue-tape */
exports.wrapper = function (test) {
  const wrappedTest = wrapTest(test);

  wrappedTest.failing = test.failing ? wrapTest(test.failing) : noop;
  wrappedTest.skip = test.skip || noop;

  return wrappedTest;

  function wrapTest(test) {
    return function wrappedTest(title, fn) {
      test(title, t => {
        return new Promise((resolve, reject) => {
          createSuite(title, b => {
            fn(Object.assign(t, b));
            b.error(reject);
            b.run(resolve);
          });
        });
      });
    };
  }
};

/* experimental wrapper should work in tape */
exports.wrapper.cb = function (test) {
  return function wrappedTest(title, fn) {
    test(title, t => {
      const _end = t.end;
      const _error = t.error;
      createSuite(title, b => {
        fn(Object.assign(t, b, {
          end() {
            b.run(_end);
            b.error(_error);
          }
        }));
      });
    });
  };
};

/* internal */
function createSuite(suiteTitle, fn) {
  if (typeof suiteTitle === 'function') {
    fn = suiteTitle;
    suiteTitle = fnName(fn) || '[anonymous]';
  }

  debug('create suite > %s', suiteTitle);

  const defaultOpts = {
    // we default to sync in the browser
    async: typeof window === 'undefined'
  };

  const suite = new benchmark.Suite(suiteTitle);

  const api = {
    set(key, value) {
      defaultOpts[key] = value;
    },
    bench(title, fn, opts) {
      opts = {...defaultOpts, ...opts};
      debug('adding bench > %s > %s', suiteTitle, title);
      suite.add(title, fn, opts);
    },
    burn(title, fn, opts) {
      opts = {...defaultOpts, ...opts, burn: true};
      debug('adding burn > %s > %s', suiteTitle, title);
      suite.add(title, fn, opts);
    },
    xbench: noop,
    xburn: noop,
    complete(fn) {
      debug('adding completed callback > %s', suiteTitle);
      suite.on('complete', ev => {
        try {
          fn(ev);
        } catch (e) {
          ev.target.error = new Error(String(e));
        }
      });
    },
    // these don't work as expected
    /* setup(fn) {
      opts.setup = fn;
    },
    teardown(fn) {
      opts.teardown = fn;
    }, */
    cycle(fn) {
      debug('adding cycle callback > %s', suiteTitle);
      suite.on('cycle', ev => {
        // try to catch asserts that don't throw
        // power-asserts return null when failed, undefined when passed
        try {
          fn(ev);
        } catch (e) {
          ev.target.error = new Error(String(e));
        }
      });
    },
    error(fn) {
      debug('adding error callback > %s', suiteTitle);
      suite.on('error', ev => {
        fn(ev.target.error);
      });
    },
    run(cb) {
      /* istanbul ignore next */
      if (debug.enabled) {
        debug('started > %s', suiteTitle);

        suite.on('cycle', e => {
          debug('cycled after > %s >  %s', suiteTitle, e.target.name);
        });

        suite.on('error', e => {
          debug('errored after > %s > %s', suiteTitle, e.target.name);
        });
      }

      suite.on('complete', () => {
        debug('completed > %s', suiteTitle);
        reporter(suite);
        if (cb) {
          cb();
        }
      });

      suite.run(defaultOpts);
    }
  };

  // aliases
  api.after = api.complete;

  fn(api);
}
