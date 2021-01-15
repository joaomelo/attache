import { initDb } from '../interfaces/db';
import { get } from '../interfaces/request';
import { createScaleSerpSearch } from '../interfaces/search';
import { saveFreshSnapshotsForStakes } from '../domain/snapshots';

async function main () {
  const filePrefix = process.env.NEDB_FILENAME_PREFIX;
  const db = await initDb('nedb', { filePrefix, reset: false });

  const key = process.env.SCALE_SERP_KEY;
  const search = createScaleSerpSearch({ get, key });

  await saveFreshSnapshotsForStakes(db, search);
}

main();
