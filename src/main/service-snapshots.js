import { get } from '../app/request';
import { initDb } from '../app/db';
import { createLogger } from '../app/log';
import { createScaleSerpSearch } from '../app/search';
import { saveFreshSnapshotsForStakes } from '../entities/snapshots';

export async function runSnapshotsService () {
  const db = await initDb('firestore');
  const logger = createLogger(db);

  let snapshotsSaved = 0;
  try {
    const key = process.env.SCALE_SERP_KEY;
    if (!key) throw new Error('SCALE SERP api key not found');

    const search = createScaleSerpSearch({ get, key });

    logger.info('snapshot cycle started');
    snapshotsSaved = await saveFreshSnapshotsForStakes(db, search, logger);
    logger.info(`snapshot cycle finished with ${snapshotsSaved} fresh snapshots saved`);
  } catch (error) {
    logger.error(error.message);
  }

  return snapshotsSaved;
};
