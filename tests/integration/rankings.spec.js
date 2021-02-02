import { createDummySearch } from '../../src/app/search';
import { initDb } from '../../src/app/db';
// import { dispatchFreshReportsForStakes } from '../../src/domain/snapshots';
import { stakes, snapshots } from '../fixtures';

describe.skip('snapshot module', () => {
  let db;

  beforeEach(async () => {
    db = initDb('vanilla');
    await db.saveStakes(stakes);
    await db.saveStakes(snapshots);
  });

  describe('happy path', () => {
    test('dispatch a report for every stake, logging it and return saved quantity', async () => {
      const search = createDummySearch();

      const savedSnapshots = await saveFreshSnapshotsForStakes(db, search);

      expect(savedSnapshots).toBe(2);
      expect(db.snapshots).toHaveLength(2);
      expect(db.snapshots).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            term: expect.any(String),
            when: expect.any(Date),
            success: true,
            size: 100,
            result: expect.any(Array)
          })
        ])
      );
    });
  });
});
