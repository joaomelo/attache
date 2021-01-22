import Datastore from 'nedb';
import { convertFieldName } from '../../helpers';

export async function initMongo (options) {
  const { stakesCol, rankingsCol, snapshotsCol } = createCollections(options);

  return {
    queryStakes: () => findItems(stakesCol),
    saveStakes: stakes => saveItems(stakesCol, stakes),
    deleteStake: id => deleteItem(stakesCol, id),
    saveRankings: rankings => saveItems(rankingsCol, rankings),
    queryRankings: () => findItems(rankingsCol),
    queryRankingsSince: start => findItems(rankingsCol, { when: { $gte: start } }),
    saveSnapshots: snapshots => saveItems(snapshotsCol, snapshots),
    querySnapshots: () => findItems(snapshotsCol),
    querySnapshotsSince: start => findItems(snapshotsCol, { when: { $gte: start } })
  };
};

function createCollections (options) {
  const { memory } = options;
  return memory
    ? createNedbCollections(options)
    : connectMongoCollections(options);
}

function createNedbCollections () {
  return {
    stakesCol: new Datastore(),
    rankingsCol: new Datastore(),
    snapshotsCol: new Datastore()
  };
}

function connectMongoCollections (options) {
  return null;
}

function saveItems (datastore, items) {
  return new Promise((resolve, reject) => {
    const records = convertFieldName(items, 'id', '_id');
    datastore.insert(records, error => error ? reject(error) : resolve(true));
  });
}

function findItems (datastore, filter = {}) {
  return new Promise((resolve, reject) => {
    datastore.find(filter, (error, docs) => {
      if (error) reject(error);

      const items = convertFieldName(docs, '_id', 'id');
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
