
> ./test/fixtures/assert/concat.js
> node ./test/fixtures/assert/concat.js

## array concat

    for loop x 14,761,568 ops/sec ±5.94% (10 runs sampled)
    concat x 1,547,935 ops/sec ±17.88% (10 runs sampled)

*Fastest is __for loop__*


> ./test/fixtures/assert/async.js
> node ./test/fixtures/assert/async.js

## timeouts

    max x 9,221,636 ops/sec ±13.58% (10 runs sampled) *burn in*
    nextTick x 2,814,068 ops/sec ±25.29% (10 runs sampled)
    setImmediate x 429,826 ops/sec ±6.72% (10 runs sampled)
    setTimeout x 711 ops/sec ±5.01% (10 runs sampled)

*Fastest is __nextTick__*

## timeouts - demonstrate bug

    max x 8,556,753 ops/sec ±10.15% (10 runs sampled) *burn in*
    setImmediate:  *error*
    nextTick:  *error*
    setTimeout x 724 ops/sec ±6.04% (10 runs sampled)

*Fastest is __setTimeout__*

```
1. setImmediate:  Error: AssertionError: 1 == 3628800

```
```
2. nextTick:  Error: AssertionError: 9.33262154439441e+157 == 3628800

```

> ./test/fixtures/assert/slice.js
> node ./test/fixtures/assert/slice.js

## array slice

    for loop x 20,824,494 ops/sec ±11.36% (10 runs sampled)
    Array.prototype.slice x 5,373,467 ops/sec ±12.31% (10 runs sampled)

*Fastest is __for loop__*

## array slice - demonstrate bug

    Array.prototype.slice x 5,544,865 ops/sec ±9.93% (10 runs sampled)
    for loop:  *error*

*Fastest is __Array.prototype.slice__*

```
1. for loop:  Error: AssertionError: [ 2, 3, 4, 5, 6, '-1': 1 ] deepEqual [ 2, 3, 4, 5, 6 ]

```
## array slice - without asserts

    for loop x 22,813,744 ops/sec ±10.17% (10 runs sampled)
    Array.prototype.slice x 5,098,394 ops/sec ±16.84% (10 runs sampled)

*Fastest is __for loop__*


 - 3 passed
 - 0 failed
 - 0 aborted
