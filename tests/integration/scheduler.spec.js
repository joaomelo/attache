import { schedule } from '../../src/app/scheduler';

jest.useFakeTimers();

describe('schedule module', () => {
  test('happy path', () => {
    const callback = jest.fn(() => null);

    schedule(callback, 1);

    const twoMinutes = 2 * 60 * 1000;
    jest.advanceTimersByTime(twoMinutes);

    expect(callback).toHaveBeenCalledTimes(2);
  });

  test('will throw if frequency is not a positive integer', () => {
    const callback = () => null;

    expect(() => schedule(callback, -1)).toThrow();
    expect(() => schedule(callback, NaN)).toThrow();
    expect(() => schedule(callback, 1 / 2)).toThrow();
    expect(() => schedule(callback, 'iAmNotANumber')).toThrow();
    expect(() => schedule(callback, undefined)).toThrow();
  });
});
