import { initServicesRuntime } from '../../src/app/runtime';

jest.useFakeTimers();

describe('schedule module', () => {
  let runtime;

  beforeAll(() => {
    runtime = initServicesRuntime('vanilla');
  });

  test('happy path', () => {
    const callback = jest.fn(() => null);

    runtime.createScheduledService(callback, 1);

    const twoMinutes = 2 * 60 * 1000;
    jest.advanceTimersByTime(twoMinutes);

    expect(callback).toHaveBeenCalledTimes(2);
  });

  test('will throw if frequency is not a positive integer', () => {
    const callback = () => null;

    expect(() => runtime.createScheduledService(callback, -1)).toThrow();
    expect(() => runtime.createScheduledService(callback, NaN)).toThrow();
    expect(() => runtime.createScheduledService(callback, 1 / 2)).toThrow();
    expect(() => runtime.createScheduledService(callback, 'iAmNotANumber')).toThrow();
    expect(() => runtime.createScheduledService(callback, undefined)).toThrow();
  });
});
