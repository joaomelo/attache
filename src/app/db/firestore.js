import * as admin from 'firebase-admin';
import { createId, fromToday } from '../../helpers';
import { del } from '../request';

let app;

export async function initFirestore () {
  const isProduction = !process.env.FIRESTORE_EMULATOR_HOST;

  if (!app) {
    app = isProduction
      ? admin.initializeApp()
      : admin.initializeApp({
        projectId: 'emulator-fake-id'
      });
  }

  const db = admin.firestore();

  if (!isProduction) {
    /*
      emulator is triggered depending with which firebase sdk is used.
      here, the initialization is based on the admin sdk use case, which rely on the
      FIRESTORE_EMULATOR_HOST environment variable been set. more in:
      https://firebase.google.com/docs/emulator-suite/connect_firestore#admin_sdks
    */
    await clearEmulatorFirestore();
  }

  const adapter = createAdapter(db);
  return adapter;
};

async function clearEmulatorFirestore () {
  const clearFirestoreEndpoint = `http://${process.env.FIRESTORE_EMULATOR_HOST}/emulator/v1/projects/emulator-fake-id/databases/(default)/documents`;
  const response = await del(clearFirestoreEndpoint);
  return response;
}

function createAdapter (db) {
  const collection = name => db.collection(name);

  return {
    saveItems: (collectionName, items) => saveItems(collection(collectionName), items),
    queryAllItems: collectionName => findItems(collection(collectionName)),
    queryItemsSince: (collectionName, start) => findItems(collection(collectionName), { field: 'when', operator: '>=', value: start }),
    queryItemsLastDays (collectionName, days = 0) {
      const start = fromToday(-days);
      return this.queryItemsSince(collectionName, start);
    }
  };
}

async function saveItems (collection, items) {
  if (!Array.isArray(items) || items.length === 0) return true;

  const batch = collection._firestore.batch();

  items.forEach(item => {
    const record = { ...item };
    if (!record.id) {
      record.id = createId();
    }

    const docRef = collection.doc(record.id);
    batch.set(docRef, record);
  });

  await batch.commit();

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
};

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
};
