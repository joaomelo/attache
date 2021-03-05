export function createSnapshotsCollection (db) {
  const collectionName = 'snapshots';
  return {
    save: newSnapshots => db.saveItems(collectionName, newSnapshots),
    queryAll: () => db.queryAllItems(collectionName),
    querySince: start => db.queryItemsSince(collectionName, start),
    async querySuccessfulLastDays (days) {
      const allSince = await db.queryItemsLastDays(collectionName, days);
      return allSince.filter(s => s.success);
    }
  };
}
