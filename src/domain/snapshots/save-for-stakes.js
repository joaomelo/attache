import { saveFreshSnapshotsForTerms } from './save-for-terms';

export async function saveFreshSnapshotsForStakes (dependencies) {
  const { db } = dependencies;
  const stakes = await db.queryStakes();
  const terms = extractTermsFromStakes(stakes);

  await saveFreshSnapshotsForTerms(terms, dependencies);

  return true;
}

function extractTermsFromStakes (stakes) {
  const termsSet = new Set();
  stakes.forEach(stake => stake.terms.forEach(term => termsSet.add(term)));
  const terms = Array.from(termsSet.values());
  return terms;
}
