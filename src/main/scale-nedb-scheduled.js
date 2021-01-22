import { initDb } from '../interfaces/db';
import { get } from '../interfaces/request';
import { createScaleSerpSearch } from '../interfaces/search';
import { saveFreshSnapshotsForStakes } from '../domain/snapshots';

async function main () {
  const filePrefix = process.env.NEDB_FILENAME_PREFIX;
  const key = process.env.SCALE_SERP_KEY;

  if (!filePrefix || !key) throw new Error('Required environment variables not loaded');

  const db = await initDb('mongo', { filePrefix, reset: false });
  const search = createScaleSerpSearch({ get, key });

  await saveFreshSnapshotsForStakes(db, search);
}

main();
