import { createDummySearch } from '../../interfaces/search';
import { snapshotTerms } from './terms';

describe('snapshotTerms', () => {
  test('return search snapshots for an array of terms', async () => {
    const terms = ['service', 'service city'];
    const search = createDummySearch();

    const snapshots = await snapshotTerms({ terms }, { search });

    expect(snapshots).toHaveLength(2);
  });
});
