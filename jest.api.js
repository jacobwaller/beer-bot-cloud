const common = require('./jest.common');
module.exports = {
  ...common,
  testMatch: ['**/packages/tests/**/*.test.ts?(x)'],
};
