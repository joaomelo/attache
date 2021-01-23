import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server-core';
import { convertFieldName, createId } from '../../helpers';

export async function initMongo (options) {
  const { stakesCol, rankingsCol, snapshotsCol } = await createCollections(options);

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

async function createCollections (options) {
  const { memory } = options;
  const connectToDb = memory ? connectToNewInMemoryDb : connectToLocalDb;
  const db = await connectToDb(options);

  return {
    stakesCol: db.collection('stakes'),
    rankingsCol: db.collection('rankings'),
    snapshotsCol: db.collection('snapshots')
  };
}

async function connectToNewInMemoryDb (options) {
  const mongoInMemory = new MongoMemoryServer();
  const uri = await mongoInMemory.getUri();

  const client = await connectClient(uri);

  const uniqueDbName = createId();
  return client.db(uniqueDbName);
};

async function connectToLocalDb (options) {
  const { uri } = options;
  const client = await connectClient(uri);
  return client.db('attache-db');
};

async function connectClient (uri) {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  await client.connect();
  return client;
};

async function saveItems (collection, items) {
  if (!Array.isArray(items) || items.length === 0) return true;

  const records = convertFieldName(items, 'id', '_id');
  await collection.insertMany(records);
  return true;
}

async function findItems (collection, filter = {}) {
  const cursor = collection.find(filter);
  const recordsArray = await cursor.toArray();
  const itemsArray = convertFieldName(recordsArray, '_id', 'id');
  return itemsArray;
}

function deleteItem (collection, id) {
  return collection.deleteOne({ _id: id });
}
