export async function viewListStakes ({ listStakes }) {
  const stakes = await listStakes();
  stakes.forEach(stake => console.info(stake));
  console.info(`total of ${stakes.length}`);
  console.info('------------------------');
}
