import { calcSomedayFromToday } from '../../src/helpers';
import { createDummySearch } from '../../src/interfaces/search';
import { initDb } from '../../src/interfaces/db';
import { saveFreshSnapshotsFor } from '../../src/domain/snapshots';

describe('snapshot module', () => {
  describe('happy path', () => {
    test('save a new snapshot for every term', async () => {
      const search = createDummySearch();
      const db = initDb('vanilla');

      const terms = ['cloud', 'js front end library'];

      await saveFreshSnapshotsFor(terms, { search, db });

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

  describe('alternate scenarios', () => {
    test('do not save new snapshot and avoid search service if fresh snapshot is available', async () => {
      const term = 'service';

      const db = initDb('vanilla');
      db.saveSnapshots([{
        term,
        when: new Date(),
        success: true,
        size: 2,
        result: ['www.some-page.com', 'www.another-page.net']
      }]);

      const search = jest.fn(createDummySearch());

      await saveFreshSnapshotsFor([term], { search, db });

      expect(search).toHaveBeenCalledTimes(0);
      expect(db.snapshots).toHaveLength(1);
    });

    test('ignores unsuccessful and old snapshots', async () => {
      const term = 'my name';

      const db = initDb('vanilla');
      db.saveSnapshots([
        {
          term,
          when: new Date(),
          success: false,
          size: 2
        },
        {
          term,
          when: calcSomedayFromToday(-1),
          success: true,
          size: 2,
          result: ['www.some-page.com', 'www.another-page.net']
        }
      ]);

      const search = jest.fn(createDummySearch());

      await saveFreshSnapshotsFor([term], { search, db });

      expect(search).toHaveBeenCalledTimes(1);
      expect(db.snapshots).toHaveLength(3);
    });
  });

  describe('exception scenarios', () => {
    test('create a failed snapshot if search returns out of spec data', async () => {
      const terms = ['what is the best test framework'];

      const search = async () => { return { message: 'search limit reached' }; };
      const db = initDb('vanilla');

      await saveFreshSnapshotsFor(terms, { search, db });

      expect(db.snapshots[0]).toEqual(
        expect.objectContaining({
          term: terms[0],
          success: false,
          error: expect.any(String),
          when: expect.any(Date)
        })
      );
    });

    test('create a failed snapshot if search throws', async () => {
      const terms = ['best programming language'];

      const search = async () => { throw new Error('some search error'); };
      const db = initDb('vanilla');

      await saveFreshSnapshotsFor(terms, { search, db });

      expect(db.snapshots[0]).toEqual(
        expect.objectContaining({
          term: terms[0],
          success: false,
          error: expect.any(String),
          when: expect.any(Date)
        })
      );
    });
  });
});
