export function initVanillaDb () {
  const collections = {};

  const assertCollection = name => {
    if (!collections[name]) {
      collections[name] = [];
    };
    return collections[name];
  };

  return {
    saveItems (collectionName, items) {
      if (!Array.isArray(items) || items.length === 0) return true;

      const collection = assertCollection(collectionName);
      collection.push(...items);

      return Promise.resolve(true);
    },

    queryAllItems (collectionName) {
      const collection = assertCollection(collectionName);
      return Promise.resolve([...collection]);
    },

    queryItemsSince (collectionName, start) {
      const collection = assertCollection(collectionName);
      return Promise.resolve(collection.filter(r => r.when >= start));
    },

    saveStakes (newStakes) { return this.saveItems('stakes', newStakes); },
    queryStakes () { return this.queryAllItems('stakes'); },
    saveSnapshots (newSnapshots) { return this.saveItems('snapshots', newSnapshots); },
    querySnapshots () { return this.queryAllItems('snapshots'); },
    querySnapshotsSince (start) { return this.queryItemsSince('snapshots', start); },
    saveLog (newLog) { return this.saveItems('logs', [newLog]); },
    queryLogs () { return this.queryAllItems('logs'); }
  };
};
