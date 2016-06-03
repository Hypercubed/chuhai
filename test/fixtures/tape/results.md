
# Tests 

    ✔ timeouts [pass: 4, fail: 0, duration: 1ms]
    ✖ timeouts - demonstrate bug [pass: 2, fail: 2, duration: 2ms]
    ✔ array concat [pass: 2, fail: 0]
    ✔ array slice [pass: 3, fail: 0]
    ✔ array slice - without asserts [pass: 0, fail: 0]
    ✖ array slice - demonstrate bug [pass: 2, fail: 1]
    ✔ isArray [pass: 3, fail: 0, duration: 4ms]

# Summary 

- duration: 7ms
- assertions: 19
- pass: 16
- fail: 3

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

# Comments 

# timeouts
## timeouts
    max x 11,684,651 ops/sec ±4.90% (10 runs sampled) *burn in*
    nextTick x 3,269,380 ops/sec ±5.53% (10 runs sampled)
    setImmediate x 498,243 ops/sec ±4.36% (10 runs sampled)
    setTimeout x 714 ops/sec ±3.40% (10 runs sampled)
*Fastest is __nextTick__*

# timeouts - demonstrate bug
## timeouts - demonstrate bug
    max x 10,968,413 ops/sec ±12.54% (10 runs sampled) *burn in*
    setImmediate x 551,735 ops/sec ±2.13% (10 runs sampled)
    nextTick x 489,159 ops/sec ±13.80% (10 runs sampled)
    setTimeout x 734 ops/sec ±2.50% (10 runs sampled)
*Fastest is __setImmediate__*

# array concat
## array concat
    for loop x 16,611,671 ops/sec ±10.15% (10 runs sampled)
    concat x 2,473,795 ops/sec ±2.83% (10 runs sampled)
*Fastest is __for loop__*

# array slice
## array slice
    for loop x 22,765,408 ops/sec ±6.95% (10 runs sampled)
    Array.prototype.slice x 6,710,169 ops/sec ±5.57% (10 runs sampled)
*Fastest is __for loop__*

# array slice - without asserts
## array slice - without asserts
    for loop x 25,763,007 ops/sec ±8.79% (10 runs sampled)
    Array.prototype.slice x 7,280,729 ops/sec ±4.34% (10 runs sampled)
*Fastest is __for loop__*

# array slice - demonstrate bug
## array slice - demonstrate bug
    Array.prototype.slice x 6,795,049 ops/sec ±5.35% (10 runs sampled)
    for loop x 2,366,953 ops/sec ±3.65% (10 runs sampled)
*Fastest is __Array.prototype.slice__*

# isArray
## isArray
    InstanceOf x 69,036,755 ops/sec ±6.44% (10 runs sampled)
    Array.isArray x 30,100,049 ops/sec ±4.66% (10 runs sampled)
    Object.prototype.toString.call x 2,160,369 ops/sec ±4.77% (10 runs sampled)
*Fastest is __InstanceOf__*

