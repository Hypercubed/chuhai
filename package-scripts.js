module.exports = {
  scripts: {
    test: {
      ava: 'ava ./test/fixtures/ava/*.js',
      tape: 'tape ./test/fixtures/tape/*.js',
      blue: 'blue-tape ./test/fixtures/bluetape/*.js',
      assert: 'grunion ./test/fixtures/assert/*.js --no-summary',
      taperun: 'browserify ./test/fixtures/bluetape/*.js | tape-run --browser chrome',
      testling: 'browserify ./test/fixtures/bluetape/*.js | testling -x open'
    },
    coverage: {
      default: 'package-scripts coverage.build && nyc --reporter=lcov -- ava',
      build: 'babel src -d dist --source-maps inline'
    }
  }
};
