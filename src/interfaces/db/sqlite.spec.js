import { stakes, rankings } from '../../../tests/fixtures';
import { initSqliteDB } from './sqlite';

describe('sqlite db adapter', () => {
  test('must save and retrieve stakes', async () => {
    const db = await initSqliteDB({ memory: true });
    await db.saveStakes(stakes);
    const retrievedStakes = await db.queryStakes();

    expect(retrievedStakes).toEqual(stakes);
  });

  test('must save and retrieve rankings', async () => {
    const db = await initSqliteDB({ memory: true });

    await db.saveRankings(rankings);
    const retrievedRankings = await db.queryRankings();

    expect(retrievedRankings).toEqual(rankings);
  });
});
