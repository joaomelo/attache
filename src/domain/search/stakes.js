import { searchTerms } from './terms';

export async function searchStakes ({ stakes }, { search }) {
  const terms = new Set();
  stakes.forEach(stake => stake.terms.forEach(term => terms.add(term)));

  const snapshots = await searchTerms({ terms }, { search });
  return snapshots;
}
