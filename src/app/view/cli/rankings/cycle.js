export async function viewCycleRank ({ cycleRank }) {
  console.info('running ranking cycle...');
  const { rankings, snapshots, newRankings, freshSnapshots } = await cycleRank();
  console.info(`the cycle touched ${rankings.length} rankings and ${snapshots.length} snapshots`);
  console.info(`new ${newRankings.length} rankings and ${freshSnapshots.length} snapshots were no cached are now saved on the db`);
  console.info('------------------------');
}
