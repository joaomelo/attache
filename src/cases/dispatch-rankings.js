import { calcSomedayFromToday } from '../helpers';
import { rankStakes } from '../entities/rankings';

export async function dispatchFreshRankingsForStakes ({ db, dispatch, logger }) {
  let dispatchedRankings = 0;

  const stakes = await db.queryStakes();
  if (stakes.length === 0) {
    logger.info('no stakes found for rankings dispatch');
    return dispatchedRankings;
  };

  const lastWeek = calcSomedayFromToday(-7);
  const snapshots = await db.querySnapshotsSince(lastWeek);
  if (snapshots.length === 0) {
    logger.info('no snapshots found for rankings dispatch');
    return dispatchedRankings;
  };

  const rankings = rankStakes(stakes, snapshots);

  dispatchedRankings = await dispatchRankings(rankings, { dispatch });
  logger.info(`rankings cycle finished with ${dispatchedRankings} dispatches`);

  return dispatchedRankings;
}

async function dispatchRankings (rankings, { dispatch }) {
  const mails = parseRankingsToMail(rankings);
  const promises = mails.map(mail => dispatch(mail));
  const results = await Promise.all(promises);
  return results.length;
}

function parseRankingsToMail (rankings) {
  return rankings.flatMap(r =>
    r.stake.emails.map(to => ({
      to,
      subject: 'updated ranking',
      message: JSON.stringify(r.terms)
    }))
  );
}
