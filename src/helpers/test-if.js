export function testIf (condition) {
  return condition ? test : test.skip;
};

export function testIfIntegration () {
  return testIf(process.env.INTEGRATION_TESTS);
};
