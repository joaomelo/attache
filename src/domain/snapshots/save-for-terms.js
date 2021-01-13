import { createFreshSnapshots } from './create-fresh';

export async function saveFreshSnapshotsForTerms (terms, dependencies) {
  const freshSnapshots = await createFreshSnapshots(terms, dependencies);

  const { db } = dependencies;
  await db.saveSnapshots(freshSnapshots);
}
