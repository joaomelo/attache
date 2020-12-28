import Datastore from 'nedb';

function convertField (originals, from, to) {
  const converted = originals.map(o => {
    const c = { ...o };
    delete c[from];
    c[to] = o[from];
    return c;
  });
  return converted;
};

function saveItems (datastore, items) {
  return new Promise((resolve, reject) => {
    const records = convertField(items, 'id', '_id');
    datastore.insert(records, error => error ? reject(error) : resolve(true));
  });
}

function findItems (datastore) {
  return new Promise((resolve, reject) => {
    datastore.find({}, (error, docs) => {
      if (error) reject(error);

      const items = convertField(docs, '_id', 'id');
      return resolve(items);
    });
  });
}

export async function initNedb ({ memory, filePrefix }) {
  const createDataStore = filePostfix => memory
    ? new Datastore()
    : new Datastore({
      filename: `${filePrefix}.${filePostfix}`,
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

    queryRankings () {
      return findItems(db.rankings);
    },

    saveRankings (rankings) {
      return saveItems(db.rankings, rankings);
    },

    querySnapshots () {
      return findItems(db.snapshots);
    },

    saveSnapshots (snapshots) {
      return saveItems(db.snapshots, snapshots);
    }
  };
};
