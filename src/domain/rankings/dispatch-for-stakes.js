import { dispatchFreshRankingsForSingleStake } from './dispatch-for-single-stake';

export async function dispatchFreshRankingsForStakes ({ db, dispatcher, logger }) {
  const stakes = await db.queryStakes();

  let dispatchedRankings = 0;
  if (stakes.length === 0) {
    logger.info('no stakes found for rankings dispatch');
    return dispatchedRankings;
  };

  logger.info('rankings cycle started');
  const promises = [];
  stakes.forEach(stake =>
    promises.push(dispatchFreshRankingsForSingleStake(stake, { db, dispatcher }))
  );
  const results = await Promise.all(promises);

  dispatchedRankings = results.reduce((acc, cur) => acc + cur, dispatchedRankings);
  logger.info(`rankings cycle finished with ${dispatchedRankings} rankings dispatched`);

  return dispatchedRankings;
}
