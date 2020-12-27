import { stakes, rankings } from '../../../tests/fixtures';
import { initMemoryDb } from './memory';

describe('inMemory db adapter', () => {
  test('must save and retrieve stakes', async () => {
    const db = await initMemoryDb();
    await db.saveStakes(stakes);
    const retrievedStakes = await db.queryStakes();

    expect(retrievedStakes).toEqual(stakes);
  });

  test('must save and retrieve rankings', async () => {
    const db = await initMemoryDb();

    await db.saveRankings(rankings);
    const retrievedRankings = await db.queryRankings();

    expect(retrievedRankings).toEqual(rankings);
  });
});
