import { initDb } from '../../src/app/db';
import { dispatchFreshRankingsForStakes } from '../../src/domain/rankings';
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
      await dispatchFreshRankingsForStakes({ db, logger, dispatcher });
      expect(dispatcher.send).toHaveBeenCalledTimes(stakes.length);
    });

    test('return the number of successful dispatches', async () => {
      const dispatchedRankings = await dispatchFreshRankingsForStakes({ db, logger, dispatcher });
      expect(dispatchedRankings).toBe(stakes.length);
    });

    test('log the cycle start and the number of successful dispatches', async () => {
      await dispatchFreshRankingsForStakes({ db, logger, dispatcher });

      const firstCall = logger.info.mock.calls[0][0];
      expect(firstCall).toEqual(expect.stringContaining('started'));

      const secondCall = logger.info.mock.calls[1][0];
      expect(secondCall).toEqual(expect.stringContaining(stakes.length.toString()));
    });
  });
});
