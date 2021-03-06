
export function createDispatchedTracksCollection (db) {
  const collectionName = 'dispatchedTracks';
  return {
    save: dispatches => {
      const mappedItems = dispatches.map(({ stakeId, to, when = new Date() }) => ({ stakeId, to, when }));
      return db.saveItems(collectionName, mappedItems);
    },
    queryLastDays: days => db.queryItemsLastDays(collectionName, days)
  };
}
