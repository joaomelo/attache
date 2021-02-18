import { createScheduledService } from './index';

jest.useFakeTimers();

describe('schedule module', () => {
  test('happy path', () => {
    const callback = jest.fn(() => null);

    createScheduledService('vanilla', { callback, frequencyInMinutes: 1 });

    const twoMinutes = 2 * 60 * 1000;
    jest.advanceTimersByTime(twoMinutes);

    expect(callback).toHaveBeenCalledTimes(2);
  });

  test('will throw if frequency is not a positive integer', () => {
    const callback = () => null;
    const createService = frequencyInMinutes => createScheduledService('vanilla', { callback, frequencyInMinutes });

    expect(() => createService(-1)).toThrow();
    expect(() => createService(NaN)).toThrow();
    expect(() => createService(1 / 2)).toThrow();
    expect(() => createService('iAmNotANumber')).toThrow();
    expect(() => createService(undefined)).toThrow();
  });
});
