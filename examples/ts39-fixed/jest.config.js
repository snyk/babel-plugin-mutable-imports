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
