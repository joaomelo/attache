import { testIf } from '../helpers';

const isIntegration = process.env.INTEGRATION_TESTS;

describe('dispatch rankings firebase function', () => {
  testIf(isIntegration)('dispatch the correct number of rankings', () => {
    // load seed data into emulator

    // run function once

    // assert something
    console.log('integration!');
  });
});
