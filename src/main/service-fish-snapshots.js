import { get } from '../app/request';
import { initDb } from '../app/db';
import { createLogger } from '../app/log';
import { createSearch } from '../app/search';
import { fishFreshSnapshots } from '../domain/fish-snapshots';

export async function fishSnapshotsService () {
  const db = await initDb('firestore');
  const logger = createLogger('db', { db });

  let snapshotsFished = 0;
  try {
    const key = process.env.SCALE_SERP_KEY;
    if (!key) throw new Error('SCALE SERP api key not found');
    const search = createSearch('scale', { get, key });

    snapshotsFished = await fishFreshSnapshots({ db, search, logger });
  } catch (error) {
    logger.error(error.message);
  }

  return snapshotsFished;
};
