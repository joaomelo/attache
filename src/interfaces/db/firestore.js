import * as admin from 'firebase-admin';

let app;

export async function initFirestore (options) {
  const { projectId } = options;

  if (!app) {
    app = admin.initializeApp({ projectId });
  }

  const db = admin.firestore();

  if (process.env.FIRESTORE_EMULATOR_HOST) {
    /*
      emulator is triggered differently depending where the firebase sdk is used.
      here, the initialization is based on the admin sdk use case, which rely on the
      FIRESTORE_EMULATOR_HOST environment variable been set. the only thing the
      following function do is clean the emulator db. more in:
      https://firebase.google.com/docs/emulator-suite/connect_firestore#admin_sdks
    */
    await clearEmulatorFirestore(db, options);
  }

  const adapter = createAdapter(db);
  return adapter;
};

async function clearEmulatorFirestore (db, options) {
  const { projectId, del } = options;

  const clearFirestoreEndpoint = `http://${process.env.FIRESTORE_EMULATOR_HOST}/emulator/v1/projects/${projectId}/databases/(default)/documents`;
  await del(clearFirestoreEndpoint);
}

function createAdapter (db) {
  const collections = {
    stakes: db.collection('stakes'),
    rankings: db.collection('rankings'),
    snapshots: db.collection('snapshots'),
    logs: db.collection('logs')
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
    querySnapshotsSince: start => findItems(collections.snapshots, { field: 'when', operator: '>=', value: start }),
    saveLog: log => saveItems(collections.logs, [log]),
    queryLogs: () => findItems(collections.logs)
  };
}

async function saveItems (collection, items) {
  if (!Array.isArray(items) || items.length === 0) return true;

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
