import { stakes, rankings, snapshots } from '../../../tests/fixtures';
import { initMemoryDb } from './memory';
import { initNedb } from './nedb';

describe('db adapters', () => {
  const memory = () => initMemoryDb();
  const nedb = () => initNedb({ memory: true });
  const testTable = [
    ['Stakes', memory, stakes],
    ['Stakes', nedb, stakes],
    ['Rankings', memory, rankings],
    ['Rankings', nedb, rankings],
    ['Snapshots', memory, snapshots],
    ['Snapshots', nedb, snapshots]
  ];

  test.each(testTable)('must save and query %p with %p', async (dbMethod, initDb, fixture) => {
    const db = await initDb();
    const result = await db[`save${dbMethod}`](fixture);
    const retrieved = await db[`query${dbMethod}`]();

    expect(result).toBe(true);

    const sortById = (a, b) => {
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
      return 0;
    };

    retrieved.sort(sortById);
    fixture.sort(sortById);
    expect(retrieved).toEqual(fixture);
  });
});
