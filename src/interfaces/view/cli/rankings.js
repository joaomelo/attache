export async function listRankings ({ queryRankings }) {
  const rankings = await queryRankings();

  rankings.forEach(ranking => console.info(ranking));
  console.info(`total of ${rankings.length}`);
  console.info('------------------------');
}

export async function runCycleRank ({ cycleRank }) {
  console.info('running ranking cycle...');
  const { rankings, snapshots, newRankings, newSnapshots } = await cycleRank();
  console.info(`the cycle provided ${rankings.length} rankings and ${snapshots.length} snapshots`);
  console.info(`saved new ${newRankings.length} rankings and ${newSnapshots.length} snapshots on the database`);
  console.info('------------------------');
}
