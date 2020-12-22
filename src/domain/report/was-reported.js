export async function createIsRanked ({ frequency }, { db }) {
  const supportedFrequencies = ['daily', 'weekly'];
  if (!supportedFrequencies.includes(frequency)) {
    throw new Error(`frequency ${frequency} is not supported`);
  };

  const sinceDate = new Date();
  sinceDate.setHours(0, 0, 0, 0);

  if (frequency === 'weekly') {
    sinceDate.setDate(sinceDate.getDate() - 6);
  }

  const rankings = await db.queryRankingsSince(sinceDate);

  const isRanked = (page, term) => !!rankings.find(r => r.page === page && r.term === term);
  return isRanked;
};
