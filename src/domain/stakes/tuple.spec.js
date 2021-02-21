import { stakes } from '../../../tests/fixtures';
import { tupleTermsAndPages } from './tuple';

describe('tuple terms and pages from stakes', () => {
  test('extract a flat array of terms and pages tuples from stakes', () => {
    const tuples = tupleTermsAndPages(stakes);

    expect(tuples).toHaveLength(5);
    tuples.forEach(t => expect(t).toHaveLength(2));
  });
});
