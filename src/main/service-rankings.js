import { initDb } from '../app/db';
import { createLogger } from '../app/log';
import { createDispatcher } from '../app/dispatcher';
import { dispatchFreshRankingsForStakes } from '../cases/dispatch-rankings';

export async function runRankingsService () {
  const db = await initDb('firestore');
  const logger = createLogger(db);

  let rankingsSent = 0;
  try {
    const key = process.env.SEND_GRID_KEY;
    if (!key) throw new Error('SEND GRID api key not found');
    const dispatcher = createDispatcher('sendGrid', { key, logger });

    rankingsSent = await dispatchFreshRankingsForStakes({ db, dispatcher, logger });
  } catch (error) {
    logger.error(error.message);
  };

  return rankingsSent;
};
