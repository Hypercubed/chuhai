/* global window */

import process from 'process';

import Promise from 'bluebird';
import fnName from 'fn-name';
import _benchmark from 'benchmark';

let benchmark = _benchmark;

if (typeof window !== 'undefined') {
  const _ = require('lodash');
  benchmark = benchmark.runInContext({_, process});
  window.Benchmark = benchmark;
}

const reporterKey = process.env.REPORTER || 'markdown';

const reporters = {
  markdown: require('./reporters/markdown')
};

const reporter = reporters[reporterKey];

function noop() {}

/* main api */
exports = module.exports = function (title, fn) {
  if (typeof title === 'function') {
    fn = title;
    title = fnName(fn) || '[anonymous]';
  }
  return new Promise((resolve, reject) => {
    createSuite(title, b => {
      fn(b);
      b.error(reject);
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

function createSuite(title, fn) {
  if (typeof title === 'function') {
    fn = title;
    title = '';
  }

  const opts = {
    // we default to sync in the browser
    async: typeof window === 'undefined'
  };

  const suite = new benchmark.Suite(title);

  const api = {
    set(key, value) {
      opts[key] = value;
    },
    bench(title, fn) {
      suite.add(title, fn, opts);
    },
    burn(title, fn) {
      suite.add(title, fn, Object.assign({
        burn: true
      }, opts));
    },
    xbench: noop,
    xburn: noop,
    complete(fn) {
      suite.on('complete', ev => {
        try {
          fn(ev);
        } catch (e) {
          ev.target.error = new Error(String(e));
        }
      });
    },
    setup(fn) {
      opts.setup = fn;
    },
    teardown(fn) {
      opts.teardown = fn;
    },
    cycle(fn) {
      suite.on('cycle', ev => {
        try {
          fn(ev);
        } catch (e) {
          ev.target.error = new Error(String(e));
        }
      });
    },
    error(fn) {
      suite.on('error', e => {
        fn(e.target.error);
      });
    },
    run(cb) {
      suite.on('complete', () => {
        reporter(suite);
        if (cb) {
          cb();
        }
      });
      suite.run(opts);
    }
  };

  // aliases
  api.before = api.start;
  api.after = api.complete;

  fn(api);
}
