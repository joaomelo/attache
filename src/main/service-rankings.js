import { initDb } from '../app/db';
import { createLogger } from '../app/log';
import { createDispatch } from '../app/dispatch';
import { dispatchFreshRankingsForStakes } from '../cases/dispatch-rankings';

export async function runRankingsService () {
  const db = await initDb('firestore');
  const logger = createLogger(db);

  let rankingsSent = 0;
  try {
    const key = process.env.SEND_GRID_KEY;
    if (!key) throw new Error('SEND GRID api key not found');
    const dispatch = createDispatch('sendGrid', { key });

    rankingsSent = await dispatchFreshRankingsForStakes({ db, dispatch, logger });
  } catch (error) {
    logger.error(error.message);
  };

  return rankingsSent;
};
