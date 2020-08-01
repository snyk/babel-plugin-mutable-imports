## babel-plugin-mutable-imports

Convert un-mockable `export`s back into mockable `export`s.

Typescript 3.9 broke this functionality on purpose, and have
[no intention of fixing it](https://github.com/microsoft/TypeScript/issues/38568#issuecomment-628860591);
people on older compilers can just stay there until they have
switched to a different style of mocking.


#### Usage

You can use this inside `ts-jest`:

```js
module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      babelConfig: {
        // in real code, use '@snyk/babel-plugin-mutable-imports'
        plugins: ['../..']
      }
    }
  }
};
``` 


#### What does it actually do?

Replace:

```js
Object.defineProperty(exports, "foo", {
  enumerable: true,
  get: function () { return b_1.foo; }
});
```

...with:
```js
exports.foo = b_1.foo;
```

(actually `exports["foo"]` because of laziness)


#### What does it fix?

`TypeError: Cannot set property foo of [object Object] which has only a getter`

Some Typescript constructs, such as `export const` and `export { foo } from './bar'`,
now generate immutable exports, for which you get a runtime error (or silent failure)
when trying to mock.

A broken project, with `as any` as the mocking framework, is provided in [`examples/`](examples):

 * `ts38`: the code works on Typescript 3.8.
 * `ts39`: the code fails on Typescript 3.9.
 * `ts39-fixed`: this plugin fixes it on typescript 3.9. 
