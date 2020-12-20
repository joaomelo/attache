import { initMemoryDb } from '../2-interfaces/db';
import { createIsRanked } from './is-ranked';

describe('isRanked', () => {
  const page = 'blog.company';
  const term = 'service';

  describe('daily', () => {
    const frequency = 'daily';

    it('false if no equivalent ranking was created today', async () => {
      const db = initMemoryDb();
      const when = new Date();
      when.setDate(when.getDate() - 1);
      db.rankings.push({ page, term, when, position: -1 });

      const isRanked = await createIsRanked({ frequency }, { db });
      const wasRanked = isRanked(page, term);

      expect(wasRanked).toBe(false);
    });

    it('true if a ranking was already created', async () => {
      const db = initMemoryDb();
      const when = new Date();
      when.setHours(0, 0, 0, 0);
      db.rankings.push({ page, term, when, position: -1 });

      const isRanked = await createIsRanked({ frequency }, { db });
      const wasRanked = isRanked(page, term);

      expect(wasRanked).toBe(true);
    });
  });

  describe('weekly', () => {
    const frequency = 'weekly';

    it('false if no equivalent ranking was created in the last 7 days', async () => {
      const db = initMemoryDb();
      const when = new Date();
      when.setDate(when.getDate() - 7);
      db.rankings.push({ page, term, when, position: -1 });

      const isRanked = await createIsRanked({ frequency }, { db });
      const wasRanked = isRanked(page, term);

      expect(wasRanked).toBe(false);
    });

    it('true if a ranking was already created', async () => {
      const db = initMemoryDb();
      const when = new Date();
      when.setDate(when.getDate() - 6);
      db.rankings.push({ page, term, when, position: -1 });

      const isRanked = await createIsRanked({ frequency }, { db });
      const wasRanked = isRanked(page, term);

      expect(wasRanked).toBe(true);
    });
  });
});
