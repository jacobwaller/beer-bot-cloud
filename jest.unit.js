const common = require('./jest.common');
module.exports = {
  ...common,
  testMatch: [
    '**/packages/api/tests/**/*.test.ts?(x)',
    '**/packages/client/tests/index.test.ts',
    '**/packages/common/tests/*.test.ts?(x)',
  ],
};
