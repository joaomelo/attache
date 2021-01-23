import { initDb } from '../interfaces/db';
import { get } from '../interfaces/request';
import { createScaleSerpSearch } from '../interfaces/search';
import { saveFreshSnapshotsForStakes } from '../domain/snapshots';

async function main () {
  const uri = process.env.MONGO_URI;
  const key = process.env.SCALE_SERP_KEY;

  if (!uri || !key) throw new Error('Required environment variables not loaded');

  const db = await initDb('mongo', { uri });
  const search = createScaleSerpSearch({ get, key });

  await saveFreshSnapshotsForStakes(db, search);
}

main();
