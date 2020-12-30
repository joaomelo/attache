export async function listStakes ({ queryStakes }) {
  const stakes = await queryStakes();
  stakes.forEach(stake => console.info(stake));
  console.info(`total of ${stakes.length}`);
  console.info('------------------------');
}
