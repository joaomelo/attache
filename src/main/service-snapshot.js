import { initDb } from '../app/db';
import { createLogger } from '../app/log';
import { get } from '../app/request';
import { createScaleSerpSearch } from '../app/search';
import { saveFreshSnapshotsForStakes } from '../domain/snapshots';

export async function runSnapshotsService () {
  const db = await initDb('firestore');
  const logger = createLogger(db);

  const key = process.env.SCALE_SERP_KEY;
  if (!key) throw new Error('SCALE SERP api key not found as environment variable');
  const search = createScaleSerpSearch({ get, key });

  try {
    await saveFreshSnapshotsForStakes(db, search);
    logger.info('snapshot finished');
  } catch (error) {
    logger.error(error.message);
  }
};
