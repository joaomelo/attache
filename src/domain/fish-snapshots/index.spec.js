import { stakes, snapshots } from '../../../tests/fixtures';
import { createSearch } from '../../app/search';
import { initDb } from '../../app/db';
import { fishFreshSnapshots } from './index';

describe('fish-snapshots module', () => {
  let db, search, logger;

  beforeEach(async () => {
    db = await initDb('vanilla');
    await db.saveItems('stakes', stakes);

    search = jest.fn(createSearch('vanilla'));
    logger = { info: jest.fn() };
  });

  describe('happy path', () => {
    test('save a snapshot for every term and return saved quantity', async () => {
      const expectedQt = 2;

      const savedSnapshots = await fishFreshSnapshots({ db, search, logger });
      const dbSnapshots = await db.queryAllItems('snapshots');

      expect(savedSnapshots).toBe(expectedQt);
      expect(logger.info).toHaveBeenLastCalledWith(expect.stringContaining(expectedQt.toString()));
      expect(dbSnapshots).toHaveLength(expectedQt);

      expect(dbSnapshots).toEqual(
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
    test('do not fish new snapshots if a successful one is available', async () => {
      const expectedQt = 1;
      db.saveItems('snapshots', snapshots);

      const savedSnapshots = await fishFreshSnapshots({ db, search, logger });

      expect(savedSnapshots).toBe(expectedQt);
      expect(search).toHaveBeenCalledTimes(expectedQt);
    });

    test('run gracefully if no stakes are available', async () => {
      db = await initDb('vanilla');

      const savedSnapshots = await fishFreshSnapshots({ db, search, logger });

      expect(savedSnapshots).toBe(0);
      expect(logger.info).toHaveBeenLastCalledWith(expect.stringContaining('no'));
    });
  });

  describe('exception scenarios', () => {
    const searchTestTable = [
      ['unexpected return', () => ({ message: 'search limit reached' })],
      ['throws', () => { throw new Error('some search error'); }]
    ];
    test.each(searchTestTable)('create failed snapshots if %p from search', async (behaviour, bizarreSearch) => {
      const expectedQt = 2;
      search = bizarreSearch;

      const savedSnapshots = await fishFreshSnapshots({ db, search, logger });
      const dbSnapshots = await db.queryAllItems('snapshots');

      expect(savedSnapshots).toBe(expectedQt);
      expect(dbSnapshots).toEqual(
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
