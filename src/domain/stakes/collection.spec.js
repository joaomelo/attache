import { stakes } from '../../../tests/fixtures';
import { initDb } from '../../app/db';
import { createStakesCollection } from './collection';

describe('stakes module', () => {
  let db, stakesCol;

  beforeEach(async () => {
    db = await initDb('vanilla');
    stakesCol = createStakesCollection(db);
  });

  describe('happy path', () => {
    test('save and query all', async () => {
      await stakesCol.save(stakes);
      const queried = await stakesCol.queryAll();
      expect(queried).toEqual(stakes);
    });

    test('query terms', async () => {
      await stakesCol.save(stakes);
      const terms = await stakesCol.queryTerms();

      expect(terms).toHaveLength(2);
    });
  });
});
