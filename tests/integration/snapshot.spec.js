import { createDummySearch } from '../../src/interfaces/search';
import { initMemoryDb } from '../../src/interfaces/db';
import { saveFreshSnapshotsFor } from '../../src/domain/snapshots';

describe('snapshot module', () => {
  describe('happy path', () => {
    test('save a new snapshot for every term', async () => {
      const search = createDummySearch();
      const db = initMemoryDb();
      const dependencies = { search, db };

      const terms = ['cloud', 'js front end library'];

      await saveFreshSnapshotsFor(terms, dependencies);

      const savedSnapshots = db.snapshots;
      expect(savedSnapshots).toHaveLength(2);
      expect(savedSnapshots).toEqual(
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

  describe('alternate scenarios', () => {
    test('reuse snapshots already saved skipping search service', () => {

    });
    test('do not reuse unsuccessful snapshots', () => {

    });
    test('do not reuse old snapshots', () => {

    });
  });

  describe('exception scenarios', () => {
    test('create a failed snapshot if search throws', () => {

    });
  });
});
