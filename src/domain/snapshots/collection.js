export function createSnapshotsCollection (db) {
  const collectionName = 'snapshots';
  return {
    save: newSnapshots => db.saveItems(collectionName, newSnapshots),
    queryAll: () => db.queryAllItems(collectionName),
    querySince: start => db.queryItemsSince(collectionName, start),
    async querySuccessfulSince (start) {
      const allSince = await this.querySince(start);
      return allSince.filter(s => s.success);
    }
  };
}
