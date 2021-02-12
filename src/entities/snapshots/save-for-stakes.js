import { saveFreshSnapshotsForTerms } from './save-for-terms';

export async function saveFreshSnapshotsForStakes (db, search, logger) {
  let savedSnapshots = 0;
  const stakes = await db.queryStakes();
  if (stakes.length === 0) {
    logger.info('no stakes found for snapshot taking');
    return savedSnapshots;
  };

  const terms = extractTermsFromStakes(stakes);
  savedSnapshots = await saveFreshSnapshotsForTerms(terms, db, search);

  return savedSnapshots;
}

function extractTermsFromStakes (stakes) {
  const termsSet = new Set();
  stakes.forEach(stake => stake.terms.forEach(term => termsSet.add(term)));
  const terms = Array.from(termsSet.values());
  return terms;
}
