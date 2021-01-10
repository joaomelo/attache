import { calcToday } from '../../helpers';

export async function loadFreshSnapshots (dependencies) {
  const { db } = dependencies;
  const today = calcToday();

  const todaySnapshots = await db.querySnapshotsSince(today);
  const todaySuccessfulSnapshots = todaySnapshots.filter(s => s.success);

  return todaySuccessfulSnapshots;
}
