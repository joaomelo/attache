import { initDb } from '../app/db';
import { createLogger } from '../app/log';
import { createMessenger } from '../app/messenger';
import { dispatchFreshReportsForStakes } from '../domain/reports';

export async function runReportsService () {
  const db = await initDb('firestore');
  const logger = createLogger(db);

  let reportsSent = 0;
  try {
    const key = process.env.SEND_GRID_KEY;
    if (!key) throw new Error('SEND GRID api key not found');
    const messenger = createMessenger('sendGrid', { key });

    logger.info('report cycle started');
    reportsSent = await dispatchFreshReportsForStakes(db, messenger, logger);
    logger.info(`report cycle finished with ${reportsSent} fresh reports dispatched`);
  } catch (error) {
    logger.error(error.message);
  };

  return reportsSent;
};
