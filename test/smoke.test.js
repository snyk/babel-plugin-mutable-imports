import { transform } from '@babel/core';

function runPlugin(code) {
  return transform(code, {
    babelrc: false,
    filename: 'test.js',
    plugins: [__dirname + '/../lib/plugin.js'],
  });
}

describe('smoke testing', () => {
  it('transforms just one line', () => {
    // language=JavaScript
    const code =
      'Object.defineProperty(exports, "foo",' +
      '{ enumerable: true,' +
      ' get: function () { return b_1.foo; } });';

    expect(runPlugin(code).code).toMatchSnapshot();
  });
});
