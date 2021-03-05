import { stakes, snapshots } from '../../../tests/fixtures';
import { initDb } from '../../app/db';
import { renderTrackReport as render } from '../../app/view';
import { dispatchTracks } from './dispatch-tracks';

describe('dispatch rankings module', () => {
  let db, dispatch;

  beforeEach(() => {
    dispatch = jest.fn();
  });

  describe('happy path', () => {
    beforeEach(async () => {
      db = initDb('vanilla');
      await db.saveItems('stakes', stakes);
      await db.saveItems('snapshots', snapshots);
    });

    test('dispatch a ranking for every email', async () => {
      const expectedQt = 3;

      const dispatchedRankings = await dispatchTracks({ db, render, dispatch });

      expect(dispatchedRankings).toBe(expectedQt);
      expect(dispatch).toHaveBeenCalledTimes(expectedQt);
    });

    test('dispatch with correct mail object shape', async () => {
      await dispatchTracks({ db, render, dispatch });

      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          to: expect.any(String),
          subject: expect.any(String),
          message: expect.any(String)
        })
      );
    });
  });

  describe('alternative scenarios', () => {
    test('do not dispatch again before frequency is due', async () => {
      db = initDb('vanilla');
      await db.saveItems('stakes', stakes);
      await db.saveItems('snapshots', snapshots);
      await dispatchTracks({ db, render, dispatch });

      const dispatchedRankings = await dispatchTracks({ db, render, dispatch });

      expect(dispatchedRankings).toBe(0);
    });

    test('do not dispatch rankings without stakes', async () => {
      db = initDb('vanilla');
      await db.saveItems('stakes', []);
      await db.saveItems('snapshots', snapshots);

      const dispatchedRankings = await dispatchTracks({ db, render, dispatch });

      expect(dispatchedRankings).toBe(0);
    });

    test('do not dispatch rankings without snapshots', async () => {
      db = initDb('vanilla');
      await db.saveItems('stakes', stakes);
      await db.saveItems('snapshots', []);

      const dispatchedRankings = await dispatchTracks({ db, render, dispatch });

      expect(dispatchedRankings).toBe(0);
    });
  });
});
