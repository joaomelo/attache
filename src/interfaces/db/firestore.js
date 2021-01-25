import * as admin from 'firebase-admin';

let app;

export async function initFirestore (options) {
  const { projectId, emulatorHost } = options;

  if (emulatorHost) {
    await initEmulator(options);
  }

  if (!app) {
    app = admin.initializeApp({ projectId });
  }

  const adapter = createAdapter(admin.firestore());
  return adapter;
};

async function initEmulator (options) {
  const { projectId, emulatorHost, del } = options;
  process.env.FIRESTORE_EMULATOR_HOST = emulatorHost;
  await del(`http://${emulatorHost}/emulator/v1/projects/${projectId}/databases/(default)/documents`);
}

function createAdapter (db) {
  const collections = {
    stakes: db.collection('stakes'),
    rankings: db.collection('rankings'),
    snapshots: db.collection('snapshots')
  };

  return {
    queryStakes: () => findItems(collections.stakes),
    saveStakes: stakes => saveItems(collections.stakes, stakes),
    deleteStake: id => deleteItem(collections.stakes, id),
    saveRankings: rankings => saveItems(collections.rankings, rankings),
    queryRankings: () => findItems(collections.rankings),
    queryRankingsSince: start => findItems(collections.rankings, { field: 'when', operator: '>=', value: start }),
    saveSnapshots: snapshots => saveItems(collections.snapshots, snapshots),
    querySnapshots: () => findItems(collections.snapshots),
    querySnapshotsSince: start => findItems(collections.snapshots, { field: 'when', operator: '>=', value: start })
  };
}

async function saveItems (collection, items) {
  const promises = [];
  items.forEach(item => {
    const docRef = collection.doc(item.id);
    promises.push(docRef.set(item));
  });

  await Promise.all(promises);
  return true;
}

async function findItems (collection, filter) {
  let query = collection;
  if (filter) {
    const { field, operator, value } = filter;
    query = query.where(field, operator, value);
  }

  const snapshot = await query.get();
  const items = snapshot.docs.map(convertDocToItem);
  return items;
}

function convertDocToItem (doc) {
  const item = {};
  const data = doc.data();

  for (const field in data) {
    const value = data[field] instanceof admin.firestore.Timestamp
      ? data[field].toDate()
      : data[field];
    item[field] = value;
  }

  return item;
}

async function deleteItem (collection, id) {
  await collection.doc(id).delete();
  return true;
}
