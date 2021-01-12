import Datastore from 'nedb';

function convertField (originals, from, to) {
  const converteds = originals.map(original => {
    const converted = { ...original };
    delete converted[from];
    converted[to] = original[from];
    return converted;
  });
  return converteds;
};

function saveItems (datastore, items) {
  return new Promise((resolve, reject) => {
    const records = convertField(items, 'id', '_id');
    datastore.insert(records, error => error ? reject(error) : resolve(true));
  });
}

function findItems (datastore, filter = {}) {
  return new Promise((resolve, reject) => {
    datastore.find(filter, (error, docs) => {
      if (error) reject(error);

      const items = convertField(docs, '_id', 'id');
      return resolve(items);
    });
  });
}

function deleteItem (datastore, id) {
  return new Promise((resolve, reject) => {
    datastore.remove({ _id: id }, {}, (error, numRemoved) => {
      if (error) reject(error);

      return resolve(numRemoved > 0);
    });
  });
}

export async function initNedb ({ memory, filePrefix }) {
  const createDataStore = filePostfix => memory
    ? new Datastore()
    : new Datastore({
      filename: `${filePrefix}.${filePostfix}.nedb`,
      autoload: true
    });

  const db = {
    stakes: createDataStore('stakes'),
    rankings: createDataStore('rankings'),
    snapshots: createDataStore('snapshots')
  };

  return {
    queryStakes () {
      return findItems(db.stakes);
    },

    saveStakes (stakes) {
      return saveItems(db.stakes, stakes);
    },

    deleteStake (id) {
      return deleteItem(db.stakes, id);
    },

    saveRankings (rankings) {
      return saveItems(db.rankings, rankings);
    },

    queryRankings () {
      return findItems(db.rankings);
    },

    queryRankingsSince (start) {
      return findItems(db.rankings, { when: { $gte: start } });
    },

    saveSnapshots (snapshots) {
      return saveItems(db.snapshots, snapshots);
    },

    querySnapshots () {
      return findItems(db.snapshots);
    },

    querySnapshotsSince (start) {
      return findItems(db.snapshots, { when: { $gte: start } });
    }
  };
};
