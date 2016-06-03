
# Tests 

    ✔ timeouts [pass: 4, fail: 0, duration: 1ms]
    ✖ timeouts - demonstrate bug [pass: 2, fail: 2, duration: 2ms]
    ✔ array concat [pass: 2, fail: 0, duration: 1ms]
    ✔ array slice [pass: 3, fail: 0]
    ✔ array slice - without asserts [pass: 0, fail: 0, duration: 1ms]
    ✖ array slice - demonstrate bug [pass: 2, fail: 1]
    ✖ array slice - demonstrate error [pass: 0, fail: 1, duration: 2ms]
    ✔ isArray [pass: 3, fail: 0, duration: 5ms]

# Summary 

- duration: 12ms
- assertions: 20
- pass: 16
- fail: 4

# Fails 

# timeouts - demonstrate bug
      ✖ should be equal
        operator: equal
        expected: 3628800
        actual:   9.33262154439441e+157
        at: Suite.<anonymous> (/Users/jayson/workspace/components/chuhai/dist/index.js:179:11)
      ✖ should be equal
        operator: equal
        expected: 3628800
        actual:   1
        at: Suite.<anonymous> (/Users/jayson/workspace/components/chuhai/dist/index.js:179:11)

# array slice - demonstrate bug
      ✖ should be equivalent
        operator: deepEqual
        expected: [ 2, 3, 4, 5, 6 ]
        actual:   [ 2, 3, 4, 5, 6 ]
        at: Suite.<anonymous> (/Users/jayson/workspace/components/chuhai/dist/index.js:179:11)

# array slice - demonstrate error
      ✖ TypeError: arr[i].value is not a function
        operator: error
        expected: |-
          undefined
        actual: |-
          [TypeError: arr[i].value is not a function]
        at: tryCatcher (/Users/jayson/workspace/components/chuhai/node_modules/bluebird/js/release/util.js:16:23)
        stack: |-
                 TypeError: arr[i].value is not a function
                 at Benchmark.<anonymous> (/Users/jayson/workspace/components/chuhai/test/fixtures/bluetape/slice.js:105:30)
                 at Benchmark.eval (eval at createCompiled (/Users/jayson/workspace/components/chuhai/node_modules/benchmark/benchmark.js:1714:7), <anonymous>:5:138)
                 at clock (/Users/jayson/workspace/components/chuhai/node_modules/benchmark/benchmark.js:1628:22)
                 at cycle (/Users/jayson/workspace/components/chuhai/node_modules/benchmark/benchmark.js:1991:49)
                 at Benchmark.run (/Users/jayson/workspace/components/chuhai/node_modules/benchmark/benchmark.js:2098:13)
                 at execute (/Users/jayson/workspace/components/chuhai/node_modules/benchmark/benchmark.js:857:74)
                 at Timeout.<anonymous> (/Users/jayson/workspace/components/chuhai/node_modules/lodash/lodash.js:2414:43)
                 at tryOnTimeout (timers.js:224:11)
                 at Timer.listOnTimeout (timers.js:198:5)
                 

# Comments 

# timeouts
## timeouts
    max x 11,642,392 ops/sec ±3.82% (10 runs sampled) *burn in*
    nextTick x 3,691,204 ops/sec ±9.30% (10 runs sampled)
    setImmediate x 521,660 ops/sec ±5.00% (10 runs sampled)
    setTimeout x 708 ops/sec ±1.15% (10 runs sampled)
*Fastest is __nextTick__*

# timeouts - demonstrate bug
## timeouts - demonstrate bug
    max x 11,385,691 ops/sec ±7.06% (10 runs sampled) *burn in*
    setImmediate x 503,626 ops/sec ±7.85% (10 runs sampled)
    nextTick x 491,698 ops/sec ±10.91% (10 runs sampled)
    setTimeout x 738 ops/sec ±1.67% (10 runs sampled)
*Fastest is __setImmediate, nextTick__*

# array concat
## array concat
    for loop x 17,731,365 ops/sec ±4.88% (10 runs sampled)
    concat x 2,410,968 ops/sec ±2.21% (10 runs sampled)
*Fastest is __for loop__*

# array slice
## array slice
    for loop x 21,967,472 ops/sec ±5.65% (10 runs sampled)
    Array.prototype.slice x 6,518,971 ops/sec ±18.44% (10 runs sampled)
*Fastest is __for loop__*

# array slice - without asserts
## array slice - without asserts
    for loop x 26,413,901 ops/sec ±6.33% (10 runs sampled)
    Array.prototype.slice x 7,378,710 ops/sec ±5.40% (10 runs sampled)
*Fastest is __for loop__*

# array slice - demonstrate bug
## array slice - demonstrate bug
    Array.prototype.slice x 6,983,364 ops/sec ±7.29% (10 runs sampled)
    for loop x 2,573,077 ops/sec ±3.62% (10 runs sampled)
*Fastest is __Array.prototype.slice__*

# array slice - demonstrate error
## array slice - demonstrate error
    for loop:  *error*
    Array.prototype.slice x 6,222,814 ops/sec ±18.29% (10 runs sampled)
*Fastest is __Array.prototype.slice__*
```
1. for loop:  TypeError: arr[i].value is not a function
    at Benchmark.<anonymous> (test/fixtures/bluetape/slice.js:105:30)
    at tryOnTimeout (timers.js:224:11)
    at Timer.listOnTimeout (timers.js:198:5)
```

# isArray
## isArray
    InstanceOf x 72,153,649 ops/sec ±4.12% (10 runs sampled)
    Array.isArray x 31,784,650 ops/sec ±4.99% (10 runs sampled)
    Object.prototype.toString.call x 2,077,532 ops/sec ±4.65% (10 runs sampled)
*Fastest is __InstanceOf__*

