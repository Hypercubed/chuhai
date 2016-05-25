'use strict';

/* global window */

var Promise = require('bluebird');

var benchmark = require('benchmark');
if (typeof window !== 'undefined') {
  var _ = require('lodash');
  var process = require('process');
  benchmark = benchmark.runInContext({_: _, process: process});
  window.Benchmark = benchmark;
}

var fnName = require('fn-name');

/* var reporterKey = process.env.REPORTER || 'plain';

var reporters = {
  plain: require('./reporters/plain'),
  file: require('./reporters/file')
}; */

var reporter = require('./reporters/plain');

function noop() {}

/* main api */
exports = module.exports = function (title, fn) {
  if (typeof title === 'function') {
    fn = title;
    title = fnName(fn) || '[anonymous]';
  }
  return new Promise(function (resolve, reject) {
    createSuite(title, function (b) {
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

/* macros supported in next version of ava */
exports.macro = function (t, fn) {
  return new Promise(function (resolve, reject) {
    createSuite(t._test.title, function (b) {
      fn(Object.assign(t, b));
      b.error(reject);
      b.run(resolve);
    });
  });
};

exports.macro.cb = function (t, fn) {
  createSuite(t._test.title, function (b) {
    fn(Object.assign(t, b));
  });
};

/* wrapper should work in ava or blue-tape */
exports.wrapper = function (test) {
  var wrappedTest = wrapTest(test);

  wrappedTest.failing = test.failing ? wrapTest(test.failing) : noop;
  wrappedTest.skip = test.skip || noop;

  return wrappedTest;

  function wrapTest(test) {
    return function wrappedTest(title, fn) {
      test(title, function (t) {
        return new Promise(function (resolve, reject) {
          createSuite(title, function (b) {
            fn(Object.assign(t, b));
            b.error(reject);
            b.run(resolve);
          });
        });
      });
    };
  }
};

/* wrapper should work in tape */
exports.wrapper.cb = function (test) {
  return function wrappedTest(title, fn) {
    test(title, function (t) {
      var _end = t.end;
      var _error = t.error;
      createSuite(title, function (b) {
        fn(Object.assign(t, b, {
          end: function () {
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

  var opts = {
    async: typeof window === 'undefined'
  };

  var suite = new benchmark.Suite(title);

  var api = {
    set: function (key, value) {
      opts[key] = value;
    },
    bench: function (title, fn) {
      suite.add(title, fn, opts);
    },
    burn: function (title, fn) {
      suite.add(title, fn, Object.assign({
        burn: true
      }, opts));
    },
    xbench: noop,
    xburn: noop,
    after: function (fn) {
      suite.on('complete', function (ev) {
        try {
          fn(ev);
        } catch (e) {
          ev.target.error = new Error(String(e));
          // throw e;
        }
      });
    },
    before: function (fn) {
      suite.on('start', fn);
    },
    cycle: function (fn) {
      suite.on('cycle', function (ev) {
        try {
          fn(ev);
        } catch (e) {
          ev.target.error = new Error(String(e));
          // throw e;
        }
      });
    },
    error: function (fn) {
      suite.on('error', function (e) {
        fn(e.target.error);
      });
    },
    run: function (cb) {
      suite.on('complete', function () {
        reporter(suite);
        if (cb) {
          cb();
        }
      });
      suite.run(opts);
    }
  };

  fn(api);
}
