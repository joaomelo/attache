import { initDb } from '../app/db';
import { createLogger } from '../app/log';
import { createDispatch } from '../app/dispatch';
import { dispatchFreshRankingsForStakes } from '../domain/dispatch-rankings';

export async function runRankingsService () {
  const db = await initDb('firestore');
  const logger = createLogger(db);

  let rankingsSent = 0;
  try {
    const key = process.env.SEND_GRID_KEY;
    const defaults = { from: process.env.DEFAULT_FROM_EMAIL };
    if (!(key && defaults.from)) throw new Error('SEND GRID variables not found');
    const dispatch = createDispatch('sendGrid', { key, defaults });

    rankingsSent = await dispatchFreshRankingsForStakes({ db, dispatch, logger });
  } catch (error) {
    logger.error(error.message);
  };

  return rankingsSent;
};
