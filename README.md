# Chūhai

Test driven benchmarking.

## Why Chūhai?

What's more useless than micro-benchmarks micro-optimization?  Micro-benchmarks without tests to ensure they are doing what you think they are doing.  I've seen it more that once.  I've done it many times myself.  Chūhai is my attempt to fix that by combining testing and benchmarks.

*Read the [FAQ](https://github.com/Hypercubed/chuhai/wiki/FAQ) for more information*

## Features

* Runs alongside multiple assertion libraries and test runners (see [Test runners/Assertion libraries] below).
* Runs in the browser (see [Test runners/Assertion libraries] below).
* By default returns a promise (good for node-tap, blue-tape, and AVA)
* Supports callbacks (good for tape)
* No magic globals means no required runner.
* more...

## Install

```sh
npm i --save-dev chuhai
```

## Usage

Create a file named bench.js:

**example using node and assert, see below for other setups**

```js
var assert = require('assert');
var suite = require('chuhai');

// starts a new benchmark suite
// note this returns a promise
suite('array concat', function (s) {
  var arr1 = ['a', 'b', 'c'];
  var arr2 = ['d', 'e', 'f'];
  var arr3 = null;

  // run between each benchmark
  s.cycle(function () {
    // uses your assertion lib of choice
    assert.deepEqual(arr3, ['a', 'b', 'c', 'd', 'e', 'f']);
    arr3 = null;
  });

  // adds a bench that runs but doesn't get counted when comparing results to others.
  s.burn('slice', function () {
    arr3 = ['a', 'b', 'c', 'd', 'e', 'f'].slice();
  });

  // adds a bench.
  s.bench('concat', function () {
    arr3 = arr1.concat(arr2);
  });

  // adds a bench.
  s.bench('for loop', function () {
    var i;
    var l1 = arr1.length;
    var l2 = arr2.length;
    arr3 = Array(l1 + l2);
    for (i = 0; i < l1; i++) {
      arr3[i] = arr1[i];
    }
    for (var i2 = 0; i2 < l2; i2++) {
      arr3[i + i2] = arr2[i2];
    }
  });
});
```

Run using node, tap, babel-node, or tape

* AVA requires you to use the AVA API *

```sh
node bench.js
```

## Test runners/Assertion libraries

Chūhai is designed to work well with test runners and assertion libraries such as:

- [node-assert](https://nodejs.org/api/assert.html) - [example](./test/fixtures/assert)
- [tapjs/node-tap](https://github.com/tapjs/node-tap)
- [avajs/ava](https://github.com/avajs/ava) - [example](./test/fixtures/ava)
- [substack/tape](https://github.com/substack/tape) - [example](./test/fixtures/tape)
- [spion/blue-tape](https://github.com/spion/blue-tape) - [example](./test/fixtures/bluetape)

as well as in-browser runners such as (combined with  [substack/node-browserify](https://github.com/substack/node-browserify)):

- [substack/testling](https://github.com/substack/testling) - [example](https://github.com/Hypercubed/chuhai/blob/master/package.json#L12)
- [juliangruber/tape-run](https://github.com/juliangruber/tape-run) - [example](https://github.com/Hypercubed/chuhai/blob/dev/package.json#L12)

also works well with:

- [Hypercubed/grunion](https://github.com/Hypercubed/grunion)
- [zoubin/tap-summary](https://github.com/zoubin/tap-summary)
- [Hypercubed/tap-markdown](https://github.com/Hypercubed/tap-markdown)

*At this time I recommend blue-tape and testling if you plan to run benchmarks in the browser, otherwise AVA.*

**More details coming soon**

## API

```js
// creates a new benchmark suite
// returns a promise
suite([title: string], implementation: function): promise
```

### function implementation(s) {}

```js
// creates a new benchmark test
s.bench(title: string, implementation: function)
```

```js
// creates a burn-in benchmark test
s.burn(title: string, implementation: function)
```

```js
// runs between benchmarks (place assertions checks here)
s.cycle(implementation: function)
```

```js
// sets benchmark/suite options
s.set(key: string, value: any)
```

## Acknowledgments

[matcha](https://github.com/logicalparadox/matcha) inspired the tool.  [AVA](https://github.com/avajs/ava) and [TAPE](https://github.com/substack/tape) inspired the syntax.  [benchmark.js](https://github.com/bestiejs/benchmark.js) made it possible.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

Copyright (c) 2016 Jayson Harshbarger

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
