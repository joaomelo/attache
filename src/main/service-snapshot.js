import { initDb } from '../app/db';
import { createLogger } from '../app/log';
import { get } from '../app/request';
import { createScaleSerpSearch } from '../app/search';
import { saveFreshSnapshotsForStakes } from '../domain/snapshots';
import { stakesFixtures } from './dev-fixture';

export async function runSnapshotsService () {
  const db = await initDb('firestore');
  const logger = createLogger(db);

  const key = process.env.SCALE_SERP_KEY;
  if (!key) return logger.error('SCALE SERP api key not found');

  const search = createScaleSerpSearch({ get, key });

  try {
    if (process.env.NODE_ENV === 'development') {
      await db.saveStakes(stakesFixtures);
    }

    logger.info('snapshot cycle started');
    await saveFreshSnapshotsForStakes(db, search, logger);
    logger.info('snapshot cycle finished');
  } catch (error) {
    logger.error(error.message);
  }
};
