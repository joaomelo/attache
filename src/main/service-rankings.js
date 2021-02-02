import { initDb } from '../app/db';
import { createLogger } from '../app/log';
import { createDispatcher } from '../app/dispatcher';
import { dispatchFreshRankingsForStakes } from '../domain/rankings';

export async function runRankingsService () {
  const db = await initDb('firestore');
  const logger = createLogger(db);

  let rankingsSent = 0;
  try {
    const key = process.env.SEND_GRID_KEY;
    if (!key) throw new Error('SEND GRID api key not found');
    const dispatcher = createDispatcher('sendGrid', { key, logger });

    logger.info('rankings cycle started');
    rankingsSent = await dispatchFreshRankingsForStakes({ db, dispatcher, logger });
    logger.info(`rankings cycle finished with ${rankingsSent} rankings dispatched`);
  } catch (error) {
    logger.error(error.message);
  };

  return rankingsSent;
};
