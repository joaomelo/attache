export function createDispatchedTracksCollection (db) {
  const collectionName = 'dispatchedTracks';
  return {
    save: items => db.saveItems(collectionName, items),
    queryAll: () => db.queryAllItems(collectionName),
    querySince: start => db.queryItemsSince(collectionName, start)
  };
}
