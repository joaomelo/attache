import * as admin from 'firebase-admin';
import { del } from '../request';

let app;

export async function initFirestore () {
  const isProduction = !process.env.FIRESTORE_EMULATOR_HOST;
  const projectId = process.env.FIREBASE_PROJECT_ID;

  if (!app) {
    app = isProduction
      ? admin.initializeApp()
      : admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        projectId: projectId
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
    await clearEmulatorFirestore(db, projectId);
  }

  const adapter = createAdapter(db);
  return adapter;
};

async function clearEmulatorFirestore (db, projectId) {
  const clearFirestoreEndpoint = `http://${process.env.FIRESTORE_EMULATOR_HOST}/emulator/v1/projects/${projectId}/databases/(default)/documents`;
  const response = await del(clearFirestoreEndpoint);
  console.log('emptied firestore emulator with this response', response);
}

function createAdapter (db) {
  return {
    async saveItems (collectionName, items) {
      if (!Array.isArray(items) || items.length === 0) return true;

      const collection = db.collection(collectionName);
      const batch = db.batch();

      items.forEach(item => {
        const docRef = collection.doc(item.id);
        batch.set(docRef, item);
      });

      await batch.commit();
      return true;
    },

    async queryAllItems (collectionName) {
      const collection = db.collection(collectionName);
      return findItems(collection);
    },

    queryItemsSince (collectionName, start) {
      const collection = db.collection(collectionName);
      return findItems(collection, { field: 'when', operator: '>=', value: start });
    }
  };
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
