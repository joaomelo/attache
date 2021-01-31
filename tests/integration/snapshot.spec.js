import { calcSomedayFromToday } from '../../src/helpers';
import { createDummySearch } from '../../src/app/search';
import { initDb } from '../../src/app/db';
import { saveFreshSnapshotsForStakes } from '../../src/domain/snapshots';

describe('snapshot module', () => {
  let db;

  beforeEach(async () => {
    const stakes = [
      {
        id: '87178090-383e-4780-a363-a076a6f952dd',
        pages: ['azure.microsoft.com', 'aws.amazon.com', 'firebase.google.com'],
        terms: ['cloud']
      },
      {
        id: 'd1584b65-7361-46ee-a807-e1a3ec0ddb33',
        pages: ['vuejs.org', 'reactjs.org', 'angular.io', 'svelte.dev'],
        terms: ['js front end library']
      }
    ];
    db = initDb('vanilla');
    await db.saveStakes(stakes);
  });

  describe('happy path', () => {
    test('save a snapshot for every term and return saved quantity', async () => {
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

  describe('alternate scenarios', () => {
    test('run gracefully if no stakes is available', async () => {
      const search = () => ({ message: 'search limit reached' });
      const emptyDb = initDb('vanilla');
      const logger = { info: () => undefined };

      const savedSnapshots = await saveFreshSnapshotsForStakes(emptyDb, search, logger);

      expect(savedSnapshots).toBe(0);
      expect(db.snapshots).toEqual([]);
    });

    test('do not save new snapshot and avoid search service if fresh snapshot is available', async () => {
      await db.saveSnapshots([{
        term: 'cloud',
        when: new Date(),
        success: true,
        size: 2,
        result: ['www.some-page.com', 'www.another-page.net']
      }]);
      const search = jest.fn(createDummySearch());

      const savedSnapshots = await saveFreshSnapshotsForStakes(db, search);

      expect(savedSnapshots).toBe(1);
      expect(search).toHaveBeenCalledTimes(1);
      expect(db.snapshots).toHaveLength(2);
    });

    test('ignores unsuccessful and old snapshots', async () => {
      await db.saveSnapshots([
        {
          term: 'cloud',
          when: new Date(),
          success: false,
          size: 2
        },
        {
          term: 'cloud',
          when: calcSomedayFromToday(-1),
          success: true,
          size: 2,
          result: ['www.some-page.com', 'www.another-page.net']
        }
      ]);
      const search = jest.fn(createDummySearch());

      const savedSnapshots = await saveFreshSnapshotsForStakes(db, search);

      expect(savedSnapshots).toBe(2);
      expect(search).toHaveBeenCalledTimes(2);
      expect(db.snapshots).toHaveLength(4);
    });
  });

  describe('exception scenarios', () => {
    test('create failed snapshots if unexpected return from search', async () => {
      const search = () => ({ message: 'search limit reached' });

      const savedSnapshots = await saveFreshSnapshotsForStakes(db, search);

      expect(savedSnapshots).toBe(2);
      expect(db.snapshots).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            success: false,
            error: expect.any(String),
            when: expect.any(Date)
          })
        ])
      );
    });

    test('create failed snapshots if search throws', async () => {
      const search = () => { throw new Error('some search error'); };

      const savedSnapshots = await saveFreshSnapshotsForStakes(db, search);

      expect(savedSnapshots).toBe(2);
      expect(db.snapshots).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            success: false,
            error: expect.any(String),
            when: expect.any(Date)
          })
        ])
      );
    });
  });
});
