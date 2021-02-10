import { initDb } from '../../src/app/db';
import { dispatchFreshRankingsForStakes } from '../../src/cases/dispatch-rankings';
import { stakes, snapshots } from '../fixtures';

describe('rankings module', () => {
  let db, dispatcher, logger;

  beforeEach(async () => {
    db = initDb('vanilla');
    await db.saveStakes(stakes);
    await db.saveSnapshots(snapshots);

    dispatcher = { send: jest.fn() };
    logger = { info: jest.fn() };
  });

  describe('happy path', () => {
    test('dispatch a ranking for every stake', async () => {
      const dispatchedRankings = await dispatchFreshRankingsForStakes({ db, logger, dispatcher });

      expect(dispatchedRankings).toBe(stakes.length);
      expect(dispatcher.send).toHaveBeenCalledTimes(stakes.length);

      const lastCall = logger.info.mock.calls.length - 1;
      const lastLogCallParam = logger.info.mock.calls[lastCall][0];
      expect(lastLogCallParam).toEqual(expect.stringContaining(stakes.length.toString()));
    });
  });

  describe('absent data scenarios', () => {
    test('do not dispatch rankings without stakes', async () => {
      db = initDb('vanilla');
      await db.saveStakes([]);
      await db.saveSnapshots(snapshots);

      const dispatchedRankings = await dispatchFreshRankingsForStakes({ db, logger, dispatcher });
      expect(dispatchedRankings).toBe(0);

      const logCallParam = logger.info.mock.calls[0][0];
      expect(logCallParam).toEqual(expect.stringContaining('no stakes'));
    });

    test('do not dispatch rankings without snapshots', async () => {
      db = initDb('vanilla');
      await db.saveStakes(stakes);
      await db.saveSnapshots([]);

      const dispatchedRankings = await dispatchFreshRankingsForStakes({ db, logger, dispatcher });
      expect(dispatchedRankings).toBe(0);

      const logCallParam = logger.info.mock.calls[0][0];
      expect(logCallParam).toEqual(expect.stringContaining('no snapshots'));
    });
  });

  describe('manage sent history scenarios', () => {
    test('do not dispatch rankings more than once per day', () => {});
  });
});
