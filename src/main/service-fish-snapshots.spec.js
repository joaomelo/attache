import { testIf } from '../helpers';

const isIntegration = process.env.INTEGRATION_TESTS;

describe('fish-snapshot firebase function', () => {
  testIf(isIntegration)('fish the correct number of snapshots from search service', () => {
    // load seed data into emulator

    // run function once

    // assert the returned value
    // assert database status
    console.log('integration!');
  });
});
