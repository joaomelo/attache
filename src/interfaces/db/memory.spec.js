import { stakes, rankings } from '../../../tests/fixtures';
import { initMemoryDb } from './memory';

describe('inMemory db adapter', () => {
  test('must save and retrieve stakes', async () => {
    const db = await initMemoryDb();
    const result = await db.saveStakes(stakes);
    const retrievedStakes = await db.queryStakes();

    expect(result).toBe(true);
    expect(retrievedStakes).toEqual(stakes);
  });

  test('must save and retrieve rankings', async () => {
    const db = await initMemoryDb();

    const result = await db.saveRankings(rankings);
    const retrievedRankings = await db.queryRankings();

    expect(result).toBe(true);
    expect(retrievedRankings).toEqual(rankings);
  });
});
