import { saveFreshSnapshotsForTerms } from './save-for-terms';

export async function saveFreshSnapshotsForStakes (db, search, logger) {
  const stakes = await db.queryStakes();
  if (stakes.length === 0) {
    logger.info('no stakes found for snapshot taking');
    return true;
  };

  const terms = extractTermsFromStakes(stakes);
  await saveFreshSnapshotsForTerms(terms, db, search);

  return true;
}

function extractTermsFromStakes (stakes) {
  const termsSet = new Set();
  stakes.forEach(stake => stake.terms.forEach(term => termsSet.add(term)));
  const terms = Array.from(termsSet.values());
  return terms;
}
