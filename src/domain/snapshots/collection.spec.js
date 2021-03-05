import { snapshots } from '../../../tests/fixtures';
import { fromToday } from '../../helpers';
import { initDb } from '../../app/db';
import { createSnapshotsCollection } from './collection';

describe('snapshots module', () => {
  let db, snapshotsCol;

  beforeEach(async () => {
    db = await initDb('vanilla');
    snapshotsCol = createSnapshotsCollection(db);
  });

  describe('happy path', () => {
    test('save and query all', async () => {
      await snapshotsCol.save(snapshots);
      const queriedSnapshots = await snapshotsCol.queryAll();
      expect(queriedSnapshots).toEqual(snapshots);
    });

    test('query since', async () => {
      await snapshotsCol.save(snapshots);
      const todaySnapshots = await snapshotsCol.querySince(fromToday(-1));

      expect(todaySnapshots).toHaveLength(3);
    });

    test('query last days successful', async () => {
      await snapshotsCol.save(snapshots);
      const sinceYesterdaySnapshots = await snapshotsCol.querySuccessfulLastDays(1);

      expect(sinceYesterdaySnapshots).toHaveLength(2);
    });
  });
});
