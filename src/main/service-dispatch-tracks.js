import { initDb } from '../app/db';
import { createLogger } from '../app/log';
import { createDispatch } from '../app/dispatch';
import { renderTrackReport as render } from '../app/view';
import { dispatchTracks } from '../domain/dispatch-tracks';

export async function dispatchTracksService () {
  const db = await initDb('firestore');
  const logger = createLogger('db', { db });

  let tracksDispatched = 0;
  try {
    const key = process.env.SEND_GRID_KEY;
    const defaults = { from: process.env.DEFAULT_FROM_EMAIL };
    if (!(key && defaults.from)) throw new Error('SEND GRID config not found');
    const dispatch = createDispatch('sendGrid', { key, defaults });

    tracksDispatched = await dispatchTracks({ db, dispatch, render });
    logger.info(`tracks dispatch cycle finished with ${tracksDispatched} dispatches`);
  } catch (error) {
    logger.error(error.message);
  };

  return tracksDispatched;
};
