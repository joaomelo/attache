
export function createDispatchedTracksCollection (db) {
  const collectionName = 'dispatchedTracks';
  return {
    save: dispatches => {
      const mappedItems = dispatches.map(({ stakeId, to, when = new Date() }) => ({ stakeId, to, when }));
      return db.saveItems(collectionName, mappedItems);
    },
    queryAll: () => db.queryAllItems(collectionName),
    querySince: start => db.queryItemsSince(collectionName, start),
    queryLastDays: days => db.queryItemsLastDays(collectionName, days)
  };
}
