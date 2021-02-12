import { calcToday } from '../../helpers';

export async function filterTermsWithoutFreshSnapshot (terms, db) {
  const freshSnapshots = await loadFreshSnapshots(db);

  const isFresh = term => !!freshSnapshots.find(s => s.term === term);
  const termsWithoutFreshSnapshot = terms.filter(t => !isFresh(t));

  return termsWithoutFreshSnapshot;
}

async function loadFreshSnapshots (db) {
  const today = calcToday();

  const todaySnapshots = await db.querySnapshotsSince(today);
  const todaySuccessfulSnapshots = todaySnapshots.filter(s => s.success);

  return todaySuccessfulSnapshots;
}
