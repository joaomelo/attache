import { stakes, snapshots } from '../../../tests/fixtures';
import { initDb } from '../../app/db';
import { dispatchTracksReports } from './dispatch-tracks';

describe('dispatch rankings module', () => {
  let db, dispatch, logger;

  beforeEach(() => {
    dispatch = jest.fn();
    logger = { info: jest.fn() };
  });

  describe('happy path', () => {
    beforeEach(async () => {
      db = initDb('vanilla');
      await db.saveItems('stakes', stakes);
      await db.saveItems('snapshots', snapshots);
    });

    test('dispatch a ranking for every email', async () => {
      const expectedQt = 3;

      const dispatchedRankings = await dispatchTracksReports({ db, logger, dispatch });

      expect(dispatchedRankings).toBe(expectedQt);
      expect(dispatch).toHaveBeenCalledTimes(expectedQt);
      expect(logger.info).toHaveBeenLastCalledWith(expect.stringContaining(expectedQt.toString()));
    });

    test('dispatch with correct mail object shape', async () => {
      await dispatchTracksReports({ db, logger, dispatch });

      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          to: expect.any(String),
          subject: expect.any(String),
          message: expect.any(String)
        })
      );
    });
  });

  describe('absent data scenarios', () => {
    test('do not dispatch rankings without stakes', async () => {
      db = initDb('vanilla');
      await db.saveItems('stakes', []);
      await db.saveItems('snapshots', snapshots);

      const dispatchedRankings = await dispatchTracksReports({ db, logger, dispatch });

      expect(dispatchedRankings).toBe(0);
      expect(logger.info).toHaveBeenLastCalledWith(expect.stringContaining('no stakes'));
    });

    test('do not dispatch rankings without snapshots', async () => {
      db = initDb('vanilla');
      await db.saveItems('stakes', stakes);
      await db.saveItems('snapshots', []);

      const dispatchedRankings = await dispatchTracksReports({ db, logger, dispatch });

      expect(dispatchedRankings).toBe(0);
      expect(logger.info).toHaveBeenLastCalledWith(expect.stringContaining('no snapshots'));
    });
  });
});
