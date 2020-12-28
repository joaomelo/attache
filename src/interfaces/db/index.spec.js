import { stakes, rankings, snapshots } from '../../../tests/fixtures';
import { calcToday } from '../../helpers';
import { initMemoryDb } from './memory';
import { initNedb } from './nedb';

describe('db adapters', () => {
  const memory = () => initMemoryDb();
  const nedb = () => initNedb({ memory: true });

  const testTableSaveAndQuery = [
    ['Stakes', memory, stakes],
    ['Stakes', nedb, stakes],
    ['Rankings', memory, rankings],
    ['Rankings', nedb, rankings],
    ['Snapshots', memory, snapshots],
    ['Snapshots', nedb, snapshots]
  ];

  test.each(testTableSaveAndQuery)('must save and query %p with %p', async (dbMethod, initDb, fixture) => {
    const db = await initDb();

    const result = await db[`save${dbMethod}`](fixture);
    const retrieved = await db[`query${dbMethod}`]();

    const sortById = (a, b) => {
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
      return 0;
    };
    retrieved.sort(sortById);
    fixture.sort(sortById);

    expect(result).toBe(true);
    expect(retrieved).toEqual(fixture);
  });

  const testTableQuerySince = [[memory], [nedb]];
  test.each(testTableQuerySince)('must query snapshots using date filter with %p', async initDb => {
    const db = await initDb();
    await db.saveSnapshots(snapshots);

    const today = calcToday();
    const howManySnapshotsToday = snapshots.filter(s => s.when >= today).length;

    const todaySnapshots = await db.querySnapshotsSince(today);

    expect(todaySnapshots).toHaveLength(howManySnapshotsToday);
  });
});
