import { createFreshSnapshotsFor } from './create-fresh';

export async function saveFreshSnapshotsFor (terms, dependencies) {
  const freshSnapshots = await createFreshSnapshotsFor(terms, dependencies);

  const { db } = dependencies;
  await db.saveSnapshots(freshSnapshots);
}
