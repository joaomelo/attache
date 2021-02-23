export function createDispatchedTracksCollection (db) {
  const collectionName = 'dispatchedTracks';
  return {
    save: items => {
      const mappedItems = items.map(d =>
        ({ stakeId: d.stakeId, to: d.to, when: new Date() })
      );
      db.saveItems(collectionName, mappedItems);
    },
    queryAll: () => db.queryAllItems(collectionName),
    querySince: start => db.queryItemsSince(collectionName, start)
  };
}
