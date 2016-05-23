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

/* var reporterKey = process.env.REPORTER || 'plain';

var reporters = {
  plain: require('./reporters/plain'),
  file: require('./reporters/file')
}; */

var reporter = require('./reporters/plain');

function noop() {}

exports = module.exports = function (title, fn) {
  if (typeof title === 'function') {
    fn = title;
    title = '';
  }
  return new Promise(function (resolve) {
    createSuite(title, function (b) {
      fn(b);
      b.run(resolve);
    });
  });
};

exports.cb = createSuite;

/* macros supported in next version of ava */
exports.macro = function (t, fn) {
  return new Promise(function (resolve) {
    createSuite(t._test.title, function (b) {
      fn(Object.assign(t, b));
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
  return function wrappedTest(title, fn) {
    test(title, function (t) {
      return new Promise(function (resolve) {
        createSuite(title, function (b) {
          fn(Object.assign(t, b));
          b.run(resolve);
        });
      });
    });
  };
};

/* wrapper should work in tape */
exports.wrapper.cb = function (test) {
  return function wrappedTest(title, fn) {
    test(title, function (t) {
      var end = t.end;
      createSuite(title, function (b) {
        fn(Object.assign(t, b, {
          end: function () {
            b.run(end);
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
    after: function (fn) {
      suite.on('complete', fn);
    },
    before: function (fn) {
      suite.on('start', fn);
    },
    cycle: function (fn) {
      suite.on('cycle', fn);
    },
    run: function (cb) {
      cb = cb || noop;
      suite.on('complete', function () {
        reporter(suite);
        cb();
      });
      suite.run(opts);
    }
  };

  fn(api);
}
