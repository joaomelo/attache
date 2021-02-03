export async function dispatchFreshRankingsForSingleStake (stake, { db, dispatcher }) {
  await dispatcher.send();
  return 1;
}
