import { initDb } from '../app/db';
import { get } from '../app/request';
import { createScaleSerpSearch } from '../app/search';
import { saveFreshSnapshotsForStakes } from '../domain/snapshots';

// const frequency = process.env.ENV === 'development' ? 1 : 60;

export async function fireSaveFreshSnapshotsForStakes () {
  const db = await initDb('firebase');
  if (!db) throw new Error('Unable to connect to firestore');

  const key = process.env.SCALE_SERP_KEY;
  if (!key) throw new Error('SCALE SERP api key not found as environment variable');
  const search = createScaleSerpSearch({ get, key });

  await saveFreshSnapshotsForStakes(db, search);
  log('snapshot finished');
}
